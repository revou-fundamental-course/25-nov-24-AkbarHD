// Ambil elemen-elemen HTML yang dibutuhkan untuk interaksi
const form = document.getElementById('bmi-form'); // Formulir input BMI
const resultElement = document.getElementById('bmi-result'); // Tempat untuk menampilkan hasil BMI
const statusElement = document.getElementById('bmi-status'); // Tempat untuk menampilkan status BMI
const categoryElement = document.getElementById('bmi-category'); // Tempat untuk menampilkan kategori BMI
const explanationElement = document.getElementById('bmi-explanation'); // Tempat untuk menampilkan penjelasan BMI

// Fungsi untuk menghitung BMI
function calculateBMI(weight, height) {
    // Rumus BMI: berat badan (kg) dibagi tinggi badan (m) kuadrat
    const bmi = weight / ((height / 100) ** 2); // Tinggi dibagi 100 karena inputnya dalam cm
    return bmi.toFixed(1); // Dibulatkan jadi 1 angka di belakang koma
}

// Fungsi untuk menentukan status dan penjelasan BMI berdasarkan jenis kelamin
function getBMIStatusAndExplanation(bmi, gender) {
    let status, explanation; // Variabel untuk menyimpan status dan penjelasan

    // Kalau jenis kelaminnya laki-laki
    if (gender === 'male') {
        if (bmi < 20.1) { // Kalau BMI-nya kurang dari 20.1
            status = 'Kekurangan Berat Badan';
            explanation = 'BMI Anda rendah. Periksa pola makan atau kesehatan Anda.';
        } else if (bmi >= 20.1 && bmi <= 25.0) { // Kalau BMI dalam rentang normal
            status = 'Normal (Ideal)';
            explanation = 'BMI Anda sehat. Tetap pertahankan gaya hidup yang baik.';
        } else if (bmi >= 25.1 && bmi <= 27.0) { // Kalau BMI sedikit berlebih
            status = 'Berat Badan Berlebih';
            explanation = 'BMI Anda menunjukkan kelebihan berat badan. Perhatikan pola makan.';
        } else { // Kalau BMI sudah masuk kategori obesitas
            status = 'Obesitas';
            explanation = 'BMI Anda tinggi. Konsultasikan ke dokter untuk perencanaan penurunan berat badan.';
        }
    }
    // Kalau jenis kelaminnya perempuan
    else if (gender === 'female') {
        if (bmi < 18.7) { // Sama logikanya, cuma angkanya beda
            status = 'Kekurangan Berat Badan';
            explanation = 'BMI Anda rendah. Periksa pola makan atau kesehatan Anda.';
        } else if (bmi >= 18.7 && bmi <= 23.8) {
            status = 'Normal (Ideal)';
            explanation = 'BMI Anda sehat. Tetap pertahankan gaya hidup yang baik.';
        } else if (bmi >= 23.9 && bmi <= 27.3) {
            status = 'Berat Badan Berlebih';
            explanation = 'BMI Anda menunjukkan kelebihan berat badan. Perhatikan pola makan.';
        } else {
            status = 'Obesitas';
            explanation = 'BMI Anda tinggi. Konsultasikan ke dokter untuk perencanaan penurunan berat badan.';
        }
    }
    // Kalau jenis kelamin belum dipilih
    else {
        status = 'Tidak Diketahui';
        explanation = 'Pilih jenis kelamin untuk mendapatkan hasil yang akurat.';
    }

    // Mengembalikan hasil status dan penjelasan
    return {
        status,
        explanation
    };
}

// Tambahkan event listener ke form, supaya bisa mendeteksi saat form dikirim
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Supaya halaman nggak reload waktu form dikirim

    // Cek jenis kelamin dari input form
    const male = form.elements.male.checked; // Apakah yang dipilih laki-laki?
    const female = form.elements.female.checked; // Apakah yang dipilih perempuan?

    let gender; // Variabel untuk menyimpan jenis kelamin
    if (male) {
        gender = 'male'; // Kalau laki-laki
    } else if (female) {
        gender = 'female'; // Kalau perempuan
    } else {
        alert('Silakan pilih jenis kelamin Anda.'); // Kalau belum pilih, kasih alert
        return;
    }

    // Ambil nilai berat badan dan tinggi badan dari form
    const weight = parseFloat(form.elements.weight.value); // Berat badan dalam kg
    const height = parseFloat(form.elements.height.value); // Tinggi badan dalam cm

    // Validasi input: pastikan berat dan tinggi diisi dengan benar
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Silakan masukkan nilai yang valid untuk berat dan tinggi badan.');
        return;
    }

    // Hitung BMI dengan fungsi yang sudah dibuat
    const bmi = calculateBMI(weight, height);

    // Dapatkan status dan penjelasan berdasarkan BMI dan jenis kelamin
    const {
        status,
        explanation
    } = getBMIStatusAndExplanation(bmi, gender);

    // Tampilkan hasil ke elemen HTML
    resultElement.textContent = bmi; // Menampilkan nilai BMI
    statusElement.textContent = status; // Menampilkan status BMI (Normal, Obesitas, dll)
    categoryElement.textContent = `Kategori BMI Anda: ${status}`; // Menampilkan kategori BMI
    explanationElement.textContent = explanation; // Menampilkan penjelasan BMI
});