const entities = [
  ['unity_facts', 'unity_core_facts', 'PK', [['fact_id', 'UUID', 'erd-pk'], ['baseline_payload', 'JSONB'], ['reality_consensus', 'FLOAT'], ['updated_at', 'TIMESTAMP']]],
  ['entities', 'persistent_entities', 'PK', [['entity_id', 'UUID', 'erd-pk'], ['entity_name', 'VARCHAR'], ['perspective_filter', 'TEXT'], ['sovereign_mode', 'BOOLEAN']]],
  ['endpoints', 'platform_endpoints', 'PK', [['endpoint_id', 'UUID', 'erd-pk'], ['domain_name', 'VARCHAR'], ['delegation_rate', 'FLOAT'], ['status', 'ENUM']]],
  ['node_states', 'node_state_decay', 'FK', [['state_id', 'UUID', 'erd-pk'], ['entity_id', 'UUID', 'erd-fk'], ['ego_density', 'FLOAT'], ['reset_countdown', 'INTERVAL']]],
  ['gateways', 'diagnostic_gateways', 'FK', [['gateway_id', 'UUID', 'erd-pk'], ['typology_class', 'VARCHAR'], ['friction_weight', 'FLOAT'], ['routing_rules', 'JSONB']]],
  ['vectors', 'vector_intake_stream', 'PK', [['vector_id', 'UUID', 'erd-pk'], ['vector_type', 'ENUM'], ['cleansed_signal', 'TEXT'], ['ingested_at', 'TIMESTAMP']]],
];

export default function ERD({ selection, onInspect }) {
  return <section className="view-pane active" aria-label="Database ERD schema"><div className="erd-grid">
    {entities.map(([key, title, type, rows]) => <button key={key} className={`erd-card ${selection === key ? 'active-card' : ''}`} onClick={() => onInspect(key)}>
      <span className="erd-header"><span>{title}</span><span className={type === 'PK' ? 'erd-pk' : 'erd-fk'}>{type}</span></span>
      <span className="erd-body">{rows.map(([name, value, className]) => <span className="erd-row" key={name}><span className={className || ''}>{name}</span><span>{value}</span></span>)}</span>
    </button>)}
  </div></section>;
}
