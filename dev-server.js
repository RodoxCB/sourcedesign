#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Design Visual - Servidor de Desenvolvimento');
console.log('===============================================');
console.log('');

console.log('📋 Opções disponíveis:');
console.log('');

console.log('1️⃣ VERSÃO OFFLINE (Sempre funciona):');
console.log('   ✅ Abra index-offline.html diretamente no navegador');
console.log('   ✅ Funciona sem internet ou servidor');
console.log('   ✅ Todas as funcionalidades ativas');
console.log('');

console.log('2️⃣ SERVIDOR NODE.JS (Pode ter restrições):');
console.log('   ⚠️  Pode não funcionar em ambientes sandbox');
console.log('   💡 Use: node server.js (porta 3000)');
console.log('');

console.log('3️⃣ OUTROS SERVIDORES:');
console.log('   • Python: python3 -m http.server 8080');
console.log('   • VS Code: Extensão "Live Server"');
console.log('   • Apache/Nginx: Configure virtual host');
console.log('');

console.log('📄 Arquivos disponíveis:');
const files = [
    'index.html',
    'index-offline.html',
    'pages/servicos.html',
    'pages/servicos-offline.html',
    'pages/sobre.html',
    'pages/sobre-offline.html',
    'pages/contato.html',
    'pages/contato-offline.html',
    'test.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
    } else {
        console.log(`   ❌ ${file}`);
    }
});

console.log('');
console.log('🎯 RECOMENDAÇÃO: Use index-offline.html para desenvolvimento!');
console.log('');

// Tentar abrir o arquivo offline automaticamente
const offlinePath = path.join(__dirname, 'index-offline.html');
if (fs.existsSync(offlinePath)) {
    console.log('🔗 Abrindo versão offline automaticamente...');

    // Para macOS, tentar abrir no navegador
    const { exec } = require('child_process');
    const command = `open "${offlinePath}" 2>/dev/null || echo "Abra manualmente: ${offlinePath}"`;

    exec(command, (error) => {
        if (error) {
            console.log(`📎 Abraj manualmente no navegador: file://${offlinePath}`);
        } else {
            console.log('✅ Arquivo aberto no navegador!');
        }
    });
}
