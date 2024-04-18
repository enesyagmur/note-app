const express = require("express");

//koleksiyon içerisinde kullanacağımız fonksiyonları çağırıyoruz
const {
  loginKullanici,
  signupKullanici,
} = require("../controllers/kullaniciController");

//koleksiyon oluşturma
const router = express.Router();

//koleksiyonda kullancağımız fonksiyonlar için adres belirliyoruz
router.post("/login", loginKullanici);
router.post("/signup", signupKullanici);

module.exports = router;
