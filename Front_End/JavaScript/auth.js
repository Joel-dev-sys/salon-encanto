// auth.js

// Registro
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("registro-form");

  if (formRegistro) {
    formRegistro.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById("nombres").value.trim(),
        apellido: document.getElementById("apellidos").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        dni: document.getElementById("dni").value.trim(),
        fecha_nacimiento: document.getElementById("nacimiento").value,
        genero: document.getElementById("genero").value,
        direccion: document.getElementById("direccion").value.trim(),
        contrasena: document.getElementById("contrasena").value
      };

      try {
        const response = await fetch("http://localhost:3000/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: "Ahora puedes iniciar sesión con tu cuenta.",
            confirmButtonColor: "#1abc9c"
          }).then(() => {
            window.location.href = "../HTML/login.html";
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Usuario ya registrado",
            text: result.error,
            confirmButtonColor: "#f39c12"
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo contactar con el servidor.",
          confirmButtonColor: "#dc3545"
        });
      }
    });
  }
});

// Inicio de sesión
async function iniciarSesion(correo, contrasena) {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: correo, contrasena })
    });

    const result = await response.json();

    if (result.success) {
      const usuarioActivo = {
        nombre: `${result.usuario.nombre} ${result.usuario.apellido}`,
        email: result.usuario.email,
        rol: result.usuario.rol
      };

      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: `Bienvenido, ${usuarioActivo.nombre}.`,
        confirmButtonColor: "#1abc9c"
      }).then(() => {
        if (usuarioActivo.rol === "admin") {
          window.location.href = "../HTML/admin.html";
        } else {
          window.location.href = "../HTML/reservas.html";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: result.error || "Correo o contraseña incorrectos.",
        confirmButtonColor: "#dc3545"
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    Swal.fire({
      icon: "error",
      title: "Error de conexión",
      text: "No se pudo contactar con el servidor.",
      confirmButtonColor: "#dc3545"
    });
  }
}
