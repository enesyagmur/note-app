import React, { useEffect, useState } from "react";
import NotDetay from "../components/NotDetay";
import NotForm from "../components/NotForm";
import { useSelector } from "react-redux";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("kullanici"))
  );
  const dbConnectCheck = useSelector((state) => state.connectCheck.connect);

  const [notlar, setNotlar] = useState();

  const fetchNotlar = async () => {
    const response = await fetch("api/notlar");
    const responseJson = await response.json();

    if (response.ok) {
      const newArray = responseJson.filter(
        (not) => not.userEmail === currentUser.email
      );

      setNotlar(newArray);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchNotlar();
    }
  }, []);

  useEffect(() => {
    fetchNotlar();
  }, [dbConnectCheck]);

  return (
    <div className="home">
      <div className="not-form">
        <NotForm />
      </div>
      <div className="notlar">
        {notlar && notlar.map((not) => <NotDetay key={not._id} not={not} />)}
      </div>
    </div>
  );
};

export default Home;
