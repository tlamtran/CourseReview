import axios from 'axios'
const baseUrl = 'http://localhost:3001/reviews'

const getReview = async (code) => {
  const response = await axios.get(`${baseUrl}/${code}`)
  return response.data
};

const create = async newReview => {
  const response = await axios.post(baseUrl, newReview)
  return response.data
}

const update = async (id, updated) => {
  const response = await axios.put(`${baseUrl}/${id}`, updated)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const reviewServices = { getReview, create, update, remove };

export default reviewServices;
