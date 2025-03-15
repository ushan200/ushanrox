// 3D Viewer Page (3d-viewer.html)
// Include Three.js CDN in the HTML head: 
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const objectName = urlParams.get('object') || 'cube';

let scene, camera, renderer, object;
let currentColor = 0xffffff;

init();
animate();

function init() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    document.body.appendChild(renderer.domElement);

    // Create 3D object based on URL parameter
    let geometry;
    switch(objectName) {
        case 'cube':
            geometry = new THREE.BoxGeometry();
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1, 32, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1, 2, 32);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
            break;
        case 'torus':
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
            break;
        case 'octahedron':
            geometry = new THREE.OctahedronGeometry(1);
            break;
        case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(1);
            break;
        case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(1);
            break;
        case 'pyramid':
            geometry = new THREE.ConeGeometry(1, 2, 32);
            break;
        case 'prism':
            geometry = new THREE.BoxGeometry(1, 2, 32);
            break;
        default:
            geometry = new THREE.BoxGeometry();
    }

    const material = new THREE.MeshPhongMaterial({ color: currentColor });
    object = new THREE.Mesh(geometry, material);
    scene.add(object);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', changeColor);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    object.rotation.x += 0.005;
    object.rotation.y += 0.005;
    renderer.render(scene, camera);
}

function changeColor() {
    const randomColor = Math.random() * 0xffffff;
    currentColor = randomColor;
    object.material.color.setHex(randomColor);
    document.body.style.backgroundColor = `#${Math.floor(randomColor).toString(16).padStart(6, '0')}`;
}