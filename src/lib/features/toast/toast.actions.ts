import { toast } from './toast.store';
import type { Ctx } from './toast.store';

export function openToast(label: string, type: Ctx['type'] = 'info'): void {
	toast.send({ type: 'OPENED', payload: { label, type } });
}
