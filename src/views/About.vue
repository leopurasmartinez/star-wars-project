<template>
  <div class="flex justify-center items-center h-screen">

    <div class="w-2/3 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
    
      <div class="bg-gray-200 text-black text-lg px-6 py-4">{{ store.state.personData.name }}</div>

      <div class="justify-between items-center px-6 py-4">
        <p>Height: {{ store.state.personData.height }}</p>
        <p>Mass: {{ store.state.personData.mass }}</p>
        <p>Hair Color: {{ store.state.personData.hair_color }}</p>
        <p>Skin Color: {{ store.state.personData.skin_color }}</p>
        <p>Eye Color: {{ store.state.personData.eye_color }}</p>
        <p>Birth Year: {{ store.state.personData.birth_year }}</p>
        <p>Gender: {{ store.state.personData.gender }}</p>
      </div>
      
    </div>

  </div>
</template>

<script>
import { useStore } from "vuex";

export default {

  setup() {
    const store = useStore();
    
    return {
      store,
    };
  }
}
</script>
