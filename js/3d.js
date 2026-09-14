/* AURESTA 3D Hero Experience
 * ---------------------------------------------------------------------------
 * Abstract sculptural forms with mouse parallax on the Home hero section.
 * Uses THREE.js (CDN). Fully isolated: no side effects, no scroll-jacking,
 * pointer-events:none canvas, pauses when off-screen, respects
 * prefers-reduced-motion, degrades gracefully if WebGL or CDN unavailable.
 *
 * Public API: window.Auresta3D.sync()   — attach/update to current DOM
 *             window.Auresta3D.dispose() — tear down completely
 */
(function () {
  'use strict';

  var THREE = window.THREE;
  if (!THREE) return; // CDN failed or not loaded — silent no-op

  /* ----------------------------------------------------------- state ---- */
  var S = {
    renderer: null,
    scene: null,
    camera: null,
    objects: [],
    raf: null,
    mouse: { x: 0, y: 0 },
    mouseTarget: { x: 0, y: 0 },
    visible: true,
    reducedMotion: false,
    isMobile: false,
    disposed: false,
    heroEl: null,
    containerEl: null,
    observer: null,
    mouseHandler: null,
    resizeHandler: null,
    lastW: 0,
    lastH: 0,
  };

  var PX_CAP = 1.75;
  var PARALLAX_MULT = 0.5;

  /* ----------------------------------------------------------- colours -- */
  var COL_GOLD   = 0xECC479;
  var COL_CREAM  = 0xFAECC3;
  var COL_CHAMP  = 0xF1D2A2;
  var COL_ESP    = 0x2A2119;
  var COL_BG     = 0xFFF6F0;

  /* --------------------------------------------------------- lifecycle -- */
  function init() {
    try {
      S.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { S.reducedMotion = false; }
    S.isMobile = window.innerWidth < 768;

    S.mouseHandler = onMouseMove;
    S.resizeHandler = onResize;
    document.addEventListener('mousemove', S.mouseHandler, { passive: true });
    window.addEventListener('resize', S.resizeHandler, { passive: true });

    S.observer = new IntersectionObserver(function (entries) {
      S.visible = !!entries[0] && entries[0].isIntersecting;
    }, { threshold: 0.05 });

    sync();
  }

  /* -------------------------------------------------------------- sync -- */
  function sync() {
    if (S.disposed) return;

    var hero = document.querySelector('.hero');
    if (!hero) {
      if (S.scene) disposeScene();
      return;
    }

    // Same hero element — do nothing (re-render destroys old hero, so this
    // only fires if React-style diffing preserved it, which innerHTML won't)
    if (hero === S.heroEl && S.scene) return;

    // New or restored hero — rebuild
    if (S.scene) disposeScene();

    S.heroEl = hero;
    S.isMobile = window.innerWidth < 768;
    S.visible = true;

    // Reuse the container already present in the hero template,
    // or create one if the markup ever drops it.
    var container = hero.querySelector('.hero-3d');
    if (!container) {
      container = document.createElement('div');
      container.className = 'hero-3d';
      hero.insertBefore(container, hero.firstChild);
    }
    S.containerEl = container;

    try {
      S.observer.observe(hero);
      buildScene();
    } catch (e) {
      dispose();
    }
  }

  /* ---------------------------------------------------------- build -- */
  function buildScene() {
    var w = S.containerEl.clientWidth || S.heroEl.clientWidth || 800;
    var h = S.containerEl.clientHeight || S.heroEl.clientHeight || 400;

    // Renderer
    S.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !S.isMobile,
      powerPreference: 'low-power',
    });
    S.renderer.setSize(w, h);
    S.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PX_CAP));
    S.renderer.setClearColor(0x000000, 0);
    S.containerEl.appendChild(S.renderer.domElement);

    // Scene + camera
    S.scene = new THREE.Scene();
    S.camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    S.camera.position.set(0, 0.3, 7.5);

    // Lighting — warm, editorial
    var ambient = new THREE.AmbientLight(COL_BG, 0.55);
    S.scene.add(ambient);

    var key = new THREE.DirectionalLight(COL_GOLD, 0.75);
    key.position.set(4, 5, 6);
    S.scene.add(key);

    var fill = new THREE.DirectionalLight(COL_CHAMP, 0.3);
    fill.position.set(-5, -2, 4);
    S.scene.add(fill);

    // Materials
    var goldMat = new THREE.MeshStandardMaterial({
      color: COL_GOLD, metalness: 0.45, roughness: 0.32,
      transparent: true, opacity: 0.72,
    });
    var creamMat = new THREE.MeshStandardMaterial({
      color: COL_CREAM, metalness: 0.12, roughness: 0.52,
      transparent: true, opacity: 0.62,
    });
    var deepMat = new THREE.MeshStandardMaterial({
      color: COL_ESP, metalness: 0.5, roughness: 0.28,
      transparent: true, opacity: 0.18,
    });
    var ringMat = new THREE.MeshBasicMaterial({
      color: COL_GOLD, transparent: true, opacity: 0.28,
    });

    var detail = S.isMobile ? 24 : 48;

    // --- Central sphere
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1.05, detail, detail), goldMat.clone());
    sphere.position.set(0, 0.15, 0);
    S.scene.add(sphere);
    S.objects.push({
      mesh: sphere, bx: 0, by: 0.15, bz: 0,
      rx: 0.003, ry: 0.004, px: 0.4, py: 0.3, floatA: 0.08, floatF: 0.5,
    });

    // --- Torus (cream)
    var torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.65, 0.2, S.isMobile ? 16 : 32, detail),
      creamMat.clone()
    );
    torus.position.set(2.6, -0.55, -1);
    torus.rotation.set(0.45, 0.85, 0);
    S.scene.add(torus);
    S.objects.push({
      mesh: torus, bx: 2.6, by: -0.55, bz: -1,
      rx: 0.005, ry: 0.006, px: 0.55, py: 0.4, floatA: 0.1, floatF: 0.35,
    });

    // --- Octahedron (deep / subtle)
    var octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.55, 0), deepMat.clone());
    octa.position.set(-2.4, 0.75, -0.5);
    S.scene.add(octa);
    S.objects.push({
      mesh: octa, bx: -2.4, by: 0.75, bz: -0.5,
      rx: 0.007, ry: 0.005, px: 0.5, py: 0.35, floatA: 0.07, floatF: 0.42,
    });

    if (!S.isMobile) {
      // --- Torus knot (smaller, translucent gold)
      var knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.4, 0.13, 80, 12, 2, 3),
        goldMat.clone()
      );
      knot.material.opacity = 0.45;
      knot.position.set(-1.7, -1.1, -1.4);
      S.scene.add(knot);
      S.objects.push({
        mesh: knot, bx: -1.7, by: -1.1, bz: -1.4,
        rx: 0.004, ry: 0.005, px: 0.35, py: 0.25, floatA: 0.06, floatF: 0.28,
      });

      // --- Wire ring (large, orbit feel)
      var ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.35, 0.035, 16, 64),
        ringMat.clone()
      );
      ring.position.set(1.4, 0.95, -2);
      ring.rotation.set(1.15, 0.35, 0);
      S.scene.add(ring);
      S.objects.push({
        mesh: ring, bx: 1.4, by: 0.95, bz: -2,
        rx: 0.002, ry: 0.0015, px: 0.65, py: 0.5, floatA: 0.04, floatF: 0.2,
      });
    }

    // First paint
    renderFrame();

    // Start loop (or single render for reduced-motion)
    if (!S.reducedMotion) loop();
  }

  /* ----------------------------------------------------------- render -- */
  function renderFrame() {
    if (!S.renderer || !S.scene || !S.camera) return;
    S.renderer.render(S.scene, S.camera);
  }

  /* ----------------------------------------------------------- loop ---- */
  function loop() {
    if (S.disposed) return;
    S.raf = requestAnimationFrame(loop);
    if (!S.visible) return;

    var t = Date.now() * 0.001;

    // Smooth mouse follow (lerp)
    S.mouse.x += (S.mouseTarget.x - S.mouse.x) * 0.045;
    S.mouse.y += (S.mouseTarget.y - S.mouse.y) * 0.045;

    for (var i = 0; i < S.objects.length; i++) {
      var o = S.objects[i];
      var m = o.mesh;

      // Rotation
      m.rotation.x += o.rx;
      m.rotation.y += o.ry;

      // Float oscillation + parallax
      m.position.x = o.bx + Math.cos(t * 0.3 + i * 0.9) * o.floatA * 0.5 + S.mouse.x * o.px * PARALLAX_MULT;
      m.position.y = o.by + Math.sin(t * o.floatF + i * 1.2) * o.floatA + S.mouse.y * o.py * PARALLAX_MULT;
    }

    renderFrame();
  }

  /* --------------------------------------------------------- mouse ---- */
  function onMouseMove(e) {
    if (S.disposed) return;
    S.mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
    S.mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }

  /* --------------------------------------------------------- resize --- */
  function onResize() {
    if (S.disposed || !S.renderer || !S.camera || !S.containerEl) return;
    var w = S.containerEl.clientWidth;
    var h = S.containerEl.clientHeight;
    if (w === S.lastW && h === S.lastH) return;
    S.lastW = w;
    S.lastH = h;
    S.camera.aspect = w / h;
    S.camera.updateProjectionMatrix();
    S.renderer.setSize(w, h);
  }

  /* ------------------------------------------------------- teardown --- */
  function disposeScene() {
    if (S.raf) { cancelAnimationFrame(S.raf); S.raf = null; }
    if (S.observer && S.heroEl) { try { S.observer.unobserve(S.heroEl); } catch (e) {} }

    if (S.renderer) {
      try { S.renderer.dispose(); } catch (e) {}
      if (S.renderer.domElement && S.renderer.domElement.parentNode) {
        S.renderer.domElement.parentNode.removeChild(S.renderer.domElement);
      }
      S.renderer = null;
    }

    if (S.scene) {
      S.scene.traverse(function (child) {
        if (child.geometry) { try { child.geometry.dispose(); } catch (e) {} }
        if (child.material) {
          var mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach(function (mt) { try { mt.dispose(); } catch (e) {} });
        }
      });
      S.scene = null;
    }

    S.camera = null;
    S.objects = [];
    S.heroEl = null;

    if (S.containerEl && S.containerEl.parentNode) {
      S.containerEl.parentNode.removeChild(S.containerEl);
    }
    S.containerEl = null;
  }

  function dispose() {
    S.disposed = true;
    if (S.observer) { S.observer.disconnect(); S.observer = null; }
    if (S.mouseHandler) { document.removeEventListener('mousemove', S.mouseHandler); S.mouseHandler = null; }
    if (S.resizeHandler) { window.removeEventListener('resize', S.resizeHandler); S.resizeHandler = null; }
    disposeScene();
  }

  /* ------------------------------------------------------- public API -- */
  window.Auresta3D = { sync: sync, dispose: dispose };

  // Auto-init when script loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
