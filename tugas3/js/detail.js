// Menampilkan data pendaftar dari query string (method GET) halaman pendaftaran
const query = window.location.search;
const params = new URLSearchParams(query);

const namaBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatNilai(name, value) {
  if (!value) return "-";
  if (name === "tgl_lahir") {
    const [tahun, bulan, hari] = value.split("-");
    return `${Number(hari)} ${namaBulan[Number(bulan) - 1]} ${tahun}`;
  }
  if (name === "gender") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
}

// Jika tidak ada query string, biarkan data contoh (dummy) tetap tampil
if (params.toString() !== "") {
  document.querySelectorAll("[data-field]").forEach((el) => {
    const name = el.dataset.field;
    el.textContent = formatNilai(name, params.get(name));
  });

  // Nilai mentah (ter-encode) pada tabel desain query string
  const rawPairs = {};
  query.slice(1).split("&").forEach((pair) => {
    const [key, value = ""] = pair.split("=");
    rawPairs[key] = value;
  });
  document.querySelectorAll("[data-raw]").forEach((el) => {
    el.textContent = rawPairs[el.dataset.raw] || "-";
  });

  document.getElementById("query-box").textContent =
    `GET /detail.html${query} HTTP/1.1`;

  const email = params.get("email");
  document.getElementById("link-email").href = email ? `mailto:${email}` : "#";

  // Inisial nama untuk avatar
  const nama = params.get("nama") || "";
  const inisial = nama
    .split(" ")
    .filter((kata) => kata !== "")
    .slice(0, 2)
    .map((kata) => kata.charAt(0).toUpperCase())
    .join("");
  document.getElementById("avatar").textContent = inisial || "?";
}
