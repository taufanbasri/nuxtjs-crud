<script setup>
import {
  ComboboxLabel,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton
} from "@headlessui/vue";

const authorStore = useAuthorStore()

useAsyncData(() => authorStore.getAll(), {
  initialCache: false
})

const query = ref('')

const getDisplay = (authors) => {
  if (!authors.length) return

  let firstAuthorName = authorStore.authors.find((author) => author._id == authors[0])?.name

  if (authors.length > 1) {
    return `${firstAuthorName} + ${authors.length - 1} more`
  }

  return firstAuthorName
}

const filteredAuthors = computed(() =>
  query.value === ''
    ? authorStore.authors
    : authorStore.authors.filter(
      (author) => {
        return author.name.toLowerCase().includes(query.value.toLowerCase())
      }
    )
)
</script>

<template>
  <Combobox v-slot="{open}" multiple="">
    <div class="relative">
      <ComboboxLabel class="label">Authors</ComboboxLabel>

      <div class="relative">
        <ComboboxInput placeholder="Search here..." class="input" @change="query=$event.target.value"
          :displayValue="getDisplay" />
        <span class="absolute top-2 right-2">
          <ComboboxButton>
            <Icon class="transition-all duration-300" :class="[open?'rotate-180':'']"
              name="fluent:chevron-down-24-regular" size="20" />
          </ComboboxButton>
        </span>
      </div>

      <ComboboxOptions class="absolute w-full bg-white border border-gray-100 rounded-md shadow-lg">
        <div v-if="filteredAuthors.length === 0 && query !== ''"
          class="relative px-2 py-4 text-center text-gray-500 cursor-default select-none">
          No author found!
        </div>

        <ComboboxOption as="template" v-for="author in filteredAuthors" :key="author._id" :value="author._id">
          <li class="px-3 py-2.5 cursor-pointer ui-active:bg-primary-50 ui-selected:bg-primary ui-selected:text-white">
            <span class="block text-sm truncate ui-active:text-primary">
              {{ author.name }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>