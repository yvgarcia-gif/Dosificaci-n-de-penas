/**
 * IURISDOSIS COLOMBIA — DOSIFICADOR PENAL & SISTEMA DE CUARTOS
 * Ley 599 de 2000 (Código Penal) & Ley 906 de 2004 (Código de Procedimiento Penal)
 * 
 * MÓDULO 1: Estado Global, Navegación e Ingreso de Hechos y Parámetros
 * Paleta Institucional: Rojo Vino Tinto (#58111A / #721B28), Negro (#0E1015) y Blanco (#FFFFFF).
 */

// ============================================================
// 1. ESTADO GLOBAL DE LA APLICACIÓN (AppState)
// ============================================================
const AppState = {
  activeTab: 'hechos',

  // Parámetros estructurados del caso penal concreto
  caso: {
    radicado: '110016000000202300452',
    etapa: 'acusacion',
    fiscalia: 'Fiscalía 45 Seccional de Vida de Bogotá',
    juzgado: 'Juzgado 12 Penal del Circuito con Funciones de Conocimiento',
    procesado: 'Julián David Morales Reyes',
    fecha: '2023-04-18',
    narrativa: `El día 18 de abril de 2023, aproximadamente a las 22:45 horas, en vía pública del barrio Kennedy Central de la ciudad de Bogotá, el imputado JULIÁN DAVID MORALES REYES, valiéndose de un arma cortopunzante y en coparticipación criminal con otro sujeto no individualizado, abordó intempestivamente a la víctima Pedro José Suárez cuando éste se encontraba en total estado de indefensión. 

El agresor propinó más de doce heridas reiteradas y profundas en tórax y extremidades con el propósito inequívoco de causar un padecimiento deliberado e inhumano antes de segar su vida (sevicia probada), ocasionando el deceso en el lugar de los hechos sin posibilidad de auxilio oportuno.`,
    
    // Calificación típica y factores modificadores
    delitoBase: '103',
    agravanteEspecifico: '104_7',
    intervencion: 'autor_directo',
    consumacion: 'consumado',
    culpabilidad: 'dolo',

    // Límites legales en meses
    minMeses: 400,
    maxMeses: 600,

    // Beneficios por allanamiento o preacuerdo
    allanamientoEtapa: 'imputacion',
    rebajaPorcentaje: 40,
    prohibicionArt199: false,
    prohibicionArt68A: false,

    // Circunstancias Arts. 55 y 58 C.P.
    atenuantesCount: 1,
    agravantesCount: 1,
    cuartoResultante: 'medios' // 'minimo' | 'medios' | 'maximo'
  }
};

