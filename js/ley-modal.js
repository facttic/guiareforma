/**
 * Modal para mostrar textos de la Ley 27802
 * Ley de Modernización Laboral
 * Promulgada: 6 de marzo de 2026 (Decreto 137/2026)
 * Publicada en Boletín Oficial: 6 de marzo de 2026 (N° 35865)
 *
 * Textos extraídos del Boletín Oficial / InfoLEG
 */

const TEXTOS_LEY = {
  indemnizacion: {
    titulo: "Indemnización por despido",
    referencia: "Ley 27802 - Art. 51 → Modifica Art. 245 LCT",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 51.- Sustitúyese el artículo 245 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p><strong>Artículo 245: Indemnización por antigüedad o despido.</strong> En los casos de despido dispuesto por el empleador sin justa causa, habiendo o no mediado preaviso y luego de transcurrido el período de prueba, se deberá abonar al trabajador una indemnización equivalente a un (1) mes de sueldo por cada año de servicio o fracción mayor de tres (3) meses, tomando como base de cálculo la mejor remuneración mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Se entiende como remuneración, a estos fines, la devengada y pagada en cada mes calendario, por cuanto <span class="destacado">no tendrán incidencia los conceptos de pago no mensuales como el Sueldo Anual Complementario, vacaciones, premios que no sean de pago mensual</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Se define como habitual, a estos fines, <span class="destacado">aquellos conceptos devengados como mínimo seis (6) meses en el último año calendario</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Se define como normal, en el caso de conceptos variables como ser premios mensuales, horas extra, comisiones, <span class="destacado">el promedio de los últimos seis (6) meses, o del último año si fuera más favorable al trabajador</span>.</p>

      <p>Dicha base salarial no podrá exceder el equivalente a <span class="destacado">tres (3) veces</span> el importe del salario mensual promedio de las remuneraciones previstas en el Convenio Colectivo de Trabajo aplicable al trabajador al momento del despido, por la jornada legal o convencional, excluida la antigüedad.</p>

      <p>Para aquellos trabajadores excluidos de todo Convenio Colectivo de Trabajo, el tope establecido en el párrafo anterior será el del convenio aplicable al establecimiento donde preste servicios, o al convenio más favorable, en el caso que hubiera más de uno (1).</p>

      <p>En ningún supuesto la aplicación del tope previsto en este artículo podrá ser inferior al <span class="destacado">sesenta y siete por ciento (67%)</span> de la remuneración mensual, normal y habitual.</p>

      <p>La indemnización en ningún caso podrá ser inferior a <span class="destacado">un (1) mes de sueldo</span>.</p>

      <p>Mediante Convenio Colectivo de Trabajo, las partes podrán sustituir el presente régimen indemnizatorio por un fondo o sistema de cese laboral cuyo costo estará a cargo del empleador.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><span class="destacado">La indemnización prevista en este artículo constituye la única reparación procedente</span> frente a la extinción sin justa causa del contrato de trabajo. Su percepción importa la extinción definitiva de cualquier reclamo judicial o extrajudicial vinculado al despido, incluidos los de naturaleza civil, contractual o extracontractual.</p>

      <p>Quedan exceptuadas únicamente las acciones basadas en ilícitos penales, en cuyo caso la reparación se regirá por las normas comunes.</p>
    `
  },

  bancoHoras: {
    titulo: "Banco de horas / Jornada laboral",
    referencia: "Ley 27802 - Arts. 42 y 43 → Modifican Arts. 197 bis y 198 LCT",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 42.- Sustitúyese el artículo 197 bis de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><strong>Artículo 197 bis:</strong> <span class="destacado">El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo</span>, el cual deberá formalizarse por escrito, consignando la naturaleza voluntaria de la prestación de horas extras y sus límites, especificando el modo de funcionamiento del sistema y estableciendo un método fehaciente de control que permita a ambas partes registrar las horas efectivamente trabajadas y las horas disponibles para su goce por parte del trabajador.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">A tal efecto, se podrá disponer de un <span class="destacado">régimen de horas extras, banco de horas, francos compensatorios</span>, entre otros institutos relativos a la jornada laboral.</p>

      <p>Dicho régimen, que podrá igualmente ser pactado por el empleador con la representación sindical en la empresa, deberá respetar los descansos mínimos legales, asegurando en todo momento la protección, beneficio e interés del trabajador.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 43.- Sustitúyese el artículo 198 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p><strong>Artículo 198: Jornada reducida.</strong> La reducción de la jornada máxima legal solamente procederá cuando lo establezcan las disposiciones vigentes en la materia, o se encuentre estipulado en los contratos individuales, Convenios Colectivos de Trabajo u otros acuerdos colectivos celebrados con la representación sindical en la empresa.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Estos últimos podrán establecer <span class="destacado">métodos de cálculo de la jornada máxima en base a promedio</span>, de acuerdo con las características de la actividad, siempre y cuando se respeten los descansos mínimos entre jornada y jornada de <span class="destacado">doce (12) horas</span> y de descanso semanal de <span class="destacado">treinta y cinco (35) horas</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Asimismo, se podrá utilizar el <span class="destacado">banco de horas de modo de compensar la mayor jornada de algún día con la menor de otro</span>, siempre y cuando no se supere el máximo legal de la jornada semanal, o la que estipule el régimen laboral específico aplicable.</p>
    `
  },

  huelga: {
    titulo: "Derecho de huelga - Servicios esenciales",
    referencia: "Ley 27802 - Art. 101 → Modifica Art. 24 Ley 25.877",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 101.- Sustitúyese el artículo 24 de la ley 25.877:</p>

      <p><strong>Artículo 24:</strong> Los conflictos colectivos que pudieren afectar la normal prestación de servicios esenciales o actividades de importancia trascendental quedan sujetos a las siguientes garantías de prestación de servicios mínimos.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">En el caso de los <strong>servicios esenciales</strong>, <span class="destacado">en ningún caso se podrá negociar o imponer a las partes una cobertura menor al setenta y cinco por ciento (75%)</span> de la prestación normal del servicio.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">En el caso de las <strong>actividades de importancia trascendental</strong>, <span class="destacado">en ningún caso se podrá negociar o imponer a las partes una cobertura menor al cincuenta por ciento (50%)</span>.</p>

      <p><strong>Se considerarán servicios esenciales (75% mínimo):</strong></p>
      <ul style="margin-left: 20px;">
        <li>a. Educación: guardería, preescolar, primario, secundario y especial</li>
        <li>b. Servicios sanitarios y hospitalarios, transporte de medicamentos, farmacias</li>
        <li>c. Agua potable, gas, petróleo, combustibles y energía eléctrica</li>
        <li>d. Telecomunicaciones, internet y comunicaciones satelitales</li>
        <li>e. Recolección de residuos</li>
        <li>f. Aeronáutica comercial, control de tráfico aéreo y portuario</li>
        <li>g. Transporte de caudales</li>
        <li>h. Servicios privados de seguridad y custodia</li>
      </ul>

      <p><strong>Se consideran actividades de importancia trascendental (50% mínimo):</strong></p>
      <ul style="margin-left: 20px;">
        <li>a. Transporte marítimo y fluvial</li>
        <li>b. Servicios aduaneros y migratorios, comercio exterior</li>
        <li>c. Producción de medicamentos e insumos hospitalarios</li>
        <li>d. Transporte terrestre y subterráneo de personas y mercaderías</li>
        <li>e. Radio y televisión</li>
        <li>f. Industrias continuas: siderurgia, aluminio, química, cementera</li>
        <li>g. Industria alimenticia en toda su cadena</li>
        <li>h. Bancos, finanzas, hoteles, gastronomía, comercio electrónico</li>
        <li>i. Actividades afectadas a compromisos de exportación</li>
      </ul>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">La Autoridad de Aplicación, a propuesta de la <span class="destacado">Comisión de Garantías</span> (5 miembros), podrá calificar otras actividades como esenciales o trascendentales cuando la interrupción ponga en peligro la vida, salud, seguridad o abastecimiento.</p>
    `
  },

  cuotaSindical: {
    titulo: "Cuota sindical",
    referencia: "Ley 27802 - Arts. 37 y 145 → Modifican Arts. 133 LCT y agregan Art. 53 bis Ley 23.551",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 37.- Sustitúyese el artículo 133 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p><strong>Artículo 133: Porcentaje máximo de retención.</strong> La deducción, retención o compensación no podrá insumir en conjunto más del veinte por ciento (20%) del monto total de la remuneración.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><span class="destacado">En ningún caso podrán efectuarse las deducciones, retenciones o compensaciones sin el consentimiento expreso del trabajador</span>, salvo aquéllas que provengan del cumplimiento de las leyes, estatutos profesionales o de Convenios Colectivos de empresa.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 145.- Incorpórase como artículo 53 bis a la ley N° 23.551:</p>

      <p><strong>Artículo 53 bis:</strong> Serán consideradas prácticas desleales por parte de las asociaciones sindicales:</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">c) <span class="destacado">Promover la afiliación compulsiva e involuntaria de trabajadores</span>, en forma directa o indirecta;</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">d) Incurrir en <span class="destacado">conductas y/o mecanismos extorsivos a los fines de lograr la afiliación compulsiva</span> y/o involuntaria de trabajadores;</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">Límites a aportes (Art. 134 - Ley 27802):</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Las contribuciones empresarias a cámaras o asociaciones: máximo <span class="destacado">0,5% de las remuneraciones</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Los aportes de trabajadores no afiliados (cuota solidaria): máximo <span class="destacado">2% de las remuneraciones</span>.</p>
    `
  },

  convenios: {
    titulo: "Convenios colectivos",
    referencia: "Ley 27802 - Arts. 130-132 → Modifican Arts. 18 y 19 Ley 14.250",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 130.- Sustitúyese el artículo 18 de la ley 14.250:</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><strong>Artículo 18:</strong> <span class="destacado">Los Convenios Colectivos de ámbito mayor no podrán modificar ni disponer el contenido de los convenios de ámbito menor.</span></p>

      <p>Los Convenios Colectivos de empresa podrán establecer formas de articulación entre unidades de negociación de ámbitos diferentes.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 131.- Sustitúyese el artículo 19 de la ley 14.250:</p>

      <p><strong>Artículo 19:</strong> Queda establecido el siguiente orden de prelación de normas:</p>

      <p>a) Un convenio colectivo posterior modifica en cualquier sentido a un convenio colectivo anterior de igual ámbito.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">b) <span class="destacado">Un convenio de ámbito menor prevalece, dentro de su ámbito de representación personal y territorial, frente a otro convenio de ámbito mayor</span>, anterior o posterior.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">Ultraactividad (Art. 131 - segundo párrafo):</p>

      <p>Una convención colectiva vencida mantendrá la plena vigencia de todas sus cláusulas hasta que una nueva convención colectiva la sustituya.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Por petición de cualquiera de las partes, cuyas cláusulas se hallaren vigentes sólo por ultraactividad, <span class="destacado">la autoridad administrativa podrá decretar la suspensión de los efectos del acto de homologación</span> cuando se alegare y demostrare que su aplicación genera <span class="destacado">distorsiones económicas graves</span> que afecten el interés general.</p>
    `
  },

  fal: {
    titulo: "Fondo de Asistencia Laboral (FAL)",
    referencia: "Ley 27802 - Arts. 58-77 (Título II)",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 58.- Objeto.</p>

      <p>Créanse los Fondos de Asistencia Laboral, destinados exclusivamente a coadyuvar al cumplimiento de las obligaciones de indemnización (arts. 95, 212, 232, 233, 241, 245, 246, 247, 248, 250 y 254 LCT).</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Solo cubrirán <span class="destacado">trabajadores registrados con al menos 12 meses de antigüedad</span>. En ningún caso cubrirán trabajadores no registrados.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 60.- Contribución.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Contribución mensual obligatoria:
        <br>• <span class="destacado">Grandes empresas: 1%</span> de las remuneraciones
        <br>• <span class="destacado">MiPyMEs: 2,5%</span> de las remuneraciones
      </p>

      <p>Los porcentajes podrán incrementarse hasta 1,5% (grandes) y 3% (MiPyMEs) cuando lo disponga el Poder Ejecutivo.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 65.- Carencia.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">El FAL <span class="destacado">no responderá hasta haber recibido al menos 6 períodos mensuales</span> de contribuciones.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 68.- Responsabilidad del empleador.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">La existencia, inexistencia o insuficiencia de recursos en la cuenta <span class="destacado">no limita la responsabilidad del empleador</span> por el pago íntegro de las obligaciones.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 76.- Reducción de contribución patronal.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Los empleadores tendrán una reducción en contribuciones patronales equivalente a lo que aportan al FAL:
        <br>• Grandes empresas: <span class="destacado">1 punto porcentual menos</span>
        <br>• MiPyMEs: <span class="destacado">2,5 puntos porcentuales menos</span>
      </p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 77.- Vigencia.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">El régimen entrará en vigencia a partir del <span class="destacado">1° de junio de 2026</span>, fecha que podrá ser prorrogada hasta 6 meses.</p>
    `
  },

  art44eliminado: {
    titulo: "Licencias por enfermedad (Art. 44 ELIMINADO)",
    referencia: "NO está en la Ley 27802 - Fue eliminado en Diputados",
    texto: `
      <p style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin-bottom: 16px; border-left: 4px solid #059669;">
        <strong>BUENA NOTICIA:</strong> Este artículo fue <strong>ELIMINADO</strong> durante el tratamiento en Diputados. NO forma parte de la Ley 27802.
      </p>

      <p class="articulo-titulo" style="color: #dc2626;">Lo que decía el artículo ELIMINADO (proyecto del Senado):</p>

      <p style="background: #fef2f2; padding: 12px; border-radius: 6px; text-decoration: line-through; opacity: 0.7;">
        "El trabajador tendrá derecho a percibir el <strong>50%</strong> de su remuneración básica si la imposibilidad de trabajar fuera producto de una actividad voluntaria y consciente del trabajador que implicara algún riesgo en la salud."
      </p>

      <p style="background: #fef2f2; padding: 12px; border-radius: 6px; text-decoration: line-through; opacity: 0.7;">
        "Si la imposibilidad no fuera producto de una actividad voluntaria y consciente del trabajador, percibirá el <strong>75%</strong> de tal remuneración."
      </p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo" style="color: #059669;">Lo que SIGUE VIGENTE (Art. 208 LCT original):</p>

      <p style="background: #ecfdf5; padding: 14px; border-radius: 6px; border-left: 4px solid #059669;">
        El trabajador percibe el <span class="destacado" style="background: #a7f3d0;">100% de su remuneración</span> durante la licencia por enfermedad o accidente inculpable:
        <br>• 3 meses (sin cargas de familia)
        <br>• 6 meses (con cargas de familia)
        <br>• Se duplican si tiene más de 5 años de antigüedad
      </p>

      <p style="background: #fef3c7; padding: 12px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #f59e0b;">
        <strong>¿Por qué se eliminó?</strong> No había votos suficientes en Diputados. La presión sindical y social logró frenar este artículo.
      </p>
    `
  }
};

