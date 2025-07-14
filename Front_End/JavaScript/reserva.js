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

//Datos de turnos Disponibles

const turnosDisponibles = [
  { inicio: "08:00", fin: "11:00" },
  { inicio: "12:00", fin: "15:00" },
  { inicio: "16:00", fin: "19:00" },
  { inicio: "20:00", fin: "23:00" }
];

//Datos servicios Adicionales:

const serviciosMultiples = ["audiovisual", "mobiliario"];

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
      { nombre: "30 Sillas", precio: 100 },
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
      console.log("Clic en seleccionar");
      salaSeleccionada = sala;
      document.getElementById("precioBase").innerHTML = `<strong>Precio base:</strong> S/. ${sala.precio.toFixed(2)}`;
      mostrarServiciosAdicionales(sala.categoria); // 🔹 AÑADIDO
      mostrarTurnosDisponibles(); // Muestra los turnos al abrir el modal
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

// Mostrar Turnos Disponibles

function mostrarTurnosDisponibles() {
  const contenedor = document.getElementById("turnos-disponibles");
  contenedor.innerHTML = "";

  turnosDisponibles.forEach((turno, i) => {
    const id = `turno_${i}`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    checkbox.className = "form-check-input me-2 turno-checkbox";
    checkbox.dataset.inicio = turno.inicio;
    checkbox.dataset.fin = turno.fin;
    checkbox.addEventListener("change", calcularTotal);

    const label = document.createElement("label");
    label.className = "form-check-label me-3";
    label.setAttribute("for", id);
    label.textContent = `Turno ${i + 1}: ${turno.inicio} - ${turno.fin}`;

    const wrapper = document.createElement("div");
    wrapper.className = "form-check";
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    contenedor.appendChild(wrapper);
  });
}

//Turnos consecutivos

function turnosSonConsecutivos(indices) {
  return indices.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
}

// Mostrar servicios adicionales

function mostrarServiciosAdicionales(categoria) {
  console.log("Mostrando servicios para categoría:", categoria);
  const contenedor = document.getElementById("servicios-adicionales");
  contenedor.innerHTML = "";

  const servicios = serviciosPorCategoria[categoria];
  let contador = 1;

  for (const tipo in servicios) {
    const grupo = servicios[tipo];

    const grupoDiv = document.createElement("div");
    grupoDiv.classList.add("mb-3");

    const titulo = document.createElement("label");
    titulo.innerHTML = `<strong>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</strong>`;
    grupoDiv.appendChild(titulo);

    grupo.forEach(opcion => {
      const id = `servicio_${contador++}`;
      const input = document.createElement("input");

      const esMultiple = serviciosMultiples.includes(tipo);
      input.type = esMultiple ? "checkbox" : "radio";
      input.name = esMultiple ? `${tipo}_${id}` : tipo; // radio comparte nombre; checkbox no
      input.className = "form-check-input me-2";
      input.value = opcion.precio;
      input.id = id;
      input.dataset.nombre = opcion.nombre;
      input.addEventListener("change", calcularTotal);

      const label = document.createElement("label");
      label.className = "form-check-label";
      label.setAttribute("for", id);
      label.textContent = `${opcion.nombre} (+S/.${opcion.precio})`;

      const wrapper = document.createElement("div");
      wrapper.className = "form-check";
      wrapper.appendChild(input);
      wrapper.appendChild(label);

      grupoDiv.appendChild(wrapper);
    });

    const col = document.createElement("div");
    col.className = "col-md-6"; // dos columnas
    col.appendChild(grupoDiv);
    contenedor.appendChild(col);
  }
}

