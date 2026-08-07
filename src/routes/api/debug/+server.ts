// Retired diagnostics endpoint — safe to delete this folder entirely
// (src/routes/api/debug/). Kept as a stub only because it once existed.
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = () => {
	error(404, 'Not found');
};
