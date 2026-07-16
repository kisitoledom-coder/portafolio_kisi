document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
       1. LÓGICA DE VRIFIK ASISTENCIA (Herramienta Funcional)
       ======================================================== */
  const inputAsistencia = document.getElementById("asistencia-input");
  const btnRegistrar = document.getElementById("btn-registrar");
  const listaAsistencia = document.getElementById("lista-asistencia");
  const contadorAsistencia = document.getElementById("contador-asistencia");
  const btnCopiar = document.getElementById("btn-copiar");
  const btnLimpiar = document.getElementById("btn-limpiar");

  let presentes = 0; // Variable para llevar la cuenta

  // Función 1: Registrar a la persona
  const registrarAsistencia = () => {
    const nombre = inputAsistencia.value.trim();
    if (nombre === "") return;

    const li = document.createElement("li");
    const hora = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Guardamos los datos puros en la etiqueta para copiarlos fácilmente después
    li.dataset.nombre = nombre;
    li.dataset.hora = hora;

    li.innerHTML = `<span>${nombre}</span> <span>${hora}</span>`;
    listaAsistencia.prepend(li);

    // Actualizar contador
    presentes++;
    contadorAsistencia.textContent = `${presentes} presentes`;

    inputAsistencia.value = "";
    inputAsistencia.focus();
  };

  // Eventos para registrar (Clic y Enter)
  btnRegistrar.addEventListener("click", registrarAsistencia);
  inputAsistencia.addEventListener("keypress", (e) => {
    if (e.key === "Enter") registrarAsistencia();
  });

  // Función 2: El regalo (Copiar al portapapeles)
  btnCopiar.addEventListener("click", () => {
    if (presentes === 0) {
      alert("La nómina está vacía. Registra a alguien primero.");
      return;
    }

    let textoParaCopiar = "--- NÓMINA DE ASISTENCIA ---\n";
    const items = listaAsistencia.querySelectorAll("li");

    // Extraemos los datos de cada <li>
    items.forEach((item) => {
      textoParaCopiar += `✅ ${item.dataset.nombre} - ${item.dataset.hora}\n`;
    });

    // Usamos la API del portapapeles
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
      // Feedback visual: Cambiamos el texto temporalmente a "¡Copiado!"
      const textoOriginal = btnCopiar.innerHTML;
      btnCopiar.innerHTML = `<i class="ph ph-check"></i> ¡Copiado!`;
      btnCopiar.style.color = "#00ff7f";

      setTimeout(() => {
        btnCopiar.innerHTML = textoOriginal;
        btnCopiar.style.color = "#a0a0b0";
      }, 2000);
    });
  });

  // Función 3: Limpiar la lista para empezar de nuevo
  btnLimpiar.addEventListener("click", () => {
    if (confirm("¿Seguro que deseas borrar toda la lista?")) {
      listaAsistencia.innerHTML = "";
      presentes = 0;
      contadorAsistencia.textContent = `0 presentes`;
    }
  });

  /* ========================================================
       2. LÓGICA DE VRIFIK xPRO (Simulación de Asincronía)
       ======================================================== */
  const btnValidar = document.getElementById("btn-validar");
  const statusBox = document.getElementById("xpro-status");

  btnValidar.addEventListener("click", () => {
    // Estado 1: Cargando
    statusBox.className = "status-box loading";
    statusBox.textContent = "Analizando credenciales...";
    btnValidar.disabled = true;

    // Simulamos una petición a servidor (API request) de 2 segundos
    setTimeout(() => {
      // Estado 2: Validado
      statusBox.className = "status-box valid";
      statusBox.innerHTML = "✔ Profesional Aprobado";

      // Reiniciar para volver a jugar después de 3 segundos
      setTimeout(() => {
        statusBox.className = "status-box";
        statusBox.textContent = "Esperando documento...";
        btnValidar.disabled = false;
      }, 3000);
    }, 1500);
  });

  /* ========================================================
       3. LÓGICA DE VRIFIK CTO (Cálculo de Porcentajes)
       ======================================================== */
  const checkboxes = document.querySelectorAll(".cto-check");
  const progressBar = document.getElementById("cto-progress-bar");

  const actualizarProgreso = () => {
    const total = checkboxes.length;
    // Filtramos cuántos checkboxes están seleccionados
    const completados = Array.from(checkboxes).filter(
      (chk) => chk.checked,
    ).length;

    // Calculamos el porcentaje matemático
    const porcentaje = Math.round((completados / total) * 100);

    // Actualizamos la interfaz
    progressBar.style.width = `${porcentaje}%`;
    progressBar.textContent = `${porcentaje}%`;

    // Cambio de color visual si llega al 100%
    if (porcentaje === 100) {
      progressBar.style.backgroundColor = "#00ff7f";
      progressBar.style.color = "#000";
    } else {
      progressBar.style.backgroundColor = "#ff007f";
      progressBar.style.color = "#fff";
    }
  };

  // Escuchamos cambios en cada checkbox
  checkboxes.forEach((chk) => {
    chk.addEventListener("change", actualizarProgreso);
  });
});
