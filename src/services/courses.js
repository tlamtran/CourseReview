// courses from backend

import axios from 'axios'
const baseUrl = 'backend url'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const courseServices = { getAll }

export default courseServices