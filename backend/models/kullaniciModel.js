const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

//Model.js:-----------------------------------------------------
//burda şemamızı ve fonksiyonlarımızı oluşturuyoruz

//kullanıcılar için taslark oluşturma
const Sema = mongoose.Schema;
const kullaniciSema = new Sema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  parola: {
    type: String,
    required: true,
  },
});

//kullanıcı kayıt funksiyonu
kullaniciSema.statics.signup = async function (email, parola) {
  //1.adım: validator email parola kontrolü

  if (!email || !parola) {
    throw Error("Bilgiler boş bırakılamaz");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email geçersiz");
  }

  if (!validator.isStrongPassword(parola)) {
    throw Error(
      "Parola en az 8 karakter uzunluğunda olmalı, küçük, büyük harf, rakam, özel karakter içermelidir."
    );
  }

  const kontrolEmail = await this.findOne({ email });
  if (kontrolEmail) {
    throw Error("Email zaten kayıtlı.");
  }

  //2.adım: parola güvenliği için parolayı şifreliyoruz
  const salt = await bcrypt.genSalt(10);
  const sifrelenmisParola = await bcrypt.hash(parola, salt); // kullanıcı parolası ile salt u eşleştiriyoruz

  //3.adım kayıt
  const kullanici = await this.create({ email, parola: sifrelenmisParola });

  return kullanici;
};

kullaniciSema.statics.login = async function (email, parola) {
  //1.adım: email parola kontrolü

  if (!email || !parola) {
    throw Error("Bilgiler boş bırakılamaz.");
  }

  const kullanici = await this.findOne({ email });
  if (!kullanici) {
    throw Error("Girilen email ile kayıtlı kullanıcı bulunamadı.");
  }

  const parolaKontrol = await bcrypt.compare(parola, kullanici.parola); // normalde if ile eşitlik kontrolü de yapılırdı ama biz parolamızı şifrelediğimiz için bu şekilde yapmamız gerekiyor
  if (!parolaKontrol) {
    throw Error("Parola hatalı.");
  }

  return kullanici;
};

module.exports = mongoose.model("Kullanici", kullaniciSema);
