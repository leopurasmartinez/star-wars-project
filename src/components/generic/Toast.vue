<template>
  <div
    v-if="store.state.isShowToast"
    :class="color"
    class="
      shadow-lg
      mx-auto
      w-96
      max-w-full
      text-sm
      pointer-events-auto
      bg-clip-padding
      rounded-lg
      block
      mb-3
    "
    id="static-example"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div
      :class="color"
      class="
        flex
        justify-between
        items-center
        py-2
        px-3
        bg-clip-padding
        border-b border-red-500
        rounded-t-lg
      "
    >
      <p class="font-bold text-white flex items-center">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times-circle"
          class="w-4 h-4 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          ></path>
        </svg>
        Error
      </p>
      <div class="flex items-center">
        <button
          @click="store.commit('setShowToast', false)"
          type="button"
          class="
            btn-close btn-close-white
            box-content
            w-4
            h-4
            ml-2
            text-white
            border-none
            rounded-none
            focus:shadow-none focus:outline-none focus:opacity-100
            hover:text-white hover:opacity-75 hover:no-underline
          "
          aria-label="Close"
        >x</button>
      </div>
    </div>
    <div class="p-3 bg-red-600 rounded-b-lg break-words text-white">
      {{ message }}
    </div>
  </div>

</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    color: {
      type: String,
      required: false,
      default: "bg-red-600",
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const showToast = () => {
      store.commit('setShowToast', true)
    };
    onMounted(showToast);
    return {
      store,
    };
  },
};

</script>