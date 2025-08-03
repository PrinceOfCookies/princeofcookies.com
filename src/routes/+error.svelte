<script>
  import { goto } from "$app/navigation";
  export let error;
  export let status;

  function goHome() {
    goto("/").then(() => {
      document.title = "Portfolio - PrinceOfCookies";
    });
  }
</script>

<svelte:head>
  <title>Page Not Found</title>
</svelte:head>

<div class="container">
  <div class="box">
    <h1>{status}</h1>
    <p>
      {error?.message ?? "Oops! The page you're looking for doesn't exist."}
    </p>
    <button class="back-btn" on:click={goHome}>Go Back Home</button>
  </div>
</div>

<style>
  body {
    margin: 0;
  }
  .container {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 80vh;
    color: white;
    font-family: "Roboto", sans-serif;
    text-align: center;
    margin-left: 11vh;
  }
  .box {
    max-width: 100vh;
  }
  h1 {
    font-size: 4rem;
    margin: 0;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  .back-btn {
    padding: 10px 20px;
    font-size: 1rem;
    color: #0c0c0c;
    background-color: #00aaff;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.3s;
    border: none;
    cursor: pointer;
  }
  .back-btn:hover {
    background-color: #0088cc;
  }
</style>
