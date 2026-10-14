import { ThreeSceneManager } from './threeScene.js';
import { SpatialScrollController } from './stageController.js';
import { WorkflowSimulator } from './simulator.js';
import { ModalManager } from './modals.js';
import { GTMCalculator } from './gtmCalculator.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Continuous 3D Constellation
  let threeScene;
  try {
    threeScene = new ThreeSceneManager('webgl-canvas');
  } catch (err) {
    console.warn('WebGL initialization failed, falling back to clean CSS backdrop:', err);
  }

  // 2. Initialize Spatial Scroll & GSAP ScrollTrigger Controller
  const scrollController = new SpatialScrollController(threeScene);

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
