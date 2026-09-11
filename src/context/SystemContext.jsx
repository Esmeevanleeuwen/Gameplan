import { createContext, useContext, useState } from 'react';

const SystemContext = createContext(null);

export function SystemProvider({ children }) {
  const [friction, setFriction] = useState(18);
  const [handoff, setHandoff] = useState(68);
  const [activeTab, setActiveTab] = useState('wireframe');
  const [featureFlags, setFeatureFlags] = useState({
    playground: true,
    erdSchema: true,
    decayEngine: true,
  });
  const [telemetryLogs, setTelemetryLogs] = useState([]);

  const logEvent = (eventType, details) => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      eventType,
      details,
    };
    setTelemetryLogs((previous) => [entry, ...previous]);
  };

  const toggleFeature = (key) => {
    setFeatureFlags((previous) => {
      const updated = { ...previous, [key]: !previous[key] };
      logEvent('FEATURE_TOGGLE', { feature: key, state: updated[key] });
      return updated;
    });
  };

  return (
    <SystemContext.Provider value={{
      friction,
      setFriction,
      handoff,
      setHandoff,
      activeTab,
      setActiveTab,
      featureFlags,
      toggleFeature,
      telemetryLogs,
      logEvent,
    }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used inside a SystemProvider');
  }
  return context;
}
