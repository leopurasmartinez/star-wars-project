<template>
  <div class="container my-24 px-6 mx-auto">

    <div v-if="isLoading" class="flex items-center justify-center">
      <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <br>
    </div>
    <h2 v-if="isLoading" class="font-medium leading-tight text-4xl mt-2 mb-2">Loading...</h2>

    <div v-if="!isLoading" class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full" v-if="people.length > 0">
              <thead class="bg-white border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    Name
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    Birth Year
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
                    Gender
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(person, index) in people" :key="index" class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                  @click="viewPersonData(person.url)"
                >
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ person.name }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ person.birth_year }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ person.gender }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoading" class="flex justify-center">
      <nav>
        <ul class="flex list-style-none">
          <li class="page-item" v-if="currentPage > 1"><a @click="getPeople(previousPageUrl, 'decrease')"
            class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#" tabindex="-1">Previous</a>
          </li>

          <li class="page-item active px-2" v-if="currentPage > 0"><a
            class="page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
            href="#">{{ currentPage }} <span class="sr-only">(current)</span></a>
          </li>

          <li class="page-item" v-if="nextPageUrl"><a @click="getPeople(nextPageUrl, 'increase')"
            class="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href="#">Next</a>
          </li>
        </ul>
      </nav>

    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useStore } from "vuex";
  import { utils } from "@/helpers/toast";
  import router from "@/router";

  let people = ref([])
  const peopleCount = ref(0)
  const API_URL = 'https://swapi.dev/api/'
  const isLoading = ref(false)
  const currentPage = ref(1)
  const nextPageUrl = ref('')
  const previousPageUrl = ref('')
  const store = useStore();

  async function getPeople(api, pageMovement) {
    try {
      isLoading.value = true
      let url = `${API_URL}${'people'}`
      if (api) {
        url = api
      }
      const response = await (await fetch(url)).json()
      setPeopleData(response)
      if (pageMovement) {
        if (pageMovement == 'increase') {
          currentPage.value++
        } else {
          currentPage.value--
        }
      }
    } catch (error) {
      utils.showToast('An error occurred trying to retrieve data')
    }
  }

  async function viewPersonData(url) {
    try {
      const response = await (await fetch(url)).json()
      store.commit('setPersonData', response);
      router.push({ name: 'About' });
    } catch (error) {
      utils.showToast('An error occurred trying to retrieve data')
    }
  }

  function setPeopleData(data) {
    try {
      peopleCount.value = data.count
      const results = data.results
      const peopleWithData = []
      results.forEach(result => {
        peopleWithData.push({'name': result.name, 'birth_year': result.birth_year, 'gender': result.gender, 'url': result.url})
      });
      people.value = peopleWithData
      previousPageUrl.value = data.previous
      nextPageUrl.value = data.next
    } catch (error) {
      utils.showToast('An error occurred trying to retrieve data')
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getPeople()
  })

</script>