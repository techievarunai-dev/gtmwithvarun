import { injectSpeedInsights } from '@vercel/speed-insights';

/**
 * Initializes Vercel Speed Insights for Real-User Monitoring (RUM) of Core Web Vitals
 * (LCP, INP, CLS, FCP, TTFB). Guarded against duplicate initialization and SSR.
 */
let isInitialized = false;

export function initSpeedInsights() {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  try {
    injectSpeedInsights({
      debug: false
    });
  } catch (err) {
    console.warn('[Speed Insights] Initialization notice:', err);
  }
}
