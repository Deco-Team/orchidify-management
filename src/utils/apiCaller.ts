import axios, { AxiosError, AxiosResponse } from 'axios'

/**
 * Sends a request to a specified endpoint.
 *
 * @param {string} endpoint - The API endpoint to which the request should be made.
 * @param {string} method - The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [headers={}] - An object containing custom headers for the request. Default is an empty object.
 * @param {object} [params={}] - An object containing URL parameters for the request. Default is an empty object.
 * @param {object} [body={}] - An object containing the request body. Default is an empty object.
 * @returns {Promise} - A Promise that resolves to the response of the HTTP request.
 */
export const callApi = async (
  endpoint: string,
  method: string,
  headers: object = {},
  params: object = {},
  body: object = {}
): Promise<{ response: AxiosResponse | null; error: AxiosError | null }> => {
  let response: AxiosResponse | null = null
  let error: AxiosError | null = null

  try {
    response = await axios({
      url: import.meta.env.VITE_API_URL + endpoint,
      method: method,
      headers: headers,
      params: params,
      data: body
    })
  } catch (err) {
    error = err as AxiosError

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`API ERROR: ${error.response.data}`)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(`API ERROR: ${error.request}`)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(`API ERROR: ${error.message}`)
    }
  }

  return { response, error }
}