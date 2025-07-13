// Datos de salas
const salas = [
  {
    nombre: "Sala Ejecutiva",
    descripcion: "Espacio ideal para reuniones pequeñas y presentaciones ejecutivas.",
    capacidad: 10,
    servicios: ["Mobiliario","WiFi", "Proyector","Pizarra"],
    precio: 150,
    categoria: "pequeno",
    imagen: "../IMG/sala-ejecutiva.jpg"
  },
  {
    nombre: "Sala de Conferencias",
    descripcion: "Espacio versátil para conferencias y eventos corporativos.",
    capacidad: 25,
    servicios: ["Mobiliario","WiFi", "Proyector", "Sonido"],
    precio: 300,
    categoria: "mediano",
    imagen: "../IMG/Sala-de-conferencias.jpg"
  },
  {
    nombre: "Salón de Eventos",
    descripcion: "Amplio espacio para eventos sociales y corporativos grandes.",
    capacidad: 50,
    servicios: ["WiFi","Sonido","Iluminación","30 Sillas"],
    precio: 500,
    categoria: "grande",
    imagen: "../IMG/Sala-de-eventos.jpg"
  },
  {
    nombre: "Sala Creativa",
    descripcion: "Espacio diseñado para sesiones de brainstorming y trabajo creativo.",
    capacidad: 8,
    servicios: ["Mobiliario","WiFi","Proyector","Pizarras"],
    precio: 120,
    categoria: "pequeno",
    imagen: "../IMG/Sala-creativa.jpg"
  },
  {
    nombre: "Sala de Capacitación",
    descripcion: "Espacio equipado para talleres y sesiones de capacitación.",
    capacidad: 20,
    servicios: ["Mobiliario","WiFi","Proyector", "Sonido"],
    precio: 250,
    categoria: "mediano",
    imagen: "../IMG/Sala-de-capacitación.jpg"
  },
  {
    nombre: "Auditorio Principal",
    descripcion: "Amplio auditorio para conferencias y eventos de gran escala.",
    capacidad: 100,
    servicios: ["WiFi", "Sonido","Iluminación","70 Sillas"],
    precio: 800,
    categoria: "grande",
    imagen: "../IMG/Auditorio-principal.jpg"
  }
];

//Datos servicios Adicionales:

const serviciosPorCategoria = {
  pequeno: {
    catering: [
      { nombre: "Box Lunch Ejecutivo", precio: 50 },
      { nombre: "Coffee Break Clásico", precio: 30 },
      { nombre: "Mini Desayuno Empresarial", precio: 40 },
    ],
    audiovisual: [
      { nombre: "Pizarra Interactiva", precio: 80 },
      { nombre: "Cámara de videoconferencia", precio: 100 },
      { nombre: "Micrófono inalámbrico", precio: 60 },
    ],
    decoracion: [
      { nombre: "Decoración minimalista", precio: 50 },
      { nombre: "Tótems corporativos", precio: 70 },
      { nombre: "Señalética personalizada", precio: 90 },
    ],
    apoyo: [
      { nombre: "1 Persona de apoyo", precio: 60 }
    ],
    estacionamiento: [
      { nombre: "Hasta 3 autos", precio: 50 },
      { nombre: "Hasta 5 autos", precio: 80 },
    ]
  },
  mediano: {
    catering: [
      { nombre: "Coffee Break Premium", precio: 70 },
      { nombre: "Almuerzo Corporativo", precio: 120 },
      { nombre: "Buffet Ejecutivo", precio: 150 },
    ],
    audiovisual: [
      { nombre: "Proyección HD con técnico", precio: 120 },
      { nombre: "Videoconferencia con grabación", precio: 150 },
      { nombre: "Cabina de traducción simultánea", precio: 200 },
    ],
    decoracion: [
      { nombre: "Decoración profesional", precio: 100 },
      { nombre: "Banners y señalización", precio: 120 },
      { nombre: "Diseño temático de evento", precio: 150 },
    ],
    apoyo: [
      { nombre: "1 Persona de apoyo", precio: 60 },
      { nombre: "2 Personas de apoyo", precio: 120 }
    ],
    estacionamiento: [
      { nombre: "Hasta 3 autos", precio: 50 },
      { nombre: "Hasta 5 autos", precio: 80 },
      { nombre: "Hasta 10 autos", precio: 120 }
    ]
  },
  grande: {
    catering: [
      { nombre: "Banquete Completo", precio: 200 },
      { nombre: "Buffet Gourmet", precio: 250 },
      { nombre: "Catering Temático", precio: 300 },
    ],
    audiovisual: [
      { nombre: "Cabina de traducción simultánea", precio: 300 },
      { nombre: "Escenario Móvil", precio: 400 },
      { nombre: "Pantallas LED laterales", precio: 500 },
    ],
    decoracion: [
      { nombre: "Decoración Integral", precio: 300 },
      { nombre: "Ambientación Temática", precio: 350 },
      { nombre: "Escenografía Corporativa", precio: 400 },
    ],
    apoyo: [
      { nombre: "2 Personas de apoyo", precio: 120 },
      { nombre: "3 Personas de apoyo", precio: 180 }
    ],
    estacionamiento: [
      { nombre: "Hasta 5 autos", precio: 80 },
      { nombre: "Hasta 10 autos", precio: 120 }
    ],
    mobiliario: [
      { nombre: "100 Sillas", precio: 150 },
      { nombre: "15 Mesas redondas", precio: 180 },
    ]
  }
};

