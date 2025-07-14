document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario || usuario.rol !== "admin") {
    alert("Acceso denegado. Solo administradores.");
    window.location.href = "index.html";
    return;
  }

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  const conteoPorSala = {};
  reservas.forEach(r => {
    if (!r.cancelada) {
      conteoPorSala[r.sala] = (conteoPorSala[r.sala] || 0) + 1;
    }
  });

  const ctx = document.getElementById("graficoReservas").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(conteoPorSala),
      datasets: [{
        label: "Cantidad de Reservas por Sala",
        data: Object.values(conteoPorSala),
        backgroundColor: "#1abc9c"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
