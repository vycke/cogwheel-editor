import type { MachineStore } from '$lib/helpers/stateMachineStore';

export type VisibilityStore = MachineStore<Record<string, never>>;
