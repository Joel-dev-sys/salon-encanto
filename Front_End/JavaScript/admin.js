document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario || usuario.rol !== "admin") {
    alert("Acceso restringido. Solo para administradores.");
    window.location.href = "../HTML/index.html";
    return;
  }

  mostrarReservas();
});

  let reservasPaginadas = [];
let paginaActual = 1;
const reservasPorPagina = 5;
let filtroRapidoActivo = "todas"; //estado

function mostrarReservas(filtro = {}) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const tabla = document.getElementById("tabla-admin-reservas");
  tabla.innerHTML = "";

  let resultados = reservas;

  // Filtros avanzados
  if (filtro.correo) {
    resultados = resultados.filter(r => r.email?.toLowerCase().includes(filtro.correo.toLowerCase()));
  }
  if (filtro.fechaInicio) {
    resultados = resultados.filter(r => new Date(r.fechaInicio) >= new Date(filtro.fechaInicio));
  }
  if (filtro.fechaFin) {
    resultados = resultados.filter(r => new Date(r.fechaFin) <= new Date(filtro.fechaFin));
  }
  if (filtro.sala) {
    resultados = resultados.filter(r => r.sala === filtro.sala);
  }

  // Filtro rápido
  const ahora = new Date();
  if (filtroRapidoActivo === "proximas") {
    resultados = resultados.filter(r => !r.cancelada && new Date(r.fechaInicio) > ahora);
  } else if (filtroRapidoActivo === "pasadas") {
    resultados = resultados.filter(r => new Date(r.fechaFin) < ahora);
  } else if (filtroRapidoActivo === "canceladas") {
    resultados = resultados.filter(r => r.cancelada);
  }

  if (resultados.length === 0) {
    tabla.innerHTML = `<tr><td colspan="9" class="text-center">No se encontraron reservas con esos filtros.</td></tr>`;
    return;
  }

  // Paginación
  reservasPaginadas = resultados;
  const inicio = (paginaActual - 1) * reservasPorPagina;
  const fin = inicio + reservasPorPagina;
  const pagina = reservasPaginadas.slice(inicio, fin);

  // Mostrar resultados
  pagina.forEach(reserva => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${reserva.nombre || "N/A"}</td>
      <td>${reserva.email || "N/A"}</td>
      <td>${reserva.telefono || "N/A"}</td>
      <td>${reserva.sala}</td>
      <td>${reserva.fechaInicio}</td>
      <td>${reserva.fechaFin}</td>
      <td>${reserva.serviciosExtras?.join(", ")}</td>
      <td>${reserva.cancelada ? "Cancelada" : `S/. ${reserva.total}`}</td>
      <td><span class="badge ${reserva.cancelada ? 'bg-danger' : 'bg-success'}">${reserva.cancelada ? 'Cancelada' : 'Activa'}</span></td>
    `;
    tabla.appendChild(fila);
  });

  agregarControlesPaginacion();
}

  //Controles
  function agregarControlesPaginacion() {
    const contenedor = document.getElementById("paginacion");
    if (!contenedor) return;
    contenedor.innerHTML = ""; // Limpiar
    const totalPaginas = Math.ceil(reservasPaginadas.length / reservasPorPagina);
    for (let i = 1; i <= totalPaginas; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = `btn btn-sm mx-1 ${i === paginaActual ? "btn-success" : "btn-outline-secondary"}`;
      btn.addEventListener("click", () => {
        paginaActual = i;
        mostrarReservas(); // recarga la tabla con nueva página
      });
      contenedor.appendChild(btn);
    }
  }

function aplicarFiltros() {
  const correo = document.getElementById("filtroCorreo").value.trim();
  const fechaInicio = document.getElementById("filtroFechaInicio").value;
  const fechaFin = document.getElementById("filtroFechaFin").value;
  const sala = document.getElementById("filtroSala").value;

  mostrarReservas({ correo, fechaInicio, fechaFin, sala });
}
//Importar
async function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Listado de Reservas", 14, 20);

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  const filas = reservas.map(r => [
    r.nombre || "N/A",
    r.email,
    r.telefono,
    r.sala,
    r.fechaInicio,
    r.fechaFin,
    (r.serviciosExtras || []).join(", "),
    r.cancelada ? "Cancelada" : "Activa",
    r.cancelada ? "-" : `S/. ${r.total}`
  ]);

  doc.autoTable({
    head: [["Nombre", "Email", "Teléfono", "Sala", "Inicio", "Fin", "Extras", "Estado", "Total"]],
    body: filas,
    startY: 30,
    styles: {
      fontSize: 8
    },
    headStyles: {
      fillColor: [26, 188, 156] // color verde
    }
  });

  doc.save("reservas.pdf");
}


function limpiarFiltros() {
  document.getElementById("filtroCorreo").value = "";
  document.getElementById("filtroFechaInicio").value = "";
  document.getElementById("filtroFechaFin").value = "";
  document.getElementById("filtroSala").value = "";

  mostrarReservas(); // vuelve a mostrar todo
}

// Filtros rápidos (todas, próximas, pasadas, canceladas)
document.querySelectorAll(".filtro-rapido").forEach(btn => {
  btn.addEventListener("click", () => {
    filtroRapidoActivo = btn.getAttribute("data-filtro");
    paginaActual = 1;
    mostrarReservas(); // usa el filtro actual y el filtro rápido seleccionado
  });
});




