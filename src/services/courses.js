// courses from backend

import axios from "axios";
const baseUrl =
  "https://course.api.aalto.fi/api/sisu/v1/courseunitrealisations?code=CS&limit=30&user_key=f0a4cddc2453b213a23b5046572bf415";

const getCourses = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const courseServices = { getCourses };

export default courseServices;
