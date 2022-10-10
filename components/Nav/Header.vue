<script setup>
const menus = ref([
  {
    name: 'Books',
    link: '/'
  },
  {
    name: 'Authors',
    link: '/authors'
  }
])
</script>

<template>
  <header class="w-full border-b border-r-gray-200 bg-white/50 backdrop-blur">
    <div class="flex items-center justify-between h-20 px-3 mx-auto max-w-7xl">
      <nuxt-link to="/" class="text-xl font-semibold">CRUD</nuxt-link>
      <nav class="flex items-center space-x-2">
        <template v-for="menu in menus" :key="`menuItem${menu.name}`">
          <nuxt-link :to="menu.link"
            class="px-3 py-2 text-sm font-medium text-gray-500 transition-all rounded-lg link hover:text-primary hover:bg-primary-50">
            {{ menu.name }}
          </nuxt-link>
        </template>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.router-link-active.link {
  @apply text-primary bg-primary-50
}
</style>