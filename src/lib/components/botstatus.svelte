<script>
  import { onMount } from 'svelte';
  let botOnline = false;

  async function fetchStatus() {
    const res = await fetch('/api/v1/bot/server-status');
    const data = await res.json();
    botOnline = data.online;
  }

  onMount(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 61000); // poll every 61s
    return () => clearInterval(interval);
  });
</script>

<div class="bot-status">
  <span class="status-dot" style="background: {botOnline ? '#2ecc40' : '#ff4136'}"></span>
  <span class="status-text">{botOnline ? 'Online' : 'Offline'}</span>
</div>

<style>
  .bot-status {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(30, 30, 30, 0.7);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    z-index: 10;
    user-select: none;
  }
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .status-text {
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
  }
</style>
