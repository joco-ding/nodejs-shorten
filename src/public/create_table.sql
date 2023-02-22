-- Mendefinisikan query untuk membuat sebuah tabel baru dengan nama urls.
CREATE TABLE urls (
  -- Mendefinisikan kolom id dengan tipe data integer yang akan menjadi primary key dari tabel. NOT NULL menandakan bahwa kolom ini harus diisi, dan AUTO_INCREMENT menandakan bahwa nilai kolom ini akan di-generate secara otomatis dengan setiap baris baru yang ditambahkan.
  id INT(11) NOT NULL AUTO_INCREMENT,
  -- Mendefinisikan kolom long_url dengan tipe data string dengan panjang maksimum 255 karakter. NOT NULL menandakan bahwa kolom ini harus diisi.
  long_url VARCHAR(255) NOT NULL,
  -- Mendefinisikan kolom short_id dengan tipe data string dengan panjang maksimum 20 karakter. NOT NULL menandakan bahwa kolom ini harus diisi.
  short_id VARCHAR(20) NOT NULL,
  -- Mendefinisikan kolom clicks dengan tipe data integer yang akan menyimpan jumlah klik pada URL pendek. NOT NULL menandakan bahwa kolom ini harus diisi, dan DEFAULT 0 menandakan bahwa nilai default untuk kolom ini adalah 0.
  clicks INT(11) NOT NULL DEFAULT 0,
  -- Mendefinisikan kolom created_at dengan tipe data datetime yang akan menyimpan waktu dibuatnya URL pendek. NOT NULL menandakan bahwa kolom ini harus diisi.
  created_at DATETIME NOT NULL,
  -- Menandakan bahwa kolom id akan menjadi primary key dari tabel.
  PRIMARY KEY (id),
  -- Menandakan bahwa kolom short_id akan memiliki nilai yang unik dan akan digunakan untuk mencari data URL pendek pada tabel.
  UNIQUE KEY short_id (short_id)
);