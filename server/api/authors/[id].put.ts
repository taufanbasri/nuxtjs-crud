import AuthorModel from "~~/server/models/Author.model"
import { AuthorSchema } from "~~/server/validation"

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const id = event.context.params.id

  let { error } = AuthorSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true
  })

  if (error) {
    throw createError({
      message: error.message.replace(/"/g, ""),
      statusCode: 400,
      fatal: false
    })
  }

  try {
    await AuthorModel.findByIdAndUpdate(id, body)

    return {
      message: "Author Updated!"
    }
  } catch (error) {
    throw createError({
      message: error.message
    })
  }
})