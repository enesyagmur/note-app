import React from "react";
import "../index.css";
import { useDispatch } from "react-redux";
import { checkConnectFunc } from "../redux/slice";
import moment from "moment";
import "moment/locale/tr";

const NotDetay = ({ not }) => {
  const dispatch = useDispatch();

  //not silme
  const handleClick = async () => {
    const response = await fetch("/api/notlar/" + not._id, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(checkConnectFunc(1)); // reduxta bulunan statimizi güncelliyoruz ki notları çağırma fonksiyonu tekrar çalışsın
    } else {
      console.log(response.Hata);
    }
  };

  return (
    <div className="not-detay">
      <h4>{not.baslik}</h4>
      <p>{not.aciklama}</p>
      <p>{moment(new Date(not.createdAt)).fromNow()}</p>
      {/*not oluştururken db ye eklediğimiz timestamp i istediğimiz gibi çözümlemek için bir npm paketi kullandım */}
      <span onClick={handleClick}>x</span>
    </div>
  );
};

export default NotDetay;
