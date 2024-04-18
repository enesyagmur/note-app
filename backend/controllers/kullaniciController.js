const Kullanici = require("../models/kullaniciModel");
const jwt = require("jsonwebtoken");

//kullanıcıController: kullanıcı işlemleri için oluşturduğumuz fonksiyonları inputları alarak çalıştırıyoruz

//burda token olşturuyoruz ve kullanıcı için oluşturduğumuz fonksiyonları aldığımız veriler ile kullanarak export ediyoruz
const tokenOlustur = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  //1. parametre: tokenler için ayırt edici bir değer giriyoruz
  //2. parametre: proje için oluşturulan gizli bir nanhtar kelime gibi "env" içerisinde biz belirliyoruz
  //3. parametre: geçerlilik süresi belirliyoruz
};

// bu alanda fonksiyon oluşturmuyoruz ama aldığımız inputlar ile fonksiyonları çalıştırıyoruz
const loginKullanici = async (req, res) => {
  //1.adım: girilen email ve parolayı alıyoruz
  const { email, parola } = req.body;
  try {
    const kullanici = await Kullanici.login(email, parola);
    const token = tokenOlustur(kullanici._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ hata: error.message });
  }
};

const signupKullanici = async (req, res) => {
  //istek de bulunan email ve parolayı alıyoruz
  const { email, parola } = req.body;

  try {
    //model içerisinde oluşturduğumuz signup fonksiyonnu çağırıyoruz
    const kullanici = await Kullanici.signup(email, parola);

    const token = tokenOlustur(kullanici._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ hata: error.message });
  }
};

module.exports = {
  loginKullanici,
  signupKullanici,
};
