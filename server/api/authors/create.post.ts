import AuthorModel from "~~/server/models/Author.model"
import { AuthorSchema } from "~~/server/validation"

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  let { error } = AuthorSchema.validate(body)

  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false
    })
  }

  try {
    await AuthorModel.create(body)

    return {
      message: 'Author Created!'
    }
  } catch (error) {
    throw createError({
      message: error.message
    })
  }
})