import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [
            Discord({
                clientId: process.env.DISCORD_CLIENT_ID,
                clientSecret: process.env.DISCORD_CLIENT_SECRET
            }),
        ],
        secret: process.env.AUTH_SECRET,
        trustHost: true,
        callbacks: {
            async signIn({ user}) {
                if (user.email == process.env.ADMIN_EMAIL) {
                    return true;
                }
                return false;
            }
        }
    }
    return authOptions
})