const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;

    // Default to index.html for root path
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Security: prevent directory traversal
    if (pathname.includes('..')) {
        res.writeHead(403);
        res.end('403 Forbidden');
        return;
    }

    const filePath = path.join(__dirname, pathname);

    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Try adding .html extension for clean URLs
                const htmlPath = filePath + '.html';
                fs.stat(htmlPath, (err2, stats2) => {
                    if (err2) {
                        res.writeHead(404);
                        res.end('404 Not Found');
                        return;
                    }
                    serveFile(htmlPath, stats2);
                });
            } else {
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
            return;
        }

        if (stats.isDirectory()) {
            // Try to serve index.html from directory
            const indexPath = path.join(filePath, 'index.html');
            fs.stat(indexPath, (err, indexStats) => {
                if (err) {
                    res.writeHead(403);
                    res.end('403 Forbidden - Directory listing not allowed');
                    return;
                }
                serveFile(indexPath, indexStats);
            });
        } else {
            serveFile(filePath, stats);
        }
    });

    function serveFile(filePath, stats) {
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': mimeType,
            'Content-Length': stats.size,
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*'
        });

        const stream = fs.createReadStream(filePath);
        stream.pipe(res);

        stream.on('error', () => {
            res.writeHead(500);
            res.end('500 Internal Server Error');
        });
    }
});

server.listen(PORT, HOST, () => {
    console.log('🚀 Servidor rodando!');
    console.log(`📍 http://${HOST}:${PORT}`);
    console.log('');
    console.log('📄 Páginas disponíveis:');
    console.log(`   • http://${HOST}:${PORT}/ (Página inicial)`);
    console.log(`   • http://${HOST}:${PORT}/pages/servicos.html`);
    console.log(`   • http://${HOST}:${PORT}/pages/sobre.html`);
    console.log(`   • http://${HOST}:${PORT}/pages/contato.html`);
    console.log('');
    console.log('💡 URLs limpas também funcionam:');
    console.log(`   • http://${HOST}:${PORT}/pages/servicos`);
    console.log(`   • http://${HOST}:${PORT}/pages/sobre`);
    console.log(`   • http://${HOST}:${PORT}/pages/contato`);
    console.log('');
    console.log('Para parar o servidor: Ctrl+C');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Porta ${PORT} já está em uso.`);
        console.log('💡 Tente usar uma porta diferente:');
        console.log('   PORT=8080 npm run dev');
    } else {
        console.error('❌ Erro no servidor:', err.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Servidor encerrado.');
    server.close();
    process.exit(0);
});
