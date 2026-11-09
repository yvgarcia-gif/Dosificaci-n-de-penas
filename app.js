/**
 * IURISDOSIS COLOMBIA — SIMULADOR ACADÉMICO DE PROCEDIMIENTO PENAL Y DOSIFICACIÓN
 * Código Penal (Ley 599 de 2000) & Código de Procedimiento Penal (Ley 906 de 2004)
 * 
 * Enfoque Pedagógico para Estudiantes de Derecho:
 * 1. Hechos y Análisis Fáctico-Jurídico (con botón «Reiniciar y comenzar un nuevo caso»)
 * 2. Procedimiento Penal Secuencial (Imputación -> Acusación -> Juicio Oral)
 * 3. Dosificación de la Pena en el Sistema de Cuartos (Art. 61 C.P.)
 * 4. Decisión Judicial Fundamentada (Sentencia / Auto Art. 447 C.P.P.)
 * 5. Laboratorio Gemini IA (Asistente y Casos Prácticos de Entrenamiento)
 */

// ============================================================
// 1. ESTADO GLOBAL DEL SIMULADOR (AppState)
// ============================================================
const AppState = {
  activeTab: 'hechos',

  caso: {
    // Datos procesales explicados didácticamente
    radicado: '110016000000202300452',
    etapa: 'imputacion', // 'imputacion' | 'acusacion' | 'juicio' | 'sentencia'
    fiscalia: 'Fiscalía 45 Seccional de Vida de Bogotá',
    juzgado: 'Juzgado 12 Penal del Circuito con Funciones de Conocimiento',
    procesado: 'Julián David Morales Reyes',
    fecha: '2023-04-18',
    narrativa: `El día 18 de abril de 2023, aproximadamente a las 22:45 horas, en vía pública del barrio Kennedy Central de Bogotá, el ciudadano JULIÁN DAVID MORALES REYES, valiéndose de un arma cortopunzante y en coparticipación con otro sujeto no individualizado, abordó intempestivamente a la víctima Pedro José Suárez cuando éste se encontraba en total estado de indefensión. 

El agresor propinó más de doce heridas reiteradas y profundas en tórax y extremidades con el propósito inequívoco de causar un padecimiento deliberado e inhumano antes de segar su vida (sevicia probada), ocasionando el deceso en el lugar de los hechos sin posibilidad de auxilio oportuno.`,
    
    // Análisis didáctico de los hechos
    analisisConductas: 'Agresión violenta con arma cortopunzante propinando múltiples heridas en órganos vitales para causar sufrimiento deliberado.',
    analisisDelitos: 'Homicidio agravado por sevicia y colocación de la víctima en estado de indefensión (Art. 103 y 104 Num. 7 C.P.).',
    analisisResponsables: 'Julián David Morales Reyes (Coautor material impropio - Arts. 28 y 29 C.P.) y un sujeto partícipe por identificar.',
    analisisVictimas: 'Pedro José Suárez (Bien jurídico protegido: La Vida e Integridad Personal - Título I C.P.).',
    analisisInvestigacion: 'Protocolo de necropsia de Medicina Legal, fijación fotográfica del lugar, registro de cámaras de seguridad y testimonios presenciales.',

    // Calificación típica y factores modificadores
    delitoBase: '103',
    agravanteEspecifico: '104_7',
    intervencion: 'autor_directo',
    consumacion: 'consumado',
    culpabilidad: 'dolo',

    // Límites legales en meses
    minMeses: 400,
    maxMeses: 600,

    // Justicia premial y allanamiento según etapa
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
// 2. CONTROL DE NAVEGACIÓN SECUENCIAL (AppNav)
// ============================================================
const AppNav = {
  tabs: ['hechos', 'procedimiento', 'calculadora', 'justificacion', 'ayuda'],

  switchTab(targetTab) {
    if (!this.tabs.includes(targetTab)) return;
    AppState.activeTab = targetTab;

    // Alternar visibilidad de paneles principales
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

    // Sincronizaciones específicas al entrar a cada sección
    if (targetTab === 'procedimiento') {
      ProcedimientoManager.renderizarEtapa(AppState.caso.etapa || 'imputacion');
    } else if (targetTab === 'calculadora' && typeof CalculadoraManager !== 'undefined') {
      CalculadoraManager.sincronizarDesdeCaso();
    } else if (targetTab === 'justificacion' && typeof JustificacionManager !== 'undefined') {
      JustificacionManager.generarMemoria();
    } else if (targetTab === 'ayuda' && typeof AyudaIA_Manager !== 'undefined') {
      AyudaIA_Manager.init();
    }

    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};

// ============================================================
// 3. ANÁLISIS FÁCTICO PEDAGÓGICO (HechosAnalizador)
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
// 4. GESTOR SECUENCIAL DEL PROCEDIMIENTO PENAL (ProcedimientoManager)
// ============================================================
const ProcedimientoManager = {
  get etapaActual() {
    return AppState.caso.etapa || 'imputacion';
  },
  get etapas() {
    return this.etapasInfo;
  },

  etapasInfo: {
    imputacion: {
      titulo: '1. Audiencia de Formulación de Imputación',
      articulo: 'Artículos 286 a 294 de la Ley 906 de 2004',
      concepto: 'Acto de comunicación procesal formal mediante el cual la Fiscalía General de la Nación vincula formalmente al investigado a una causa penal, atribuyéndole hechos jurídicamente relevantes y adecuación típica provisional.',
      intervinientes: [
        { rol: 'Fiscal Delegado', accion: 'Expone de forma clara y suscinta los hechos, indica el delito y comunica la tipicidad imputable.' },
        { rol: 'Juez de Control de Garantías', accion: 'Ejerce control constitucional sobre la legalidad de la imputación y verifica que el ciudadano comprenda los cargos.' },
        { rol: 'Defensor Técnico', accion: 'Asiste técnicamente al imputado y le asesora sobre la conveniencia de allanarse o guardar silencio.' },
        { rol: 'Imputado', accion: 'Adquiere la condición de parte, escucha los cargos y decide libre, consciente y voluntariamente si acepta o rechaza la imputación.' }
      ],
      actuaciones: [
        'Individualización e identificación fehaciente del imputado.',
        'Relación clara y sucinta de los hechos jurídicamente relevantes con valor dogmático.',
        'Información de derechos y deberes constitucionales.',
        'Ofrecimiento de justicia premial: rebaja de hasta el 50% de la pena por allanamiento a cargos (Art. 351 C.P.P.).',
        'Facultad de la Fiscalía para solicitar medida de aseguramiento privativa o no privativa (Art. 306 C.P.P.).'
      ],
      decisiones: 'El imputado decide si se ALLANA (terminación anticipada con máxima rebaja) o si NO ACEPTA CARGOS (el proceso continúa a la etapa de acusación).',
      maxRebaja: 50,
      rebajaSugerida: 40,
      descuentoMaximo: 50,
      descuentoSugerido: 40
    },
    acusacion: {
      titulo: '2. Audiencia de Formulación de Acusación',
      articulo: 'Artículos 336 a 347 de la Ley 906 de 2004',
      concepto: 'Acto procesal formal y vinculante mediante el cual la Fiscalía somete a juicio formal al imputado a través de un Escrito de Acusación, determinando con precisión la pretensión punitiva del Estado.',
      intervinientes: [
        { rol: 'Fiscal de Conocimiento', accion: 'Da lectura al escrito de acusación formalizado y delimita el objeto del debate probatorio.' },
        { rol: 'Juez de Conocimiento', accion: 'Dirige la audiencia, resuelve incidentes de incompetencia, impedimentos o recusaciones y decreta el descubrimiento probatorio.' },
        { rol: 'Defensa Técnica', accion: 'Revisa la validez del escrito, formula observaciones formales y solicita el descubrimiento probatorio completo de la Fiscalía.' },
        { rol: 'Víctimas y Ministerio Público', accion: 'Se reconocen procesalmente para solicitar medidas de protección e intervenir en defensa de derechos colectivos.' }
      ],
      actuaciones: [
        'Examen de nulidades procesales, impedimentos y recusaciones.',
        'Lectura y fijación definitiva del núcleo fáctico de la acusación.',
        'Descubrimiento probatorio formal de la Fiscalía hacia la Defensa.',
        'Determinación de preacuerdos o allanamientos con rebaja de hasta una tercera parte (33.3% - Art. 352 C.P.P.).'
      ],
      decisiones: 'El Juez fija fecha para la Audiencia Preparatoria y el juicio oral. Si hay allanamiento, la rebaja legal no supera el 33.3%.',
      maxRebaja: 33.3,
      rebajaSugerida: 25,
      descuentoMaximo: 33.3,
      descuentoSugerido: 33.3
    },
    juicio: {
      titulo: '3. Audiencia de Juicio Oral y Público',
      articulo: 'Artículos 366 a 447 de la Ley 906 de 2004',
      concepto: 'Escenario contradictorio, oral, continuo y público donde la Fiscalía y la Defensa debaten y practican las pruebas ante el Juez imparcial para destruir o ratificar la presunción de inocencia.',
      intervinientes: [
        { rol: 'Juez de Conocimiento', accion: 'Dirige el debate con inmediación procesal estricta, valora las pruebas con sana crítica y emite el sentido del fallo.' },
        { rol: 'Fiscalía General', accion: 'Presenta su Teoría del Caso, interroga a sus testigos/peritos y busca probar la culpabilidad más allá de toda duda razonable.' },
        { rol: 'Defensa Técnica', accion: 'Contrainterroga, introduce su hipótesis absolutoria o de favorabilidad y controvierte las pruebas de cargo.' },
        { rol: 'Testigos y Peritos', accion: 'Declaran bajo la gravedad de juramento sobre los hechos percibidos o dictámenes científicos.' }
      ],
      actuaciones: [
        'Alegato inicial de apertura: Presentación sucinta de la Teoría del Caso.',
        'Práctica probatoria: Interrogatorio cruzado y contrainterrogatorio de testigos y peritos.',
        'Incorporación de evidencia física y documental bajo cadena de custodia.',
        'Alegatos de conclusión de las partes.',
        'Anuncio del Sentido del Fallo: Condenatorio o Absolutorio (Art. 446 C.P.P.).',
        'Si el sentido es condenatorio: Apertura inmediata de la Audiencia de Individualización de Pena y Sentencia (Art. 447 C.P.P.).'
      ],
      decisiones: 'Si el sentido de fallo es condenatorio, NO procede rebaja premial por allanamiento (0%). El sentenciador debe aplicar la dosificación penal estricta del Art. 61 C.P.',
      maxRebaja: 0,
      rebajaSugerida: 0
    }
  },

  seleccionarEtapa(etapaKey) {
    AppState.caso.etapa = etapaKey;
    AppState.caso.allanamientoEtapa = etapaKey;

    const info = this.etapasInfo[etapaKey];
    if (info) {
      AppState.caso.rebajaPorcentaje = info.rebajaSugerida;
    }

    this.renderizarEtapa(etapaKey);
    this.sincronizarBotonesNavegacion(etapaKey);

    if (typeof AllanamientoManager !== 'undefined') {
      AllanamientoManager.actualizarSlider();
    }
  },

  sincronizarBotonesNavegacion(etapaKey) {
    const btnImputacion = document.getElementById('btn-proc-imputacion');
    const btnAcusacion = document.getElementById('btn-proc-acusacion');
    const btnJuicio = document.getElementById('btn-proc-juicio');

    const updateBtn = (btn, isActivo) => {
      if (!btn) return;
      if (isActivo) {
        btn.className = "px-4 py-2 rounded-xl text-xs font-bold transition-all bg-wine text-white shadow-sm flex items-center gap-1.5";
      } else {
        btn.className = "px-4 py-2 rounded-xl text-xs font-medium transition-all bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5";
      }
    };

    updateBtn(btnImputacion, etapaKey === 'imputacion');
    updateBtn(btnAcusacion, etapaKey === 'acusacion');
    updateBtn(btnJuicio, etapaKey === 'juicio');
  },

  renderizarEtapa(etapaKey) {
    const info = this.etapasInfo[etapaKey] || this.etapasInfo.imputacion;

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt('proc-etapa-titulo', info.titulo);
    setTxt('proc-etapa-articulo', info.articulo);
    setTxt('proc-etapa-concepto', info.concepto);

    const contIntervinientes = document.getElementById('proc-etapa-intervinientes');
    if (contIntervinientes) {
      contIntervinientes.innerHTML = info.intervinientes.map(item => `
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <span class="font-bold text-wine block mb-1">${item.rol}</span>
          <p class="text-slate-700">${item.accion}</p>
        </div>
      `).join('');
    }

    const contActuaciones = document.getElementById('proc-etapa-actuaciones');
    if (contActuaciones) {
      contActuaciones.innerHTML = info.actuaciones.map(act => `
        <li class="flex items-start gap-2 text-xs text-slate-700">
          <span class="material-symbols-outlined text-wine text-sm mt-0.5">check_circle</span>
          <span>${act}</span>
        </li>
      `).join('');
    }

    const elDecisiones = document.getElementById('proc-etapa-decisiones');
    if (elDecisiones) {
      elDecisiones.textContent = info.decisiones;
    }

    // Actualizar selector de rebaja dentro de la etapa
    const sliderRebaja = document.getElementById('slider-rebaja-pactada');
    const labelRebaja = document.getElementById('label-rebaja-porcentaje');
    if (sliderRebaja) {
      sliderRebaja.max = info.maxRebaja;
      sliderRebaja.value = AppState.caso.rebajaPorcentaje;
    }
    if (labelRebaja) {
      labelRebaja.textContent = `${AppState.caso.rebajaPorcentaje}% Rebaja`;
    }
  }
};

// ============================================================
// 5. GESTOR DE CALIFICACIÓN Y EXTREMOS LEGALES (CalificacionManager)
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
    let textoBase = "Pena Base: 208 a 450 Meses (Art. 103 C.P.)";
    let textoDef = "400 a 600 Meses (Sevicia / Indefensión)";

    if (baseVal === '103') {
      textoBase = "Pena Base: 208 a 450 Meses (17a 4m a 37a 6m)";
      if (agravVal === 'ninguno') {
        min = 208;
        max = 450;
        textoDef = "208 a 450 Meses (Límites básicos sin agravante)";
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
// 6. GESTOR DE JUSTICIA PREMIAL (AllanamientoManager)
// ============================================================
const AllanamientoManager = {
  actualizarSlider() {
    const slider = document.getElementById('slider-rebaja-pactada');
    const label = document.getElementById('label-rebaja-porcentaje');
    if (!slider || !label) return;

    if (AppState.caso.prohibicionArt199 || AppState.caso.prohibicionArt68A) {
      label.textContent = "0% (Prohibición Legal Activa)";
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
      label.textContent = '0% (Mandato Art. 199 Ley 1098)';
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
// 7. PREDICTOR MATEMÁTICO DE CUARTOS (CuartosPredictor - Art. 61 C.P.)
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
// 8. GESTOR DE CASOS Y BOTÓN «REINICIAR Y COMENZAR UN NUEVO CASO»
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
    AppState.caso.analisisConductas = getVal('analisis-conductas');
    AppState.caso.analisisDelitos = getVal('analisis-delitos');
    AppState.caso.analisisResponsables = getVal('analisis-responsables');
    AppState.caso.analisisVictimas = getVal('analisis-victimas');
    AppState.caso.analisisInvestigacion = getVal('analisis-investigacion');

    localStorage.setItem(this.storageKey, JSON.stringify(AppState.caso));
    this.mostrarToast("Caso guardado correctamente", "save");
  },

  cargarEjemplo() {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal('caso-radicado', '110016000000202300452');
    setVal('caso-fiscalia', 'Fiscalía 45 Seccional de Vida de Bogotá');
    setVal('caso-juzgado', 'Juzgado 12 Penal del Circuito con Funciones de Conocimiento');
    setVal('caso-procesado', 'Julián David Morales Reyes');
    setVal('caso-fecha', '2023-04-18');
    setVal('caso-narrativa', `El día 18 de abril de 2023, aproximadamente a las 22:45 horas, en vía pública del barrio Kennedy Central de Bogotá, el ciudadano JULIÁN DAVID MORALES REYES, valiéndose de un arma cortopunzante y en coparticipación con otro sujeto no individualizado, abordó intempestivamente a la víctima Pedro José Suárez cuando éste se encontraba en total estado de indefensión. 

El agresor propinó más de doce heridas reiteradas y profundas en tórax y extremidades con el propósito inequívoco de causar un padecimiento deliberado e inhumano antes de segar su vida (sevicia probada), ocasionando el deceso en el lugar de los hechos sin posibilidad de auxilio oportuno.`);

    setVal('analisis-conductas', 'Ataque intempestivo con arma cortopunzante infligiendo más de doce heridas en órganos vitales.');
    setVal('analisis-delitos', 'Homicidio agravado por sevicia y situación de indefensión de la víctima (Arts. 103 y 104 Num. 7 C.P.).');
    setVal('analisis-responsables', 'Julián David Morales Reyes en calidad de coautor material (Art. 29 C.P.).');
    setVal('analisis-victimas', 'Pedro José Suárez (Bien jurídico protegido: Vida e Integridad Personal).');
    setVal('analisis-investigacion', 'Dictamen de necropsia, inspección técnica a cadáver y fijación fotográfica de la escena.');

    const check199 = document.getElementById('check-art199');
    if (check199) check199.checked = false;

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

  /**
   * REINICIAR Y COMENZAR UN NUEVO CASO (Requisito Explícito del Usuario)
   * Borra absolutamente toda la información, resetea el simulador y permite empezar desde cero.
   */
  reiniciarCaso() {
    const confirmar = typeof window !== 'undefined' && typeof window.confirm === 'function'
      ? window.confirm("¿Deseas reiniciar y comenzar un nuevo caso hipotético desde cero? Se limpiarán todos los campos.")
      : true;
    if (!confirmar) return;

    localStorage.removeItem(this.storageKey);

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    // 1. Limpiar campos de datos procesales
    setVal('caso-radicado', '');
    setVal('caso-fiscalia', '');
    setVal('caso-juzgado', '');
    setVal('caso-procesado', '');
    setVal('caso-fecha', new Date().toISOString().split('T')[0]);

    // 2. Limpiar narrativa fáctica
    setVal('caso-narrativa', '');

    // 3. Limpiar análisis guiado de hechos
    setVal('analisis-conductas', '');
    setVal('analisis-delitos', '');
    setVal('analisis-responsables', '');
    setVal('analisis-victimas', '');
    setVal('analisis-investigacion', '');

    // 4. Limpiar checkboxes de circunstancias y prohibiciones
    const checkboxes = document.querySelectorAll('.check-atenuante, .check-agravante, #check-art199');
    checkboxes.forEach(b => { b.checked = false; });

    // 5. Restablecer controles de calificación
    const selectBase = document.getElementById('caso-delito-base');
    const selectAgravante = document.getElementById('caso-agravante-especifico');
    if (selectBase) selectBase.value = '103';
    if (selectAgravante) selectAgravante.value = 'ninguno';

    // 6. Restablecer estado interno
    AppState.caso.radicado = '';
    AppState.caso.procesado = '';
    AppState.caso.fiscalia = '';
    AppState.caso.juzgado = '';
    AppState.caso.narrativa = '';
    AppState.caso.analisisConductas = '';
    AppState.caso.analisisDelitos = '';
    AppState.caso.analisisResponsables = '';
    AppState.caso.analisisVictimas = '';
    AppState.caso.analisisInvestigacion = '';
    AppState.caso.atenuantesCount = 0;
    AppState.caso.agravantesCount = 0;
    AppState.caso.rebajaPorcentaje = 40;
    AppState.caso.prohibicionArt199 = false;
    AppState.caso.etapa = 'imputacion';

    // 7. Sincronizar UI y volver al Paso 1
    CalificacionManager.actualizarExtremos();
    AllanamientoManager.actualizarSlider();
    CuartosPredictor.evaluar();
    HechosAnalizador.actualizarConteo();
    ProcedimientoManager.seleccionarEtapa('imputacion');
    AppNav.switchTab('hechos');

    this.mostrarToast("Simulador reiniciado. ¡Listo para ingresar un nuevo caso hipotético!", "restart_alt");
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
// 9. ASIGNACIÓN GLOBAL PARA ACCESO DIRECTO Y TESTS
// ============================================================
window.AppState = AppState;
window.AppNav = AppNav;
window.HechosAnalizador = HechosAnalizador;
window.ProcedimientoManager = ProcedimientoManager;
window.CalificacionManager = CalificacionManager;
window.AllanamientoManager = AllanamientoManager;
window.CuartosPredictor = CuartosPredictor;
window.CasoManager = CasoManager;

document.addEventListener('DOMContentLoaded', () => {
  HechosAnalizador.init();
  CalificacionManager.actualizarExtremos();
  AllanamientoManager.actualizarSlider();
  CuartosPredictor.evaluar();
  ProcedimientoManager.seleccionarEtapa('imputacion');
});
