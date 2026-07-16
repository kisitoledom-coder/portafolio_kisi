document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. LÓGICA DE VRIFIK ASISTENCIA (Gestión de Listas DOM)
       ======================================================== */
    const inputAsistencia = document.getElementById('asistencia-input');
    const btnRegistrar = document.getElementById('btn-registrar');
    const listaAsistencia = document.getElementById('lista-asistencia');

    const registrarAsistencia = () => {
        const nombre = inputAsistencia.value.trim();
        if (nombre === '') return;

        const li = document.createElement('li');
        const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        li.innerHTML = `<span>${nombre}</span> <span>${hora}</span>`;
        listaAsistencia.prepend(li); // Prepend para que el más nuevo salga arriba
        
        inputAsistencia.value = '';
        inputAsistencia.focus();
    };

    btnRegistrar.addEventListener('click', registrarAsistencia);
    inputAsistencia.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') registrarAsistencia();
    });

    /* ========================================================
       2. LÓGICA DE VRIFIK xPRO (Simulación de Asincronía)
       ======================================================== */
    const btnValidar = document.getElementById('btn-validar');
    const statusBox = document.getElementById('xpro-status');

    btnValidar.addEventListener('click', () => {
        // Estado 1: Cargando
        statusBox.className = 'status-box loading';
        statusBox.textContent = 'Analizando credenciales...';
        btnValidar.disabled = true;

        // Simulamos una petición a servidor (API request) de 2 segundos
        setTimeout(() => {
            // Estado 2: Validado
            statusBox.className = 'status-box valid';
            statusBox.innerHTML = '✔ Profesional Aprobado';
            
            // Reiniciar para volver a jugar después de 3 segundos
            setTimeout(() => {
                statusBox.className = 'status-box';
                statusBox.textContent = 'Esperando documento...';
                btnValidar.disabled = false;
            }, 3000);

        }, 1500);
    });

    /* ========================================================
       3. LÓGICA DE VRIFIK CTO (Cálculo de Porcentajes)
       ======================================================== */
    const checkboxes = document.querySelectorAll('.cto-check');
    const progressBar = document.getElementById('cto-progress-bar');

    const actualizarProgreso = () => {
        const total = checkboxes.length;
        // Filtramos cuántos checkboxes están seleccionados
        const completados = Array.from(checkboxes).filter(chk => chk.checked).length;
        
        // Calculamos el porcentaje matemático
        const porcentaje = Math.round((completados / total) * 100);
        
        // Actualizamos la interfaz
        progressBar.style.width = `${porcentaje}%`;
        progressBar.textContent = `${porcentaje}%`;

        // Cambio de color visual si llega al 100%
        if (porcentaje === 100) {
            progressBar.style.backgroundColor = '#00ff7f';
            progressBar.style.color = '#000';
        } else {
            progressBar.style.backgroundColor = '#ff007f';
            progressBar.style.color = '#fff';
        }
    };

    // Escuchamos cambios en cada checkbox
    checkboxes.forEach(chk => {
        chk.addEventListener('change', actualizarProgreso);
    });

});