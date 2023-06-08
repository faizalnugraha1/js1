// Data untuk dropdown Lowongan
var lowonganData = [
    { nama: "Database Developer", kuota: 4 },
    { nama: "System Analyst", kuota: 2 },
    { nama: "Front End Developer", kuota: 0 }
  ];
  
  // Data untuk dropdown Posisi
  var posisiData = ["Jakarta", "Bandung"];
  
  // Data pendaftar
  var pendaftarData = [];
  
  // Ambil elemen dropdown Lowongan dan Posisi
  var lowonganDropdown = document.getElementById("vacancy");
  var posisiDropdown = document.getElementById("posisi");
  
  // Tambahkan pilihan dropdown Lowongan
  lowonganData.forEach(function (lowongan) {
    var option = document.createElement("option");
    option.text = lowongan.nama;
    lowonganDropdown.appendChild(option);
  });
  
  // Tambahkan pilihan dropdown Posisi
  posisiData.forEach(function (posisi) {
    var option = document.createElement("option");
    option.text = posisi;
    posisiDropdown.appendChild(option);
  });
  
  // Menangani event saat form dikirim
  const form = document.getElementById("recruitment-form");
  const dataBody = document.getElementById("dataBody");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dikirim secara langsung
  
    // Mengambil nilai input
    const nama = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const vacancy = document.getElementById("vacancy").value;
    const posisi = document.getElementById("posisi").value;
  
    // Memvalidasi input
    if (nama === "" || email === "" || phone === "" || vacancy === "" || posisi === "") {
      alert("Harap isi semua kolom!");
      return;
    }
  
    // Validasi email terdaftar
    const emailTerdaftar = pendaftarData.find(function (pendaftar) {
      return pendaftar.email === email;
    });
  
    if (emailTerdaftar) {
      alert("Email sudah terdaftar!");
      return;
    }
  
    // Cek kuota lowongan
    const lowonganTerpilih = lowonganData.find(function (lowongan) {
      return lowongan.nama === vacancy;
    });
  
    if (!lowonganTerpilih) {
      alert("Lowongan tidak valid!");
      return;
    }
  
    if (lowonganTerpilih.kuota === 0) {
      alert(`Mohon maaf, rekrutasi untuk ${lowonganTerpilih.nama} sudah penuh dan tidak dapat dipilih.`);
      return;
    }
  
    // Menampilkan info kuota tersisa atau info dapat memilih lowongan
    if (lowonganTerpilih.kuota >= 3) {
      alert(`Anda dapat memilih lowongan ${lowonganTerpilih.nama}.`);
    } else {
      const kuotaTersisa = 3 - lowonganTerpilih.kuota;
      alert(`Kuota tersisa untuk ${lowonganTerpilih.nama} hanya ${kuotaTersisa} pendaftar.`);
    }
  
    // Menyimpan data pendaftar
    pendaftarData.push({
      nama: nama,
      email: email,
      phone: phone,
      vacancy: vacancy,
      posisi: posisi
    });
  
    // Menampilkan notifikasi jumlah pendaftar
    alert(`Jumlah pendaftar saat ini: ${pendaftarData.length}`);
  
    // Membuat elemen <tr> dan <td> untuk setiap kolom data
    const newRow = document.createElement("tr");
    const namaCell = document.createElement("td");
    const emailCell = document.createElement("td");
    const phoneCell = document.createElement("td");
    const vacancyCell = document.createElement("td");
    const posisiCell = document.createElement("td");
  
    // Mengisi teks pada setiap elemen <td> dengan nilai yang diisi pengguna
    namaCell.textContent = nama;
    emailCell.textContent = email;
    phoneCell.textContent = phone;
    vacancyCell.textContent = vacancy;
    posisiCell.textContent = posisi;
  
    // Menambahkan elemen <td> ke dalam elemen <tr>
    newRow.appendChild(namaCell);
    newRow.appendChild(emailCell);
    newRow.appendChild(phoneCell);
    newRow.appendChild(vacancyCell);
    newRow.appendChild(posisiCell);
  
    // Menambahkan elemen <tr> ke dalam elemen <tbody>
    dataBody.appendChild(newRow);
  
    // Mengurangi kuota lowongan yang terpilih
    lowonganTerpilih.kuota--;
  
    // Mereset form setelah berhasil ditambahkan ke dalam tabel
    form.reset();
  });
  