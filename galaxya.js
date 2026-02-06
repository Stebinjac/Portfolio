import * as THREE from "https://cdn.skypack.dev/three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const geometry = new THREE.BufferGeometry();
const starCount = 2500;
const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  );
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.12
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

document.addEventListener("mousemove", (e) => {
  stars.rotation.y = e.clientX * 0.00005;
  stars.rotation.x = e.clientY * 0.00005;
});

function animate() {
  requestAnimationFrame(animate);
  stars.rotation.y += 0.0003;
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