// ============================================================
// 2. CONTROL DE NAVEGACIÓN INSTITUCIONAL (AppNav)
// ============================================================
const AppNav = {
  tabs: ['hechos', 'delitos', 'calculadora', 'justificacion', 'ayuda'],

  switchTab(targetTab) {
    if (!this.tabs.includes(targetTab)) return;
    AppState.activeTab = targetTab;

    // Alternar visibilidad de secciones
    this.tabs.forEach(tabKey => {
      const panel = document.getElementById(`panel-${tabKey}`);
      const navBtn = document.getElementById(`nav-btn-${tabKey}`);

      if (panel) {
        if (tabKey === targetTab) {
          panel.classList.remove('hidden');
          panel.classList.add('flex');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('flex');
        }
      }

      // Estilo de botones en desktop
      if (navBtn) {
        if (tabKey === targetTab) {
          navBtn.className = "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 bg-dark text-white shadow-sm";
        } else {
          navBtn.className = "px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white transition-all flex items-center gap-1.5";
        }
      }
    });

    // Actualizar barra de navegación móvil
    const mobileButtons = document.querySelectorAll('nav.md\\:hidden button');
    mobileButtons.forEach((btn, index) => {
      const tabName = this.tabs[index];
      if (tabName === targetTab) {
        btn.classList.add('text-wine');
        btn.classList.remove('text-slate-500');
      } else {
        btn.classList.remove('text-wine');
        btn.classList.add('text-slate-500');
      }
    });

    // Sincronizar el módulo activado
    if (targetTab === 'delitos' && typeof CatalogoManager !== 'undefined') {
      CatalogoManager.renderizar();
    } else if (targetTab === 'calculadora' && typeof CalculadoraManager !== 'undefined') {
      CalculadoraManager.sincronizarDesdeCaso();
    } else if (targetTab === 'justificacion' && typeof JustificacionManager !== 'undefined') {
      JustificacionManager.generarMemoria();
    } else if (targetTab === 'ayuda' && typeof AyudaIA_Manager !== 'undefined') {
      AyudaIA_Manager.init();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// ============================================================
// 3. CONTROL DE NARRATIVA FÁCTICA (HechosAnalizador)
// ============================================================
const HechosAnalizador = {
  init() {
    const textarea = document.getElementById('caso-narrativa');
    if (textarea) {
      textarea.addEventListener('input', () => this.actualizarConteo());
      this.actualizarConteo();
    }
  },

  actualizarConteo() {
    const textarea = document.getElementById('caso-narrativa');
    const label = document.getElementById('caso-conteo-texto');
    if (!textarea) return;

    const texto = textarea.value.trim();
    const palabras = texto ? texto.split(/\s+/).length : 0;
    const caracteres = texto.length;
    if (label) {
      label.textContent = `${palabras} palabras • ${caracteres} caracteres`;
    }
    AppState.caso.narrativa = textarea.value;
  }
};

// ============================================================
// 4. GESTOR DE CALIFICACIÓN Y EXTREMOS LEGALES (CalificacionManager)
// ============================================================
const CalificacionManager = {
  actualizarExtremos() {
    const baseSelect = document.getElementById('caso-delito-base');
    const agravanteSelect = document.getElementById('caso-agravante-especifico');
    const baseDisplay = document.getElementById('caso-extremos-legales');
    const defDisplay = document.getElementById('caso-extremos-definitivos');

    if (!baseSelect || !agravanteSelect || !baseDisplay || !defDisplay) return;

    const baseVal = baseSelect.value;
    const agravVal = agravanteSelect.value;
    AppState.caso.delitoBase = baseVal;
    AppState.caso.agravanteEspecifico = agravVal;

    let min = 208;
    let max = 450;
    let textoBase = "Pena Base: 208 a 450 Meses (17a 4m a 37a 6m)";
    let textoDef = "400 a 600 Meses (Sevicia / Indefensión)";

    if (baseVal === '103') {
      textoBase = "Pena Base: 208 a 450 Meses (Art. 103 C.P.)";
      if (agravVal === 'ninguno') {
        min = 208;
        max = 450;
        textoDef = "208 a 450 Meses (Sin agravante específico)";
      } else {
        min = 400;
        max = 600;
        textoDef = "400 a 600 Meses (Art. 104 Num. 7 C.P.)";
      }
    } else if (baseVal === '104') {
      min = 400;
      max = 600;
      textoBase = "Pena Base: 400 a 600 Meses (33a 4m a 50a)";
      textoDef = "Marco Típico Agravado: 400 a 600 Meses";
    } else if (baseVal === '239') {
      min = 32;
      max = 108;
      textoBase = "Pena Base: 32 a 108 Meses (2a 8m a 9a)";
      textoDef = "Hurto Simple: 32 a 108 Meses";
    } else if (baseVal === '240') {
      min = 72;
      max = 168;
      textoBase = "Pena Base: 72 a 168 Meses (6a a 14a)";
      textoDef = "Hurto Calificado: 72 a 168 Meses";
    } else if (baseVal === '244') {
      min = 192;
      max = 288;
      textoBase = "Pena Base: 192 a 288 Meses (16a a 24a)";
      textoDef = "Extorsión Básica: 192 a 288 Meses";
    } else if (baseVal === '365') {
      min = 108;
      max = 144;
      textoBase = "Pena Base: 108 a 144 Meses (9a a 12a)";
      textoDef = "Porte de Armas: 108 a 144 Meses";
    }

    AppState.caso.minMeses = min;
    AppState.caso.maxMeses = max;
    baseDisplay.textContent = textoBase;
    defDisplay.textContent = textoDef;
  }
};

// ============================================================
// 5. GESTOR DE ALLANAMIENTOS Y CONTROL DE PROHIBICIONES (AllanamientoManager)
// ============================================================
const AllanamientoManager = {
  actualizarSlider() {
    const slider = document.getElementById('slider-rebaja-pactada');
    const label = document.getElementById('label-rebaja-porcentaje');
    if (!slider || !label) return;

    if (AppState.caso.prohibicionArt199 || AppState.caso.prohibicionArt68A) {
      label.textContent = "0% (Prohibición Legal)";
      label.className = "font-mono font-bold text-wine-dark";
      AppState.caso.rebajaPorcentaje = 0;
      return;
    }

    const val = Number(slider.value);
    AppState.caso.rebajaPorcentaje = val;
    label.textContent = `${val}% Rebaja`;
    label.className = "font-mono font-bold text-wine";

    if (typeof CalculadoraManager !== 'undefined' && CalculadoraManager.quantumMeses) {
      CalculadoraManager.actualizarQuantum(CalculadoraManager.quantumMeses);
    }
  },

  verificarProhibiciones() {
    const check199 = document.getElementById('check-art199');
    const alerta = document.getElementById('alerta-prohibicion-bloqueo');
    const slider = document.getElementById('slider-rebaja-pactada');
    const label = document.getElementById('label-rebaja-porcentaje');

    if (!check199 || !alerta || !slider || !label) return;

    const bloqueado = check199.checked;
    AppState.caso.prohibicionArt199 = bloqueado;

    if (bloqueado) {
      alerta.classList.remove('hidden');
      slider.disabled = true;
      label.textContent = '0% (Mandato Art. 199)';
      label.className = "font-mono font-bold text-wine-dark";
      AppState.caso.rebajaPorcentaje = 0;
    } else {
      alerta.classList.add('hidden');
      slider.disabled = false;
      label.textContent = `${slider.value}% Rebaja`;
      label.className = "font-mono font-bold text-wine";
      AppState.caso.rebajaPorcentaje = Number(slider.value);
    }

    if (typeof CalculadoraManager !== 'undefined' && CalculadoraManager.quantumMeses) {
      CalculadoraManager.actualizarQuantum(CalculadoraManager.quantumMeses);
    }
  }
};

// ============================================================
// 6. PREDICTOR MATEMÁTICO DE CUARTOS (CuartosPredictor - Art. 61 C.P.)
// ============================================================
const CuartosPredictor = {
  evaluar() {
    const atenuantes = document.querySelectorAll('.check-atenuante');
    const agravantes = document.querySelectorAll('.check-agravante');
    const countAtenuantes = document.getElementById('badge-count-atenuantes');
    const countAgravantes = document.getElementById('badge-count-agravantes');
    const badgeHeader = document.getElementById('badge-quarter-indicator');

    let mit = 0;
    let agg = 0;
    atenuantes.forEach(b => { if (b.checked) mit++; });
    agravantes.forEach(b => { if (b.checked) agg++; });

    if (countAtenuantes) countAtenuantes.textContent = `${mit} seleccionada${mit === 1 ? '' : 's'}`;
    if (countAgravantes) countAgravantes.textContent = `${agg} seleccionada${agg === 1 ? '' : 's'}`;

    AppState.caso.atenuantesCount = mit;
    AppState.caso.agravantesCount = agg;

    let cuartoTexto = "Cuartos Medios";
    let cuartoHeaderClase = "px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-wine-light text-wine border border-wine/30";

    // Regla estricta del Artículo 61 inciso 2 del Código Penal Colombiano:
    if (mit > 0 && agg === 0) {
      cuartoTexto = "Primer Cuarto (Mínimo)";
      cuartoHeaderClase = "px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200";
      AppState.caso.cuartoResultante = 'minimo';
    } else if (agg > 0 && mit === 0) {
      cuartoTexto = "Cuarto Máximo";
      cuartoHeaderClase = "px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-wine-light text-wine-dark border border-wine/40";
      AppState.caso.cuartoResultante = 'maximo';
    } else {
      cuartoTexto = "Cuartos Medios";
      cuartoHeaderClase = "px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-wine-light text-wine border border-wine/30";
      AppState.caso.cuartoResultante = 'medios';
    }

    if (badgeHeader) {
      badgeHeader.textContent = cuartoTexto;
      badgeHeader.className = cuartoHeaderClase;
    }

    if (typeof CalculadoraManager !== 'undefined' && CalculadoraManager.determinarCuartoActivo) {
      CalculadoraManager.determinarCuartoActivo();
      CalculadoraManager.renderizarExplicacionPasoAPaso();
    }
  }
};

// ============================================================
// 7. GESTOR DE CASOS Y PERSISTENCIA (CasoManager)
// ============================================================
const CasoManager = {
  storageKey: 'iurisdosis_caso_params',

  guardar() {
    const getVal = (id) => document.getElementById(id)?.value || '';

    AppState.caso.radicado = getVal('caso-radicado');
    AppState.caso.etapa = getVal('caso-etapa');
    AppState.caso.fiscalia = getVal('caso-fiscalia');
    AppState.caso.juzgado = getVal('caso-juzgado');
    AppState.caso.procesado = getVal('caso-procesado');
    AppState.caso.fecha = getVal('caso-fecha');
    AppState.caso.narrativa = getVal('caso-narrativa');
    AppState.caso.delitoBase = getVal('caso-delito-base');
    AppState.caso.agravanteEspecifico = getVal('caso-agravante-especifico');

    localStorage.setItem(this.storageKey, JSON.stringify(AppState.caso));
    this.mostrarToast("Parámetros del caso guardados en memoria local", "save");
  },

  cargarGuardado() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      AppState.caso = { ...AppState.caso, ...data };

      const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.value = val;
      };

      setVal('caso-radicado', AppState.caso.radicado);
      setVal('caso-etapa', AppState.caso.etapa);
      setVal('caso-fiscalia', AppState.caso.fiscalia);
      setVal('caso-juzgado', AppState.caso.juzgado);
      setVal('caso-procesado', AppState.caso.procesado);
      setVal('caso-fecha', AppState.caso.fecha);
      setVal('caso-narrativa', AppState.caso.narrativa);
      setVal('caso-delito-base', AppState.caso.delitoBase);
      setVal('caso-agravante-especifico', AppState.caso.agravanteEspecifico);

      CalificacionManager.actualizarExtremos();
      CuartosPredictor.evaluar();
      HechosAnalizador.actualizarConteo();
    } catch (e) {
      console.warn("No se pudieron restaurar los datos guardados", e);
    }
  },

  cargarEjemplo() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal('caso-radicado', '110016000000202300452');
    setVal('caso-etapa', 'acusacion');
    setVal('caso-fiscalia', 'Fiscalía 45 Seccional de Vida de Bogotá');
    setVal('caso-juzgado', 'Juzgado 12 Penal del Circuito con Funciones de Conocimiento');
    setVal('caso-procesado', 'Julián David Morales Reyes');
    setVal('caso-fecha', '2023-04-18');
    setVal('caso-narrativa', `El día 18 de abril de 2023, aproximadamente a las 22:45 horas, en vía pública del barrio Kennedy Central de la ciudad de Bogotá, el imputado JULIÁN DAVID MORALES REYES, valiéndose de un arma cortopunzante y en coparticipación criminal con otro sujeto no individualizado, abordó intempestivamente a la víctima Pedro José Suárez cuando éste se encontraba en total estado de indefensión. 

El agresor propinó más de doce heridas reiteradas y profundas en tórax y extremidades con el propósito inequívoco de causar un padecimiento deliberado e inhumano antes de segar su vida (sevicia probada), ocasionando el deceso en el lugar de los hechos sin posibilidad de auxilio oportuno.`);
    setVal('caso-delito-base', '103');
    setVal('caso-agravante-especifico', '104_7');

    const check199 = document.getElementById('check-art199');
    if (check199) check199.checked = false;

    // Restablecer atenuantes y agravantes de prueba
    const atenuantes = document.querySelectorAll('.check-atenuante');
    const agravantes = document.querySelectorAll('.check-agravante');
    atenuantes.forEach((b, i) => { b.checked = (i === 0); });
    agravantes.forEach((b, i) => { b.checked = (i === 0); });

    CalificacionManager.actualizarExtremos();
    AllanamientoManager.actualizarSlider();
    CuartosPredictor.evaluar();
    HechosAnalizador.actualizarConteo();

    this.mostrarToast("Caso penal de prueba cargado correctamente", "dataset");
  },

  mostrarToast(mensaje, icono = 'check_circle') {
    const toast = document.getElementById('toast-notif');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');

    if (!toast || !toastText) return;

    toastText.textContent = mensaje;
    if (toastIcon) toastIcon.textContent = icono;

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 2800);
  }
};

// ============================================================
// 8. ASIGNACIÓN A ÁMBITO GLOBAL PARA INTEROPERABILIDAD Y TESTS
// ============================================================
window.AppState = AppState;
window.AppNav = AppNav;
window.HechosAnalizador = HechosAnalizador;
window.CalificacionManager = CalificacionManager;
window.AllanamientoManager = AllanamientoManager;
window.CuartosPredictor = CuartosPredictor;
window.CasoManager = CasoManager;

// Inicialización al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  HechosAnalizador.init();
  CalificacionManager.actualizarExtremos();
  AllanamientoManager.actualizarSlider();
  CuartosPredictor.evaluar();
  CasoManager.cargarGuardado();
});
