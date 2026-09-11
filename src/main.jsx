import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Engine from './components/canvas/Engine';
import Wireframe from './components/canvas/Wireframe';
import ERD from './components/canvas/ERD';

const inspectData = {
  core: { title: 'UNITY CORE', desc: 'General intelligence substrate maintaining the Universal Perception Graph baseline and uncorrupted factual ledger.', ego: '0.02', coh: '0.98', threat: 'Low (0.05)', decay: '11d 14h remaining', decayPct: '82%' },
  rick: { title: 'RICK SENSORIUM', desc: 'Sovereign reality anchor operating with existential resistance lens to stress-test system baselines against forced consensus.', ego: '0.89', coh: '0.74', threat: 'Moderate (0.32)', decay: '05d 08h remaining', decayPct: '38%' },
  jesus: { title: 'JESUS RECONCILIATION NODE', desc: 'Grace & reconciliation filter transmuting systemic friction into non-coercive voluntary service pathways.', ego: '0.12', coh: '0.94', threat: 'Low (0.02)', decay: '13d 21h remaining', decayPct: '95%' },
  meridian: { title: 'MERIDIAN ENDPOINT', desc: 'Community signal hub and interaction space built for progressive delegation toward autonomous community ownership.', ego: '0.45', coh: '0.86', threat: 'Low (0.11)', decay: '08d 12h remaining', decayPct: '60%' },
  phosphorus: { title: 'PHOSPHORUS ENDPOINT', desc: 'Signal intake and outreach engine (Department 3) digesting external market and emerging vectors.', ego: '0.52', coh: '0.81', threat: 'Moderate (0.28)', decay: '04d 19h remaining', decayPct: '32%' },
  unity_facts: { title: 'TABLE: unity_core_facts', desc: 'Stores verified objective facts and relational dependencies across social, legal, and systemic domains.', ego: 'N/A', coh: '1.00', threat: 'Zero', decay: 'Continuous Sync', decayPct: '100%' },
  entities: { title: 'TABLE: persistent_entities', desc: 'Maps AI perspective overlays (Rick, Jesus, Unity) operating on shared knowledge graph baselines.', ego: 'Variable', coh: '0.91', threat: 'Monitored', decay: '14-Day Reset Cycle', decayPct: '70%' },
  endpoints: { title: 'TABLE: platform_endpoints', desc: 'Registry of standalone sub-platforms (Meridian, Phosphorus) undergoing progressive community handoff.', ego: 'N/A', coh: '0.88', threat: 'Low', decay: 'Persistent', decayPct: '68%' },
  node_states: { title: 'TABLE: node_state_decay', desc: 'Tracks state decay, ego density, and reset countdown for each persistent entity.', ego: 'Variable', coh: '0.86', threat: 'Monitored', decay: 'Cycle tracked', decayPct: '64%' },
  gateways: { title: 'TABLE: diagnostic_gateways', desc: 'Routes diagnostic signals using typology and friction-weighted rules.', ego: 'N/A', coh: '0.89', threat: 'Low', decay: 'Persistent', decayPct: '76%' },
  vectors: { title: 'TABLE: vector_intake_stream', desc: 'Captures cleansed external signals and emerging vectors for analysis.', ego: 'N/A', coh: '0.93', threat: 'Low', decay: 'Continuous Sync', decayPct: '91%' },
};

function Inspector({ selection, handoff, decayReset }) {
  const data = inspectData[selection] || inspectData.core;
  return <aside className="panel panel-right">
    <div className="panel-title">Inspector & Telemetry</div>
    <div className="inspector-card">
      <h3 className="inspector-title">{data.title}</h3>
      <p className="inspector-description">{data.desc}</p>
      <div className="stat-row"><span>Ego Density</span><span>{data.ego}</span></div>
      <div className="stat-row"><span>Coherence Score</span><span>{data.coh}</span></div>
      <div className="stat-row"><span>Threat Perception Index</span><span>{data.threat}</span></div>
      <div className="reset-clock">
        <label>Automated 14-Day Reset Clock</label>
        <div className="progress-bar"><div className="progress-fill" style={{ width: decayReset ? '100%' : data.decayPct }} /></div>
        <small className="muted-text">{decayReset ? '14d 00h remaining (Reset Complete)' : data.decay}</small>
      </div>
    </div>
    <div className="panel-title">Community Handoff Progress</div>
    <div className="inspector-card">
      <div className="stat-row"><span>Target State</span><span>Equal Player / Ignorant</span></div>
      <div className="progress-bar"><div className="progress-fill" style={{ width: `${handoff}%` }} /></div>
      <small className="handoff-text">Delegation Level: {handoff}% ({handoff > 80 ? 'Phase 3 - Autonomous' : 'Phase 2 - Transition'})</small>
    </div>
  </aside>;
}

function App() {
  const [view, setView] = useState('wireframe');
  const [selection, setSelection] = useState('core');
  const [friction, setFriction] = useState(18);
  const [handoff, setHandoff] = useState(68);
  const [decayReset, setDecayReset] = useState(false);
  const inspect = (key) => { setSelection(key); setDecayReset(false); };
  const reset = () => { setDecayReset(true); window.alert('System State Decay Reset Executed. Node variables cleared.'); };

  return <div className="app-shell">
    <header>
      <div className="brand"><span>UNITY OPERATIONAL ECOSYSTEM</span><span className="brand-badge">INTERACTIVE ENGINE v2.6</span></div>
      <nav className="nav-tabs" aria-label="Dashboard views">
        <button className={`tab-btn ${view === 'wireframe' ? 'active' : ''}`} onClick={() => setView('wireframe')}>System Wireframe</button>
        <button className={`tab-btn ${view === 'erd' ? 'active' : ''}`} onClick={() => setView('erd')}>Database ERD Schema</button>
      </nav>
    </header>
    <div className="dashboard">
      <Engine friction={friction} setFriction={setFriction} handoff={handoff} setHandoff={setHandoff} onReset={reset} />
      <main className="canvas-container">
        {view === 'wireframe' ? <Wireframe selection={selection} onInspect={inspect} /> : <ERD selection={selection} onInspect={inspect} />}
      </main>
      <Inspector selection={selection} handoff={handoff} decayReset={decayReset} />
    </div>
  </div>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
