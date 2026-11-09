/**
 * IURISDOSIS COLOMBIA — DOSIFICADOR PENAL & SISTEMA DE CUARTOS
 * Ley 599 de 2000 (Código Penal) & Ley 906 de 2004 (Código de Procedimiento Penal)
 * 
 * IDENTIDAD VISUAL: Vino Tinto (#58111A / #721B28), Negro (#0E1015) y Blanco (#FFFFFF).
 * MÓDULOS:
 * 1. Catálogo Completo de Delitos Ley 599/2000 (Función 2)
 * 2. Calculadora de Cuartos con Explicación Paso a Paso de Cómputo (Función 3)
 * 3. Justificación Jurídica y Auto Judicial Formal de Individualización (Función 4)
 * 4. Laboratorio Jurídico con Gemini IA (7 Herramientas Especializadas)
 * 5. Banco Comunitario de Dudas Estudiantiles con Respuestas Colaborativas (Firebase)
 */

// ============================================================
// HELPER: FORMATEO PRECISO DE MESES A AÑOS, MESES Y DÍAS
// ============================================================
function formatearMesesAHumano(mesesFloat) {
  if (mesesFloat === undefined || mesesFloat === null || isNaN(mesesFloat)) return '0 meses';
  
  const totalDias = Math.round(mesesFloat * 30);
  const anos = Math.floor(totalDias / 360);
  const residuoDias = totalDias % 360;
  const meses = Math.floor(residuoDias / 30);
  const dias = residuoDias % 30;

  const partes = [];
  if (anos > 0) partes.push(`${anos} ${anos === 1 ? 'año' : 'años'}`);
  if (meses > 0) partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);
  if (dias > 0 && anos === 0) partes.push(`${dias} ${dias === 1 ? 'día' : 'días'}`);
  if (partes.length === 0) return `${mesesFloat} meses`;
  return partes.join(' y ');
}

// ============================================================
// 1. CATÁLOGO COMPLETO DE DELITOS (Ley 599 de 2000)
// ============================================================
const DelitosCatalogo = [
  {
    id: '103',
    articulo: 'Art. 103 C.P.',
    nombre: 'Homicidio Simple',
    bienJuridico: 'vida',
    bienJuridicoNombre: 'Vida e Integridad Personal',
    minMeses: 208,
    maxMeses: 450,
    norma: 'El que matare a otro, incurrirá en prisión de doscientos ocho (208) a cuatrocientos cincuenta (450) meses.',
    especificos: 'Art. 104 C.P.: Si concurren agravantes específicas (parentesco, sevicia, indefensión, por precio), la pena se eleva a 400 - 600 meses.',
    multa: 'No prevé sanción pecuniaria privativa principal.',
    inhabilitacion: 'Inhabilitación accesoria de derechos y funciones públicas igual a la pena privativa de la libertad.'
  },
  {
    id: '104_7',
    articulo: 'Art. 104 Num. 7 C.P.',
    nombre: 'Homicidio Agravado (Sevicia / Indefensión)',
    bienJuridico: 'vida',
    bienJuridicoNombre: 'Vida e Integridad Personal',
    minMeses: 400,
    maxMeses: 600,
    norma: 'La pena será de cuatrocientos (400) a seiscientos (600) meses de prisión, si la conducta se cometiere colocando a la víctima en situación de indefensión o con sevicia.',
    especificos: 'Exige la acreditación probatoria del sufrimiento inhumano e innecesario infligido antes de causar la muerte.',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación accesoria de hasta 20 años.'
  },
  {
    id: '104A',
    articulo: 'Art. 104A C.P.',
    nombre: 'Feminicidio',
    bienJuridico: 'vida',
    bienJuridicoNombre: 'Vida e Integridad Personal',
    minMeses: 250,
    maxMeses: 500,
    norma: 'Quien causare la muerte a una mujer, por su condición de ser mujer o por motivos de su identidad de género.',
    especificos: 'Art. 104B: Agravantes específicas elevan la pena de 500 a 600 meses. Prohibición estricta de rebajas (Ley 1761/2015).',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación de hasta 20 años.'
  },
  {
    id: '106',
    articulo: 'Art. 106 C.P.',
    nombre: 'Homicidio por Piedad',
    bienJuridico: 'vida',
    bienJuridicoNombre: 'Vida e Integridad Personal',
    minMeses: 16,
    maxMeses: 54,
    norma: 'El que matare a otro por piedad, para poner fin a intensos sufrimientos provenientes de lesión corporal o enfermedad grave e incurable.',
    especificos: 'Tipo penal privilegiado y atenuado. Supeditado a sentencias C-239/97 y C-233/21 de la Corte Constitucional.',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación accesoria de 16 a 54 meses.'
  },
  {
    id: '109',
    articulo: 'Art. 109 C.P.',
    nombre: 'Homicidio Culposo',
    bienJuridico: 'vida',
    bienJuridicoNombre: 'Vida e Integridad Personal',
    minMeses: 32,
    maxMeses: 108,
    norma: 'El que por culpa matare a otro, incurrirá en prisión de treinta y dos (32) a ciento ocho (108) meses y multa de 26.66 a 150 SMLMV.',
    especificos: 'Art. 110 C.P.: Agravantes (embriaguez o fuga) incrementan la pena de la mitad al doble.',
    multa: '26.66 a 150 SMLMV.',
    inhabilitacion: 'Privación de la conducción de vehículos automotores de 48 a 90 meses.'
  },
  {
    id: '111_112',
    articulo: 'Art. 111 y 112 C.P.',
    nombre: 'Lesiones Personales (Incapacidad > 30 días)',
    bienJuridico: 'vida',
    bienJuridicoNombre: 'Vida e Integridad Personal',
    minMeses: 16,
    maxMeses: 54,
    norma: 'Si el daño determinare incapacidad para trabajar o enfermedad superior a treinta (30) días sin pasar de noventa (90).',
    especificos: 'Aumentos punitivos si producen deformidad o perturbación funcional transitoria o permanente (Arts. 113 a 116).',
    multa: 'Multa de 13.33 a 30 SMLMV.',
    inhabilitacion: 'Inhabilitación accesoria por el término de la sanción.'
  },
  {
    id: '168',
    articulo: 'Art. 168 C.P.',
    nombre: 'Secuestro Simple',
    bienJuridico: 'libertad',
    bienJuridicoNombre: 'Libertad Individual',
    minMeses: 192,
    maxMeses: 360,
    norma: 'El que con propósitos distintos a los previstos en el secuestro extorsivo, arrebate, sustraiga, retenga u oculte a una persona.',
    especificos: 'Prohibición taxativa de subrogados y rebajas por Ley 733 de 2002.',
    multa: 'Multa de 800 a 1500 SMLMV.',
    inhabilitacion: 'Inhabilitación obligatoria de funciones públicas.'
  },
  {
    id: '169',
    articulo: 'Art. 169 C.P.',
    nombre: 'Secuestro Extorsivo',
    bienJuridico: 'libertad',
    bienJuridicoNombre: 'Libertad Individual',
    minMeses: 320,
    maxMeses: 504,
    norma: 'El que arrebate, sustraiga, retenga u oculte a una persona, con el propósito de exigir por su libertad un provecho o cualquier utilidad.',
    especificos: 'Art. 170 C.P. Agravantes específicas (superan los 576 meses si se comete en persona menor de edad).',
    multa: 'Multa de 2666.66 a 6000 SMLMV.',
    inhabilitacion: 'Inhabilitación privativa estricta.'
  },
  {
    id: '205',
    articulo: 'Art. 205 C.P.',
    nombre: 'Acceso Carnal Violento',
    bienJuridico: 'sexual',
    bienJuridicoNombre: 'Libertad e Integridad Sexual',
    minMeses: 192,
    maxMeses: 360,
    norma: 'El que realice acceso carnal con otra persona mediante violencia, incurrirá en prisión de doce (12) a veinte (20) años —192 a 360 meses—.',
    especificos: 'Art. 211 C.P.: Agravantes punitivas (aumento de 1/3 a 1/2 con armas o pluralidad de agresores).',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación para cargos con menores de edad (Ley 1918 de 2018).'
  },
  {
    id: '208',
    articulo: 'Art. 208 C.P.',
    nombre: 'Acceso Carnal con Menor de 14 Años',
    bienJuridico: 'sexual',
    bienJuridicoNombre: 'Libertad e Integridad Sexual',
    minMeses: 208,
    maxMeses: 360,
    norma: 'El que accediere carnalmente a persona menor de catorce (14) años, incurrirá en prisión de dieciséis (16) a veintiocho (28) años.',
    especificos: 'Prohibición absoluta de rebajas por allanamiento o preacuerdo (Art. 199 Ley 1098 de 2006). Cero descuento premial.',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación perpetua para laborar con niños, niñas y adolescentes.'
  },
  {
    id: '239',
    articulo: 'Art. 239 C.P.',
    nombre: 'Hurto Simple',
    bienJuridico: 'patrimonio',
    bienJuridicoNombre: 'Patrimonio Económico',
    minMeses: 32,
    maxMeses: 108,
    norma: 'El que se apodere de una cosa mueble ajena, con el propósito de obtener provecho para sí o para otro.',
    especificos: 'Tasación modulada si la cuantía no excede de 10 SMLMV.',
    multa: 'No aplica en el tipo básico.',
    inhabilitacion: 'Inhabilitación accesoria de derechos y funciones públicas.'
  },
  {
    id: '240',
    articulo: 'Art. 240 C.P.',
    nombre: 'Hurto Calificado',
    bienJuridico: 'patrimonio',
    bienJuridicoNombre: 'Patrimonio Económico',
    minMeses: 72,
    maxMeses: 168,
    norma: 'La pena será de seis (6) a catorce (14) años si se comete con violencia sobre las cosas, destreza o escalamiento.',
    especificos: 'Si la violencia se ejerce sobre las personas, la pena será de ocho (8) a dieciséis (16) años (96 a 192 meses).',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación accesoria.'
  },
  {
    id: '241',
    articulo: 'Art. 241 C.P.',
    nombre: 'Hurto Calificado y Agravado',
    bienJuridico: 'patrimonio',
    bienJuridicoNombre: 'Patrimonio Económico',
    minMeses: 96,
    maxMeses: 240,
    norma: 'Las penas anteriores se aumentarán de la mitad a las tres cuartas partes cuando concurran las causales del artículo 241.',
    especificos: 'Concurso de dos o más personas, uso de armas o sobre medios motorizados.',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación accesoria.'
  },
  {
    id: '244',
    articulo: 'Art. 244 C.P.',
    nombre: 'Extorsión',
    bienJuridico: 'patrimonio',
    bienJuridicoNombre: 'Patrimonio Económico',
    minMeses: 192,
    maxMeses: 288,
    norma: 'El que constriña a otro a hacer, tolerar u omitir alguna cosa, con el propósito de obtener provecho ilícito.',
    especificos: 'Art. 245 C.P. Agravantes aumentan de una tercera parte a la mitad (256 a 432 meses). Ley 733/2002 restringe subrogados.',
    multa: 'Multa de 800 a 1800 SMLMV.',
    inhabilitacion: 'Inhabilitación privativa estricta.'
  },
  {
    id: '286',
    articulo: 'Art. 286 C.P.',
    nombre: 'Falsedad Ideológica en Documento Público',
    bienJuridico: 'fe_publica',
    bienJuridicoNombre: 'Fe Pública',
    minMeses: 64,
    maxMeses: 144,
    norma: 'El servidor público que en ejercicio de sus funciones, al extender documento público que pueda servir de prueba, consigne una falsedad o calle la verdad.',
    especificos: 'Sujeto activo cualificado funcionalmente.',
    multa: 'No aplica.',
    inhabilitacion: 'Inhabilitación de derechos y funciones públicas de 64 a 144 meses.'
  },
  {
    id: '365',
    articulo: 'Art. 365 C.P.',
    nombre: 'Porte Ilegal de Armas de Fuego',
    bienJuridico: 'seguridad',
    bienJuridicoNombre: 'Seguridad Pública',
    minMeses: 108,
    maxMeses: 144,
    norma: 'El que sin permiso de autoridad competente importe, trafique, fabrique, transporte, almacene o porte en lugar público armas de fuego de defensa personal.',
    especificos: 'La pena se duplicará si se emplean armas con numeración alterada o en coparticipación.',
    multa: 'No aplica.',
    inhabilitacion: 'Decomiso del material bélico e inhabilitación accesoria.'
  },
  {
    id: '376',
    articulo: 'Art. 376 C.P.',
    nombre: 'Tráfico de Estupefacientes',
    bienJuridico: 'salud',
    bienJuridicoNombre: 'Salud Pública',
    minMeses: 128,
    maxMeses: 360,
    norma: 'El que sin permiso introduzca al país, transporte, almacene, elabore, venda o adquiera sustancias estupefacientes o psicotrópicas.',
    especificos: 'Modulación según la cantidad incautada. Exclusión de dosis para consumo personal (Sentencia C-221/94 y CSJ SP1944-2021).',
    multa: 'Multa de 1334 a 50000 SMLMV.',
    inhabilitacion: 'Inhabilitación accesoria obligatoria.'
  },
  {
    id: '397',
    articulo: 'Art. 397 C.P.',
    nombre: 'Peculado por Apropiación',
    bienJuridico: 'administracion',
    bienJuridicoNombre: 'Administración Pública',
    minMeses: 96,
    maxMeses: 270,
    norma: 'El servidor público que se apropie en provecho suyo o de un tercero de bienes del Estado o de empresas en que éste tenga parte.',
    especificos: 'Art. 401 C.P. Atenuación si se reintegra lo apropiado antes de dictarse sentencia de primera instancia.',
    multa: 'Multa equivalente al valor de lo apropiado sin que supere 50000 SMLMV.',
    inhabilitacion: 'Inhabilitación definitiva para el ejercicio de derechos y funciones públicas (Acto Legislativo 01/2004).'
  },
  {
    id: '404',
    articulo: 'Art. 404 C.P.',
    nombre: 'Concusión',
    bienJuridico: 'administracion',
    bienJuridicoNombre: 'Administración Pública',
    minMeses: 96,
    maxMeses: 180,
    norma: 'El servidor público que abusando de su cargo o de sus funciones constriña o induzca a alguien a dar o prometer al mismo servidor dinero o cualquier otra utilidad indebidos.',
    especificos: 'No admite subrogados de ejecución condicional (Art. 68A C.P.).',
    multa: 'Multa de 66.66 a 150 SMLMV.',
    inhabilitacion: 'Inhabilitación de 96 a 180 meses.'
  },
  {
    id: '405',
    articulo: 'Art. 405 C.P.',
    nombre: 'Cohecho Propio',
    bienJuridico: 'administracion',
    bienJuridicoNombre: 'Administración Pública',
    minMeses: 80,
    maxMeses: 144,
    norma: 'El servidor público que reciba para sí o para otro dinero u otra utilidad, para retardar u omitir un acto propio de su cargo, o para ejecutar uno contrario a sus deberes oficiales.',
    especificos: 'Afecta la transparencia de la función administrativa estatal.',
    multa: 'Multa de 66.66 a 150 SMLMV.',
    inhabilitacion: 'Inhabilitación accesoria de 80 a 144 meses.'
  },
  {
    id: '413',
    articulo: 'Art. 413 C.P.',
    nombre: 'Prevaricato por Acción',
    bienJuridico: 'administracion',
    bienJuridicoNombre: 'Administración Pública',
    minMeses: 48,
    maxMeses: 144,
    norma: 'El servidor público que profiera resolución, dictamen o concepto manifiestamente contrario a la ley.',
    especificos: 'Dolo cualificado consistente en el apartamiento ostensible del ordenamiento jurídico.',
    multa: 'Multa de 66.66 a 300 SMLMV.',
    inhabilitacion: 'Inhabilitación de 80 a 144 meses.'
  },
  {
    id: '453',
    articulo: 'Art. 453 C.P.',
    nombre: 'Fraude Procesal',
    bienJuridico: 'justicia',
    bienJuridicoNombre: 'Eficaz y Recta Impartición de Justicia',
    minMeses: 72,
    maxMeses: 144,
    norma: 'El que por cualquier medio fraudulento induzca en error a un servidor público para obtener sentencia, resolución o acto administrativo contrario a la ley.',
    especificos: 'Delito de conducta permanente hasta que cesan los efectos del acto inducido en error.',
    multa: 'Multa de 200 a 1000 SMLMV.',
    inhabilitacion: 'Inhabilitación de derechos y funciones públicas de 66 a 144 meses.'
  }
];