let salaSeleccionada = null;

// Mostrar tarjetas filtradas
function mostrarSalas(filtro) {
  const contenedor = document.getElementById("contenedor-tarjetas");
  contenedor.innerHTML = "";

  const salasFiltradas = salas.filter(s => filtro === "todos" || s.categoria === filtro);

  salasFiltradas.forEach((sala) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card h-100";

    // Inserta la imagen referencial al principio
    const imagen = document.createElement("img");
    imagen.src = sala.imagen;
    imagen.alt = sala.nombre;
    imagen.className = "card-img-top";

    // Crear el cuerpo de la tarjeta
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML = `
      <h5 class="card-title">${sala.nombre}</h5>
      <p class="card-text"><strong>Capacidad:</strong> ${sala.capacidad} personas</p>
      <p class="card-text">${sala.descripcion}</p>
      <ul>${sala.servicios.map(s => `<li>${s}</li>`).join("")}</ul>
      <p class="card-text"><strong>S/. ${sala.precio.toFixed(2)}</strong></p>
    `;

    // Botón de reserva
    const boton = document.createElement("button");
      boton.className = "btn btn-primary";
      boton.textContent = "Seleccionar";
      boton.addEventListener("click", () => {
  salaSeleccionada = sala;
  document.getElementById("precioBase").innerHTML = `<strong>Precio base:</strong> S/. ${sala.precio.toFixed(2)}`;
  mostrarServiciosAdicionales(sala.categoria); // 🔹 AÑADIDO
  calcularTotal();
  generarCalendarioDisponibilidad(sala.nombre);
  new bootstrap.Modal(document.getElementById("modal-reserva")).show();
});

    cardBody.appendChild(boton);

    // Armar la tarjeta
    card.appendChild(imagen);
    card.appendChild(cardBody);
    col.appendChild(card);
    contenedor.appendChild(col);
  });
}

// Mostrar servicios adicionales

function mostrarServiciosAdicionales(categoria) {
  console.log("Mostrando servicios para categoría:", categoria); // <-- Añadir esto
  const contenedor = document.getElementById("servicios-adicionales");
  contenedor.innerHTML = "";

  const servicios = serviciosPorCategoria[categoria];
  let contador = 1;

  for (const tipo in servicios) {
    const grupo = servicios[tipo];
    const grupoDiv = document.createElement("div");
    grupoDiv.classList.add("mb-2");

    const label = document.createElement("label");
    label.innerHTML = `<strong>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</strong>`;
    grupoDiv.appendChild(label);

    grupo.forEach(opcion => {
      const id = `servicio_${contador++}`;
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-2";
      checkbox.value = opcion.precio;
      checkbox.id = id;
      checkbox.dataset.nombre = opcion.nombre;
      checkbox.addEventListener("change", calcularTotal);

      const label = document.createElement("label");
      label.className = "form-check-label me-3";
      label.setAttribute("for", id);
      label.textContent = `${opcion.nombre} (+S/.${opcion.precio})`;

      const wrapper = document.createElement("div");
      wrapper.className = "form-check";
      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);

      grupoDiv.appendChild(wrapper);
    });

    contenedor.appendChild(grupoDiv);
  }
}

// Calcular total
function calcularTotal() {
  let total = salaSeleccionada ? salaSeleccionada.precio : 0;
  document.querySelectorAll("#modal-reserva input[type=checkbox]").forEach(cb => {
    if (cb.checked) total += parseFloat(cb.value);
  });
  document.getElementById("totalPrecio").innerHTML = `<strong>Total:</strong> S/. ${total.toFixed(2)}`;
}

