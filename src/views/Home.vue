<template>
  <div class="home">
    <h2 class="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">Star Wars Characters</h2>
    <CharacterTable />
  </div>
</template>

<script>
import CharacterTable from "@/components/CharacterTable.vue";

export default {
  name: "Home",
  components: {
    CharacterTable,
  },
};
</script>
