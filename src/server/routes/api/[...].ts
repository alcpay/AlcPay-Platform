// Catch all routes
import { defineEventHandler, getRequestURL } from 'h3'

export default defineEventHandler(event => {
  const url = getRequestURL(event)
  console.log(url)
  return `The requested route could not be found: ${url}!`
})