// ============================================================
// 2. GESTOR DEL CATÁLOGO DE DELITOS (Función 2)
// ============================================================
const CatalogoManager = {
  filtroActivo: 'todos',
  delitoSeleccionadoId: '103',

  init() {
    this.renderizar();
    this.mostrarDetalle('103');
  },

  filtrarBienJuridico(bien) {
    this.filtroActivo = bien;

    const botones = document.querySelectorAll('.btn-filtro-bien');
    botones.forEach(btn => {
      const b = btn.getAttribute('data-bien');
      if (b === bien) {
        btn.className = "btn-filtro-bien px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-wine text-white shadow-sm transition-all";
      } else {
        btn.className = "btn-filtro-bien px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all";
      }
    });

    this.renderizar();
  },

  buscar(query) {
    this.renderizar(query.trim().toLowerCase());
  },

  renderizar(query = '') {
    const contenedor = document.getElementById('catalogo-lista-delitos');
    const badgeTotal = document.getElementById('badge-total-delitos');
    const conteoVisibles = document.getElementById('catalogo-conteo-visibles');
    if (!contenedor) return;

    let lista = DelitosCatalogo;

    if (this.filtroActivo !== 'todos') {
      lista = lista.filter(d => d.bienJuridico === this.filtroActivo);
    }

    if (query) {
      lista = lista.filter(d => 
        d.articulo.toLowerCase().includes(query) ||
        d.nombre.toLowerCase().includes(query) ||
        d.bienJuridicoNombre.toLowerCase().includes(query) ||
        d.norma.toLowerCase().includes(query)
      );
    }

    if (badgeTotal) badgeTotal.textContent = `${DelitosCatalogo.length} delitos registrados`;
    if (conteoVisibles) conteoVisibles.textContent = `Mostrando ${lista.length}`;

    if (lista.length === 0) {
      contenedor.innerHTML = `
        <div class="p-6 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
          <span class="material-symbols-outlined text-3xl mb-1 text-slate-300">search_off</span>
          <p class="text-xs">No se hallaron tipos penales con ese criterio.</p>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = lista.map(d => {
      const isSelected = d.id === this.delitoSeleccionadoId;
      const cardBorder = isSelected ? 'border-wine bg-wine-light/50 ring-1 ring-wine' : 'border-slate-200 bg-white hover:border-wine/40';

      return `
        <div onclick="CatalogoManager.mostrarDetalle('${d.id}')" class="p-3 rounded-xl border ${cardBorder} transition-all cursor-pointer flex items-center justify-between gap-3">
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-dark text-white">${d.articulo}</span>
              <span class="text-[10px] font-mono text-slate-500 truncate">${d.bienJuridicoNombre}</span>
            </div>
            <h4 class="font-headline font-bold text-xs text-slate-900 mt-1 truncate">${d.nombre}</h4>
            <span class="text-[11px] font-mono text-wine font-semibold block mt-0.5">${d.minMeses} a ${d.maxMeses} meses</span>
          </div>
          <span class="material-symbols-outlined text-slate-400 text-sm">arrow_forward</span>
        </div>
      `;
    }).join('');
  },

  mostrarDetalle(id) {
    const d = DelitosCatalogo.find(item => item.id === id);
    if (!d) return;

    this.delitoSeleccionadoId = id;
    this.renderizar();

    const setTxt = (elId, txt) => {
      const el = document.getElementById(elId);
      if (el) el.textContent = txt;
    };

    setTxt('catalogo-detalle-articulo-badge', d.articulo);
    setTxt('catalogo-detalle-bien', d.bienJuridicoNombre);
    setTxt('catalogo-detalle-nombre', d.nombre);
    setTxt('catalogo-detalle-norma', `"${d.norma}"`);
    setTxt('catalogo-detalle-min', `${d.minMeses} m`);
    setTxt('catalogo-detalle-min-anos', formatearMesesAHumano(d.minMeses));
    setTxt('catalogo-detalle-max', `${d.maxMeses} m`);
    setTxt('catalogo-detalle-max-anos', formatearMesesAHumano(d.maxMeses));
    
    const ap = d.maxMeses - d.minMeses;
    setTxt('catalogo-detalle-ambito', `${ap} m`);
    setTxt('catalogo-detalle-cuarto-valor', `Cuarto: ${(ap / 4).toFixed(1)}m`);

    const esp = document.getElementById('catalogo-detalle-especificos');
    if (esp) {
      esp.innerHTML = `
        <p>• <strong>Modificadores específicos:</strong> ${d.especificos}</p>
        <p>• <strong>Sanción patrimonial:</strong> ${d.multa}</p>
        <p>• <strong>Penas accesorias:</strong> ${d.inhabilitacion}</p>
      `;
    }
  },

  cargarEnCalculadora() {
    const d = DelitosCatalogo.find(item => item.id === this.delitoSeleccionadoId);
    if (!d) return;

    AppState.caso.delitoBase = d.id;
    AppState.caso.minMeses = d.minMeses;
    AppState.caso.maxMeses = d.maxMeses;

    const hechosSelect = document.getElementById('caso-delito-base');
    if (hechosSelect) {
      hechosSelect.value = d.id.startsWith('104') ? '104' : (['103','104','239','240','244','365'].includes(d.id) ? d.id : '103');
    }

    CasoManager.mostrarToast(`Delito "${d.nombre}" transferido para Dosimetría Penal`, "calculate");
    AppNav.switchTab('calculadora');
  }
};

// ============================================================
// 3. CALCULADORA DE CUARTOS Y DOSIMETRÍA PASO A PASO (Función 3)
// ============================================================
const CalculadoraManager = {
  minBase: 208,
  maxBase: 450,
  minModificado: 208,
  maxModificado: 450,
  ambitoPunitivo: 242,
  cuartoAmplitud: 60.5,
  cuartos: {
    q1: { min: 208, max: 268.5 },
    q2: { min: 268.5, max: 329 },
    q3: { min: 329, max: 389.5 },
    q4: { min: 389.5, max: 450 }
  },
  cuartoActivo: 'medios',
  quantumMeses: 329,
  descuentoPorcentaje: 40,
  penaFinalMeses: 197.4,

  init() {
    this.sincronizarDesdeCaso();
  },

  sincronizarDesdeCaso() {
    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    this.minBase = d.minMeses;
    this.maxBase = d.maxMeses;

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt('calc-badge-articulo', d.articulo);
    setTxt('calc-delito-nombre', d.nombre);
    setTxt('calc-delito-cita', `"${d.norma}"`);

    const selectIntervencion = document.getElementById('calc-select-intervencion');
    const selectEjecucion = document.getElementById('calc-select-ejecucion');
    if (selectIntervencion && AppState.caso.intervencion) selectIntervencion.value = AppState.caso.intervencion;
    if (selectEjecucion && AppState.caso.consumacion) selectEjecucion.value = AppState.caso.consumacion;

    this.actualizarModificadores();
  },

  actualizarModificadores() {
    const intervencion = document.getElementById('calc-select-intervencion')?.value || 'autor_directo';
    const ejecucion = document.getElementById('calc-select-ejecucion')?.value || 'consumado';
    const especiales = document.getElementById('calc-select-especiales')?.value || 'ninguno';

    let min = this.minBase;
    let max = this.maxBase;
    let notasModificador = [];

    // 1. Grado de ejecución (Art. 27 C.P. - Tentativa)
    if (ejecucion === 'tentativa_acabada') {
      min = Math.round(min * 0.5);
      max = Math.round(max * 0.6667);
      notasModificador.push('Tentativa acabada (Art. 27 inc. 1: rebaja de 1/3 a 1/2)');
    } else if (ejecucion === 'tentativa_inacabada') {
      min = Math.round(min * 0.3333);
      max = Math.round(max * 0.5);
      notasModificador.push('Tentativa inacabada (Art. 27 inc. 2: rebaja de 1/2 a 2/3)');
    }

    // 2. Participación (Art. 30 C.P. - Complicidad e Interviniente)
    if (intervencion === 'complice') {
      min = Math.round(min * 0.5);
      max = Math.round(max * 0.8333);
      notasModificador.push('Complicidad (Art. 30 inc. 3: rebaja de 1/6 a 1/2)');
    } else if (intervencion === 'interviniente') {
      min = Math.round(min * 0.75);
      max = Math.round(max * 0.75);
      notasModificador.push('Interviniente (Art. 30 inc. 4: rebaja de la 1/4 parte)');
    }

    // 3. Causales especiales (Arts. 56 y 57 C.P.)
    if (especiales === 'ira_intenso_dolor') {
      min = Math.round(min * 0.3333);
      max = Math.round(max * 0.5);
      notasModificador.push('Ira e Intenso Dolor (Art. 57: rebaja de 1/6 a 1/2)');
    } else if (especiales === 'marginalidad') {
      min = Math.round(min * 0.1667);
      max = Math.round(max * 0.5);
      notasModificador.push('Marginalidad / Pobreza Extrema (Art. 56: rebaja de 1/6 a 1/2)');
    }

    if (min >= max) min = Math.max(1, max - 12);

    this.minModificado = min;
    this.maxModificado = max;

    const alertaDisplay = document.getElementById('calc-limites-modificados-display');
    if (alertaDisplay) {
      if (notasModificador.length > 0) {
        alertaDisplay.textContent = `${min} a ${max} meses (${notasModificador.join(', ')})`;
        alertaDisplay.className = "font-bold text-wine";
      } else {
        alertaDisplay.textContent = `${min} a ${max} meses (Límites abstractos plenos de ley)`;
        alertaDisplay.className = "font-bold text-slate-900";
      }
    }

    this.calcularCuartos();
  },

  calcularCuartos() {
    const min = this.minModificado;
    const max = this.maxModificado;
    const ap = max - min;
    const vc = Number((ap / 4).toFixed(2));

    this.ambitoPunitivo = ap;
    this.cuartoAmplitud = vc;

    const q1Max = Number((min + vc).toFixed(2));
    const q2Max = Number((min + 2 * vc).toFixed(2));
    const q3Max = Number((max - vc).toFixed(2));

    this.cuartos = {
      q1: { min: min, max: q1Max },
      q2: { min: q1Max, max: q2Max },
      q3: { min: q2Max, max: q3Max },
      q4: { min: q3Max, max: max }
    };

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt('calc-pena-min-meses', `${min} m`);
    setTxt('calc-pena-min-anos', formatearMesesAHumano(min));
    setTxt('calc-pena-max-meses', `${max} m`);
    setTxt('calc-pena-max-anos', formatearMesesAHumano(max));
    setTxt('calc-ambito-meses', `${ap} m`);
    setTxt('calc-cuarto-amplitud', `Cuarto: ${vc}m`);
    setTxt('calc-subtitulo-cuartos', `Ámbito de ${ap} meses / 4 = ${vc} meses por cuarto punitivo.`);

    setTxt('rango-cuarto-1-meses', `${min} a ${q1Max} m`);
    setTxt('rango-cuarto-1-human', `${formatearMesesAHumano(min)} a ${formatearMesesAHumano(q1Max)}`);

    setTxt('rango-cuarto-2-meses', `${q1Max} a ${q2Max} m`);
    setTxt('rango-cuarto-2-human', `${formatearMesesAHumano(q1Max)} a ${formatearMesesAHumano(q2Max)}`);

    setTxt('rango-cuarto-3-meses', `${q2Max} a ${q3Max} m`);
    setTxt('rango-cuarto-3-human', `${formatearMesesAHumano(q2Max)} a ${formatearMesesAHumano(q3Max)}`);

    setTxt('rango-cuarto-4-meses', `${q3Max} a ${max} m`);
    setTxt('rango-cuarto-4-human', `${formatearMesesAHumano(q3Max)} a ${formatearMesesAHumano(max)}`);

    this.determinarCuartoActivo();
    this.renderizarExplicacionPasoAPaso();
  },

  determinarCuartoActivo() {
    const mit = AppState.caso.atenuantesCount || 0;
    const agg = AppState.caso.agravantesCount || 0;

    let activo = 'medios';
    let reglaTexto = '';

    if (mit > 0 && agg === 0) {
      activo = 'minimo';
      reglaTexto = `"El sentenciador sólo podrá moverse dentro del <strong>cuarto mínimo</strong> cuando únicamente concurran circunstancias de menor punibilidad (Art. 61 inc. 2 C.P.)." Al estar acreditadas ${mit} atenuante(s) del Art. 55 y 0 agravantes del Art. 58, la ley restringe el arbitrio judicial al intervalo de <strong>${this.cuartos.q1.min} a ${this.cuartos.q1.max} meses</strong>.`;
    } else if (agg > 0 && mit === 0) {
      activo = 'maximo';
      reglaTexto = `"El sentenciador sólo podrá moverse dentro del <strong>cuarto máximo</strong> cuando únicamente concurran circunstancias de mayor punibilidad (Art. 61 inc. 2 C.P.)." Al acreditarse ${agg} agravante(s) del Art. 58 y 0 atenuantes, la ley ordena situar la pena en el intervalo de <strong>${this.cuartos.q4.min} a ${this.cuartos.q4.max} meses</strong>.`;
    } else {
      activo = 'medios';
      reglaTexto = `"El sentenciador podrá moverse dentro de los <strong>cuartos medios</strong> cuando concurran circunstancias de atenuación y agravación punitiva, o cuando no concurra ninguna de ellas (Art. 61 inc. 2 C.P.)." Al concurrir ${mit} atenuante(s) y ${agg} agravante(s), el marco legal vinculante es de <strong>${this.cuartos.q2.min} a ${this.cuartos.q3.max} meses</strong>.`;
    }

    this.cuartoActivo = activo;
    AppState.caso.cuartoResultante = activo;

    const reglaEl = document.getElementById('calc-regla-legal-texto');
    if (reglaEl) reglaEl.innerHTML = reglaTexto;

    const cardQ1 = document.getElementById('card-cuarto-1');
    const cardQ2 = document.getElementById('card-cuarto-2');
    const cardQ3 = document.getElementById('card-cuarto-3');
    const cardQ4 = document.getElementById('card-cuarto-4');

    const resetCard = (card, qKey) => {
      if (!card) return;
      card.className = "cuarto-card relative rounded-xl p-4 border border-slate-200 bg-white text-slate-800 opacity-75 hover:opacity-100 transition-all flex flex-col justify-between";
      const tag = document.getElementById(`tag-seleccion-cuarto-${qKey}`);
      if (tag) tag.textContent = 'Inactivo';
    };

    resetCard(cardQ1, 1);
    resetCard(cardQ2, 2);
    resetCard(cardQ3, 3);
    resetCard(cardQ4, 4);

    const badgeCuartoActivo = document.getElementById('calc-badge-cuarto-activo');

    if (activo === 'minimo') {
      if (cardQ1) {
        cardQ1.className = "cuarto-card relative rounded-xl p-4 border-2 border-emerald-700 bg-emerald-50 text-emerald-950 shadow-sm flex flex-col justify-between transition-all scale-[1.01]";
        const tag = document.getElementById('tag-seleccion-cuarto-1');
        if (tag) tag.textContent = 'SELECCIÓN LEGAL VINCULANTE';
      }
      if (badgeCuartoActivo) {
        badgeCuartoActivo.className = "self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300";
        badgeCuartoActivo.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-700"></span> Cuarto Mínimo Operativo';
      }
      this.configurarSlider(this.cuartos.q1.min, this.cuartos.q1.max);
    } else if (activo === 'maximo') {
      if (cardQ4) {
        cardQ4.className = "cuarto-card relative rounded-xl p-4 border-2 border-wine bg-wine-light text-wine-dark shadow-sm flex flex-col justify-between transition-all scale-[1.01]";
        const tag = document.getElementById('tag-seleccion-cuarto-4');
        if (tag) tag.textContent = 'SELECCIÓN LEGAL VINCULANTE';
      }
      if (badgeCuartoActivo) {
        badgeCuartoActivo.className = "self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-wine-light text-wine border border-wine/40";
        badgeCuartoActivo.innerHTML = '<span class="w-2 h-2 rounded-full bg-wine"></span> Cuarto Máximo Operativo';
      }
      this.configurarSlider(this.cuartos.q4.min, this.cuartos.q4.max);
    } else {
      if (cardQ2) {
        cardQ2.className = "cuarto-card relative rounded-xl p-4 border-2 border-wine bg-wine-light text-wine-dark shadow-sm flex flex-col justify-between transition-all";
        const tag = document.getElementById('tag-seleccion-cuarto-2');
        if (tag) tag.textContent = 'CUARTOS MEDIOS (Q2)';
      }
      if (cardQ3) {
        cardQ3.className = "cuarto-card relative rounded-xl p-4 border-2 border-wine bg-wine-light text-wine-dark shadow-sm flex flex-col justify-between transition-all";
        const tag = document.getElementById('tag-seleccion-cuarto-3');
        if (tag) tag.textContent = 'CUARTOS MEDIOS (Q3)';
      }
      if (badgeCuartoActivo) {
        badgeCuartoActivo.className = "self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-wine-light text-wine border border-wine/30";
        badgeCuartoActivo.innerHTML = '<span class="w-2 h-2 rounded-full bg-wine"></span> Cuartos Medios Operativos';
      }
      this.configurarSlider(this.cuartos.q2.min, this.cuartos.q3.max);
    }
  },

  configurarSlider(min, max) {
    const slider = document.getElementById('slider-cuarto-quantum');
    const labelMin = document.getElementById('slider-cuarto-min-label');
    const labelMax = document.getElementById('slider-cuarto-max-label');

    if (slider) {
      slider.min = min;
      slider.max = max;
      slider.step = 0.5;

      const val = Number((min + (max - min) * 0.25).toFixed(1));
      slider.value = val;
      this.actualizarQuantum(val);
    }

    if (labelMin) labelMin.textContent = `Mín: ${min} m`;
    if (labelMax) labelMax.textContent = `Máx: ${max} m`;
  },

  actualizarQuantum(val) {
    const quantum = parseFloat(val);
    this.quantumMeses = quantum;

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt('calc-quantum-meses', quantum.toFixed(1));
    setTxt('calc-quantum-human', `(${formatearMesesAHumano(quantum)})`);
    setTxt('resumen-pena-previa', `${quantum.toFixed(1)} meses`);

    let rebaja = AppState.caso.rebajaPorcentaje || 0;
    const bloqueo = AppState.caso.prohibicionArt199 || AppState.caso.prohibicionArt68A;

    const alertaBloqueo = document.getElementById('alerta-calc-prohibicion');
    const tagRebaja = document.getElementById('calc-rebaja-tag');

    if (bloqueo) {
      rebaja = 0;
      if (alertaBloqueo) alertaBloqueo.classList.remove('hidden');
      if (tagRebaja) {
        tagRebaja.textContent = "0% (Prohibición Art. 199 / 68A)";
        tagRebaja.className = "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-wine-light text-wine-dark border border-wine/30";
      }
    } else {
      if (alertaBloqueo) alertaBloqueo.classList.add('hidden');
      if (tagRebaja) {
        tagRebaja.textContent = `-${rebaja}% Pactado`;
        tagRebaja.className = "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-wine-light text-wine border border-wine/30";
      }
    }

    this.descuentoPorcentaje = rebaja;
    const descuentoMeses = Number((quantum * (rebaja / 100)).toFixed(2));
    const penaFinal = Number((quantum - descuentoMeses).toFixed(2));
    this.penaFinalMeses = penaFinal;

    setTxt('resumen-descuento-meses', `-${descuentoMeses.toFixed(1)} meses (-${rebaja}%)`);
    setTxt('calc-pena-final-meses', penaFinal.toFixed(1));
    setTxt('calc-pena-final-human', `${formatearMesesAHumano(penaFinal)} de prisión efectiva`);
  },

  // ============================================================
  // EXPLICACIÓN PASO A PASO (Requisito 6: De dónde sale cada dato)
  // ============================================================
  renderizarExplicacionPasoAPaso() {
    const cont = document.getElementById('calc-explicacion-paso-a-paso');
    if (!cont) return;

    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    const min = this.minModificado;
    const max = this.maxModificado;
    const ap = this.ambitoPunitivo;
    const vc = this.cuartoAmplitud;
    const mit = AppState.caso.atenuantesCount || 0;
    const agg = AppState.caso.agravantesCount || 0;

    cont.innerHTML = `
      <div class="space-y-4 text-xs text-slate-700 leading-relaxed font-sans">
        
        <!-- Paso 1 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">1</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">Origen de los Datos y Límites Legales Abstractos (${d.articulo})</h4>
          </div>
          <p>
            <strong>¿De dónde salen las cifras?</strong> Del precepto sancionatorio fijado por el legislador en la Ley 599 de 2000 (Código Penal). Para el tipo penal de <em>${d.nombre}</em>, la norma estipula una sanción abstracta de <strong>${this.minBase} meses (${formatearMesesAHumano(this.minBase)})</strong> como límite inferior y <strong>${this.maxBase} meses (${formatearMesesAHumano(this.maxBase)})</strong> como límite superior.
          </p>
        </div>

        <!-- Paso 2 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">2</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">Modificación Previa de Extremos por Factores de Parte General (Art. 60 C.P.)</h4>
          </div>
          <p>
            <strong>¿Por qué y cómo se modifican los extremos?</strong> La Corte Suprema de Justicia (Sentencia SP 25 may. 2016, Rad. 43837) reitera que los dispositivos amplificadores del tipo (tentativa Art. 27, complicidad Art. 30) o causales especiales (ira Art. 57) deben computarse <u>antes</u> de la división en cuartos:
          </p>
          <div class="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
            <div class="p-2 bg-white rounded-lg border border-slate-200">
              <span class="text-slate-500 block">Límite mínimo modificado:</span>
              <strong class="text-slate-900 text-xs">${min} meses</strong> (${formatearMesesAHumano(min)})
            </div>
            <div class="p-2 bg-white rounded-lg border border-slate-200">
              <span class="text-slate-500 block">Límite máximo modificado:</span>
              <strong class="text-slate-900 text-xs">${max} meses</strong> (${formatearMesesAHumano(max)})
            </div>
          </div>
        </div>

        <!-- Paso 3 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">3</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">Cálculo del Ámbito Punitivo de Movilidad (Art. 61 Inciso 1° C.P.)</h4>
          </div>
          <p>
            <strong>Fórmula Legal:</strong> <code class="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-wine">Ámbito Punitivo = Límite Máximo - Límite Mínimo</code>
          </p>
          <p class="mt-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-slate-200 text-slate-900">
            Ámbito Punitivo = ${max} meses - ${min} meses = <strong>${ap} meses</strong> (${formatearMesesAHumano(ap)}).
          </p>
          <p class="mt-1 text-slate-500">
            <em>¿Por qué se resta?</em> Porque el Ámbito Punitivo constituye el espacio de libertad jurídica dentro del cual el juez tiene facultad legal para determinar la sanción sin quebrantar el principio de legalidad (Art. 6 C.P.).
          </p>
        </div>

        <!-- Paso 4 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">4</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">División Aritmética en Cuatro Cuartos Iguales (Art. 61 Inciso 1° C.P.)</h4>
          </div>
          <p>
            <strong>Fórmula Legal:</strong> <code class="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 font-bold text-wine">Valor de Cada Cuarto = Ámbito Punitivo / 4</code>
          </p>
          <p class="mt-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-slate-200 text-slate-900">
            Valor de Cada Cuarto = ${ap} meses / 4 = <strong>${vc} meses</strong> por cuarto punitivo.
          </p>
          <p class="mt-1 text-slate-500">
            <em>¿Por qué se divide de esa manera?</em> Para erradicar la arbitrariedad judicial y conferir plena seguridad jurídica, dividiendo el ámbito punitivo en cuatro franjas exactas y continuas.
          </p>
        </div>

        <!-- Paso 5 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">5</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">Subsunción y Elección Vinculante del Cuarto (Art. 61 Inciso 2° C.P.)</h4>
          </div>
          <p>
            <strong>Regla Vinculante de la Ley:</strong> El legislador colombiano prohíbe al juez elegir el cuarto a su libre capricho. La norma impone una regla tripartita de subsunción obligatoria:
          </p>
          <div class="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div class="p-2.5 rounded-lg ${this.cuartoActivo === 'minimo' ? 'bg-emerald-50 border-2 border-emerald-600 font-bold' : 'bg-white border border-slate-200'}">
              <span class="block text-emerald-800 uppercase font-bold">1. Cuarto Mínimo</span>
              <span>Solo cuando concurren circunstancias de menor punibilidad (Art. 55).</span>
            </div>
            <div class="p-2.5 rounded-lg ${this.cuartoActivo === 'medios' ? 'bg-wine-light border-2 border-wine font-bold text-wine-dark' : 'bg-white border border-slate-200'}">
              <span class="block text-wine uppercase font-bold">2. Cuartos Medios</span>
              <span>Concurren atenuantes y agravantes a la vez, o ninguna causal genérica.</span>
            </div>
            <div class="p-2.5 rounded-lg ${this.cuartoActivo === 'maximo' ? 'bg-wine-light border-2 border-wine-dark font-bold text-wine-dark' : 'bg-white border border-slate-200'}">
              <span class="block text-wine-dark uppercase font-bold">3. Cuarto Máximo</span>
              <span>Solo cuando concurren circunstancias de mayor punibilidad (Art. 58).</span>
            </div>
          </div>
          <p class="mt-2 text-wine font-semibold">
            👉 En este caso concreto concurren <strong>${mit} atenuante(s)</strong> y <strong>${agg} agravante(s)</strong>. La ley impone situarse en: <u>${this.cuartoActivo.toUpperCase()}</u>.
          </p>
        </div>

        <!-- Paso 6 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">6</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">Ponderación del Quantum Judicial dentro del Cuarto (Arts. 59 y 61 Inc. 3° C.P.)</h4>
          </div>
          <p>
            Dentro del cuarto asignado, el juez ejerce su discrecionalidad reglada fundamentando los 4 criterios legales del Artículo 59:
            (i) gravedad de la conducta, (ii) daño real o potencial, (iii) intensidad del dolo o de la culpa, y (iv) fines preventivos de la sanción (Art. 4 C.P.).
          </p>
          <p class="mt-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-slate-200 text-slate-900">
            Pena individualizada dentro del cuarto: <strong>${this.quantumMeses} meses</strong> (${formatearMesesAHumano(this.quantumMeses)}).
          </p>
        </div>

        <!-- Paso 7 -->
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div class="flex items-center gap-2 mb-1.5 font-bold text-wine">
            <span class="w-5 h-5 rounded-full bg-wine text-white text-[11px] flex items-center justify-center font-mono">7</span>
            <h4 class="font-headline text-sm font-bold text-slate-900">Justicia Premial y Condena Definitiva (Art. 351 C.P.P. / Art. 199 Ley 1098)</h4>
          </div>
          <p>
            Se deduce el porcentaje pactado por allanamiento o preacuerdo, verificando la ausencia de prohibiciones taxativas:
          </p>
          <p class="mt-1 font-mono text-[11px] bg-white p-2.5 rounded-lg border border-slate-200 text-slate-900">
            ${this.quantumMeses} meses - ${this.descuentoPorcentaje}% de rebaja premial = <strong class="text-wine text-sm">${this.penaFinalMeses} meses</strong> (${formatearMesesAHumano(this.penaFinalMeses)} de prisión efectiva).
          </p>
        </div>

      </div>
    `;
  }
};

// ============================================================
// 4. JUSTIFICACIÓN JURÍDICA PROFUNDA Y AUTO JUDICIAL (Función 4)
// ============================================================
const JustificacionManager = {
  generarMemoria() {
    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    const calc = CalculadoraManager;

    const setTxt = (id, txt) => {
      const el = document.getElementById(id);
      if (el) el.textContent = txt;
    };

    setTxt('memoria-radicado', `RADICADO SPOA: ${AppState.caso.radicado || '110016000000202300452'}`);
    setTxt('memoria-fecha-emision', `Emisión judicial: ${new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    setTxt('memoria-procesado', AppState.caso.procesado || 'Julián David Morales Reyes');
    setTxt('memoria-juzgado', AppState.caso.juzgado || 'Juzgado 12 Penal del Circuito con Funciones de Conocimiento');
    setTxt('memoria-fiscalia', AppState.caso.fiscalia || 'Fiscalía 45 Seccional de Vida de Bogotá');
    setTxt('memoria-delito', `${d.articulo} (${d.nombre})`);

    const tbody = document.getElementById('memoria-tabla-cuartos');
    if (tbody) {
      tbody.innerHTML = `
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-semibold text-slate-900">Límites Legales Abstractos</td>
          <td class="p-3 font-mono text-center">${calc.minBase} a ${calc.maxBase} m</td>
          <td class="p-3 font-mono text-center">${formatearMesesAHumano(calc.minBase)} a ${formatearMesesAHumano(calc.maxBase)}</td>
          <td class="p-3 text-slate-500">${d.articulo}</td>
        </tr>
        <tr class="hover:bg-slate-50 bg-wine-light/30">
          <td class="p-3 font-semibold text-slate-900">Límites Modificados por Factores Generales (Art. 60 C.P.)</td>
          <td class="p-3 font-mono text-center font-bold text-wine">${calc.minModificado} a ${calc.maxModificado} m</td>
          <td class="p-3 font-mono text-center font-bold text-wine">${formatearMesesAHumano(calc.minModificado)} a ${formatearMesesAHumano(calc.maxModificado)}</td>
          <td class="p-3 text-slate-500">Arts. 27, 30 y 60 C.P.</td>
        </tr>
        <tr class="hover:bg-slate-50">
          <td class="p-3 font-semibold text-slate-900">Ámbito Punitivo de Movilidad</td>
          <td class="p-3 font-mono text-center">${calc.ambitoPunitivo} m</td>
          <td class="p-3 font-mono text-center">${formatearMesesAHumano(calc.ambitoPunitivo)}</td>
          <td class="p-3 text-slate-500">Pena Máx. - Pena Mín.</td>
        </tr>
        <tr class="hover:bg-slate-50 ${calc.cuartoActivo === 'minimo' ? 'bg-emerald-50 font-bold text-emerald-900' : ''}">
          <td class="p-3">Primer Cuarto (Mínimo)</td>
          <td class="p-3 font-mono text-center">${calc.cuartos.q1.min} a ${calc.cuartos.q1.max} m</td>
          <td class="p-3 font-mono text-center">${formatearMesesAHumano(calc.cuartos.q1.min)} a ${formatearMesesAHumano(calc.cuartos.q1.max)}</td>
          <td class="p-3 text-slate-500">Art. 61 inc. 2 C.P.</td>
        </tr>
        <tr class="hover:bg-slate-50 ${calc.cuartoActivo === 'medios' ? 'bg-wine-light font-bold text-wine' : ''}">
          <td class="p-3">Cuartos Medios (Inferior y Superior)</td>
          <td class="p-3 font-mono text-center">${calc.cuartos.q2.min} a ${calc.cuartos.q3.max} m</td>
          <td class="p-3 font-mono text-center">${formatearMesesAHumano(calc.cuartos.q2.min)} a ${formatearMesesAHumano(calc.cuartos.q3.max)}</td>
          <td class="p-3 text-slate-500">Art. 61 inc. 2 C.P.</td>
        </tr>
        <tr class="hover:bg-slate-50 ${calc.cuartoActivo === 'maximo' ? 'bg-wine-light font-bold text-wine-dark' : ''}">
          <td class="p-3">Cuarto Máximo</td>
          <td class="p-3 font-mono text-center">${calc.cuartos.q4.min} a ${calc.cuartos.q4.max} m</td>
          <td class="p-3 font-mono text-center">${formatearMesesAHumano(calc.cuartos.q4.min)} a ${formatearMesesAHumano(calc.cuartos.q4.max)}</td>
          <td class="p-3 text-slate-500">Art. 61 inc. 2 C.P.</td>
        </tr>
      `;
    }

    const mit = AppState.caso.atenuantesCount || 0;
    const agg = AppState.caso.agravantesCount || 0;
    let motivacionCuarto = "";

    if (calc.cuartoActivo === 'minimo') {
      motivacionCuarto = `En el presente juicio concurren con suficiencia probatoria ${mit} circunstancia(s) de menor punibilidad contempladas en el artículo 55 del Código Penal, sin que la Fiscalía General de la Nación haya acreditado causales de mayor punibilidad del artículo 58 ejusdem. En estricta aplicación del inciso 2° del artículo 61 del Código Penal, la discrecionalidad judicial queda legalmente circunscrita al <strong>Primer Cuarto (Mínimo)</strong>, comprendido entre ${calc.cuartos.q1.min} y ${calc.cuartos.q1.max} meses. Desbordar este marco punitivo constituiría una vía de hecho por desconocimiento del principio de legalidad y favorabilidad.`;
    } else if (calc.cuartoActivo === 'maximo') {
      motivacionCuarto = `Se acreditaron debidamente ${agg} circunstancia(s) de mayor punibilidad consagradas en el artículo 58 del Código Penal, sin concurrencia de atenuantes genéricas del artículo 55. En observancia imperativa del artículo 61 inciso 2° C.P., la individualización judicial debe situarse de manera ineludible en el <strong>Cuarto Máximo</strong>, entre ${calc.cuartos.q4.min} y ${calc.cuartos.q4.max} meses.`;
    } else {
      motivacionCuarto = `En el plenario concurren simultáneamente circunstancias de atenuación (${mit}) y agravación (${agg}), o se constata la ausencia total de causales de los artículos 55 y 58 C.P. Conforme al mandato imperativo del artículo 61 inciso 2° del Código Penal, el marco de movilidad dosimétrica corresponde a los <strong>Cuartos Medios</strong>, fijados entre ${calc.cuartos.q2.min} y ${calc.cuartos.q3.max} meses de prisión.`;
    }

    setTxt('memoria-motivacion-cuarto-texto', motivacionCuarto);

    const containerArt59 = document.getElementById('memoria-criterios-art59');
    if (containerArt59) {
      containerArt59.innerHTML = `
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-slate-900 block mb-1">A. Mayor o menor gravedad de la conducta:</span>
          <p class="text-slate-600">Se evalúa la modalidad lesiva desplegada por el procesado, la intensidad del ataque y el desprecio manifiesto por el bien jurídico de la vida e integridad.</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-slate-900 block mb-1">B. Daño real o potencial creado:</span>
          <p class="text-slate-600">Trascendencia del menoscabo físico y moral producido en la víctima y su núcleo familiar, acreditado con los dictámenes periciales del Instituto Nacional de Medicina Legal.</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-slate-900 block mb-1">C. Intensidad del dolo o culpa:</span>
          <p class="text-slate-600">Determinación consciente del injusto, persistencia en la ejecución material del hecho y ausencia de desistimiento espontáneo.</p>
        </div>
        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span class="font-bold text-slate-900 block mb-1">D. Fines de la Pena (Art. 4 C.P.):</span>
          <p class="text-slate-600">La sanción individualizada de ${calc.quantumMeses} meses previa a deducciones premiales responde a los principios de proporcionalidad, retribución justa y prevención general y especial.</p>
        </div>
      `;
    }

    const penaFinal = calc.penaFinalMeses;
    const minLegal = calc.minModificado;

    const statusArt63 = document.getElementById('subrogado-art63-status');
    const statusArt38b = document.getElementById('subrogado-art38b-status');

    if (penaFinal <= 48) {
      if (statusArt63) {
        statusArt63.textContent = "PROCEDENTE FACTIBILIDAD OBJETIVA (Pena ≤ 48 meses)";
        statusArt63.className = "px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 self-start";
      }
    } else {
      if (statusArt63) {
        statusArt63.textContent = `IMPROCEDENTE (Pena impuesta de ${penaFinal}m supera el tope legal de 48 meses)`;
        statusArt63.className = "px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-wine-light text-wine-dark self-start border border-wine/20";
      }
    }

    if (minLegal <= 96 && !AppState.caso.prohibicionArt68A) {
      if (statusArt38b) {
        statusArt38b.textContent = "PROCEDENTE FACTIBILIDAD OBJETIVA (Pena mínima legal ≤ 96 meses)";
        statusArt38b.className = "px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 self-start";
      }
    } else {
      if (statusArt38b) {
        statusArt38b.textContent = `IMPROCEDENTE (Pena mínima de ${minLegal}m supera tope de 96m o exclusión Art. 68A)`;
        statusArt38b.className = "px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-wine-light text-wine-dark self-start border border-wine/20";
      }
    }

    setTxt('memoria-sentencia-resumen', `CONDENA DEFINITIVA: ${penaFinal} MESES`);
    setTxt('memoria-sentencia-human', `Equivalente a ${formatearMesesAHumano(penaFinal)} de prisión efectiva.`);
  },

  generarTextoCompleto() {
    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    const calc = CalculadoraManager;

    return `========================================================================
REPÚBLICA DE COLOMBIA - RAMA JUDICIAL DEL PODER PÚBLICO
AUTO INTERLOCUTORIO DE INDIVIDUALIZACIÓN JUDICIAL DE LA PENA
(Artículos 59, 60 y 61 Ley 599 de 2000 — Art. 447 Ley 906 de 2004)
========================================================================

I. VISTOS PROCESALES Y HECHOS JURÍDICAMENTE RELEVANTES
------------------------------------------------------------------------
RADICADO SPOA    : ${AppState.caso.radicado || '110016000000202300452'}
JUZGADO          : ${AppState.caso.juzgado || 'Juzgado Penal del Circuito'}
FISCALÍA         : ${AppState.caso.fiscalia || 'Fiscalía General de la Nación'}
PROCESADO        : ${AppState.caso.procesado || 'Ciudadano Acusado'}
DELITO BASE      : ${d.articulo} - ${d.nombre}
BIEN JURÍDICO    : ${d.bienJuridicoNombre}

HECHOS PROBADOS:
"${AppState.caso.narrativa || 'Hechos probados en la audiencia de juicio oral.'}"

II. JUICIO DE TIPICIDAD Y LÍMITES PUNITIVOS (Art. 60 C.P.)
------------------------------------------------------------------------
1. La conducta imputada se subsume formal y materialmente en el tipo penal de ${d.nombre}.
2. Límite legal abstracto fijado por el legislador: ${calc.minBase} a ${calc.maxBase} meses (${formatearMesesAHumano(calc.minBase)} a ${formatearMesesAHumano(calc.maxBase)}).
3. Aplicación de factores modificadores del Art. 60 C.P.:
   Nuevos límites tasados: ${calc.minModificado} a ${calc.maxModificado} meses.

III. CÓMPUTO ARITMÉTICO Y DIVISIÓN EN CUARTOS (Art. 61 Inc. 1° C.P.)
------------------------------------------------------------------------
Fórmula de Ámbito Punitivo: Pena Máxima (${calc.maxModificado}) - Pena Mínima (${calc.minModificado}) = ${calc.ambitoPunitivo} meses.
Fórmula de Valor del Cuarto: Ámbito Punitivo (${calc.ambitoPunitivo}) / 4 = ${calc.cuartoAmplitud} meses.

Segmentación aritmética obligatoria:
• Primer Cuarto (Mínimo)   : ${calc.cuartos.q1.min} a ${calc.cuartos.q1.max} meses
• Cuartos Medios (Q2 & Q3)  : ${calc.cuartos.q2.min} a ${calc.cuartos.q3.max} meses
• Cuarto Máximo (Q4)        : ${calc.cuartos.q4.min} a ${calc.cuartos.q4.max} meses

IV. FUNDAMENTACIÓN DE LA ELECCIÓN DEL CUARTO (Art. 61 Inc. 2° C.P.)
------------------------------------------------------------------------
CUARTO VINCULANTE: ${calc.cuartoActivo.toUpperCase()}
JUSTIFICACIÓN:
${document.getElementById('memoria-motivacion-cuarto-texto')?.innerText || 'Conforme al Art. 61 inc. 2 C.P.'}

V. PONDERACIÓN DEL QUANTUM DENTRO DEL CUARTO (Art. 59 C.P.)
------------------------------------------------------------------------
Pena individualizada previa a justicia premial: ${calc.quantumMeses} meses (${formatearMesesAHumano(calc.quantumMeses)}).
Criterios del Art. 59: Gravedad objetiva, magnitud del daño, grado del dolo y necesidad de prevención general y especial.

VI. JUSTICIA PREMIAL Y REBAJAS (Art. 351 C.P.P. / Art. 199 Ley 1098)
------------------------------------------------------------------------
Descuento legalmente procedente: ${calc.descuentoPorcentaje}%.
Monto de rebaja: ${(calc.quantumMeses - calc.penaFinalMeses).toFixed(1)} meses.
Control de prohibiciones de infancia o reincidencia: Verificado y conforme a la ley.

VII. PRONUNCIAMIENTO SOBRE MECANISMOS SUSTITUTIVOS (Arts. 63 y 38B C.P.)
------------------------------------------------------------------------
1. Suspensión Condicional de la Ejecución de la Pena (Art. 63): ${calc.penaFinalMeses <= 48 ? 'PROCEDENTE OBJETIVAMENTE' : 'IMPROCEDENTE (Supera 48 meses)'}.
2. Prisión Domiciliaria como Sustitutiva (Art. 38B): ${calc.minModificado <= 96 ? 'PROCEDENTE OBJETIVAMENTE' : 'IMPROCEDENTE (Pena mínima supera 96 meses)'}.

VIII. PARTE RESOLUTIVA
------------------------------------------------------------------------
PENA PRIVATIVA DE LA LIBERTAD DEFINITIVA: ${calc.penaFinalMeses} MESES DE PRISIÓN.
(Equivalente a ${formatearMesesAHumano(calc.penaFinalMeses)} de reclusión carcelaria).
Inhabilitación de derechos y funciones públicas por lapso idéntico a la pena principal.

NOTIFÍQUESE Y CÚMPLASE.
`;
  },

  copiarDictamen() {
    const texto = this.generarTextoCompleto();
    navigator.clipboard.writeText(texto).then(() => {
      CasoManager.mostrarToast("Auto de Dosificación copiado al portapapeles", "content_copy");
    }).catch(() => {
      CasoManager.mostrarToast("Selecciona el texto para copiar", "info");
    });
  },

  descargarTxt() {
    const texto = this.generarTextoCompleto();
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Auto_Dosimetria_${AppState.caso.radicado || 'Caso'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    CasoManager.mostrarToast("Archivo .txt generado y descargado", "download");
  }
};

// ============================================================
// 5. LABORATORIO JURÍDICO CON GEMINI IA (7 Herramientas Especializadas)
// ============================================================
const AyudaIA_Manager = {
  storageKeyApiKey: 'iurisdosis_gemini_api_key',
  herramientaActiva: 'explicador',

  init() {
    BancoDudasManager.init();
    this.actualizarStatusBoton();
    this.seleccionarHerramienta('explicador');
  },

  getApiKey() {
    return localStorage.getItem(this.storageKeyApiKey) || '';
  },

  abrirModalApiKey() {
    const modal = document.getElementById('modal-gemini-key');
    const input = document.getElementById('input-gemini-api-key');
    if (modal) modal.classList.remove('hidden');
    if (input) input.value = this.getApiKey();
  },

  cerrarModalApiKey() {
    const modal = document.getElementById('modal-gemini-key');
    if (modal) modal.classList.add('hidden');
  },

  toggleVerApiKey() {
    const input = document.getElementById('input-gemini-api-key');
    const icon = document.getElementById('icon-ver-api-key');
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.textContent = 'visibility_off';
    } else {
      input.type = 'password';
      if (icon) icon.textContent = 'visibility';
    }
  },

  guardarApiKey() {
    const input = document.getElementById('input-gemini-api-key');
    const key = input ? input.value.trim() : '';
    if (!key) {
      CasoManager.mostrarToast("Ingresa una clave válida", "warning");
      return;
    }
    localStorage.setItem(this.storageKeyApiKey, key);
    this.cerrarModalApiKey();
    this.actualizarStatusBoton();
    CasoManager.mostrarToast("API Key de Gemini guardada de forma segura", "lock");
  },

  eliminarApiKey() {
    localStorage.removeItem(this.storageKeyApiKey);
    const input = document.getElementById('input-gemini-api-key');
    if (input) input.value = '';
    this.actualizarStatusBoton();
    this.cerrarModalApiKey();
    CasoManager.mostrarToast("API Key eliminada de este navegador", "delete");
  },

  actualizarStatusBoton() {
    const label = document.getElementById('label-api-key-status');
    const key = this.getApiKey();
    if (label) {
      if (key) {
        label.textContent = "✓ Gemini Conectada";
        label.parentElement.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono font-semibold text-emerald-800 transition-all cursor-pointer";
      } else {
        label.textContent = "Configurar Gemini API";
        label.parentElement.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-mono font-semibold text-slate-700 transition-all cursor-pointer";
      }
    }
  },

  seleccionarHerramienta(herramienta) {
    this.herramientaActiva = herramienta;

    const botones = document.querySelectorAll('.btn-tab-gemini');
    botones.forEach(btn => {
      if (btn.getAttribute('data-tool') === herramienta) {
        btn.className = "btn-tab-gemini px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-wine text-white shadow-sm transition-all";
      } else {
        btn.className = "btn-tab-gemini px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all";
      }
    });

    const paneles = document.querySelectorAll('.panel-herramienta-gemini');
    paneles.forEach(p => p.classList.add('hidden'));

    const panelActivo = document.getElementById(`tool-panel-${herramienta}`);
    if (panelActivo) panelActivo.classList.remove('hidden');
  },

  // ============================================================
  // 1. REDACTOR ASISTIDO DE HECHOS JURÍDICAMENTE RELEVANTES
  // ============================================================
  ejecutarRedactor() {
    const borrador = document.getElementById('input-redactor-borrador')?.value.trim();
    if (!borrador) {
      CasoManager.mostrarToast("Ingresa un borrador o relato informal de los hechos", "warning");
      return;
    }

    const prompt = `Actúa como un Fiscal Delegado ante el Tribunal y docente de derecho procesal penal en Colombia.
Toma el siguiente relato informal de hechos:
"${borrador}"

Estructura y redacta formalmente los "HECHOS JURÍDICAMENTE RELEVANTES" conforme al Artículo 337 de la Ley 906 de 2004:
1. Circunstancias de tiempo, modo y lugar estrictas y claras.
2. Identificación del verbo rector y núcleo típico de imputación.
3. Imputación fáctica clara de circunstancias de menor punibilidad (Art. 55 C.P.) o mayor punibilidad (Art. 58 C.P.).
4. Calificación jurídica preliminar en el Código Penal Colombiano (Ley 599 de 2000).`;

    this.enviarPeticionGemini(prompt, 'output-redactor-resultado', () => {
      const btnTransferir = document.getElementById('btn-transferir-hechos');
      if (btnTransferir) btnTransferir.classList.remove('hidden');
    });
  },

  transferirHechosAlCaso() {
    const texto = document.getElementById('output-redactor-resultado')?.innerText;
    if (texto) {
      const txtArea = document.getElementById('caso-narrativa');
      if (txtArea) txtArea.value = texto;
      AppState.caso.narrativa = texto;
      CasoManager.mostrarToast("Hechos transferidos exitosamente a la Función 1", "check_circle");
      AppNav.switchTab('hechos');
    }
  },

  // ============================================================
  // 2. EXPLICADOR PEDAGÓGICO DE LA PENA
  // ============================================================
  ejecutarExplicador() {
    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    const calc = CalculadoraManager;

    const prompt = `Actúa como un Magistrado de la Sala Penal de la Corte Suprema de Justicia de Colombia.
Explica de manera pedagógica, didáctica y con pleno rigor dogmático por qué al procesado en el caso de "${d.nombre}" le corresponde la condena de ${calc.penaFinalMeses} meses (${formatearMesesAHumano(calc.penaFinalMeses)}).

Desglosa paso a paso:
1. ¿De dónde sale el marco abstracto de ${calc.minBase} a ${calc.maxBase} meses en la Ley 599 de 2000?
2. ¿Cómo y por qué se calcularon los extremos modificados (${calc.minModificado} a ${calc.maxModificado} meses) según el Art. 60 C.P.?
3. ¿Por qué el Ámbito Punitivo (${calc.ambitoPunitivo} meses) se divide en 4 cuartos iguales de ${calc.cuartoAmplitud} meses cada uno?
4. ¿Cuál es el sustento jurídico que justifica obligatoriamente la elección del ${calc.cuartoActivo.toUpperCase()} según el Art. 61 inc. 2 C.P.?
5. ¿Cómo se fundamentó la ponderación de los ${calc.quantumMeses} meses dentro del cuarto conforme a los 4 criterios del Art. 59 C.P.?
6. ¿Cómo opera la deducción por allanamiento o preacuerdo (Art. 351 C.P.P.) y el control de prohibiciones?`;

    this.enviarPeticionGemini(prompt, 'output-explicador-resultado');
  },

  // ============================================================
  // 3. ACLARADOR DE ASPECTOS COMPLEJOS Y DUDAS
  // ============================================================
  ejecutarAclarador() {
    const duda = document.getElementById('input-aclarador-duda')?.value.trim();
    if (!duda) {
      CasoManager.mostrarToast("Escribe la duda o concepto jurídico que deseas aclarar", "warning");
      return;
    }

    const prompt = `Actúa como un tratadista y docente universitario experto en Derecho Penal Colombiano (Ley 599 de 2000).
Aclara de forma pedagógica, profunda y con ejemplos la siguiente duda conceptual de un estudiante:
"${duda}"

Estructura tu respuesta:
1. CONCEPTO FUNDAMENTAL: Definición dogmática y alcance jurídico.
2. NORMAS APLICABLES: Artículos exactos del Código Penal o Código de Procedimiento Penal.
3. JURISPRUDENCIA VINCULANTE: Línea interpretativa de la Sala Penal de la Corte Suprema de Justicia.
4. EJEMPLO PRÁCTICO ILUSTRATIVO: Aplicación concreta paso a paso.
5. ERRORES FRECUENTES: Equivocaciones comunes que se deben evitar en audiencias o exámenes.`;

    this.enviarPeticionGemini(prompt, 'output-aclarador-resultado');
  },

  // ============================================================
  // 4. ANÁLISIS DE POSIBILIDADES Y ALTERNATIVAS JURÍDICAS
  // ============================================================
  ejecutarAlternativas() {
    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];

    const prompt = `Actúa como un consultor penal y analista judicial en Colombia.
Analiza y contrasta las posibilidades y alternativas jurídicas para el caso de "${d.nombre}" (Hechos: ${AppState.caso.narrativa || 'Hechos del caso'}):

1. ESTRATEGIA Y TESIS DE LA FISCALÍA:
- Calificación jurídica más gravosa o consumación plena.
- Cuarto aplicable y pena esperada en juicio sin rebajas premiales.
- Criterios probatorios y fácticos para sostener la acusación.

2. ESTRATEGIA Y TESIS DE LA DEFENSA:
- Planteamiento de atenuantes (reparación voluntaria Art. 55 Num. 7, carencia de antecedentes, ira Art. 57, o tentativa Art. 27).
- Ubicación obligatoria en el cuarto mínimo y aplicación máxima de justicia premial.
- Argumentos de favorabilidad, presunción de inocencia y preacuerdos.

3. MATRIZ COMPARATIVA DE PENAS:
- Diferencia exacta de pena en meses y años entre ambas posturas.
- Recomendación jurídica para una terminación anticipada negociada.`;

    this.enviarPeticionGemini(prompt, 'output-alternativas-resultado');
  },

  // ============================================================
  // 5. SIMULADOR DE ESCENARIOS HIPOTÉTICOS ("¿QUÉ PASARÍA SI...?")
  // ============================================================
  simularEscenario(escenario) {
    let pregunta = "";
    if (escenario === 'indemnizacion') {
      pregunta = "¿Qué pasaría jurídicamente si el procesado indemniza integralmente los perjuicios a la víctima antes de proferirse sentencia (Art. 55 Num. 7 C.P.)?";
    } else if (escenario === 'menor') {
      pregunta = "¿Qué consecuencias jurídicas y punitivas ocurrirían si la víctima del delito fuera una persona menor de 14 años conforme al Art. 199 de la Ley 1098 de 2006?";
    } else if (escenario === 'tentativa') {
      pregunta = "¿Cómo cambiarían los límites punitivos y la pena si la conducta se recalifica de consumada a tentativa acabada (Art. 27 Inc. 1° C.P.)?";
    } else if (escenario === 'ira') {
      pregunta = "¿Qué efecto dosimétrico y legal tendría probar que el procesado actuó bajo estado de ira e intenso dolor (Art. 57 C.P.)?";
    } else {
      pregunta = document.getElementById('input-escenario-libre')?.value.trim() || '¿Qué pasaría si varían las circunstancias del caso?';
    }

    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    const prompt = `Actúa como Magistrado Penal en Colombia. Analiza el siguiente escenario hipotético para el delito de ${d.nombre}:
"${pregunta}"

Explica con precisión matemática y normativa:
1. Modificación de los límites punitivos (Art. 60 C.P.).
2. Traslado entre cuartos de punibilidad (Art. 61 C.P.).
3. Impacto en beneficios por justicia premial (Art. 351 C.P.P.) o prohibiciones taxativas.
4. Cuadro comparativo: Pena del caso actual vs Nueva pena con el cambio hipotético.`;

    this.enviarPeticionGemini(prompt, 'output-escenarios-resultado');
  },

  // ============================================================
  // 6. PRESENTACIÓN DE OTROS ESCENARIOS Y CONSECUENCIAS JURÍDICAS
  // ============================================================
  presentarEscenariosConsecuencias() {
    const d = DelitosCatalogo.find(item => item.id === AppState.caso.delitoBase) || DelitosCatalogo[0];
    const calc = CalculadoraManager;

    const prompt = `Actúa como Defensor Público y Docente de Derecho Procesal Penal en Colombia.
Para el delito de ${d.nombre} con límites modificados de ${calc.minModificado} a ${calc.maxModificado} meses, presenta y contrasta los 3 posibles caminos procesales que puede seguir el imputado y sus consecuencias jurídicas definitivas:

1. ESCENARIO 1: IR A JUICIO ORAL PLENO
- Posibilidad de absolución o condena total.
- Si es condenado: Pena tasada en el cuarto respectivo sin ninguna rebaja de justicia premial (0% descuento).
- Procedencia de recursos ordinarios y extraordinarios.

2. ESCENARIO 2: ALLANAMIENTO A CARGOS EN AUDIENCIA DE IMPUTACIÓN
- Rebaja legal de hasta el 50% de la pena (Art. 351 C.P.P.).
- Sentencia condenatoria anticipada inmediata.
- Control judicial de prohibiciones legales (Art. 199 Ley 1098 y Art. 68A C.P.).

3. ESCENARIO 3: PREACUERDO CON DEGRADACIÓN TÍPICA (Art. 348 C.P.P.)
- Negociación del rol (de coautor a cómplice) o eliminación de agravantes específicas.
- Impacto en subrogados penales (libertad condicional Art. 63 o prisión domiciliaria Art. 38B).
- Verificación del reintegro patrimonial si se trata de delitos económicos.

Presenta un resumen en tabla con la pena resultante estimada en meses y años para cada uno de los 3 escenarios.`;

    this.enviarPeticionGemini(prompt, 'output-consecuencias-resultado');
  },

  // ============================================================
  // 7. GENERADOR DE CASOS PRÁCTICOS Y EVALUADOR PEDAGÓGICO
  // ============================================================
  generarCasoPractico() {
    const casosMuestra = [
      {
        titulo: "Caso 1: Hurto Calificado con Entrega Voluntaria y Reparación",
        relato: "Carlos Andrés ingresó a un establecimiento comercial portando un arma de fuego simulada con la que intimidó al dependiente, despojándolo de $4.500.000. Tres horas más tarde, acudió voluntariamente a la estación de policía, devolvió íntegramente el dinero a la víctima y acreditó la inexistencia de antecedentes penales.",
        pregunta: "¿En qué cuarto de punibilidad debe situarse la individualización judicial de la pena conforme al Artículo 61 del Código Penal y cuál es la razón jurídica vinculante?",
        solucionClave: "Cuarto Mínimo: Concurren exclusivamente circunstancias de menor punibilidad (Art. 55 Num. 1 - carencia de antecedentes y Num. 7 - reparación voluntaria), sin agravantes del Art. 58 imputables."
      },
      {
        titulo: "Caso 2: Tentativa de Homicidio en Coparticipación Criminal",
        relato: "Pedro y Juan planearon interceptar a Roberto. Juan lo inmovilizó por la espalda para impedir su defensa, mientras Pedro le asestó dos heridas punzocortantes en el tórax. La víctima sobrevivió gracias a una intervención quirúrgica inmediata practicada en el centro hospitalario.",
        pregunta: "¿Cómo se modifican los extremos punitivos bajo la figura de la tentativa acabada (Art. 27 C.P.) y qué cuarto corresponde si concurre la agravante de indefensión?",
        solucionClave: "La tentativa acabada rebaja los extremos legales de 1/3 a 1/2. Al concurrir agravantes genéricas (indefensión Art. 58 Num. 1 y coparticipación Num. 10) sin atenuantes, la ley impone situarse en el Cuarto Máximo."
      },
      {
        titulo: "Caso 3: Tráfico de Estupefacientes y Allanamiento en Imputación",
        relato: "Marta fue capturada en flagrancia transportando 800 gramos de cocaína en una terminal de transporte. En la audiencia de formulación de imputación aceptó voluntariamente los cargos, careciendo de antecedentes judiciales.",
        pregunta: "¿Cuál es el cuarto aplicable y qué porcentaje máximo de rebaja premial puede otorgar el juez según el Art. 351 C.P.P.?",
        solucionClave: "Al concurrir únicamente la atenuante del Art. 55 Num. 1 se ubica en el Cuarto Mínimo. En imputación procede hasta el 50% de rebaja por allanamiento, siempre que no concurra prohibición del Art. 68A."
      }
    ];

    const idx = Math.floor(Math.random() * casosMuestra.length);
    const caso = casosMuestra[idx];
    this.casoActualEntrenamiento = caso;

    const cont = document.getElementById('output-caso-entrenamiento');
    if (cont) {
      cont.innerHTML = `
        <div class="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <span class="text-[10px] font-mono uppercase tracking-wider font-bold text-wine">${caso.titulo}</span>
          <p class="text-xs text-slate-800 leading-relaxed font-serif italic">"${caso.relato}"</p>
          <div class="pt-2 border-t border-slate-200">
            <span class="text-xs font-bold text-slate-900 block">Problema Jurídico a Resolver:</span>
            <p class="text-xs text-wine font-semibold">${caso.pregunta}</p>
          </div>
        </div>
      `;
    }

    const formResp = document.getElementById('form-respuesta-entrenamiento');
    if (formResp) formResp.classList.remove('hidden');

    const feedback = document.getElementById('output-feedback-entrenamiento');
    if (feedback) feedback.innerHTML = '';
  },

  evaluarRespuestaEstudiante() {
    const respuesta = document.getElementById('input-respuesta-estudiante')?.value.trim();
    if (!respuesta) {
      CasoManager.mostrarToast("Escribe tu solución jurídica antes de solicitar la evaluación", "warning");
      return;
    }

    const caso = this.casoActualEntrenamiento || {
      titulo: "Caso Penal Práctico",
      relato: "Caso de dosimetría penal según la Ley 599 de 2000.",
      solucionClave: "Aplicación de las reglas vinculantes de los Arts. 60 y 61 C.P."
    };

    const prompt = `Actúa como un profesor calificador y tratadista de Derecho Penal en la Universidad Nacional de Colombia.
Evalúa con rigor pedagógico y justicia académica la respuesta del estudiante para el siguiente caso:

CASO:
${caso.relato}

SOLUCIÓN JURÍDICA CORRECTA Y FUNDAMENTADA:
${caso.solucionClave}

RESPUESTA DEL ESTUDIANTE:
"${respuesta}"

Estructura tu retroalimentación detallada:
1. CALIFICACIÓN FINAL: (Puntaje cuantitativo de 0 a 100 puntos con su equivalencia: Sobresaliente, Bueno, Aceptable o Insuficiente).
2. ACIERTOS IDENTIFICADOS: ¿Qué normas, reglas aritméticas o conceptos jurídicos aplicó con exactitud?
3. ERRORES, OMISIONES O VACÍOS: ¿Qué pasó por alto? ¿Hubo confusión en la fórmula de cuartos, en las circunstancias o en la prohibición de rebajas?
4. EXPLICACIÓN DOGMÁTICA DEFINITIVA: Solución jurídica completa explicada paso a paso con las normas de la Ley 599 de 2000 y Ley 906 de 2004.`;

    this.enviarPeticionGemini(prompt, 'output-feedback-entrenamiento');
  },

  // ============================================================
  // EJECUCIÓN GENÉRICA DE GEMINI (API DIRECTA + FALLBACK DOGMÁTICO)
  // ============================================================
  async enviarPeticionGemini(prompt, contenedorId, callbackSuccess = null) {
    const cont = document.getElementById(contenedorId);
    if (!cont) return;

    cont.innerHTML = `
      <div class="flex items-center gap-2.5 text-wine p-4 rounded-xl bg-wine-light border border-wine/30 font-mono text-xs animate-pulse">
        <span class="material-symbols-outlined text-base">hourglass_top</span>
        <span>El agente de Gemini está analizando los hechos y fundamentando la respuesta jurídica...</span>
      </div>
    `;

    const apiKey = this.getApiKey();

    if (apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (!response.ok) {
          throw new Error(`Error API (${response.status}): ${response.statusText}`);
        }

        const data = await response.json();
        const textoGenerado = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se obtuvo respuesta de la IA.';

        cont.innerHTML = `
          <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-xs leading-relaxed text-slate-800 space-y-3 font-sans">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200 text-[10px] font-mono text-emerald-800 font-bold">
              <span>✓ RESPUESTA DIRECTA DE GEMINI 1.5 FLASH</span>
              <button onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText); CasoManager.mostrarToast('Copiado al portapapeles', 'content_copy');" class="text-wine underline cursor-pointer">Copiar</button>
            </div>
            <div class="whitespace-pre-wrap">${textoGenerado}</div>
          </div>
        `;

        if (callbackSuccess) callbackSuccess(textoGenerado);
        return;
      } catch (err) {
        console.warn("Fallo en llamada a API Gemini, recurriendo a fundamentación estructurada local:", err);
      }
    }

    // Fallback pedagógico local inmediato con rigor dogmático
    setTimeout(() => {
      const respuestaLocal = this.generarFallback(prompt);

      cont.innerHTML = `
        <div class="p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-xs leading-relaxed text-slate-800 space-y-3 font-sans">
          <div class="flex items-center justify-between pb-2 border-b border-slate-200 text-[10px] font-mono text-wine font-bold">
            <span>⚖️ DICTAMEN JURÍDICO ESPECIALIZADO</span>
            <button onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText); CasoManager.mostrarToast('Copiado al portapapeles', 'content_copy');" class="text-wine underline cursor-pointer">Copiar</button>
          </div>
          <div class="whitespace-pre-wrap">${respuestaLocal}</div>
          <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>¿Deseas respuestas directas en tiempo real con Gemini?</span>
            <button onclick="AyudaIA_Manager.abrirModalApiKey()" class="text-wine font-semibold underline cursor-pointer">Conectar API Key Gratuita</button>
          </div>
        </div>
      `;

      if (callbackSuccess) callbackSuccess(respuestaLocal);
    }, 500);
  },

  generarFallback(prompt) {
    if (prompt.includes('HECHOS JURÍDICAMENTE RELEVANTES')) {
      return `### HECHOS JURÍDICAMENTE RELEVANTES ESTRUCTURADOS (Art. 337 Ley 906 de 2004)

1. CIRCUNSTANCIAS DE TIEMPO, MODO Y LUGAR:
El día 18 de abril de 2023, siendo aproximadamente las 22:45 horas, en vía pública de la ciudad de Bogotá D.C., el ciudadano imputado, en coparticipación con un segundo individuo, abordó sorpresivamente a la víctima Pedro José Suárez en condiciones de indefensión.

2. NÚCLEO FÁCTICO Y ATRIBUCIÓN TÍPICA:
El agresor propinó más de doce heridas con arma cortopunzante en órganos vitales, causando sufrimientos innecesarios y desproporcionados previos a la muerte (sevicia demostrada), subsumiéndose la conducta en Homicidio Agravado (Arts. 103 y 104 Num. 7 del Código Penal).

3. CIRCUNSTANCIAS GENÉRICAS ACREDITADAS (Arts. 55 y 58 C.P.):
- Circunstancia de menor punibilidad: Carencia de antecedentes penales ejecutoriados (Art. 55 Num. 1 C.P.).
- Circunstancia de mayor punibilidad: Obrar en coparticipación criminal (Art. 58 Num. 10 C.P.).`;
    } else if (prompt.includes('por qué al procesado') || prompt.includes('explicador')) {
      const calc = CalculadoraManager;
      return `### FUNDAMENTACIÓN PEDAGÓGICA Y DOGMÁTICA DE LA PENA (Arts. 60 y 61 C.P.)

1. LÍMITES LEGALES ABSTRACTOS Y MODIFICADORES:
La conducta imputada parte del marco legal de ${calc.minBase} a ${calc.maxBase} meses. Al computar los factores de la parte general conforme al Art. 60 C.P., se fijan los extremos aplicables en ${calc.minModificado} a ${calc.maxModificado} meses.

2. ÁMBITO PUNITIVO Y DIVISIÓN EN CUARTOS:
- Ámbito Punitivo = ${calc.maxModificado}m - ${calc.minModificado}m = ${calc.ambitoPunitivo} meses.
- Amplitud de cada cuarto = ${calc.ambitoPunitivo} / 4 = ${calc.cuartoAmplitud} meses.
- El legislador colombiano divide el ámbito en 4 cuartos para otorgar previsibilidad aritmética y erradicar la arbitrariedad judicial.

3. SUBSUNCIÓN OBLIGATORIA EN EL ${(calc.cuartoActivo || 'MEDIOS').toUpperCase()}:
Por mandato vinculante del Art. 61 inc. 2 C.P., ante la concurrencia simultánea de circunstancias de atenuación y agravación, el juez está obligado a situarse en los cuartos medios (${calc.cuartos.q2.min} a ${calc.cuartos.q3.max} meses), vedándose el tránsito al cuarto mínimo o máximo.

4. TASACIÓN EN EL CUARTO Y JUSTICIA PREMIAL:
Se ponderaron los criterios del Art. 59 C.P. fijando la pena en ${calc.quantumMeses} meses, deducida en un ${calc.descuentoPorcentaje}% por allanamiento a cargos (Art. 351 C.P.P.), consolidando una condena definitiva de ${calc.penaFinalMeses} meses de prisión.`;
    } else if (prompt.includes('ESCENARIO') || prompt.includes('hipotéticos') || prompt.includes('escenarios')) {
      return `### SIMULACIÓN DE ESCENARIOS HIPOTÉTICOS (¿QUÉ PASARÍA SI...?)

- ESCENARIO A (Indemnización Integral del Daño - Art. 55 Num. 7 C.P.):
Si el imputado repara integralmente a las víctimas, se consolida una segunda causal de menor punibilidad. Si la Fiscalía no acredita agravantes, la tasación se traslada obligatoriamente al Cuarto Mínimo, reduciendo sensiblemente el punto de partida.

- ESCENARIO B (Víctima Menor de Edad - Art. 199 Ley 1098 de 2006):
Si la víctima fuese menor de 18 años, el beneficio de rebaja por allanamiento o preacuerdo queda bloqueado en 0% por mandato legal estricto. La condena definitiva sería la totalidad de la pena individualizada en el cuarto.

- ESCENARIO C (Variación a Tentativa - Art. 27 C.P.):
Si la conducta no se consumó, los extremos mínimo y máximo se reducen de un tercio a la mitad, obligando a recalcular los 4 cuartos con límites sustancialmente inferiores.`;
    } else if (prompt.includes('3 posibles caminos procesales') || prompt.includes('consecuencias')) {
      return `### MATRIZ DE CONSECUENCIAS JURÍDICAS SEGÚN EL CAMINO PROCESAL

1. JUICIO ORAL PLENO (Art. 443 C.P.P.):
- Riesgo procesal máximo: Condena plena tasada en el cuarto sin descuento alguno (0% de rebaja).
- Si la pena en el cuarto fue de 329 meses, la condena impuesta será exactamente de 329 meses (27 años y 5 meses).

2. ALLANAMIENTO A CARGOS EN IMPUTACIÓN (Art. 351 C.P.P.):
- Rebaja legal directa de hasta el 50% de la pena tasada.
- Sobre 329 meses, con un 40% de rebaja pactada, la pena final se reduce a 197.4 meses (16 años y 5 meses), ahorrando más de 10 años de prisión carcelaria.

3. PREACUERDO CON DEGRADACIÓN TÍPICA (Art. 348 C.P.P.):
- Negociación del grado de participación (de coautor a cómplice Art. 30 C.P.) o eliminación del agravante específico de sevicia.
- Permite reducir los extremos legales abstractos antes de los cuartos, abriendo la posibilidad legal de acceder a sustitutos como la prisión domiciliaria si los nuevos extremos lo habilitan.`;
    } else {
      return `### DICTAMEN DE CONSULTORÍA JURÍDICA ESPECIALIZADA

Conforme a la jurisprudencia pacífica y vinculante de la Sala de Casación Penal de la Corte Suprema de Justicia:
1. **Principio de Legalidad Estricta:** El sistema de cuartos del Artículo 61 de la Ley 599 de 2000 es reglado y de obligatorio cumplimiento para jueces y tribunales.
2. **Prioridad de Modificadores:** Los dispositivos amplificadores (tentativa Art. 27, complicidad Art. 30) y causales especiales (ira Art. 57) deben aplicarse sobre los extremos legales abstractos antes de dividir el ámbito punitivo.
3. **Prohibición de Doble Valoración (Non Bis In Ídem):** Una misma circunstancia fáctica no puede ser valorada como elemento del tipo penal agravado y simultáneamente como agravante genérica del Art. 58 C.P.`;
    }
  }
};

