import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'


/**
 * Fetches all objects from the server.
 * * @returns {Promise<Object[]>} A promise that resolves to an array of objects from the server.
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

/**
 * Saves a new object to the server and returns the updated object data.
 * If the id is omitted, the server will generate one.
 * * @param {Object} newObject - The data object to be sent to the server.
 * @returns {Promise<Object>} A promise that resolves to the saved object data from the server.
 */
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

/**
 * Updates a specific object on the server by its ID.
 * * @param {string|number} id - The unique identifier of the object to update.
 * @param {Object} newObject - The updated data object.
 * @returns {Promise<Object>} A promise that resolves to the newly updated object data from the server.
 */
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }