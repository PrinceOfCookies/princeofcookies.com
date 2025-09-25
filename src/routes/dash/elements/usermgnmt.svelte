<script>
  export let title = "User Management";

  let searchTerm = "";
  let users = [
    { id: 1, name: "Alice", mspm: 5 },
    { id: 2, name: "Bob", timedOut: true, mspm: 8 },
    { id: 3, name: "Charlie", mspm: 3 },
    { id: 4, name: "David", mspm: 6 },
    { id: 5, name: "Eve" },
    { id: 6, name: "Frank" },
    { id: 7, name: "Grace" },
    { id: 8, name: "Heidi" },
    { id: 9, name: "Ivan" },
    { id: 10, name: "Judy", timedOut: true },
    { id: 11, name: "Kate", mspm: 4 },
    { id: 12, name: "Leo", mspm: 7 },
  ];

  let showTimeoutPopup = false;
  let showReasonPopup = false;
  let popupUser = null;
  let popupAction = "";
  let popupReason = "";
  let timeoutDuration = 1;

  const INCREMENT = 10;
  let visibleCount = INCREMENT;

  $: filteredUsers = users
    .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (b.mspm || 0) - (a.mspm || 0));

  $: visibleUsers = filteredUsers.slice(0, visibleCount);

  function loadMore() {
    visibleCount += INCREMENT;
  }

  function openTimeoutPopup(user) {
    popupUser = user;
    showTimeoutPopup = true;
  }

  function openReasonPopup(action, user) {
    popupAction = action;
    popupUser = user;
    showReasonPopup = true;
  }

  function closePopup() {
    showTimeoutPopup = false;
    showReasonPopup = false;
    popupUser = null;
    popupReason = "";
    timeoutDuration = 1;
  }

  function confirmTimeout() {
    closePopup();
  }

  function confirmAction() {
    closePopup();
  }
</script>

<section class="usermgnmt">
  <h1 class="title">{title}</h1>

  <div class="container">
    <div class="search-box">
      <input
        type="text"
        placeholder="Search users..."
        bind:value={searchTerm}
      />
    </div>

    <div class="user-list">
      {#each visibleUsers as user (user.id)}
        <div class="user-item">
          <span>{user.name} ({user.mspm || 0})</span>
          <div class="actions">
            <button
              class="action-btn timeout-btn"
              on:click={() => openTimeoutPopup(user)}
            >
              {user.timedOut ? "Untimeout" : "Timeout"}
            </button>
            <button
              class="action-btn ban-btn"
              on:click={() => openReasonPopup("Ban", user)}
            >
              Ban
            </button>
            <button
              class="action-btn kick-btn"
              on:click={() => openReasonPopup("Kick", user)}
            >
              Kick
            </button>
          </div>
        </div>
      {/each}

      {#if visibleCount < filteredUsers.length}
        <button class="load-more-btn" on:click={loadMore}>
          Load more
        </button>
      {/if}

      {#if showTimeoutPopup && popupUser}
        <div class="popup-overlay">
          <div class="popup">
            <h2>{popupUser.timedOut ? "Untimeout User" : "Timeout User"}</h2>
            {#if !popupUser.timedOut}
              <label>
                Duration (minutes):
                <input type="number" bind:value={timeoutDuration} min="1" />
              </label>
            {/if}
            <label>
              Reason:
              <input type="text" bind:value={popupReason} />
            </label>
            <div class="popup-actions">
              <button on:click={confirmTimeout}>Confirm</button>
              <button on:click={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      {/if}

      {#if showReasonPopup && popupUser}
        <div class="popup-overlay">
          <div class="popup">
            <h2>{popupAction} User</h2>
            <label>
              Reason:
              <input type="text" bind:value={popupReason} />
            </label>
            <div class="popup-actions">
              <button on:click={confirmAction}>Confirm</button>
              <button on:click={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .usermgnmt {
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

  .container {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 40%;
    background: #222;
    border-radius: 8px;
    box-shadow: 0 2px 8px #0004;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .search-box {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-box input {
    flex: 1;
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    background: #333;
    color: #fff;
  }

  .user-list {
    max-height: 500px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    scrollbar-width: none; /* Firefox */
  }

  .user-list::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
   }

  .user-item {
    background: #333;
    color: #fff;
    padding: 0.75rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  .action-btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .timeout-btn {
    background: #ff9800;
    color: #fff;
  }

  .ban-btn {
    background: #f44336;
    color: #fff;
  }

  .kick-btn {
    background: #9c27b0;
    color: #fff;
  }

  .popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup {
    background: #222;
    padding: 1.5rem;
    border-radius: 8px;
    width: 320px;
    max-width: 90%;
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 4px 12px #0007;
  }

  .popup h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .popup input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    background: #333;
    color: #fff;
  }

  .popup-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .popup-actions button {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  .popup-actions button:first-child {
    background: #4caf50;
    color: #fff;
  }

  .popup-actions button:last-child {
    background: #f44336;
    color: #fff;
  }
</style>
