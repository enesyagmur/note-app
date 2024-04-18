import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [hata, setHata] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHata(null);

    //kayıt için bilgileri db ye yolluyoruz
    const response = await fetch("/api/kullanici/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, parola }),
    });

    //yanıtı json a çeviriyoruz
    const responseJson = await response.json();

    if (!response.ok) {
      //başarısız ise hata gösteriyoruz
      setHata(responseJson.hata);
    }

    if (response.ok) {
      //başarılı ise, kullanıcıyı localestorage a ekleyip home a yönlendiriyoruz
      localStorage.setItem("kullanici", JSON.stringify(responseJson));
      navigate("/");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Üye Ol</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />

      <label>Parola:</label>
      <input type="password" onChange={(e) => setParola(e.target.value)} />

      <button type="submit">Üye Ol</button>
      {hata && <div className="error">{hata}</div>}
    </form>
  );
};

export default Signup;
