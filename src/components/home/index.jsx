import React from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  return (
    <>
      <div className="text-2xl font-bold pt-14">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <button onClick={() => navigate("/chat")}>Chat</button>
    </>
  );
};

export default Home;
