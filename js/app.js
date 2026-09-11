/**
 * Small, framework-independent logic model for the Unity dashboard.
 *
 * The model follows the source documents' operational themes:
 * conditions shape agency, shared reality reduces friction, and actions
 * are routed through a continuously re-evaluated system state.
 */

const DEFAULT_STATE = Object.freeze({
  friction: 18,
  handoff: 68,
  coherence: 0.98,
  state: "systemic_alignment",
});

const STATES = Object.freeze({
  isolatedEgo: "isolated_ego / threat_processing",
  causalSeeking: "causal_seeking / seeking_synthesis",
  systemicAlignment: "systemic_alignment / integrated_node",
  equilibriumAction: "equilibrium_action / core_hive",
});

function clamp(value, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, Number(value) || 0));
}

function evaluateState({ friction, handoff, coherence }) {
  const normalizedFriction = clamp(friction);
  const normalizedHandoff = clamp(handoff);
  const normalizedCoherence = clamp(coherence * 100);

  if (normalizedFriction >= 75 && normalizedCoherence < 30) {
    return STATES.causalSeeking;
  }

  if (normalizedHandoff >= 80 && normalizedCoherence >= 80) {
    return STATES.equilibriumAction;
  }

  return STATES.systemicAlignment;
}

function createOperationalState(overrides = {}) {
  const state = { ...DEFAULT_STATE, ...overrides };
  return {
    ...state,
    friction: clamp(state.friction),
    handoff: clamp(state.handoff),
    coherence: clamp(state.coherence, 0, 1),
    state: evaluateState(state),
  };
}

function routeSignal(signal, state = DEFAULT_STATE) {
  const operationalState = createOperationalState(state);
  return {
    signal: String(signal).trim(),
    activeState: operationalState.state,
    routes: [
      { platform: "Phosphorus", action: "Fact-check baseline claim" },
      { platform: "Civiora", action: "Initiate local civic consensus build" },
    ],
    timestamp: new Date().toISOString(),
  };
}

const UnityOperationalLogic = Object.freeze({
  DEFAULT_STATE,
  STATES,
  clamp,
  createOperationalState,
  evaluateState,
  routeSignal,
});

if (typeof window !== "undefined") {
  window.UnityOperationalLogic = UnityOperationalLogic;
}

export {
  DEFAULT_STATE,
  STATES,
  clamp,
  createOperationalState,
  evaluateState,
  routeSignal,
};
