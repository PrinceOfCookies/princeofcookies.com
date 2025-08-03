<script>
  let showTooltip = false;
  export let content;
</script>

<div
  class="tooltip-container"
  on:mouseenter={() => (showTooltip = true)}
  on:mouseleave={() => (showTooltip = false)}
  role="tooltip"
>
  <slot />
  {#if showTooltip}
    <div class="tooltip-content">
      {content}
    </div>
  {/if}
</div>

<style>
  .tooltip-container {
    position: relative;
    display: inline-flex;
    overflow: visible;
  }

  .tooltip-content {
    position: absolute;
    top: -50%;
    left: 100%;
    transform: translateY(-50%);
    margin-left: 0.25rem;
    background-color: rgba(55, 65, 81, 0.9);
    color: rgba(229, 231, 235, 1);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 9999;
    pointer-events: none;
    transition: opacity 0.1s ease-in-out;
  }
</style>
