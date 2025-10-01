<script>
  import { onMount } from 'svelte';

    let currentTab = 'Dash';
    const tabs = ['Dash', 'User Management', 'Logs', 'Config'];

    import Dashboard from './elements/dashboard.svelte';
    import UserManagement from './elements/usermgnmt.svelte';
    let serverMembers = 0
    let bannedMembers = 0
    let commandsUsed = 0 

    async function fetchStats() {
        const res = await fetch('/api/v1/bot/stats');
        const data = await res.json();
        serverMembers = data.users;
        bannedMembers = data.banned;
        commandsUsed = data.commands;
    }

    let stats = [
        { label: 'Guild Users', value: 1200 },
        { label: 'Banned Users', value: 300 },
        { label: 'Commands Used', value: 4500 },
        { label: 'Last vid uploaded', value: 150 }
    ];

    onMount(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 1800000); // poll every 30 minutes
        return () => clearInterval(interval);
    });
</script>

<div class="flex flex-col h-screen">
    <!-- Top navigation -->
    <nav class="w-full bg-neutral-900 text-white flex flex-row justify-center px-8 space-x-4 shadow-lg">
        {#each tabs as tab}
            <button
                class="px-6 py-3 text-lg transition-colors 
                       hover:bg-neutral-700 
                       {currentTab === tab ? 'bg-neutral-800 font-semibold' : ''}"
                on:click={() => currentTab = tab}
            >
                {tab}
            </button>
        {/each}
    </nav>

    <!-- Main content -->
    <main class="flex-1 flex flex-col p-8 bg-neutral-800 overflow-auto" style="height: 1rem;">
        {#if currentTab === 'Dash'}
            <Dashboard {stats} title="Overview" />
        {:else if currentTab === 'User Management'}
            <UserManagement title="User Management" />
            <!-- <h2 class="text-2xl font-semibold mb-2 text-white">User Management</h2>
            <p class="text-neutral-300">Manage your users here.</p> -->
        {:else if currentTab === 'Logs'}
            <h2 class="text-2xl font-semibold mb-2 text-white">Logs</h2>
            <p class="text-neutral-300">View your logs here.</p>
        {:else if currentTab === 'Config'}
            <h2 class="text-2xl font-semibold mb-2 text-white">Config</h2>
            <p class="text-neutral-300">Configure your settings here.</p>
        {/if}
    </main>
</div>
