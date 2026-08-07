import { redirect } from '@sveltejs/kit';
import { dbConfigured, dbInsert, dbSelect, type TeamMemberRow } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	if (!dbConfigured()) return { members: [] as TeamMemberRow[], configured: false };
	const members = await dbSelect<TeamMemberRow>('team_members', 'select=*&order=sort_order.asc');
	return { members, configured: true };
};

export const actions: Actions = {
	create: async () => {
		const row = await dbInsert<TeamMemberRow>('team_members', {
			name: 'New team member',
			role: '',
			bio: '',
			photo_url: '',
			sort_order: 999
		});
		redirect(303, `/admin/staff/${row.id}`);
	}
};
