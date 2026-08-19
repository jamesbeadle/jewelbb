/**
 * Tiny signed-cookie session for the admin area. No dependencies —
 * HMAC-SHA256 via Web Crypto (available in Node 18+ and on Vercel).
 */
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

export const ADMIN_COOKIE = 'jb_admin';
const SESSION_HOURS = 8;

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
	const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
	let s = '';
	for (const b of arr) s += String.fromCharCode(b);
	return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmac(payload: string, secret: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		'raw',
		enc.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
	return b64url(sig);
}

// Env values are trimmed to survive stray whitespace/newlines from
// copy-pasting into dashboard fields.
function envTrim(v: string | undefined): string {
	return (v ?? '').trim();
}

function secret(): string {
	// Fall back to the admin password so the site works with minimal config;
	// set ADMIN_SESSION_SECRET for stricter separation.
	return envTrim(env.ADMIN_SESSION_SECRET) || envTrim(env.ADMIN_PASSWORD);
}

export function credentialsConfigured(): boolean {
	return Boolean(envTrim(env.ADMIN_USERNAME) && envTrim(env.ADMIN_PASSWORD));
}

export function checkCredentials(username: string, password: string): boolean {
	if (!credentialsConfigured()) return false;
	return (
		username.trim() === envTrim(env.ADMIN_USERNAME) && password === envTrim(env.ADMIN_PASSWORD)
	);
}

export async function createSessionToken(): Promise<string> {
	const payload = String(Date.now() + SESSION_HOURS * 3600_000);
	return `${payload}.${await hmac(payload, secret())}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
	if (!token || !secret()) return false;
	const [payload, sig] = token.split('.');
	if (!payload || !sig) return false;
	if (Number(payload) < Date.now()) return false;
	return (await hmac(payload, secret())) === sig;
}

/* ---- Print tokens ---------------------------------------------------
 * Short-lived, single-purpose tokens that let the headless PDF browser
 * (and only it) open /brochure/print/[id] for a draft brochure without
 * an admin cookie. Signed with the same secret as the session cookie.
 */
const PRINT_TOKEN_MINUTES = 10;

export async function createPrintToken(brochureId: string): Promise<string> {
	const expires = String(Date.now() + PRINT_TOKEN_MINUTES * 60_000);
	const sig = await hmac(`print.${brochureId}.${expires}`, secret());
	return `${expires}.${sig}`;
}

export async function verifyPrintToken(
	brochureId: string,
	token: string | null | undefined
): Promise<boolean> {
	if (!token || !secret()) return false;
	const [expires, sig] = token.split('.');
	if (!expires || !sig) return false;
	if (Number(expires) < Date.now()) return false;
	return (await hmac(`print.${brochureId}.${expires}`, secret())) === sig;
}

export function setSessionCookie(cookies: Cookies, token: string): void {
	cookies.set(ADMIN_COOKIE, token, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: !dev, // Safari drops Secure cookies on http://localhost

		maxAge: SESSION_HOURS * 3600
	});
}

export function clearSessionCookie(cookies: Cookies): void {
	cookies.delete(ADMIN_COOKIE, { path: '/' });
}
