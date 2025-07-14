document.addEventListener("DOMContentLoaded", () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  if (!usuarioActual || usuarioActual.rol !== "cliente") {
    alert("Debes iniciar sesión como cliente para ver tus reservas.");
    window.location.href = "/HTML/login.html";
    return;
  }

  const tabla = document.getElementById("tabla-reservas");

  const reservasCliente = reservas.filter(r => r.email === usuarioActual.email && !r.cancelada);

  if (reservasCliente.length === 0) {
    tabla.innerHTML = `<tr><td colspan="6" class="text-center">No tienes reservas registradas.</td></tr>`;
    return;
  }

  reservasCliente.forEach(reserva => {
    const puedeCancelar = verificarRestricciones(reserva.fechaInicio, reserva.fechaCreacion);
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${reserva.fechaInicio}</td>
      <td>${reserva.fechaFin}</td>
      <td>${reserva.sala}</td>
      <td>${reserva.serviciosExtras.join(", ")}</td>
      <td>S/. ${reserva.total}</td>
              <td class="text-center">
          <span class="badge ${reserva.cancelada ? 'badge-cancelada' : 'badge-activa'}">
            ${reserva.cancelada ? 'Cancelada' : 'Activa'}
          </span>
        </td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm me-1" onclick="modificarReserva(${reserva.id})" ${reserva.cancelada ? 'disabled' : ''}>
            Modificar
          </button>
          <button class="btn btn-danger btn-sm" onclick="cancelarReserva(${reserva.id})" ${!puedeCancelar || reserva.cancelada ? 'disabled' : ''}>
            Cancelar
          </button>
        </td>
    `;
    tabla.appendChild(fila);
  });
});
    //Restricciones
  function verificarRestricciones(fechaInicioStr, fechaCreacionStr) {
    const ahora = new Date();
    const fechaInicio = new Date(fechaInicioStr);
    const fechaCreacion = new Date(fechaCreacionStr);

    const msEnUnDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = (fechaInicio - ahora) / msEnUnDia;
    const diferenciaHorasDesdeCreacion = (ahora - fechaCreacion) / (1000 * 60 * 60);

    if (diferenciaDias >= 2) {
      return true; // Puede cancelar hasta 2 días antes
    }

    return diferenciaHorasDesdeCreacion <= 1; // Puede cancelar si han pasado menos de 1 hora desde que reservó
  }

    //Cancelar reservas
  function cancelarReserva(id) {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const reserva = reservas.find(r => r.id === id);
    if (!reserva) return;
    const puedeCancelar = verificarRestricciones(reserva.fechaInicio, reserva.fechaCreacion);
    if (!puedeCancelar) {
      Swal.fire({
        icon: 'error',
        title: 'No puedes cancelar esta reserva',
        html: `
          <p>Solo puedes cancelar si:</p>
          <ul style="text-align:left;">
            <li>Faltan al menos <strong>2 días</strong> para la fecha de inicio</li>
            <li>O si ha pasado <strongmenos de 1 hora</strong> desde que hiciste la reserva</li>
          </ul>
          <p>Esta reserva no cumple con esos requisitos.</p>
        `,
        confirmButtonColor: '#e74c3c'
      });
      return;
    }
    reserva.cancelada = true;
    localStorage.setItem("reservas", JSON.stringify(reservas));
    Swal.fire({
      icon: 'info',
      title: 'Reserva cancelada',
      html: `
        <p>La reserva para <strong>${reserva.sala}</strong></p>
        <p>del <strong>${new Date(reserva.fechaInicio).toLocaleString()}</strong></p>
        <p>al <strong>${new Date(reserva.fechaFin).toLocaleString()}</strong></p>
        ha sido <strong>anulada</strong>.
      `,
      confirmButtonColor: '#1abc9c'
    }).then(() => location.reload());
  }


  function modificarReserva(id) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const reserva = reservas.find(r => r.id === id);

    if (!reserva) return;

    document.getElementById("editar-index").value = id;
    document.getElementById("editar-inicio").value = reserva.fechaInicio;
    document.getElementById("editar-fin").value = reserva.fechaFin;

    const modal = new bootstrap.Modal(document.getElementById("modal-editar"));
    modal.show();
  }

    // Guardar cambios
  document.getElementById("form-editar").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById("editar-index").value);
    const fechaInicio = document.getElementById("editar-inicio").value;
    const fechaFin = document.getElementById("editar-fin").value;

    if (!fechaInicio || !fechaFin || new Date(fechaInicio) >= new Date(fechaFin)) {
      alert("Fechas inválidas.");
      return;
    }

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const index = reservas.findIndex(r => r.id === id);

    if (index !== -1) {
      reservas[index].fechaInicio = fechaInicio;
      reservas[index].fechaFin = fechaFin;
      localStorage.setItem("reservas", JSON.stringify(reservas));

      Swal.fire({
        icon: 'success',
        title: 'Reserva modificada',
        text: 'Los cambios se han guardado correctamente.',
        confirmButtonColor: '#1abc9c',
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => location.reload(), 1500);
    }
  });


