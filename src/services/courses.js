import axios from "axios";

const major = [
  { name: { en: "Human-Computer Interaction" }, code: "CS-C3120" },
  { name: { en: "Linear Algebra" }, code: "MS-C1342" },
  { name: { en: "Statistical Inference" }, code: "MS-C1620" },
  { name: { en: "Machine Learning" }, code: "CS-C3240" },
  { name: { en: "Theory of Computation" }, code: "CS-C2160" },
  { name: { en: "Artificial Intelligence" }, code: "CS-E4800" },
  { name: { en: "Digital Ethics" }, code: "CS-E5480" },
  { name: { en: "Data Science Project" }, code: "CS-C3250" },
  { name: { en: "Artificial Intelligence" }, code: "CS-E4800" },
  { name: { en: "Principles of Algorithmic Techniques" }, code: "CS-E3190" },
  { name: { en: "Prediction and Time-Series Analysis" }, code: "MS-C2128" },
  { name: { en: "Introduction to Optimization" }, code: "MS-C2105" },
  { name: { en: "Computer Graphics" }, code: "CS-C3100" },
  { name: { en: "Machine Learning: Supervised Methods" }, code: "CS-E4710" },
  { name: { en: "Methods of Data Mining" }, code: "CS-E4650" },
  { name: { en: "Bayesian Data Analysis" }, code: "CS-E5710" },
  { name: { en: "Information Visualization" }, code: "CS-E4840" }
]

const basic = [
  { name: { en: "Differential and Integral Calculus 1" }, code: "MS-A0111" },
  { name: { en: "Matrix Algebra" }, code: "MS-A0001" },
  { name: { en: "First Course in Probability and Statistics" }, code: "MS-A0503" },
  { name: { en: "Foundations of Discrete Mathematics" }, code: "MS-A0402" },
  { name: { en: "Differential and Integral Calculus 2" }, code: "MS-A0211" },
  { name: { en: "Programming 1" }, code: "CS-A1110" },
  { name: { en: "Programming 2" }, code: "CS-A1120" },
  { name: { en: "Programming Studio A" }, code: "CS-C2105" },
  { name: { en: "Data Structures and Algorithms" }, code: "CS-A1140" },
  { name: { en: "Databases" }, code: "CS-A1153" }
]

const minors = [
  { name: { en: "Computer Science (Master level)" }, code: "SCI3068" }
]


const baseUrl =
  "https://course.api.aalto.fi/api/sisu/v1/courseunits?user_key=f0a4cddc2453b213a23b5046572bf415";

const getCourses = async () => {
  const response = await axios.get(baseUrl);
  return response.data.filter(course =>
    (course.code.substring(0, 4).includes("CS") ||
      course.code.substring(0, 4).includes("ELEC")) &&
    course.name.en !== undefined
  );
};

const getBasic = () => {
  return basic
}

const getMajor = () => {
  return major
}

const getMinor = () => {
  return minors
}


const courseServices = { getCourses, getBasic, getMajor, getMinor };

export default courseServices;