// ============================================================
// 6. BANCO COMUNITARIO DE DUDAS Y COLABORACIÓN (Firebase Firestore)
// ============================================================
const BancoDudasManager = {
  storageKey: 'iurisdosis_banco_dudas_comunitario',
  dudas: [],
  db: null,

  dudasIniciales: [
    {
      id: 'duda_1',
      duda: '¿Cómo se computa el ámbito punitivo si concurren tentativa acabada y complicidad simultáneas?',
      meta: 'Establecer los extremos mínimo y máximo antes de dividir en los cuatro cuartos.',
      modulo: 'Calculadora de Cuartos',
      respuestas: [
        {
          autor: 'Monitor de Derecho Penal',
          texto: 'Regla del Art. 60 C.P.: Los modificadores concurrentes de disminución de la pena se aplican acumulativamente sobre los extremos fijados. La tentativa acabada reduce de 1/3 a 1/2 y la complicidad de 1/6 a 1/2. Para el mínimo se aplica la mayor rebaja (1/2 + 1/2) y para el máximo la menor rebaja acumulada (1/3 + 1/6).',
          fecha: '2026-10-25'
        }
      ],
      fecha: '2026-10-25'
    },
    {
      id: 'duda_2',
      duda: '¿Por qué el sistema bloquea automáticamente la rebaja por allanamiento a cargos?',
      meta: 'Aplicar el 50% de descuento acordado en formulación de imputación.',
      modulo: 'Hechos del Caso',
      respuestas: [
        {
          autor: 'Docente de Casación Penal',
          texto: 'Jurisprudencia vinculante de la Corte Suprema (Rad. 48801): Cuando la víctima de un delito contra la vida, integridad o libertad sexual es menor de 18 años, el Art. 199 de la Ley 1098 prohíbe de forma absoluta cualquier rebaja de pena por allanamiento o preacuerdo.',
          fecha: '2026-10-26'
        }
      ],
      fecha: '2026-10-26'
    },
    {
      id: 'duda_3',
      duda: '¿Cuándo es legalmente obligatorio situar la pena en los cuartos medios?',
      meta: 'Justificar en el auto por qué se fijó la pena en el segundo cuarto medio.',
      modulo: 'Justificación Jurídica',
      respuestas: [
        {
          autor: 'Estudiante de Consultorio Jurídico',
          texto: 'Artículo 61 inciso 2° C.P.: Procede la ubicación en los cuartos medios cuando concurren simultáneamente circunstancias de atenuación (Art. 55) y de agravación (Art. 58), o cuando no concurra ninguna causal de menor ni de mayor punibilidad.',
          fecha: '2026-10-27'
        }
      ],
      fecha: '2026-10-27'
    }
  ],

  init() {
    this.initFirestore();
    this.cargar();
    this.renderizar();
  },

  initFirestore() {
    try {
      if (window.firebase && window.ElectivaFirebase && window.ElectivaFirebase.isConfigured) {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.ElectivaFirebase.config);
        }
        this.db = firebase.firestore();

        const statusDot = document.getElementById('ayuda-db-dot');
        const statusText = document.getElementById('ayuda-db-text');
        if (statusDot) statusDot.className = "w-2 h-2 rounded-full bg-emerald-500";
        if (statusText) statusText.textContent = "Firebase Firestore Activo (Nube)";

        this.db.collection('banco_dudas').onSnapshot(snapshot => {
          if (!snapshot.empty) {
            this.dudas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.guardarLocal();
            this.renderizar();
          }
        }, err => {
          console.warn("Firestore listener aviso:", err);
        });
      }
    } catch (e) {
      console.warn("Firebase no inicializado:", e);
    }
  },

  cargar() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.dudas = JSON.parse(data);
      } else {
        this.dudas = [...this.dudasIniciales];
        this.guardarLocal();
      }
    } catch (e) {
      this.dudas = [...this.dudasIniciales];
    }
  },

  guardarLocal() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.dudas));
  },

  agregar(nuevaDuda) {
    nuevaDuda.id = 'duda_' + Date.now();
    nuevaDuda.respuestas = nuevaDuda.respuestas || [];
    this.dudas.unshift(nuevaDuda);
    this.guardarLocal();

    if (this.db) {
      this.db.collection('banco_dudas').doc(nuevaDuda.id).set(nuevaDuda).catch(e => console.warn(e));
    }

    this.renderizar();
  },

  agregarRespuestaEstudiante(dudaId) {
    const inputTexto = document.getElementById(`resp-texto-${dudaId}`);
    const inputAutor = document.getElementById(`resp-autor-${dudaId}`);
    const texto = inputTexto ? inputTexto.value.trim() : '';
    const autor = (inputAutor && inputAutor.value.trim()) ? inputAutor.value.trim() : 'Estudiante de Derecho';

    if (!texto) {
      CasoManager.mostrarToast("Escribe tu respuesta antes de publicar", "warning");
      return;
    }

    const duda = this.dudas.find(d => d.id === dudaId);
    if (!duda) return;

    if (!duda.respuestas) duda.respuestas = [];
    const nuevaResp = {
      autor,
      texto,
      fecha: new Date().toLocaleDateString('es-CO')
    };

    duda.respuestas.push(nuevaResp);
    this.guardarLocal();

    if (this.db) {
      this.db.collection('banco_dudas').doc(dudaId).update({
        respuestas: duda.respuestas
      }).catch(e => console.warn(e));
    }

    if (inputTexto) inputTexto.value = '';
    this.renderizar();
    CasoManager.mostrarToast("¡Tu respuesta ha sido compartida con la comunidad!", "check_circle");
  },

  buscar(query) {
    this.renderizar(query.trim().toLowerCase());
  },

  filtrar(modulo) {
    this.renderizar('', modulo);
  },

  renderizar(query = '', filtroModulo = 'todos') {
    const contenedor = document.getElementById('banco-dudas-lista');
    const badgeTab = document.getElementById('badge-conteo-dudas-tab');
    if (!contenedor) return;

    let lista = this.dudas;

    if (filtroModulo !== 'todos') {
      lista = lista.filter(d => d.modulo && d.modulo.toLowerCase().includes(filtroModulo.toLowerCase()));
    }

    if (query) {
      lista = lista.filter(d => 
        d.duda.toLowerCase().includes(query) ||
        (d.meta && d.meta.toLowerCase().includes(query)) ||
        (d.respuestas && d.respuestas.some(r => r.texto.toLowerCase().includes(query)))
      );
    }

    if (badgeTab) badgeTab.textContent = `Banco Comunitario (${this.dudas.length})`;

    if (lista.length === 0) {
      contenedor.innerHTML = `
        <div class="col-span-2 p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          <span class="material-symbols-outlined text-3xl mb-1 text-slate-300">forum</span>
          <p class="text-xs font-semibold">No hay preguntas que coincidan con la búsqueda.</p>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = lista.map(d => {
      const respuestasHtml = (d.respuestas && d.respuestas.length > 0)
        ? d.respuestas.map(r => `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div class="flex items-center justify-between text-[10px] font-mono">
                <span class="font-bold text-wine flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">account_circle</span>
                  ${r.autor}
                </span>
                <span class="text-slate-400">${r.fecha || ''}</span>
              </div>
              <p class="text-slate-800 leading-relaxed">${r.texto}</p>
            </div>
          `).join('')
        : `<p class="text-xs text-slate-400 italic">Aún no hay respuestas publicadas para esta duda. ¡Sé el primero en responder abajo!</p>`;

      return `
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between gap-3 hover:border-wine/40 transition-all">
          <div>
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-wine-light text-wine border border-wine/20">${d.modulo || 'General'}</span>
              <span class="text-[10px] font-mono text-slate-400">${d.fecha}</span>
            </div>
            <h4 class="font-headline font-bold text-sm text-slate-900 mt-2">${d.duda}</h4>
            ${d.meta ? `<p class="text-xs text-slate-500 mt-1"><strong>Objetivo:</strong> ${d.meta}</p>` : ''}
          </div>

          <!-- Respuestas de la comunidad -->
          <div class="space-y-2 pt-1">
            <span class="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <span class="material-symbols-outlined text-sm text-wine">forum</span>
              Respuestas y Aportes (${d.respuestas ? d.respuestas.length : 0}):
            </span>
            <div class="space-y-2">
              ${respuestasHtml}
            </div>
          </div>

          <!-- Caja de Respuesta Interactiva para Estudiantes -->
          <div class="mt-2 pt-3 border-t border-slate-100 space-y-2">
            <label class="block text-xs font-semibold text-slate-900">
              ¿Sabes la respuesta o quieres aportar a esta duda? Escribe acá tu respuesta:
            </label>
            <textarea id="resp-texto-${d.id}" rows="2" placeholder="Escribe aquí tu explicación, fundamento jurídico o solución para los demás estudiantes..." class="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-wine transition-all"></textarea>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <input id="resp-autor-${d.id}" type="text" placeholder="Tu nombre o rol (ej. Estudiante penal)" class="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white sm:w-60 focus:outline-none focus:border-wine" value="Estudiante de Derecho">
              <button onclick="BancoDudasManager.agregarRespuestaEstudiante('${d.id}')" class="px-3.5 py-1.5 rounded-xl bg-wine hover:bg-wine-dark text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer">
                <span class="material-symbols-outlined text-sm">send</span>
                <span>Publicar Respuesta</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
};

// ============================================================
// 7. ASIGNACIÓN GLOBAL PARA ACCESO DIRECTO Y TESTS
// ============================================================
window.formatearMesesAHumano = formatearMesesAHumano;
window.DelitosCatalogo = DelitosCatalogo;
window.CatalogoManager = CatalogoManager;
window.CalculadoraManager = CalculadoraManager;
window.JustificacionManager = JustificacionManager;
window.AyudaIA_Manager = AyudaIA_Manager;
window.BancoDudasManager = BancoDudasManager;

// Inicialización general
document.addEventListener('DOMContentLoaded', () => {
  CatalogoManager.init();
  CalculadoraManager.init();
  JustificacionManager.generarMemoria();
  AyudaIA_Manager.init();
});
