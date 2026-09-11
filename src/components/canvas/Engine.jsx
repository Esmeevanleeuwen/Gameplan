import { useState } from 'react';
import { routeSignal } from '../../../js/app.js';

const scenarios = [
  { id: 'steady-state', name: 'Steady state', description: 'Balanced conditions for a healthy baseline.', friction: 18, handoff: 68 },
  { id: 'high-friction', name: 'High friction', description: 'Stress-test intake when consensus is breaking down.', friction: 82, handoff: 32 },
  { id: 'autonomous-handoff', name: 'Autonomous handoff', description: 'Explore the transition toward community ownership.', friction: 12, handoff: 92 },
];

export default function Engine({
  friction,
  setFriction,
  handoff,
  setHandoff,
  onReset,
  operationalState,
  onExperiment,
}) {
  const [signal, setSignal] = useState('A new community need is emerging');
  const [routing, setRouting] = useState(null);

  const runSignal = () => {
    const result = routeSignal(signal, operationalState);
    setRouting(result);
    onExperiment?.('SIGNAL_ROUTED', { signal: result.signal, activeState: result.activeState });
  };

  const applyScenario = (scenario) => {
    setFriction(scenario.friction);
    setHandoff(scenario.handoff);
    onExperiment?.('SCENARIO_APPLIED', { scenario: scenario.name, friction: scenario.friction, handoff: scenario.handoff });
  };

  return <aside className="panel">
    <div className="panel-title">System Invariants</div>
    <div className="inspector-card">
      <div className="stat-row"><span>U-01 Reduction</span><span className="status-emerald">ACTIVE</span></div>
      <div className="stat-row"><span>U-05 State Test</span><span className="status-emerald">PASSED</span></div>
      <div className="stat-row"><span>U-06 Reality Check</span><span className="status-cyan">100% SYNC</span></div>
    </div>
    <div className="panel-title">Dynamic Ecosystem Modulators</div>
    <div className="logic-panel">
      <h2 className="logic-panel__title">Reference Documents</h2>
      <a className="reference-link" href={`${import.meta.env.BASE_URL}reference/philosophy-logic.pdf`} target="_blank" rel="noreferrer">
        Philosophy logic
      </a>
      <a className="reference-link" href={`${import.meta.env.BASE_URL}reference/operational-logic.pdf`} target="_blank" rel="noreferrer">
        Operational logic
      </a>
    </div>
    <div className="logic-panel">
      <h2 className="logic-panel__title">Operational Logic</h2>
      <div className="logic-metric">
        <span>Active State</span>
        <span className="logic-metric__value">{operationalState.state}</span>
      </div>
      <div className="logic-progress" aria-label={`Community handoff ${handoff}%`}>
        <div className="logic-progress__fill" style={{ width: `${handoff}%` }} />
      </div>
    </div>
    <div className="control-group">
      <label htmlFor="friction">Systemic Friction Level: <span>{friction}%</span></label>
      <input id="friction" type="range" min="0" max="100" value={friction} onChange={(event) => setFriction(event.target.value)} />
    </div>
    <div className="control-group">
      <label htmlFor="handoff">Community Handoff Delegation: <span>{handoff}%</span></label>
      <input id="handoff" type="range" min="0" max="100" value={handoff} onChange={(event) => setHandoff(event.target.value)} />
    </div>
    <div className="logic-panel scenario-lab">
      <div className="logic-panel__heading">
        <h2 className="logic-panel__title">Scenario Lab</h2>
        <span className="lab-badge">SIMULATED</span>
      </div>
      <p className="muted-text scenario-help">Load a repeatable condition set, then route a signal through the current state.</p>
      <div className="scenario-list">
        {scenarios.map((scenario) => (
          <button className="scenario-button" key={scenario.id} onClick={() => applyScenario(scenario)}>
            <span>{scenario.name}</span>
            <small>{scenario.description}</small>
          </button>
        ))}
      </div>
      <label htmlFor="signal">Test signal</label>
      <textarea id="signal" rows="2" value={signal} onChange={(event) => setSignal(event.target.value)} />
      <button className="btn-action" onClick={runSignal} disabled={!signal.trim()}>Route signal</button>
      {routing && (
        <div className="routing-result" role="status">
          <div className="logic-metric"><span>Routed state</span><strong>{routing.activeState}</strong></div>
          {routing.routes.map((route) => <div className="route-row" key={route.platform}><span>{route.platform}</span><span>{route.action}</span></div>)}
        </div>
      )}
    </div>
    <button className="btn-action" onClick={onReset}>Trigger 14-Day State Reset</button>
  </aside>;
}
