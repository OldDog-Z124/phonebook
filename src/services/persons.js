import axios from "axios"

const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const url = `${baseUrl}/${id}`

  const request = axios.put(url, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`

  const request = axios.delete(url)
  return request
}

const personsService = {getAll, create, update, deletePerson}

export default personsService