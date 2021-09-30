<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <router-link class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none" to="/">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Whatafoot</span>
      </router-link>


      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/times">Times</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/partidas">Partidas</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  }
};
</script>
