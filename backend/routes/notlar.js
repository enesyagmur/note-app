const express = require("express");

//koleksiyon içerisinde kullanacağımız fonksiyonları çağırıyoruz
const {
  notOlustur,
  notlariGetir,
  notGetir,
  notSil,
  notGuncelle,
} = require("../controllers/notControllers");

//koleksiyon oluşturma
const router = express.Router();

//koleksiyonda kullancağımız fonksiyonlar için adres belirliyoruz ---

//tüm notları çağırma
router.get("/", notlariGetir);

//id ye göre not çağırma
router.get("/:id", notGetir);

//ekleme
router.post("/", notOlustur);
//silme
router.delete("/:id", notSil);

//güncelleme
router.patch("/:id", notGuncelle);

module.exports = router;