// Evento envío de reserva
document.getElementById("form-reserva").addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario || usuario.rol !== "cliente") {
    //Alert Inicio de sesión
    Swal.fire({
          icon: 'warning',
          title: 'No registrado',
          text: 'Debes iniciar sesión para generar una reserva',
          confirmButtonColor: '#f39c12'
        });
        return;
  }

  const fechaInicio = document.getElementById("fecha-inicio").value;
  const fechaFin = document.getElementById("fecha-fin").value;
  const comentarios = document.getElementById("comentarios").value;

  if (!fechaInicio || !fechaFin || new Date(fechaInicio) >= new Date(fechaFin)) {
    //Alert Fecha Inválida
    Swal.fire({
          icon: 'warning',
          title: 'Fechas Inválidas',
          text: 'Por favor seleccione una fecha correcta.',
          confirmButtonColor: '#f39c12'
        });
    return;
  }

  const serviciosSeleccionados = [];
  document.querySelectorAll("#modal-reserva .form-check-input").forEach(cb => {
    if (cb.checked) {
      const label = document.querySelector(`label[for=${cb.id}]`);
      serviciosSeleccionados.push(label ? label.innerText : "Servicio adicional");
    }
  });

  const totalTexto = document.getElementById("totalPrecio").textContent;
  const total = totalTexto.replace("Total:", "").replace("S/.", "").trim();

  const reserva = {
    id: Date.now(), // ID único para rastreo
    sala: salaSeleccionada.nombre,
    fechaInicio,
    fechaFin,
    comentarios,
    serviciosExtras: serviciosSeleccionados,
    total,
    email: usuario.email,
    nombre: usuario.nombre,
    telefono: usuario.telefono,
    rol: usuario.rol,
    cancelada: false, 
    fechaCreacion: new Date().toISOString()
  };


  let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  // Antes de guardar, evitamos duplicados exactos
const yaExiste = reservas.some(r =>
  r.email === usuario.email &&
  r.sala === reserva.sala &&
  r.fechaInicio === reserva.fechaInicio &&
  r.fechaFin === reserva.fechaFin
);

if (yaExiste) {
  //Alert cambio
  Swal.fire({
          icon: 'warning',
          title: 'Horario Duplicado',
          text: 'Por favor selecciona otro horario.',
          confirmButtonColor: '#f39c12'
        });        
  return;
}

  reserva.id = Date.now(); // ID único basado en timestamp ---Cambio de prueba
  reservas.push(reserva);
  localStorage.setItem("reservas", JSON.stringify(reservas));
  //aca se cambio alert
  Swal.fire({
  icon: 'success',
  title: '¡Reserva confirmada!',
  html: `
    <p><strong>Sala:</strong> ${reserva.sala}</p>
    <p><strong>Inicio:</strong> ${new Date(reserva.fechaInicio).toLocaleString()}</p>
    <p><strong>Fin:</strong> ${new Date(reserva.fechaFin).toLocaleString()}</p>
    <p><strong>Total:</strong> S/. ${reserva.total}</p>
  `,
  confirmButtonColor: '#1abc9c'
  }).then(() => {
  bootstrap.Modal.getInstance(document.getElementById("modal-reserva")).hide();
  });
});

// Filtros
document.querySelectorAll("#filter-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#filter-buttons button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mostrarSalas(btn.getAttribute("data-filter"));
  });
});

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  mostrarSalas("todos");
  document.querySelectorAll("#modal-reserva input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", calcularTotal);
  });
});

function generarCalendarioDisponibilidad(nombreSala) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  // Crear estructura básica
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const horas = Array.from({ length: 15 }, (_, i) => `${8 + i}:00`);

  const tabla = document.createElement("table");
  tabla.className = "table table-bordered text-center align-middle";
  
  // Cabecera
  const thead = document.createElement("thead");
  const filaCabecera = document.createElement("tr");
  filaCabecera.innerHTML = "<th>Hora</th>" + dias.map(d => `<th>${d}</th>`).join("");
  thead.appendChild(filaCabecera);
  tabla.appendChild(thead);

  // Cuerpo
  const tbody = document.createElement("tbody");

  horas.forEach(hora => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td><strong>${hora}</strong></td>`;

    dias.forEach((dia, index) => {
      const celda = document.createElement("td");

      const ahora = new Date();
      const inicioSemana = new Date(ahora.setDate(ahora.getDate() - ahora.getDay() + 1)); // lunes

      const fechaHora = new Date(inicioSemana);
      fechaHora.setDate(fechaHora.getDate() + index); // sumar días
      const [h, m] = hora.split(":");
      fechaHora.setHours(h, m);

      const ocupado = reservas.some(r =>
        r.sala === nombreSala &&
        new Date(r.fechaInicio) <= fechaHora &&
        new Date(r.fechaFin) > fechaHora
      );

      celda.textContent = ocupado ? "Ocupado" : "Libre";
      celda.className = ocupado ? "bg-danger text-white" : "bg-success text-white";
      fila.appendChild(celda);
    });

    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);

  // Mostrar en el DOM
  const contenedor = document.getElementById("calendario-disponibilidad");
  contenedor.innerHTML = "";
  contenedor.appendChild(tabla);
}




