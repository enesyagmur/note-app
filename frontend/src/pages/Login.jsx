import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");
  const [hata, setHata] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHata(null);

    //kullanıcı bilgilerini db ye gönderiyoruz
    const response = await fetch("/api/kullanici/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, parola }),
    });

    //yanıtı json a çeviriyoruz
    const responseJson = await response.json();

    if (!response.ok) {
      //hata gösterimi
      setHata(responseJson.hata);
    }

    if (response.ok) {
      //giriş başarılı ise, kullanıcıyı localestorage a ekleyip home a yönlendiriyoruz
      localStorage.setItem("kullanici", JSON.stringify(responseJson));
      navigate("/");
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Giriş Yap</h3>
      <label>Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />

      <label>Parola:</label>
      <input type="password" onChange={(e) => setParola(e.target.value)} />

      <button type="submit">Giriş</button>
      {hata && <div className="error">{hata}</div>}
    </form>
  );
};

export default Login;
