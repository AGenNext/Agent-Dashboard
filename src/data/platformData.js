export const platformMetrics = [
  { label: 'Active Runs', value: '12', tone: 'good' },
  { label: 'Blocked Runs', value: '2', tone: 'warn' },
  { label: 'Verified Agents', value: '34', tone: 'good' },
  { label: 'Open Approvals', value: '5', tone: 'warn' }
];

export const runtimeRuns = [
  {
    id: 'runtime_run:research_agent_run_001',
    agent: 'research-agent',
    identity: 'agent_identity:research_agent',
    status: 'running',
    policy: 'default_runtime_policy',
    owner: 'runtime',
    startedAt: '2026-05-22T10:00:00Z'
  },
  {
    id: 'runtime_run:security_agent_run_014',
    agent: 'security-agent',
    identity: 'agent_identity:security_agent',
    status: 'blocked',
    policy: 'restricted_runtime_policy',
    owner: 'runtime',
    startedAt: '2026-05-22T10:12:00Z'
  }
];

export const identityRecords = [
  {
    id: 'agent_identity:research_agent',
    subject: 'agent:research-agent',
    did: 'did:web:agents.agennext.dev:research-agent',
    oidcIssuer: 'https://identity.agennext.dev',
    status: 'active'
  },
  {
    id: 'agent_identity:security_agent',
    subject: 'agent:security-agent',
    did: 'did:web:agents.agennext.dev:security-agent',
    oidcIssuer: 'https://identity.agennext.dev',
    status: 'active'
  }
];

export const registryEntries = [
  {
    id: 'registry_entry:research_agent',
    agentId: 'research-agent',
    cardTitle: 'Research Agent',
    lifecycle: 'published',
    capabilities: ['research', 'summarization'],
    identityRef: 'agent_identity:research_agent'
  },
  {
    id: 'registry_entry:security_agent',
    agentId: 'security-agent',
    cardTitle: 'Security Agent',
    lifecycle: 'reviewed',
    capabilities: ['security-review', 'policy-check'],
    identityRef: 'agent_identity:security_agent'
  }
];

export const governanceEvents = [
  {
    id: 'evt_001',
    type: 'runtime_run_created',
    actor: 'runtime',
    message: 'Runtime run created for research-agent',
    at: '2026-05-22T10:00:00Z'
  },
  {
    id: 'evt_002',
    type: 'access_decision',
    actor: 'runtime',
    message: 'Model access allowed by default policy',
    at: '2026-05-22T10:00:03Z'
  },
  {
    id: 'evt_003',
    type: 'runtime_blocked',
    actor: 'runtime',
    message: 'Security agent blocked pending human approval',
    at: '2026-05-22T10:12:45Z'
  }
];

export const accessDecisions = [
  {
    id: 'decision_001',
    run: 'runtime_run:research_agent_run_001',
    resourceType: 'model',
    resource: 'model:gpt-5',
    action: 'invoke',
    decision: 'allow'
  },
  {
    id: 'decision_002',
    run: 'runtime_run:security_agent_run_014',
    resourceType: 'secret',
    resource: 'secret:prod-github-token',
    action: 'read',
    decision: 'require_approval'
  }
];

export const killSwitches = [
  {
    id: 'runtime_kill_switch:global_emergency_stop',
    name: 'Global Emergency Stop',
    scope: 'global',
    active: false
  }
];