// Calcular total
 function calcularTotal() {
  let total = 0;

  if (salaSeleccionada) {
    const turnosSeleccionados = document.querySelectorAll(".turno-checkbox:checked").length;
    total += salaSeleccionada.precio * turnosSeleccionados;
    document.getElementById("precioBase").innerHTML = `<strong>Precio base:</strong> S/. ${(salaSeleccionada.precio * turnosSeleccionados).toFixed(2)}`;
  }

  document.querySelectorAll("#modal-reserva .form-check-input").forEach(input => {
  if (input.checked && !input.classList.contains("turno-checkbox")) {
    const valor = parseFloat(input.value);
    if (!isNaN(valor)) {
      total += valor;
    }
  }
  });

    // Calcular recargos o descuentos por anticipación

   const inputFechaInicio = document.getElementById("fecha-inicio");
let fechaReserva = null;
let diferenciaDias = 0;
let ajuste = 0;
let mensajeAjuste = "";

if (inputFechaInicio && inputFechaInicio.value) {
  fechaReserva = new Date(inputFechaInicio.value);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Solo fecha sin hora

  diferenciaDias = Math.floor((fechaReserva - hoy) / (1000 * 60 * 60 * 24));

  if (diferenciaDias === 1) {
    ajuste = total * 0.15;
    total += ajuste;
    mensajeAjuste = " (+15% recargo por reservar con 1 día de anticipación)";
  } else if (diferenciaDias > 15) {
    ajuste = total * 0.10;
    total -= ajuste;
    mensajeAjuste = " (–10% por reserva anticipada)";
  } else if (diferenciaDias > 7) {
    ajuste = total * 0.05;
    total -= ajuste;
    mensajeAjuste = " (–5% por reserva anticipada)";
  }
}

document.getElementById("totalPrecio").innerHTML = `<strong>Total:</strong> S/. ${total.toFixed(2)}${mensajeAjuste}`;
 
  
}

// Evento envío de reserva
document.getElementById("form-reserva").addEventListener("submit", (e) => {
  
  e.preventDefault();

  const turnosSeleccionadosInputs = document.querySelectorAll(".turno-checkbox:checked");
  const fechaBase = document.getElementById("fecha-inicio").value;

  // Obtener índices de turnos seleccionados
  const indicesSeleccionados = Array.from(turnosSeleccionadosInputs)
  .map(cb => parseInt(cb.id.split("_")[1]))
  .sort((a, b) => a - b);

  // Validar que sean consecutivos
const sonConsecutivos = indicesSeleccionados.every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);

if (!sonConsecutivos) {
  Swal.fire({
    icon: 'warning',
    title: 'Turnos no válidos',
    text: 'Solo puedes seleccionar turnos consecutivos en una sola reserva. Si deseas turnos no consecutivos, debes hacer reservas por separado.',
    confirmButtonColor: '#f39c12'
  });
  return;
}

  // Calcular fechaFin en base al último turno
  const turnoFinal = turnosDisponibles[indicesSeleccionados[indicesSeleccionados.length - 1]];
  const fechaFin = new Date(fechaBase);
  const [horaFin, minutoFin] = turnoFinal.fin.split(":");
  fechaFin.setHours(parseInt(horaFin), parseInt(minutoFin), 0, 0);

  const turnosSeleccionados = Array.from(turnosSeleccionadosInputs).map(cb => {
    const inicio = cb.dataset.inicio;
    const fin = cb.dataset.fin;

    return {
      fecha: fechaBase,
      horaInicio: inicio,
      horaFin: fin
    };
  });
  
  
  if (turnosSeleccionados.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Turnos no seleccionados',
      text: 'Por favor selecciona al menos un turno para la reserva.',
      confirmButtonColor: '#f39c12'
    });
    return;
  }

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

     if (!fechaInicio) {
      Swal.fire({
        icon: 'warning',
        title: 'Fecha no seleccionada',
        text: 'Debes seleccionar una fecha de inicio.',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

   // Calcular diferencia de días
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const fechaReserva = new Date(fechaInicio);
      fechaReserva.setHours(0, 0, 0, 0);

      const diferenciaDias = Math.floor((fechaReserva - hoy) / (1000 * 60 * 60 * 24));

      if (diferenciaDias < 1) {
        Swal.fire({
          icon: 'error',
          title: 'Reserva demasiado cercana',
          text: 'Las reservas deben realizarse al menos con 1 día de anticipación.',
          confirmButtonColor: '#e74c3c'
        });
        return;
      }

      //  Ahora que ya tienes diferenciaDias, puedes calcular el ajuste

      const totalTexto = document.getElementById("totalPrecio").textContent;
      const total = totalTexto.replace("Total:", "").replace("S/.", "").trim();

      let ajusteTexto = "";
      let totalFinal = parseFloat(total);

      if (diferenciaDias === 1) {
        totalFinal *= 1.15;
        ajusteTexto = "Recargo por reserva urgente (+15%)";
      } else if (diferenciaDias > 15) {
        totalFinal *= 0.90;
        ajusteTexto = "Descuento por reserva anticipada (-10%)";
      } else if (diferenciaDias > 7) {
        totalFinal *= 0.95;
        ajusteTexto = "Descuento por reserva anticipada (-5%)";
  }

  totalFinal = totalFinal.toFixed(2);       

  const serviciosSeleccionados = [];
  document.querySelectorAll("#modal-reserva .form-check-input").forEach(cb => {
    if (cb.checked) {
      const label = document.querySelector(`label[for=${cb.id}]`);
      serviciosSeleccionados.push(label ? label.innerText : "Servicio adicional");
    }
  });

  const comentarios = document.getElementById("comentarios").value;

  const reserva = {
  id: Date.now(),
  sala: salaSeleccionada.nombre,
  fechaInicio,
  fechaFin: fechaFin.toISOString(),
  comentarios,
  serviciosExtras: serviciosSeleccionados,
  turnos: turnosSeleccionados, // <<--- turnos con hora y fecha exacta
  total: totalFinal,
  ajuste: ajusteTexto,
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
    ${reserva.ajuste ? `<p><strong>${reserva.ajuste}</strong></p>` : ""}
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

  document.getElementById("semana-anterior").addEventListener("click", () => {
  fechaBaseCalendario.setDate(fechaBaseCalendario.getDate() - 7);
  generarCalendarioDisponibilidad(salaSeleccionada.nombre, fechaBaseCalendario);
});

  document.getElementById("semana-siguiente").addEventListener("click", () => {
  fechaBaseCalendario.setDate(fechaBaseCalendario.getDate() + 7);
  generarCalendarioDisponibilidad(salaSeleccionada.nombre, fechaBaseCalendario);
});

  document.querySelectorAll("#modal-reserva input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", calcularTotal);
  });
});

