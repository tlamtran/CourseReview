import axios from "axios";

const majors = [
  {
    basic: [

    ],
    major: [

    ]
  }
]

const minors = [

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

const courseServices = { getCourses };

export default courseServices;
