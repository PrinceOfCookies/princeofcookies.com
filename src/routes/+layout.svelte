<script>
  import favicon from "$lib/assets/favicon.png";
  import Footer from "$lib/components/footer.svelte";

  let { children } = $props();
  import "../app.css";
</script>

<svelte:head>
  <title>Portfolio - PrinceOfCookies</title>
  <meta
    name="description"
    content="PrinceOfCookies - Developer & content creator working with mainly Lua and JavaScript"
  />
  <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
  <!-- <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
  /> -->
</svelte:head>

<div class="page-wrapper">
  <div class="content">
    {@render children?.()}
  </div>

  <Footer />
</div>

<style>
  .page-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .content {
    flex-grow: 1;
  }
</style>
