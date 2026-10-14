import { initSpeedInsights } from './speedInsights.js';
import { SpatialScrollController } from './stageController.js';
import { WorkflowSimulator } from './simulator.js';
import { ModalManager } from './modals.js';
import { GTMCalculator } from './gtmCalculator.js';

// 1. Initialize Real-User Performance Monitoring (Vercel Speed Insights)
initSpeedInsights();

document.addEventListener('DOMContentLoaded', () => {
  // 2. Initialize Spatial Scroll & GSAP ScrollTrigger Controller immediately
  const scrollController = new SpatialScrollController(null);

  // 3. Defer 3D Scene Loading to First Interaction or Idle Time (Protects Main Thread & TBT)
  let sceneLoaded = false;
  const init3DScene = () => {
    if (sceneLoaded) return;
    sceneLoaded = true;
    ['scroll', 'mousemove', 'touchstart', 'pointerdown'].forEach(evt => {
      window.removeEventListener(evt, init3DScene);
    });

    import('./threeScene.js')
      .then(({ ThreeSceneManager }) => {
        try {
          const threeScene = new ThreeSceneManager('webgl-canvas');
          scrollController.threeScene = threeScene;
          // Sync current scroll position if user has already scrolled
          if (threeScene && scrollController.currentScrollProgress !== undefined) {
            threeScene.setScrollProgress(scrollController.currentScrollProgress);
          }
        } catch (err) {
          console.warn('WebGL initialization failed, falling back to clean CSS backdrop:', err);
        }
      })
      .catch(err => console.warn('Could not load 3D scene module:', err));
  };

  ['scroll', 'mousemove', 'touchstart', 'pointerdown'].forEach(evt => {
    window.addEventListener(evt, init3DScene, { passive: true, once: true });
  });

  if ('requestIdleCallback' in window) {
    requestIdleCallback(init3DScene, { timeout: 3000 });
  } else {
    setTimeout(init3DScene, 3000);
  }

  // 3. Initialize Interactive Ingress Workflow Simulator
  const workflowSimulator = new WorkflowSimulator();

  // 4. Initialize Modals System (Walkthrough Video Player)
  const modalManager = new ModalManager();

  // 5. Initialize Interactive GTM Impact Calculator
  const gtmCalculator = new GTMCalculator();

  // Console Telemetry Easter Egg
  console.log(
    '%c[GTM_SPATIAL_OS] %cVarun Murugan P %c— Systems Online · 4 Countries · Continuous Spatial Journey',
    'color: #0052ff; font-weight: bold;',
    'color: #0f172a; font-weight: bold;',
    'color: #64748b;'
  );
});
