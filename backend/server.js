const express = require("express");
require("dotenv").config();
const notRoute = require("./routes/notlar");
const mongoose = require("mongoose");
const kullaniciRoute = require("./routes/kullanici");

const app = express();

app.use((req, res, next) => {
  //req.path : methodun yolu için
  //req.method : methodun tipi için

  //üstteki bilgileri alıp yazdırdıktan sonra next ile devam et demiş oluyoruz
  next();
});

app.use(express.json());

//bağlantı kodları : .env dosyasından gerekli bilgileri çekerek kullanıyoruz
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Veritabanı bağlantısı kuruldu");

    app.listen(process.env.PORT, () => {
      console.log(`${process.env.PORT}. port dinleniyor`);
    });
  })
  .catch((err) => {
    console.log("Veri tabanı bağlantısı başarısız: " + err);
  });

//bunları firebasete bulunan collectionlar gibi düşünebiliriz
app.use("/api/notlar", notRoute);
app.use("/api/kullanici", kullaniciRoute);