let modalEl = null;

/**
 * Inicializar el sistema de modal
 */
export function initLeyModal() {
  modalEl = document.getElementById('ley-modal');
  if (!modalEl) return;

  const cerrarBtn = document.getElementById('modal-cerrar');

  // Cerrar con botón
  cerrarBtn?.addEventListener('click', cerrarModal);

  // Cerrar con click en overlay
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) cerrarModal();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl.classList.contains('active')) {
      cerrarModal();
    }
  });

  // Agregar listeners a todos los links de ley
  document.querySelectorAll('.ver-ley-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const seccion = link.dataset.ley;
      if (seccion && TEXTOS_LEY[seccion]) {
        abrirModal(seccion);
      }
    });
  });
}

/**
 * Abrir modal con texto de una sección
 */
function abrirModal(seccion) {
  const data = TEXTOS_LEY[seccion];
  if (!data || !modalEl) return;

  document.getElementById('modal-titulo').textContent = data.titulo;
  document.getElementById('modal-referencia').textContent = data.referencia;
  document.getElementById('modal-texto').innerHTML = data.texto;

  modalEl.classList.add('active');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus en el botón de cerrar
  document.getElementById('modal-cerrar')?.focus();

  // Animar los highlights
  setTimeout(() => {
    animarHighlights();
  }, 100);
}

/**
 * Animar highlights con CSS
 */
function animarHighlights() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const destacados = document.querySelectorAll('#modal-texto .destacado');

  destacados.forEach((el, index) => {
    const delay = prefersReducedMotion ? 0 : index * 100;
    setTimeout(() => {
      el.classList.add('destacado-visible');
    }, delay);
  });
}

/**
 * Cerrar modal
 */
function cerrarModal() {
  if (!modalEl) return;

  document.querySelectorAll('#modal-texto .destacado-visible').forEach(el => {
    el.classList.remove('destacado-visible');
  });

  modalEl.classList.remove('active');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/**
 * Obtener secciones disponibles
 */
export function getSeccionesDisponibles() {
  return Object.keys(TEXTOS_LEY);
}
