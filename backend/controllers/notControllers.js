const { default: mongoose } = require("mongoose");
const NotModel = require("../models/notModel");

//notController: not işlemleri için oluşturduğumuz fonksiyonları inputları alarak çalıştırıyoruz

const notOlustur = async (req, res) => {
  const { baslik, aciklama, userEmail } = req.body;
  try {
    const not = await NotModel.create({ baslik, aciklama, userEmail });
    res.status(200).json(not);
  } catch (error) {
    res.status(400).json({ Hata: "Not oluşturma hatası: " + error.message });
  }
};

const notlariGetir = async (req, res) => {
  try {
    const notlar = await NotModel.find();
    res.status(200).json(notlar);
  } catch (error) {
    res.status(400).json({ Hata: "Notları getiritken hata: " + error.message });
  }
};

const notGetir = async (req, res) => {
  const { id } = req.params;

  //kontrol edilen id verisinin tipinin ve değerinin db de bulunan id ye uygun olup olmadığı kontrolü
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ Hata: "Notu getirirken hata : id geçersiz" });
  }
  const not = await NotModel.findById(id);

  if (!not) {
    return res
      .status(404)
      .json({ Hata: "Notu getirirken hata : not bulunamadı" });
  }
  return res.status(200).json(not);
};

const notSil = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ Hata: "Notu silerken hata : id geçersiz" });
  }

  const not = await NotModel.findOneAndDelete({ _id: id });

  if (!not) {
    return res
      .status(404)
      .json({ Hata: "Notu silerken hata : not bulunamadı" });
  }

  res.status(200).json(not);
};

const notGuncelle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ Hata: "Notu güncellerken hata : id geçersiz" });
  }

  const not = await NotModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body, // bu kısımda ... şeklinde yazılmasının sebebi body ye başlık ya da açıklamadan herhangi birisi veya ikisi birden girilse bile girilene göre güncelleme yapması için
    },
    { new: true } // bu kısmı yazmak zorunda değiliz ama yazınca geriye not un son güncel halini gönderiyor. yazmadığımızda notun güncellemeden önceki halini gösteriyor
  );

  if (!not) {
    res.status(404).json({ Hata: "Notu güncellerken hata : id bulunamadı" });
  }

  res.status(200).json(not);
};
module.exports = {
  notOlustur,
  notlariGetir,
  notGetir,
  notSil,
  notGuncelle,
};
