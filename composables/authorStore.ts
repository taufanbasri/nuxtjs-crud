import { defineStore } from "pinia";
import { IAuthor } from "~~/types";

export const useAuthorStore = defineStore('author-store', {
  state: () => ({
    authors: [] as IAuthor[],
  }),
  actions: {
    async getAll() {
      try {
        let data = await $fetch<IAuthor[]>('/api/authors')
        this.author = data

        return data as IAuthor[]
      } catch (error) {
        useToast().error(error.message)
      }
    },
    async create(name: string) {
      await $fetch('/api/authors/create', {
        method: 'POST',
        body: {
          name: name
        }
      }).catch((error) => {
        useToast().error(error.data.message)
      }).then(async () => {
        await this.getAll()

        useToast().success('Author Created!')
      })
    },
    async update(id: string, name: string) {
      await $fetch(`/api/authors/${id}`, {
        method: 'PUT',
        body: {
          name: name
        }
      }).catch((error) => {
        useToast().error(error.message)
      }).then(async () => {
        await this.getAll()

        useToast().success('Author updated!')
      })
    },
    async remove(id: string) {
      await $fetch(`/api/authors/${id}`, {
        method: 'DELETE'
      }).catch((error) => {
        useToast().error(error.message)
      }).then(async () => {
        await this.getAll()

        useToast().success('Author updated!')
      })
    }
  }
})