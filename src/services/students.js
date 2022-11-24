import axios from "axios";
const baseUrl = "http://localhost:3001/verified";

const getStudents = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const studentServices = { getStudents }

export default studentServices