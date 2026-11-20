// ===== 1. PERSONALISASI NAMA TAMU =====

// Baca parameter dari URL
const urlParams = new URLSearchParams(window.location.search);

// Ambil nilainya (kalau tidak ada, pakai default)
const nama = urlParams.get('to') || 'Tamu Undangan';
const instansi = urlParams.get('instansi') || '';
const kategori = urlParams.get('kategori') || '';

// Tampilkan ke halaman
document.getElementById('nama').textContent = nama;
document.getElementById('instansi').textContent = instansi;
document.getElementById('kategori').textContent = kategori;


// ===== 2. RSVP =====

const formRsvp = document.getElementById('formRsvp');
const pesanRsvp = document.getElementById('pesanRsvp');

// Isi otomatis kolom nama kalau dibuka lewat link undangan
if (urlParams.has('to')) {
    document.getElementById('rsvpNama').value = nama;
}

formRsvp.addEventListener('submit', function (e) {
    e.preventDefault();   // cegah halaman reload

    const namaRsvp = document.getElementById('rsvpNama').value.trim();
    const hadir = document.getElementById('rsvpHadir').value;
    const jumlah = Number(document.getElementById('rsvpJumlah').value);

    // Data yang mau disimpan
    const dataBaru = {
        nama: namaRsvp,
        hadir: hadir,
        jumlah: jumlah,
        waktu: new Date().toLocaleString('id-ID')
    };

    // Ambil daftar lama, tambah data baru, simpan lagi
    const daftar = JSON.parse(localStorage.getItem('rsvp') || '[]');
    daftar.push(dataBaru);
    localStorage.setItem('rsvp', JSON.stringify(daftar));

    // Pesan sukses
    if (hadir === 'Hadir') {
        pesanRsvp.textContent = 'Terima kasih, ' + namaRsvp + '! Kehadiran Anda (' + jumlah + ' perwakilan) sudah tercatat.';
    } else {
        pesanRsvp.textContent = 'Terima kasih, ' + namaRsvp + '. Kami mencatat bahwa Anda tidak dapat hadir.';
    }
    pesanRsvp.style.display = 'block';
    formRsvp.reset();
});