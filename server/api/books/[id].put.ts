import BookModel from "~~/server/models/Book.model"
import { BookSchema } from "~~/server/validation"

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const id = event.context.params.id

  let { error } = BookSchema.validate(body, {
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
    await BookModel.findByIdAndUpdate(id, body)

    return {
      message: "Book Updated!"
    }
  } catch (error) {
    throw createError({
      message: error.message
    })
  }
})