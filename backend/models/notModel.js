const mongoose = require("mongoose");

//notlar oluşturma işlemini burdan yapıyoruz
const Sema = mongoose.Schema;

const notSema = Sema(
  {
    baslik: {
      type: String,
      required: [true, "Başlık zorunlu bir değerdir."], // required (zorunlu olup olmamasını seçiyoruz) : true-false, hata olurse çıkacak hata mesajı
    },
    aciklama: {
      type: String,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Not", notSema); // db içerisinde nots olarak gözükür bu da koleksiyon olmasını anlamamız için
