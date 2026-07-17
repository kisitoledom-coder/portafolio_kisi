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
    const hora = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

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
         2. LÓGICA DE NODO 0 (Simulador de Triangulación GPS)
         ======================================================== */
    const btnAnomalia = document.getElementById('btn-anomalia');
    const nodoLog = document.getElementById('nodo-log');
    const nodoDistancia = document.getElementById('nodo-distancia');
    const nodoDensidad = document.getElementById('nodo-densidad');
    const nodoObjetivo = document.getElementById('nodo-objetivo');

    if(btnAnomalia && nodoLog) {
        btnAnomalia.addEventListener('click', () => {
            // 1. Bloqueamos el botón y cambiamos el estado visual
            btnAnomalia.style.pointerEvents = 'none';
            btnAnomalia.style.backgroundColor = '#00ff00';
            btnAnomalia.style.boxShadow = '0 0 15px #00ff00';
            
            nodoLog.innerHTML = '> ESTABLECIENDO ENLACE...<br>';
            nodoObjetivo.textContent = "Un fragmento reflectante que captura luz donde debería haber sombra absoluta.";
            
            let distancia = 100; // Distancia inicial en metros
            let densidad = 0.312;
            nodoDistancia.textContent = distancia;
            nodoDensidad.textContent = densidad;

            // 2. Imprimimos el primer mensaje
            setTimeout(() => {
                nodoLog.innerHTML += '> RASTREANDO VECTOR: [ LUCEROS ]<br>';
                nodoLog.innerHTML += '> Ajustando triangulación...<br>';
                nodoLog.scrollTop = nodoLog.scrollHeight;
            }, 800);

// 3. Simulamos el movimiento físico reduciendo la distancia cada 100ms
            setTimeout(() => {
                const intervaloCaminata = setInterval(() => {
                    distancia -= 4; // Bajamos de 4 en 4 metros
                    densidad += 0.055; // Sube la densidad
                    
                    if(distancia <= 0) {
                        distancia = 0;
                        clearInterval(intervaloCaminata); // Detenemos el reloj
                        
                        // Mensaje de éxito al llegar a 0 metros
                        nodoLog.innerHTML += '<br><span style="color:#00ff00;">> [ ENLACE FÍSICO ESTABLECIDO ]</span><br>';
                        nodoLog.innerHTML += '> Desplegando archivo visual...<br>';
                        nodoLog.scrollTop = nodoLog.scrollHeight;
                        
                        // ¡LA MAGIA! Abrimos el pop-up con la foto 1 segundo después de llegar
                        setTimeout(() => {
                            if (typeof abrirModal === 'function') {
                                abrirModal(galeriaAnomalias);
                            }
                        }, 1000);
                        
                        // Reiniciamos el minijuego en el fondo
                        setTimeout(reiniciarRadar, 5000);
                    }
                    
                    nodoDistancia.textContent = distancia;
                    nodoDensidad.textContent = densidad.toFixed(3);
                }, 150); // Velocidad a la que bajan los números
            }, 2000);
        });

        function reiniciarRadar() {
            nodoLog.innerHTML = '> TRM-3517 EN LÍNEA.<br>> Buscando nuevos vectores...';
            nodoObjetivo.textContent = "Esperando enlace... Haz clic en la anomalía del radar.";
            nodoDistancia.textContent = "---";
            nodoDensidad.textContent = "0.000";
            
            btnAnomalia.style.pointerEvents = 'auto';
            btnAnomalia.style.backgroundColor = '#ff8800';
            btnAnomalia.style.boxShadow = '0 0 8px #ff8800';
            
            // Movemos el punto a un lugar aleatorio
            btnAnomalia.style.top = `${Math.floor(Math.random() * 70) + 10}%`;
            btnAnomalia.style.left = `${Math.floor(Math.random() * 70) + 10}%`;
        }
    }

  /* ========================================================
       LÓGICA DE VENTANA MODAL DINÁMICA Y CARRUSEL
       ======================================================== */
  const modal = document.getElementById("ux-modal");
  const btnCerrar = document.getElementById("btn-cerrar-modal");
  const modalImg = document.getElementById("modal-img-dinamica");

  // Controles del carrusel
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const indicator = document.getElementById("carousel-indicator");

  // Botones de cada proyecto
  const btnVerSpecs = document.getElementById("btn-ver-specs");
  const btnVerJuguetes = document.getElementById("btn-ver-juguetes");
  const btnVerK13 = document.getElementById("btn-ver-k13");

  //LOS ARRAYS DE CADA GALERÍA (RUTA DE IMÁGENES)

  const galeriaSpecs = [
    "img/vrifik-ui.png", // nombre que tenga la imagen de UI
  ];

  const galeriaJuguetes = [
    "img/tutu.png",
    "img/tutu_2.png",
    "img/alfabetizador-braille.png",
    "img/cohete-2.png",
    "img/espada.png",
    "img/juguete_1.png",
    "img/simpsons.png",
    "img/violin.png",
    "img/helicoptero.png",
    "img/novios.png",
  ];

  const galeriaK13 = [
    "img/k13-1.png",
    "img/k13-diamante.png",
    "img/k13-credito.png",
    "img/k13-like.png",
    "img/k13-soup.png",
    "img/k13-tv.png",
    "img/k13-love.png",
    "img/k13-punk.png",
  ];

  // NUEVA GALERÍA: Evidencia de Observador Cero
    const galeriaAnomalias = [
        'img/anomalia.png' // <-- Asegúrate de guardar una foto con este nombre (o cámbialo al de tu foto)
    ];

  // Actualiza la foto y el contador
  const actualizarImagen = () => {
    modalImg.src = currentGallery[currentIndex];
    indicator.textContent = `${currentIndex + 1} / ${currentGallery.length}`;

    // Si hay solo 1 foto, escondemos las flechas
    if (currentGallery.length <= 1) {
      btnPrev.style.display = "none";
      btnNext.style.display = "none";
      indicator.style.display = "none";
    } else {
      btnPrev.style.display = "flex";
      btnNext.style.display = "flex";
      indicator.style.display = "block";
    }
  };

  // Función que abre el modal y carga la galería seleccionada
  const abrirModal = (galeria) => {
    if (modalImg && modal) {
      currentGallery = galeria;
      currentIndex = 0; // Inicia siempre en la primera foto
      actualizarImagen();
      modal.classList.add("active");
    }
  };

  // Eventos de flechas (Avanzar / Retroceder)
  if (btnNext) {
    btnNext.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el clic cierre el modal
      currentIndex = (currentIndex + 1) % currentGallery.length;
      actualizarImagen();
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que el clic cierre el modal
      currentIndex =
        (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      actualizarImagen();
    });
  }

  // Asignamos los botones a sus respectivas galerías
  if (btnVerSpecs)
    btnVerSpecs.addEventListener("click", () => abrirModal(galeriaSpecs));
  if (btnVerJuguetes)
    btnVerJuguetes.addEventListener("click", () => abrirModal(galeriaJuguetes));
  if (btnVerK13)
    btnVerK13.addEventListener("click", () => abrirModal(galeriaK13));

  // Lógica para cerrar el modal
  if (btnCerrar && modal) {
    btnCerrar.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    // Cerrar al hacer clic en el fondo oscuro
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  /* ========================================================
       5. LÓGICA DE CAPSETA_CORE (Simulador del Script)
       ======================================================== */
  const btnGenerarCurso = document.getElementById("btn-generar-curso");
  const selectRubro = document.getElementById("capseta-rubro");
  const selectNivel = document.getElementById("capseta-nivel");
  const capsetaLog = document.getElementById("capseta-log");

  if (btnGenerarCurso && capsetaLog) {
    btnGenerarCurso.addEventListener("click", () => {
      const rubro = selectRubro.value;
      const nivel = selectNivel.value;

      // Bloquear botón durante el proceso
      btnGenerarCurso.disabled = true;
      btnGenerarCurso.style.opacity = "0.5";
      btnGenerarCurso.innerHTML =
        '<i class="ph ph-spinner-gap"></i> Ejecutando Script...';

      capsetaLog.innerHTML = "> processForm(data) iniciado...<br>";

      // Textos simulando el código real de Apps Script
      const scriptPasos = [
        `> Validación Server-Side: Rubro [${rubro}], Nivel [${nivel}]... OK`,
        "> buildTechnicalProposal() invocado.",
        "> Leyendo Sheet: '02_APRENDIZAJES_DB'...",
        "> Ejecutando algoritmo de ponderación (Ajuste + Nivel)...",
        "> Inyectando Matriz de Secuencia en Plantilla Google Docs...",
        "> Escribiendo bitácora en '01_INPUT_LOG'...",
        `> [ ÉXITO ] PRO_TECNICA_${rubro.toUpperCase()}_2026.pdf exportado.`,
      ];

      let delay = 600;

      scriptPasos.forEach((paso, index) => {
        setTimeout(
          () => {
            capsetaLog.innerHTML += paso + "<br>";
            capsetaLog.scrollTop = capsetaLog.scrollHeight;
          },
          delay * (index + 1),
        );
      });

      // Reiniciar estado
      setTimeout(
        () => {
          btnGenerarCurso.disabled = false;
          btnGenerarCurso.style.opacity = "1";
          btnGenerarCurso.innerHTML =
            '<i class="ph ph-file-pdf"></i> Generar Arquitectura';
          capsetaLog.innerHTML +=
            "<br>> Enlace PDF generado (Simulación). Listo para nueva petición.<br><br>";
          capsetaLog.scrollTop = capsetaLog.scrollHeight;
        },
        delay * scriptPasos.length + 1000,
      );
    });
  }
  // Lógica para el botón de "Volver Arriba" en el Footer
  const btnSubir = document.getElementById("btn-subir");
  if (btnSubir) {
    btnSubir.addEventListener("click", (e) => {
      e.preventDefault(); // Evita que modifique la URL
      window.scrollTo({ top: 0, behavior: "smooth" }); // Sube suavemente
    });
  }
});
