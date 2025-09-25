<script>
    import BotStatus from '$lib/components/botstatus.svelte';
    export let title = "Dashboard";
    export let stats = [];

    let botOnline = false;
    let offlineLink = "https://control.novonode.com/server/290e345e";
</script>

<section class="dashboard">
    <h1 class="title">{title}</h1>

    <BotStatus {botOnline} {offlineLink} />
    <div class="stats">
        {#each stats as stat}
            <div class="stat-card">
                <h2>{stat.label}</h2>
                <p>{stat.value}</p>
            </div>
        {/each}
    </div>
</section>


<style>
    .dashboard {
        position: relative;
        padding: 2rem;
        background: #161414c0;
        border-radius: 8px;
        min-height: 100vh;
    }

    .title {
        position: absolute;
        top: 2rem;
        left: 2rem;
        font-size: 2rem;
        font-weight: bold;
        color: #ffffff;
    }

    .stats {
        margin-top: 35%;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .stat-card {
        background: #838080;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        padding: 1.5rem;
        min-width: 160px;
        flex: 1;
        text-align: center;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        border: 1px solid #444242;
    }
    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    }
    .stat-card h2 {
        margin: 0 0 0.75rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #fdfdfd;
    }
    .stat-card p {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 700;
        color: #fdfdfd;
    }
</style>
