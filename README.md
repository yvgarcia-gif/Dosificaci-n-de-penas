# IurisDosis Colombia — Dosificador Penal & Sistema de Cuartos

> Aplicación web profesional 100% Client-Side (sin dependencias de servidor backend y sin registro obligatorio) para el cálculo riguroso de la dosificación penal, el sistema de cuartos de punibilidad y la motivación de autos interlocutorios en el Derecho Penal Colombiano (Código Penal — Ley 599 de 2000 y Código de Procedimiento Penal — Ley 906 de 2004).

🔗 **Repositorio Oficial:** [https://github.com/yvgarcia-gif/Dosificaci-n-de-penas](https://github.com/yvgarcia-gif/Dosificaci-n-de-penas)

---

## 🎨 Identidad Visual y Principios de Diseño
* **Paleta Institucional:** Rojo Vino Tinto (`#721B28` / `#4C0D17`), Negro Carbón (`#0E1015`) y Blanco Puro (`#FFFFFF`).
* **Estilo Visual:** Apariencia sobria, elegante, profesional y con alto contraste, inspirada en las providencias de las Altas Cortes colombianas.
* **Tipografías:**
  * *Source Serif 4:* Encabezados y redacción de autos judiciales.
  * *Inter:* Navegación y componentes interactivos.
  * *JetBrains Mono:* Métricas, cómputo de cuartos, radicado SPOA y citas normativas.

---

## ⚖️ Las 4 Funciones Judiciales de la Aplicación

### 1. Ingreso y Análisis Concreto de los Hechos
* **Metadatos procesales esenciales:** Radicado SPOA (21 dígitos), etapa procesal (imputación, acusación, juicio, sentencia), juzgado de conocimiento, fiscalía y procesado.
* **Hechos jurídicamente relevantes:** Área de transcripción fáctica con fecha, control en vivo de caracteres y palabras, y enlace directo con la herramienta de redacción asistida por IA.
* **Calificación típica:** Delito base, agravantes específicos, atenuantes genéricas (Art. 55 C.P.) y agravantes genéricas (Art. 58 C.P.).
* **Justicia negociada y allanamiento:** Tasación porcentual de rebajas por allanamiento (Art. 351 C.P.P.) con control estricto de prohibiciones legales (*Art. 199 Ley 1098/2006* en delitos contra menores de edad y *Art. 68A C.P.*).

### 2. Catálogo Interactivo de Delitos (Ley 599 de 2000)
* Catálogo de 22 tipos penales colombianos organizados por bienes jurídicos (Vida e Integridad, Patrimonio Económico, Libertad Sexual, Salud Pública, Administración Pública, Fe Pública, etc.).
* Búsqueda en tiempo real por número de artículo, denominación típica o texto de la norma.
* Desglose instantáneo de penas mínimas y máximas en meses y en años/meses, sanciones pecuniarias (SMLMV) e inhabilidades accesorias.
* Botón de transferencia directa a la calculadora con un clic.

### 3. Calculadora de Cuartos y Dosificación Paso a Paso
* **Factores modificadores de parte general (Art. 60 C.P.):** Tentativa acabada o inacabada (Art. 27 C.P.), complicidad o interviniente (Art. 30 C.P.), ira e intenso dolor (Art. 57 C.P.) y marginalidad (Art. 56 C.P.).
* **Segmentación en 4 cuartos iguales (Art. 61 Inc. 1° C.P.):**
  * Primer Cuarto (Mínimo).
  * Cuartos Medios (Primer Medio y Segundo Medio).
  * Cuarto Máximo.
* **Subsunción vinculante (Art. 61 Inc. 2° C.P.):** Selección legal obligatoria del cuarto según concurran únicamente atenuantes, agravantes o ambas a la vez.
* **Tasación del quantum judicial (Art. 59 C.P.):** Discrecionalidad reglada para individualizar la pena dentro del cuarto elegido.
* **Desglose paso a paso verificable:** Panel pedagógico que demuestra de dónde sale cada cifra, la fórmula del ámbito de punibilidad y la motivación de la condena definitiva.

### 4. Justificación Jurídica y Auto Judicial Interlocutorio
* **Auto formal de individualización de pena (Art. 447 C.P.P.):** Redacción motivada con estilo formal de la Rama Judicial.
* **Cuadro de segmentación certificada:** Resumen de extremos abstractos, modificados, ámbito punitivo y cuartos.
* **Motivación dogmática obligatoria:** Justificación de la elección del cuarto y de los 4 criterios del Art. 59 C.P.
* **Pronunciamiento sobre subrogados penales:** Verificación objetiva de procedencia de la Suspensión Condicional de la Pena (Art. 63 C.P. - tope 48 meses) y Prisión Domiciliaria Sustitutiva (Art. 38B C.P. - tope 96 meses).
* **Herramientas de exportación:** Copiado con un clic, descarga en `.txt` e impresión directa en PDF.

---

## 🤖 Laboratorio Jurídico con Gemini IA (7 Herramientas Especializadas)

1. **✍️ Redactor de Hechos (Art. 337 C.P.P.):** Toma un relato informal o en bruto y lo estructura formalmente en circunstancias de tiempo, modo, lugar, verbo rector y tipicidad preliminar, con botón de transferencia directa a la Función 1.
2. **⚖️ Explicador Pedagógico de la Pena:** Explica en lenguaje claro, didáctico y con pleno rigor dogmático por qué al procesado le corresponde esa pena exacta.
3. **💡 Aclarador de Aspectos Complejos:** Consultorio conceptual para aclarar cualquier duda doctrinaria o normativa con artículos del Código Penal y jurisprudencia.
4. **⚔️ Análisis de Alternativas Jurídicas:** Contrasta la tesis acusatoria de la Fiscalía frente a la teoría del caso de la Defensa y calcula la diferencia de pena entre ambas.
5. **🔀 Simulador ¿Qué pasaría si...?:** Evalúa de inmediato cómo cambian los límites y el cuarto si el procesado indemniza el daño, si la víctima es menor, si hay tentativa o ira.
6. **📋 Consecuencias de Otros Escenarios:** Matriz comparativa de los tres caminos procesales (Juicio Oral pleno vs Allanamiento en imputación vs Preacuerdo con degradación típica).
7. **🎓 Casos Prácticos y Evaluación Pedagógica:** Genera casos penales prácticos y evalúa las respuestas del estudiante con calificación (0-100), aciertos, errores y fundamentación legal.
* **💬 Banco Comunitario de Dudas:** Preguntas y respuestas colaborativas entre estudiantes con sincronización local y nube mediante Firebase Firestore.

---

## 🚀 Cómo Ejecutar en Local

Al ser una aplicación 100% Client-Side, no requiere compilar ni instalar Node.js:
1. Abre el archivo [`index.html`](file:///index.html) en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Para ejecutar la suite automatizada de pruebas unitarias, abre [`test-suite.html`](file:///test-suite.html) (25 aserciones aprobadas con 100% de éxito).
3. Opcionalmente, puedes ejecutar el servidor ultraligero local en PowerShell:
   ```powershell
   .\local-server.ps1
   ```
