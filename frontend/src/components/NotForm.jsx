import React, { useEffect, useState } from "react";
import "../index.css";
import { useDispatch } from "react-redux";
import { checkConnectFunc } from "../redux/slice";

const NotForm = () => {
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hata, setHata] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    //locale storage a kaydettiğimiz kullanıcıyı component yüklenirken çekiyoruz
    const currentUser = JSON.parse(localStorage.getItem("kullanici"));
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //eklemek istediğimiz not objesini oluşturuyoruz
    const not = { baslik, aciklama, userEmail };

    //yeni notu db ye gönderiyoruz
    const response = await fetch("/api/notlar", {
      method: "POST",
      body: JSON.stringify(not),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    if (response.ok) {
      //hata yoksa sıfırlama işlemleri
      setHata(null);
      setBaslik("");
      setAciklama("");
      dispatch(checkConnectFunc(1));
    } else {
      //hata varsa hata gösterimi
      setHata(responseJson.Hata);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Yeni Not Oluşturma</h3>
      <div className="create-group">
        <div>
          <label> Not Başlık:</label>
          <input
            type="text"
            onChange={(e) => setBaslik(e.target.value)}
            value={baslik}
          />
        </div>
        <div>
          <label> Not Açıklama:</label>
          <input
            type="text"
            onChange={(e) => setAciklama(e.target.value)}
            value={aciklama}
          />
        </div>
      </div>
      <button type="submit">Oluştur</button>
      {hata !== null ? <div className="error">{hata}</div> : null}
    </form>
  );
};

export default NotForm;
