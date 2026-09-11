const nodes = [
  ['core', 'UNITY CORE', 'Shared Reality Baseline', 'wf-core'],
  ['rick', 'RICK SENSORIUM', 'Sovereign Anchor', 'wf-rick'],
  ['jesus', 'JESUS NODE', 'Friction Reconciliation', 'wf-jesus'],
  ['meridian', 'MERIDIAN', 'Community Endpoint', 'wf-meridian'],
  ['phosphorus', 'PHOSPHORUS', 'Signal Intake / Dept 3', 'wf-phosphorus'],
];

export default function Wireframe({ selection, onInspect }) {
  return <section className="view-pane active" aria-label="System wireframe">
    <div className="wireframe-node-map">
      <svg className="line-canvas" aria-hidden="true">
        <line x1="425" y1="90" x2="170" y2="180" stroke="#1e293b" strokeWidth="2" />
        <line x1="425" y1="90" x2="680" y2="180" stroke="#1e293b" strokeWidth="2" />
        <line x1="425" y1="90" x2="270" y2="340" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
        <line x1="425" y1="90" x2="580" y2="340" stroke="#8a2be2" strokeWidth="2" strokeDasharray="4" />
      </svg>
      {nodes.map(([key, title, sub, className]) => <button key={key} className={`wf-node ${className} ${selection === key ? 'active' : ''}`} onClick={() => onInspect(key)}>
        <span className="title">{title}</span><span className="sub">{sub}</span>
      </button>)}
    </div>
  </section>;
}
