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
       2. LÓGICA DE NODO 0 (Minijuego de Radar Interactivo)
       ======================================================== */
    const btnAnomalia = document.getElementById('btn-anomalia');
    const nodoLog = document.getElementById('nodo-log');

    if(btnAnomalia && nodoLog) {
        btnAnomalia.addEventListener('click', () => {
            // Evitar múltiples clics mientras se procesa
            btnAnomalia.style.pointerEvents = 'none';
            btnAnomalia.style.backgroundColor = '#00ff00'; // Se vuelve verde al capturarla
            btnAnomalia.style.boxShadow = '0 0 12px #00ff00';

            // Iniciar logeo
            nodoLog.innerHTML = '> AISLANDO ANOMALÍA...<br>';

            // Textos extraídos directamente de tu narrativa de juego
            const mensajes = [
                "> RASTREANDO VECTOR: [ LUCEROS ]",
                "> DENSIDAD: 9.431 μ | DISTANCIA: 305m",
                "> OBJETIVO FÍSICO:",
                "> Un fragmento reflectante que captura luz donde debería haber sombra absoluta.",
                "> [ ENLACE FÍSICO ESTABLECIDO ]"
            ];

            let delay = 700; // Milisegundos entre cada línea de texto

            // Efecto de terminal simulado
            mensajes.forEach((msg, index) => {
                setTimeout(() => {
                    nodoLog.innerHTML += msg + '<br>';
                    // Auto-scroll hacia abajo
                    nodoLog.scrollTop = nodoLog.scrollHeight;
                }, delay * (index + 1));
            });

            // Reiniciar el radar después de leer el mensaje para volver a jugar
            setTimeout(() => {
                nodoLog.innerHTML = '> TRM-3517 EN LÍNEA.<br>> Buscando nuevos vectores...';
                
                // Reactivar el botón y devolverle el color naranja
                btnAnomalia.style.pointerEvents = 'auto';
                btnAnomalia.style.backgroundColor = '#ff8800';
                btnAnomalia.style.boxShadow = '0 0 8px #ff8800';
                
                // Mover la anomalía a una posición aleatoria en el radar (entre 10% y 85%)
                const randomTop = Math.floor(Math.random() * 75) + 10;
                const randomLeft = Math.floor(Math.random() * 75) + 10;
                btnAnomalia.style.top = `${randomTop}%`;
                btnAnomalia.style.left = `${randomLeft}%`;

            }, delay * mensajes.length + 3500); // Esperar 3.5 segundos tras el último mensaje
        });
    }

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
