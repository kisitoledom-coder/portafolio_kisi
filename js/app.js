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
  
    let presentes = 0;
  
    const registrarAsistencia = () => {
      const nombre = inputAsistencia.value.trim();
      if (nombre === "") return;
  
      const li = document.createElement("li");
      const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  
      li.dataset.nombre = nombre;
      li.dataset.hora = hora;
      li.innerHTML = `<span>${nombre}</span> <span>${hora}</span>`;
      listaAsistencia.prepend(li);
  
      presentes++;
      contadorAsistencia.textContent = `${presentes} presentes`;
      inputAsistencia.value = "";
      inputAsistencia.focus();
    };
  
    btnRegistrar.addEventListener("click", registrarAsistencia);
    inputAsistencia.addEventListener("keypress", (e) => {
      if (e.key === "Enter") registrarAsistencia();
    });
  
    btnCopiar.addEventListener("click", () => {
      if (presentes === 0) {
        alert("La nómina está vacía. Registra a alguien primero.");
        return;
      }
      let textoParaCopiar = "--- NÓMINA DE ASISTENCIA ---\n";
      const items = listaAsistencia.querySelectorAll("li");
      items.forEach((item) => {
        textoParaCopiar += `✅ ${item.dataset.nombre} - ${item.dataset.hora}\n`;
      });
  
      navigator.clipboard.writeText(textoParaCopiar).then(() => {
        const textoOriginal = btnCopiar.innerHTML;
        btnCopiar.innerHTML = `<i class="ph ph-check"></i> ¡Copiado!`;
        btnCopiar.style.color = "#00ff7f";
        setTimeout(() => {
          btnCopiar.innerHTML = textoOriginal;
          btnCopiar.style.color = "#a0a0b0";
        }, 2000);
      });
    });
  
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
            btnAnomalia.style.pointerEvents = 'none';
            btnAnomalia.style.backgroundColor = '#00ff00';
            btnAnomalia.style.boxShadow = '0 0 12px #00ff00';
            nodoLog.innerHTML = '> AISLANDO ANOMALÍA...<br>';
  
            const mensajes = [
                "> RASTREANDO VECTOR: [ LUCEROS ]",
                "> DENSIDAD: 9.431 μ | DISTANCIA: 305m",
                "> OBJETIVO FÍSICO:",
                "> Un fragmento reflectante que captura luz donde debería haber sombra absoluta.",
                "> [ ENLACE FÍSICO ESTABLECIDO ]"
            ];
  
            let delay = 700;
            mensajes.forEach((msg, index) => {
                setTimeout(() => {
                    nodoLog.innerHTML += msg + '<br>';
                    nodoLog.scrollTop = nodoLog.scrollHeight;
                }, delay * (index + 1));
            });
  
            setTimeout(() => {
                nodoLog.innerHTML = '> TRM-3517 EN LÍNEA.<br>> Buscando nuevos vectores...';
                btnAnomalia.style.pointerEvents = 'auto';
                btnAnomalia.style.backgroundColor = '#ff8800';
                btnAnomalia.style.boxShadow = '0 0 8px #ff8800';
                
                const randomTop = Math.floor(Math.random() * 75) + 10;
                const randomLeft = Math.floor(Math.random() * 75) + 10;
                btnAnomalia.style.top = `${randomTop}%`;
                btnAnomalia.style.left = `${randomLeft}%`;
            }, delay * mensajes.length + 3500);
        });
    }
});