let fechaBaseCalendario = obtenerLunes(new Date()); // comienza en esta semana

function normalizar(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function generarCalendarioDisponibilidad(nombreSala, fechaBase = fechaBaseCalendario) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const tabla = document.createElement("table");
  tabla.className = "table table-bordered text-center align-middle";

  // Cabecera con días + fechas reales
  const thead = document.createElement("thead");
  const filaCabecera = document.createElement("tr");
  filaCabecera.innerHTML = "<th>Turno</th>";

  const fechasSemana = [];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(fechaBase);
    fecha.setDate(fecha.getDate() + i);
    fechasSemana.push(new Date(fecha));

    const diaTexto = `${dias[i]}<br><small>${fecha.toLocaleDateString()}</small>`;
    filaCabecera.innerHTML += `<th>${diaTexto}</th>`;
  }

  thead.appendChild(filaCabecera);
  tabla.appendChild(thead);

  // Cuerpo con turnos
  const tbody = document.createElement("tbody");

  turnosDisponibles.forEach(turno => {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td><strong>${turno.inicio} – ${turno.fin}</strong></td>`;

    fechasSemana.forEach(fecha => {
      const inicioTurno = new Date(fecha);
      const [hIni, mIni] = turno.inicio.split(":");
      inicioTurno.setHours(parseInt(hIni), parseInt(mIni), 0, 0);

      const finTurno = new Date(fecha);
      const [hFin, mFin] = turno.fin.split(":");
      finTurno.setHours(parseInt(hFin), parseInt(mFin), 0, 0);

      const ocupado = reservas.some(r =>
        normalizar(r.sala) === normalizar(nombreSala) &&
        new Date(r.fechaInicio) <= inicioTurno &&
        new Date(r.fechaFin) > inicioTurno
      );

      const celda = document.createElement("td");
      celda.textContent = ocupado ? "Ocupado" : "Libre";
      celda.className = ocupado ? "bg-danger text-white" : "bg-success text-white";
      fila.appendChild(celda);
    });

    tbody.appendChild(fila);
  });

  tabla.appendChild(tbody);

  //mostrar en el DOM

  const contenedor = document.getElementById("calendario-disponibilidad");
  contenedor.innerHTML = "";
  contenedor.appendChild(tabla);

  // Actualizar el rango de fechas arriba del calendario
  const inicio = fechasSemana[0].toLocaleDateString();
  const fin = fechasSemana[6].toLocaleDateString();
  document.getElementById("rango-semana").textContent = `Semana: ${inicio} – ${fin}`;
}

function obtenerLunes(fecha) {
  const d = new Date(fecha);
  const dia = d.getDay(); // 0 = domingo, 1 = lunes
  const diferencia = dia === 0 ? -6 : 1 - dia;
  d.setDate(d.getDate() + diferencia);
  d.setHours(0, 0, 0, 0);
  return d;
}



