import * as THREE from 'three';

export class ThreeSceneManager {
  constructor(canvasId = 'webgl-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.nodeSpheres = [];
    this.linesMesh = null;
    this.nodeGroup = null;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;

    // 3D Camera Waypoints across the scroll journey (from 0.0 to 1.0)
    // 0.00: Hero (Arrival)
    // 0.20: Philosophy (Flight-Critical Avionics Mindset)
    // 0.45: Case Studies (Pinned Architecture Stage)
    // 0.70: Simulator (Ingress Pipeline Flow)
    // 0.85: Credentials (Tech Stack & Certs)
    // 1.00: Transmission (Secure Contact Orb)
    this.waypoints = [
      { p: 0.00, pos: new THREE.Vector3(0, 0, 48), rot: new THREE.Vector2(0, 0) },
      { p: 0.20, pos: new THREE.Vector3(-14, -6, 40), rot: new THREE.Vector2(-0.06, 0.16) },
      { p: 0.45, pos: new THREE.Vector3(16, 5, 36), rot: new THREE.Vector2(0.08, -0.22) },
      { p: 0.70, pos: new THREE.Vector3(0, -9, 34), rot: new THREE.Vector2(-0.14, 0.06) },
      { p: 0.85, pos: new THREE.Vector3(-15, 12, 42), rot: new THREE.Vector2(0.18, -0.12) },
      { p: 1.00, pos: new THREE.Vector3(-10, 0, 36), rot: new THREE.Vector2(0, 0.15) }
    ];

    this.currentCamPos = new THREE.Vector3(0, 0, 48);
    this.currentCamRot = new THREE.Vector2(0, 0);

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xf3f2ee, 0.014);

    // 2. Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 48);

    // 3. WebGL Renderer
    const isMobile = window.innerWidth < 768;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0052ff, 2.0);
    dirLight1.position.set(35, 45, 55);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dirLight2.position.set(-35, -25, 25);
    this.scene.add(dirLight2);

    // 5. Constellation Generation
    this.buildConstellation();

    // 6. Listeners
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });

    // 7. Start Render Loop
    this.animate();
  }

  buildConstellation() {
    this.nodeGroup = new THREE.Group();
    this.scene.add(this.nodeGroup);

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 48 : 85;
    const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

    // Electric blue glossy materials
    const focalNodeMat = new THREE.MeshPhongMaterial({
      color: 0x0047ff,
      emissive: 0x001d99,
      shininess: 120,
      transparent: true,
      opacity: 0.95
    });

    const mainNodeMat = new THREE.MeshPhongMaterial({
      color: 0x0052ff,
      emissive: 0x002699,
      shininess: 90,
      transparent: true,
      opacity: 0.88
    });

    const smallNodeMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.7
    });

    const positions = [];
    const spread = 70;

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * (spread * 0.75);
      const z = (Math.random() - 0.5) * (spread * 0.65);

      positions.push(new THREE.Vector3(x, y, z));

      let scale = 0.35 + Math.random() * 0.45;
      let mat = smallNodeMat;

      if (i < 10) {
        scale = 1.35 + Math.random() * 0.75;
        mat = focalNodeMat;
      } else if (i < 30) {
        scale = 0.75 + Math.random() * 0.45;
        mat = mainNodeMat;
      }

      const mesh = new THREE.Mesh(sphereGeometry, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        basePos: new THREE.Vector3(x, y, z),
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      };

      this.nodeGroup.add(mesh);
      this.nodeSpheres.push(mesh);
    }

    // Connect close nodes with fine electric blue lines
    const lineCoords = [];
    const maxDist = 19;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = positions[i].distanceTo(positions[j]);
        if (d < maxDist) {
          lineCoords.push(positions[i].x, positions[i].y, positions[i].z);
          lineCoords.push(positions[j].x, positions[j].y, positions[j].z);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0052ff,
      transparent: true,
      opacity: 0.18,
      linewidth: 1
    });

    this.linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    this.nodeGroup.add(this.linesMesh);
  }

  // Smooth continuous scroll mapping
  setScrollProgress(progress) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  interpolateWaypoints(p) {
    if (p <= this.waypoints[0].p) {
      return { pos: this.waypoints[0].pos, rot: this.waypoints[0].rot };
    }
    const last = this.waypoints[this.waypoints.length - 1];
    if (p >= last.p) {
      return { pos: last.pos, rot: last.rot };
    }

    // Find bounding waypoints
    for (let i = 0; i < this.waypoints.length - 1; i++) {
      const w1 = this.waypoints[i];
      const w2 = this.waypoints[i + 1];
      if (p >= w1.p && p <= w2.p) {
        const t = (p - w1.p) / (w2.p - w1.p);
        // Smooth step easing
        const smoothT = t * t * (3 - 2 * t);

        const pos = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, smoothT);
        const rot = new THREE.Vector2().lerpVectors(w1.rot, w2.rot, smoothT);
        return { pos, rot };
      }
    }

    return { pos: this.waypoints[0].pos, rot: this.waypoints[0].rot };
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  onTouchMove(e) {
    if (e.touches && e.touches[0]) {
      this.mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.5;
      this.mouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.5;
    }
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    const isMobile = window.innerWidth < 768;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const time = performance.now() * 0.001;

    // Smooth scroll progress lerp
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.06;

    // Smooth mouse parallax lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Compute target camera waypoint based on scroll progress
    const { pos: targetPos, rot: targetRot } = this.interpolateWaypoints(this.scrollProgress);

    // Apply gentle mouse parallax offset
    const finalX = targetPos.x + this.mouse.x * 2.2;
    const finalY = targetPos.y - this.mouse.y * 2.2;
    const finalZ = targetPos.z;

    this.currentCamPos.x += (finalX - this.currentCamPos.x) * 0.05;
    this.currentCamPos.y += (finalY - this.currentCamPos.y) * 0.05;
    this.currentCamPos.z += (finalZ - this.currentCamPos.z) * 0.05;

    this.camera.position.copy(this.currentCamPos);

    this.currentCamRot.x += (targetRot.x - this.currentCamRot.x) * 0.05;
    this.currentCamRot.y += (targetRot.y - this.currentCamRot.y) * 0.05;

    this.camera.rotation.x = this.currentCamRot.x;
    this.camera.rotation.y = this.currentCamRot.y;

    // Organic drift for nodes
    for (let i = 0; i < this.nodeSpheres.length; i++) {
      const node = this.nodeSpheres[i];
      const u = node.userData;
      node.position.y = u.basePos.y + Math.sin(time * u.speed + u.offset) * 0.75;
      node.position.x = u.basePos.x + Math.cos(time * (u.speed * 0.7) + u.offset) * 0.45;
    }

    if (this.nodeGroup) {
      this.nodeGroup.rotation.y = time * 0.012;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
