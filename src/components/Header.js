import { useState } from "react";

const Header = ({ text, students }) => {

  const [studentID, setStudentID] = useState(0);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [correctID, setCorrectID] = useState(0)


  const handleLogin = () => {
    console.log("Trying to Login");
    for (let i = 0; i < students.length; i++) {
      if (parseInt(studentID) === students[i]["student_id"]) {
        setLoggedIn(true);
        if (parseInt(correctID) === 0)
          setCorrectID(studentID);
      }
    }
    console.log(correctID);
  }

  function UserGreeting() {
    return <h1>Welcome back {correctID}!</h1>;
  }

  function GuestGreeting() {
    return <h1>Hello Guest!</h1>;
  }

  function Greeting() {
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

  return (
    <div className="header">
      <img
        className="logo"
        src="https://dataguild.otax.fi/wp-content/uploads/sites/44/2020/01/dataguild_logo_raster_128x112_white.png"
      ></img>
      <h1>{text}</h1>
      <button onClick={handleLogin}>
        Login
      </button>
      <input className="login" placeholder={"Student number here..."} onChange={({ target }) => setStudentID(target.value)}/>
      <Greeting/>
    </div>
  );
};

export default Header;
