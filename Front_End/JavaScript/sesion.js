document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav-dinamico");
  if (!nav) return;

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    // Visitante
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="/index.html">Inicio</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Ubicación</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Contáctenos</a></li>
      <li class="nav-item"><a class="nav-link" href="/login.html">Iniciar Sesión</a></li>
    `;
  } else if (usuario.rol === "cliente") {
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="/index.html">Inicio</a></li>
      <li class="nav-item"><a class="nav-link" href="/reservas.html">Reservar</a></li>
      <li class="nav-item"><a class="nav-link" href="/CmisReservas.html">Mis reservas</a></li>
      <li class="nav-item"><a class="nav-link" href="#">${usuario.nombre}</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>
    `;
  } else if (usuario.rol === "admin") {
    nav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="/index.html">Inicio</a></li>
      <li class="nav-item"><a class="nav-link" href="/admin.html">Ver reservas</a></li>
      <li class="nav-item"><a class="nav-link" href="#">${usuario.nombre}</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="cerrarSesion()">Cerrar Sesión</a></li>
    `;
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  Swal.fire({
    icon: 'question',
    title: '¿Cerrar sesión?',
    text: '¿Estás seguro de que deseas cerrar tu sesión?',
    showCancelButton: true,
    confirmButtonColor: '#1abc9c',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("usuarioActivo");
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has salido correctamente.',
        confirmButtonColor: '#1abc9c',
        timer: 1500,
        showConfirmButton: false
      });
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1500);
    }
  });
}
