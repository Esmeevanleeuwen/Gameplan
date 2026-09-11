export default function Engine({ friction, setFriction, handoff, setHandoff, onReset, operationalState }) {
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
    <button className="btn-action" onClick={onReset}>Trigger 14-Day State Reset</button>
  </aside>;
}
