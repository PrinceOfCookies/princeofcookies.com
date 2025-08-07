// import { redirect } from '@sveltejs/kit';
// import { handle as authenticationHandle } from './auth';
// import { sequence } from '@sveltejs/kit/hooks';

// async function authorizationHandle({ event, resolve }) {
//     if (event.url.pathname.startsWith('/d')) {
//         const session = await event.locals.auth();
//         if (!session) {
//             throw redirect(302, '/auth/signin');
//         }
//     }

//     return resolve(event);
// }

// export const handle = sequence(authenticationHandle, authorizationHandle);

import { fetchSession } from '$lib/server/sessionHandler';
import { redirect } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const sessionID = event.cookies.get('session_id');
    event.locals.user = fetchSession(sessionID);

    if (event.url.pathname.startsWith('/d')) {
        if (!event.locals.user) throw redirect(302, '/');
    }

    return await resolve(event);
})