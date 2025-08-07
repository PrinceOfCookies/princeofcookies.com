import { DISCORD_REDIRECT_URI, DISCORD_OAUTH_CLIENT_ID, DISCORD_OAUTH_CLIENT_SECRET } from '$env/static/private';
import { setSession } from '$lib/server/sessionHandler.js';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';
import axios from 'axios';

export const GET = async ({ url }) => {
    const code = url.searchParams.get('code');

    if (!code) {
        return json({ error: 'Authorization code not provided' }, { status: 400 });
    }

    const FormData = new URLSearchParams({
        client_id: DISCORD_OAUTH_CLIENT_ID,
        client_secret: DISCORD_OAUTH_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: DISCORD_REDIRECT_URI,
    })

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', FormData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        const data = response.data;
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${data.access_token}`,
            },
        })

        const userData = userResponse.data;

        const sessionID = setSession(data, userData);
        return new Response('', {
            status: 307,
            headers: {
                'Set-Cookie': cookie.serialize('session_id', sessionID, {
                    path: '/',
                    httpOnly: true,
                    sameSite: false,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: data.expires_in
                }),
                Location: '/dash'
            },
        })
    } catch (error) {
        return json({ error: 'Failed to exchange authorization code for access token' }, { status: 500 });
    }
}