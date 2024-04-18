import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("kullanici"))
  );
  const [checkUser, setCheckUser] = useState(false);
  const navigate = useNavigate();

  //çıkış
  const logoutFunc = () => {
    //kullanıcıyı locale storage tan siliyoruz ve logine yönlendiriyoruz
    localStorage.removeItem("kullanici");
    navigate("/login");
    setCheckUser(false);
  };

  useEffect(() => {
    if (currentUser) {
      setCheckUser(true);
    } else {
      navigate("/login");
      setCheckUser(false);
    }
  }, []);

  return (
    <header>
      <div className="container">
        <p>Not Defteri</p>

        <nav>
          {checkUser && <p>{currentUser.email}</p>}
          {checkUser && (
            <div>
              <button onClick={logoutFunc}>Çıkış</button>
            </div>
          )}

          {!checkUser && (
            <>
              <Link to="/login">Giriş</Link>
              <Link to="/signup">Üye Ol</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
