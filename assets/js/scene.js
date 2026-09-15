/* ============================================================
   Karma Foods — interactive Three.js citrus-grove background
   Scroll drives the camera + brand theme; mouse adds parallax.
   ============================================================ */
(function () {
  "use strict";

  if (typeof THREE === "undefined") return;

  var canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Brand themes, keyed to data-theme on each <section> ---------- */
  var THEMES = {
    default: { bg: 0x0d130f, fog: 0x0d130f, fruit: 0xf99c24, leaf: 0x00793f, accent: 0xf99c24, glow: 0xf99c24 },
    agro:    { bg: 0x14150f, fog: 0x14150f, fruit: 0xee9c33, leaf: 0x4a5a3a, accent: 0x8c8a63, glow: 0xf0b45a },
    ricchi:  { bg: 0x1a0c11, fog: 0x1a0c11, fruit: 0xc23b4a, leaf: 0x3a2430, accent: 0xc9a227, glow: 0xe0576a },
    citra:   { bg: 0x18120a, fog: 0x18120a, fruit: 0xf2921d, leaf: 0x3a3020, accent: 0xf2921d, glow: 0xffb040 },
    cleo:    { bg: 0x0d0c08, fog: 0x0d0c08, fruit: 0xd9b23c, leaf: 0x2a2a1c, accent: 0xb8952f, glow: 0xe8c96a },
    mello:   { bg: 0x081712, fog: 0x081712, fruit: 0xa8d24a, leaf: 0x0f7a68, accent: 0x0f7a68, glow: 0xbfe86a },
    contact: { bg: 0x0c0d0a, fog: 0x0c0d0a, fruit: 0xf99c24, leaf: 0x00793f, accent: 0xf99c24, glow: 0xf99c24 }
  };
  /* ---------- Renderer / scene / camera ---------- */
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var currentBg = new THREE.Color(THEMES.default.bg);
  scene.background = currentBg;
  scene.fog = new THREE.FogExp2(THEMES.default.fog, 0.045);

  var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 11);

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  /* ---------- Lighting ---------- */
  var ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambient);

  var keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
  keyLight.position.set(6, 8, 6);
  scene.add(keyLight);

  var glowLight = new THREE.PointLight(THEMES.default.glow, 2.2, 30, 2);
  glowLight.position.set(-4, 2, 4);
  scene.add(glowLight);

  /* ---------- Citrus cluster (procedural, low-poly) ---------- */
  var fruitGeo = new THREE.IcosahedronGeometry(1, 4);
  var fruitMat = new THREE.MeshStandardMaterial({
    color: THEMES.default.fruit,
    roughness: 0.4,
    metalness: 0.08,
    flatShading: false
  });

  var fruitGroup = new THREE.Group();
  var FRUIT_COUNT = 26;
  var fruits = [];

  for (var i = 0; i < FRUIT_COUNT; i++) {
    var mesh = new THREE.Mesh(fruitGeo, fruitMat);
    var radius = 4.5 + Math.random() * 6.5;
    var theta = Math.random() * Math.PI * 2;
    var y = (Math.random() - 0.5) * 14;
    mesh.position.set(Math.cos(theta) * radius, y, Math.sin(theta) * radius - 2);
    var s = 0.35 + Math.random() * 0.55;
    mesh.scale.setScalar(s);
    mesh.userData.spin = (Math.random() - 0.5) * 0.25;
    mesh.userData.bobSpeed = 0.2 + Math.random() * 0.4;
    mesh.userData.bobOffset = Math.random() * Math.PI * 2;
    mesh.userData.baseY = y;
    fruitGroup.add(mesh);
    fruits.push(mesh);
  }
  scene.add(fruitGroup);

  /* ---------- Leaves (simple billboard planes) ---------- */
  var leafGeo = new THREE.PlaneGeometry(1, 1.6);
  var leafMat = new THREE.MeshStandardMaterial({
    color: THEMES.default.leaf,
    roughness: 0.7,
    metalness: 0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85
  });
  var leafGroup = new THREE.Group();
  var LEAF_COUNT = 40;
  var leaves = [];
  for (var l = 0; l < LEAF_COUNT; l++) {
    var leaf = new THREE.Mesh(leafGeo, leafMat);
    var lr = 5 + Math.random() * 8;
    var lt = Math.random() * Math.PI * 2;
    leaf.position.set(Math.cos(lt) * lr, (Math.random() - 0.5) * 16, Math.sin(lt) * lr - 2);
    leaf.scale.setScalar(0.4 + Math.random() * 0.5);
    leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    leaf.userData.spin = (Math.random() - 0.5) * 0.15;
    leafGroup.add(leaf);
    leaves.push(leaf);
  }
  scene.add(leafGroup);

  /* ---------- Drifting particles (citrus-blossom dust) ---------- */
  var PARTICLE_COUNT = 260;
  var particleGeo = new THREE.BufferGeometry();
  var positions = new Float32Array(PARTICLE_COUNT * 3);
  for (var p = 0; p < PARTICLE_COUNT; p++) {
    positions[p * 3] = (Math.random() - 0.5) * 30;
    positions[p * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[p * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  var particleMat = new THREE.PointsMaterial({
    color: THEMES.default.accent,
    size: 0.045,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true
  });
  var particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ---------- Scroll progress + active theme detection ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main .section"));
  var themeKeys = sections.map(function (s) { return s.getAttribute("data-theme") || "default"; });
  var activeIndex = 0;
  var scrollProgress = 0;

  function updateScrollState() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    scrollProgress = max > 0 ? window.scrollY / max : 0;

    var viewportCenter = window.scrollY + window.innerHeight * 0.5;
    var best = 0, bestDist = Infinity;
    sections.forEach(function (sec, idx) {
      var mid = sec.offsetTop + sec.offsetHeight * 0.5;
      var d = Math.abs(mid - viewportCenter);
      if (d < bestDist) { bestDist = d; best = idx; }
    });
    activeIndex = best;
  }
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);

  /* ---------- Mouse parallax ---------- */
  var mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
  window.addEventListener("pointermove", function (e) {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
  });

  /* ---------- Color lerp helpers ---------- */
  var tmpColorA = new THREE.Color();
  var tmpColorB = new THREE.Color();
  var currentTheme = {
    bg: new THREE.Color(THEMES.default.bg),
    fruit: new THREE.Color(THEMES.default.fruit),
    leaf: new THREE.Color(THEMES.default.leaf),
    accent: new THREE.Color(THEMES.default.accent),
    glow: new THREE.Color(THEMES.default.glow)
  };

  function lerpColorTo(colorObj, hex, t) {
    tmpColorB.set(hex);
    colorObj.lerp(tmpColorB, t);
  }

  /* ---------- Animation loop ---------- */
  var clock = new THREE.Clock();
  var LERP = reduceMotion ? 1 : 0.045;

  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();
    var dt = clock.getDelta();

    var themeKey = themeKeys[activeIndex] || "default";
    var theme = THEMES[themeKey] || THEMES.default;

    lerpColorTo(currentTheme.bg, theme.bg, LERP);
    lerpColorTo(currentTheme.fruit, theme.fruit, LERP);
    lerpColorTo(currentTheme.leaf, theme.leaf, LERP);
    lerpColorTo(currentTheme.accent, theme.accent, LERP);
    lerpColorTo(currentTheme.glow, theme.glow, LERP);

    scene.background.copy(currentTheme.bg);
    scene.fog.color.copy(currentTheme.bg);
    fruitMat.color.copy(currentTheme.fruit);
    leafMat.color.copy(currentTheme.leaf);
    particleMat.color.copy(currentTheme.accent);
    glowLight.color.copy(currentTheme.glow);

    /* camera orbits gently around the grove as the page scrolls */
    var orbitAngle = scrollProgress * Math.PI * 1.4;
    var radius = 11 - scrollProgress * 2.5;
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    camera.position.x = Math.sin(orbitAngle) * radius + mouseX * 0.6;
    camera.position.z = Math.cos(orbitAngle) * radius - 2;
    camera.position.y = Math.sin(scrollProgress * Math.PI * 2) * 1.2 - mouseY * 0.4;
    camera.lookAt(0, 0, -2);

    /* fruit + leaf motion */
    fruits.forEach(function (m) {
      m.rotation.x += m.userData.spin * dt;
      m.rotation.y += m.userData.spin * 0.8 * dt;
      m.position.y = m.userData.baseY + Math.sin(t * m.userData.bobSpeed + m.userData.bobOffset) * 0.4;
    });
    leaves.forEach(function (m) {
      m.rotation.z += m.userData.spin * dt;
    });

    fruitGroup.rotation.y += 0.0009;
    leafGroup.rotation.y -= 0.0006;
    particles.rotation.y += 0.0003;

    renderer.render(scene, camera);
  }

  if (!renderer.getContext()) {
    canvas.style.display = "none";
  } else {
    animate();
  }
})();
