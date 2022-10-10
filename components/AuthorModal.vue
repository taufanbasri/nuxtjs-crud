<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from "@headlessui/vue";
import { useForm } from "vee-validate";

const authStore = useAuthorStore()

const author = ref({})

const { handleSubmit } = useForm({
  initialValues: author
})

const submitAuthor = handleSubmit(async (values, ctx) => {
  if (!author.value._id) {
    await authStore.create(values.name)

    closeModal()
  } else {
    authStore.update(author.value._id, values.name)

    closeModal()
  }
})

const open = ref(false)
const openModal = (item) => {
  if (item) author.value = JSON.parse(JSON.stringify(item))

  open.value = true
}
const closeModal = () => {
  author.value = {}
  open.value = false
}

defineExpose({
  openModal, closeModal
})
</script>

<template>
  <TransitionRoot :show="open">
    <!-- Dialog -->
    <Dialog as="div" class="relative z-20" @close="closeModal">
      <!-- Dialog Overlay -->
      <TransitionChild enter="duration-200" leave="duration-200" enter-from="opacity-0" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/30 backdrop-blur"></div>
      </TransitionChild>

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex items-center justify-center min-h-full p-4">
          <!-- The actual dialog panel -->
          <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl">
              <div class="flex items-center justify-between">
                <!-- Conditional rendering for text -->
                <DialogTitle class="text-xl font-medium text-gray-700">
                  {{ author._id ? 'Update' : 'Create' }}
                </DialogTitle>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ author._id ? 'Update this author' : 'Create a new author here' }}
              </p>

              <form @submit="submitAuthor" class="mt-5">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="col-span-full">
                    <FormInput v-model="author.name" rules="required" label="Name" type="text" name="name"
                      id="author" />
                  </div>
                </div>

                <!-- Form button -->
                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button @click="closeModal" type="button" class="px-4 text-sm bg-gray-100 py-2.5 rounded-md">
                    Cancel
                  </button>
                  <button type="submit" class="btn">
                    {{ author._id ? 'Update' : 'Create' }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>