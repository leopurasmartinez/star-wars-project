<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <Toast
    v-if="store.state.isShowToast"
    :message="message"
  ></Toast>
  <router-view />
</template>

<script>
  import { emitter } from "@/helpers/emitter";
  import { defineAsyncComponent, onMounted, ref } from 'vue';
  import { useStore } from 'vuex';

  export default {
    components: {
      Toast: defineAsyncComponent(() => import('@/components/generic/Toast'))
    },

    setup() {
      const store = useStore();
      const message = ref('');
      const loadToastEvents = () => {
        emitter.on('show-toast', (data) => {
          message.value = data.message;
          store.commit('setShowToast', true);
        });
      }
      onMounted(loadToastEvents);
      return { 
        store, message
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
