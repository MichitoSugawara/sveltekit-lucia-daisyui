/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('$lib/server/lucia').Auth;
	type UserAttributes = import('@prisma/client').AuthUser;
}

declare global {
	namespace App {
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}
	}
}

export {};
