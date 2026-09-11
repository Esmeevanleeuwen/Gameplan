import { useState } from 'react';
import { useSystem } from '../../context/SystemContext';

export default function SuiteDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState('toggles');
  const { featureFlags, toggleFeature, telemetryLogs } = useSystem();

  return (
    <>
      <button className="suite-trigger" onClick={() => setIsOpen((open) => !open)}>
        Suite Drawer
      </button>
      <aside className={`suite-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="drawer-header">
          <span>SYSTEM SUITE ENGINE</span>
          <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close suite drawer">X</button>
        </div>
        <div className="drawer-nav">
          <button className={`sub-tab ${activeDrawerTab === 'toggles' ? 'active' : ''}`} onClick={() => setActiveDrawerTab('toggles')}>5.1 Toggles</button>
          <button className={`sub-tab ${activeDrawerTab === 'telemetry' ? 'active' : ''}`} onClick={() => setActiveDrawerTab('telemetry')}>5.4 Telemetry</button>
        </div>
        <div className="drawer-body">
          {activeDrawerTab === 'toggles' && (
            <div className="drawer-pane">
              <div className="panel-title">Feature Module Visibility</div>
              {[
                ['playground', 'Live Engine Playground'],
                ['erdSchema', 'ERD Schema Visualizer'],
                ['decayEngine', 'Decay Engine'],
              ].map(([key, label]) => (
                <label className="toggle-row" key={key}>
                  <span>{label}</span>
                  <input type="checkbox" checked={featureFlags[key]} onChange={() => toggleFeature(key)} />
                </label>
              ))}
            </div>
          )}
          {activeDrawerTab === 'telemetry' && (
            <div className="drawer-pane">
              <div className="panel-title">Ambient Observer Stream</div>
              <div className="telemetry-log">
                {telemetryLogs.length === 0 ? <span className="muted-text">No events recorded.</span> : telemetryLogs.map((log) => (
                  <div key={log.id}>[{log.timestamp}] {log.eventType}: {JSON.stringify(log.details)}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
