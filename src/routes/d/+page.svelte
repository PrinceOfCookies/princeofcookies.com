<script>
    import { goto } from '$app/navigation';

    async function logout() {
        await fetch('/api/v1/user/logout', {
            method: 'POST',
            body: JSON.stringify({}),
        });

        goto('/');
    }
</script>

<button on:click={logout}>Logout</button>