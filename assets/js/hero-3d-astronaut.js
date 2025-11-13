class Astronaut3DModel {
    constructor(containerId, modelPath) {
        this.containerId = containerId;
        this.modelPath = modelPath;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.isRotating = true;
        this.rotationSpeed = 0.025; // Rotação ultra-rápida para máximo dinamismo
        this.scrollRotation = 0;
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.loadModel();
        this.setupEventListeners();
        this.animate();

        this.onWindowResize();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = null;

        // Adicionar um leve gradiente de fundo sutil
        this.scene.fog = new THREE.Fog(0x000000, 10, 50);
    }

    setupCamera() {
        const container = document.getElementById(this.containerId);
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

        // Posicionamento ideal para o astronauta (câmera mais alta)
        this.camera.position.set(0, 2, 9);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        const container = document.getElementById(this.containerId);
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        // Limpar container e adicionar renderer
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        // 🔧 CORREÇÃO: Configurar canvas para permitir interatividade CSS
        this.renderer.domElement.style.pointerEvents = 'auto';
        this.renderer.domElement.style.cursor = 'inherit';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
    }

    setupLights() {
        // Luz ambiente suave
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Luz principal (frontal)
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        this.scene.add(mainLight);

        // Luz de preenchimento (traseira)
        const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.6);
        fillLight.position.set(-3, 2, -3);
        this.scene.add(fillLight);

        // Luz pontual azul para destacar detalhes
        const accentLight = new THREE.PointLight(0x06B6D4, 0.8, 20);
        accentLight.position.set(2, 3, 3);
        this.scene.add(accentLight);

        // Luz de atmosfera
        const rimLight = new THREE.PointLight(0xffffff, 0.3, 15);
        rimLight.position.set(0, -2, -5);
        this.scene.add(rimLight);
    }

    loadModel() {
        const loader = new THREE.GLTFLoader();

        loader.load(
            this.modelPath,
            (gltf) => {
                this.model = gltf.scene;

                // Ajustes específicos para o modelo de astronauta
                this.optimizeModel();

                // Centralizar e posicionar
                this.centerModel();

                // Ajustar escala para caber bem no container
                this.adjustScale();

                this.scene.add(this.model);

                console.log('Modelo astronauta carregado com sucesso!');
            },
            (progress) => {
                console.log('Carregando astronauta:', (progress.loaded / progress.total * 100) + '%');
            },
            (error) => {
                console.error('Erro ao carregar modelo astronauta:', error);
                this.createFallbackAstronaut();
            }
        );
    }

    optimizeModel() {
        // Percorrer todas as meshes do modelo
        this.model.traverse((child) => {
            if (child.isMesh) {
                // Melhorar qualidade de renderização
                child.material.needsUpdate = true;

                // Habilitar sombras se suportado
                child.castShadow = true;
                child.receiveShadow = true;

                // Otimizar geometria
                if (child.geometry) {
                    child.geometry.computeBoundingBox();
                    child.geometry.computeBoundingSphere();
                }
            }
        });
    }

    centerModel() {
        // Calcular bounding box do modelo
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());

        // Centralizar o modelo
        this.model.position.sub(center);

        // Ajustar posição Y para mover o astronauta para baixo
        this.model.position.y -= 0.3;
    }

    adjustScale() {
        // Calcular tamanho atual
        const box = new THREE.Box3().setFromObject(this.model);
        const size = box.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        // Escalar para caber no viewport (tamanho ideal: ~6.5 unidades para modelo muito maior)
        const targetSize = 6.5;
        const scale = targetSize / maxDimension;

        this.model.scale.setScalar(scale);
    }

    createFallbackAstronaut() {
        console.log('Criando astronauta fallback...');

        // Criar geometria básica de astronauta
        const group = new THREE.Group();

        // Capacete (esfera transparente)
        const helmetGeometry = new THREE.SphereGeometry(1, 32, 32);
        const helmetMaterial = new THREE.MeshPhongMaterial({
            color: 0x87CEEB,
            transparent: true,
            opacity: 0.3,
            shininess: 100
        });
        const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
        helmet.position.y = 0.5;
        group.add(helmet);

        // Corpo (cilindro)
        const bodyGeometry = new THREE.CylinderGeometry(0.8, 1, 2, 16);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 30
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = -0.5;
        group.add(body);

        // Detalhes visuais
        const visorGeometry = new THREE.RingGeometry(0.3, 0.6, 16);
        const visorMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFD700,
            transparent: true,
            opacity: 0.8
        });
        const visor = new THREE.Mesh(visorGeometry, visorMaterial);
        visor.position.set(0, 0.7, 0.95);
        visor.rotation.x = -Math.PI / 6;
        group.add(visor);

        this.model = group;
        this.scene.add(this.model);
    }

    setupEventListeners() {
        // Scroll para controlar rotação Y
        window.addEventListener('scroll', () => {
            if (!this.isRotating) return;

            const scrollY = window.scrollY;
            const maxScroll = Math.max(
                document.body.scrollHeight - window.innerHeight,
                1000 // mínimo para evitar divisão por zero
            );
            const scrollProgress = scrollY / maxScroll;

            this.scrollRotation = scrollProgress * Math.PI * 16; // Rotação ultra-intensa máxima (16 rotações completas)
        });

        // Removidos event listeners de mouse - apenas rotação no scroll

        // Resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const deltaTime = this.clock.getDelta();

        if (this.model) {
            // APENAS rotação baseada no scroll
            this.model.rotation.y = this.scrollRotation;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Caminho para o seu modelo astronauta
    new Astronaut3DModel('hero-3d-container', 'assets/images/3d_astronaut/scene.gltf');
});
