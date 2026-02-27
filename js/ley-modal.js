/**
 * Modal para mostrar textos de la ley
 * Con las partes clave destacadas
 */

// Textos de la ley por sección (extraídos del texto aprobado por Diputados)
const TEXTOS_LEY = {
  indemnizacion: {
    titulo: "Indemnización por despido",
    referencia: "Art. 51 (Art. 245 LCT), Art. 9 (Art. 18 LCT), Art. 56 (Art. 277 LCT), Art. 48 (Art. 231 LCT - Preaviso)",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 51.- Sustitúyese el artículo 245 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p>'Artículo 245- Indemnización por antigüedad o despido. En los casos de despido dispuesto por el empleador sin justa causa, habiendo o no mediado preaviso y luego de transcurrido el período de prueba, se deberá abonar al trabajador una indemnización equivalente a UN (1) mes de sueldo por cada año de servicio o fracción mayor de TRES (3) meses, tomando como base de cálculo la mejor remuneración mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Se entiende como remuneración, a estos fines, la devengada y pagada en cada mes calendario, por cuanto <span class="destacado">no tendrán incidencia los conceptos de pago no mensuales como el Sueldo Anual Complementario, vacaciones, premios que no sean de pago mensual</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Se define como habitual, a estos fines, <span class="destacado">aquellos conceptos devengados como mínimo SEIS (6) meses en el último año calendario</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Se define como normal, en el caso de conceptos variables como ser premios mensuales, horas extra, comisiones, <span class="destacado">el promedio de los últimos SEIS (6) meses, o del último año si fuera más favorable al trabajador</span>.</p>

      <p>Dicha base salarial no podrá exceder el equivalente a TRES (3) veces el importe del salario mensual promedio de las remuneraciones previstas en el Convenio Colectivo de Trabajo aplicable al trabajador al momento del despido, por la jornada legal o convencional, excluida la antigüedad. Los topes de cada Convenio Colectivo de Trabajo serán calculados por las partes signatarias del Convenio Colectivo de Trabajo siendo su homologación y/o registración de suficiente intervención por la Autoridad de Aplicación.</p>

      <p>Para aquellos trabajadores excluidos de todo Convenio Colectivo de Trabajo, el tope establecido en el párrafo anterior será el del convenio aplicable al establecimiento donde preste servicios, o al convenio más favorable, en el caso que hubiera más de UNO (1).</p>

      <p>En ningún supuesto la aplicación del tope previsto en este artículo podrá ser inferior al SESENTA Y SIETE POR CIENTO (67 %) de la remuneración mensual, normal y habitual calculada conforme a lo establecido en los párrafos precedentes de este artículo.</p>

      <p>La indemnización en ningún caso podrá ser inferior a UN (1) mes de sueldo calculado sobre la base del sistema establecido en el presente del artículo.</p>

      <p>Mediante Convenio Colectivo de Trabajo, las partes podrán sustituir el presente régimen indemnizatorio por un fondo o sistema de cese laboral cuyo costo estará a cargo del empleador.</p>

      <p>A fin de solventar la indemnización prevista en el presente y/o el pago de la suma que libremente se pacte entre las partes para el supuesto de desvinculación por voluntad concurrente conforme el artículo 241 de la presente ley, los empleadores podrán optar por establecer un fondo o sistema de cese laboral cuyo costo estará siempre a cargo del empleador; en integración o no con los Fondos de Asistencia Laboral.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">La indemnización prevista en este artículo constituye la única reparación procedente frente a la extinción sin justa causa del contrato de trabajo. <span class="destacado">Su percepción importa la extinción definitiva de cualquier reclamo judicial o extrajudicial vinculado al despido</span>, incluidos los de naturaleza civil, contractual o extracontractual, no pudiendo promoverse acciones por fuera del régimen especial establecido en esta ley. Quedan exceptuadas únicamente las acciones basadas en ilícitos penales, en cuyo caso la reparación se regirá por las normas comunes.'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 9.- Sustitúyese el artículo 18 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p>'Artículo 18.- Antigüedad del trabajador. Cuando se reconozcan derechos al trabajador en función de su antigüedad, se considerará como tiempo de servicio aquel efectivamente trabajado desde el inicio de la relación laboral, incluyendo el correspondiente a los sucesivos contratos a plazo que las partes hubieran celebrado. Asimismo, se computará como antigüedad el tiempo de servicio anterior, en los casos en que el trabajador hubiese cesado por cualquier causa y reingrese bajo las órdenes del mismo empleador. <span style="background: #fef2f2; padding: 2px 4px; border-radius: 3px;">Si transcurriese un plazo de <span class="destacado">TRES (3) años</span> entre el cese del vínculo laboral, cualquiera fuera la causa, y el trabajador reingresara a prestar servicios con el mismo empleador, <span class="destacado">la antigüedad del tiempo de servicio anterior no será computada</span>.</span>'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 56.- Sustitúyese el artículo 277 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p>'Artículo 277- Pago en juicio. Todo pago que deba realizarse en los juicios laborales se efectivizará mediante depósito bancario:</p>
      <p>a) en la cuenta sueldo del respectivo trabajador, creada en virtud de lo establecido en la Ley Nº 26.590 y su normativa complementaria y siempre que aquella se encuentre disponible;</p>
      <p>b) excepcionalmente y sólo en caso de ausencia de la primera, en autos a la orden del Tribunal interviniente y giro judicial personal al titular del crédito o sus derecho-habientes, aún en el supuesto de haber otorgado poder.</p>

      <p>Todo pacto de cuota litis requerirá ratificación personal y homologación judicial, y en ningún caso podrá exceder del VEINTE POR CIENTO (20%) del monto del proceso.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Las sentencias judiciales condenatorias de personas humanas y/o jurídicas cuando se trate de grandes empresas podrán ser canceladas en hasta un máximo de <span class="destacado">SEIS (6) cuotas mensuales consecutivas</span>, ajustadas conforme la pauta establecida en el artículo 276 de la presente ley. En el caso de las micro, pequeñas y medianas empresas la cancelación de las sentencias judiciales condenatorias de personas humanas y/o jurídicas podrán ser realizadas en hasta un máximo de <span class="destacado">DOCE (12) cuotas mensuales consecutivas</span>.</p>

      <p>El desistimiento por el trabajador de acciones y derechos se ratificará personalmente en el juicio.'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 48.- Sustitúyese el inciso b) del artículo 231 de la Ley de Contrato de Trabajo N° 20.744 (Preaviso):</p>

      <p>'b) por el empleador, de UN (1) mes cuando el trabajador tuviese una antigüedad en el empleo que no exceda de CINCO (5) años y de DOS (2) meses cuando fuere superior.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><span class="destacado">Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso.</span>'</p>
    `
  },

  bancoHoras: {
    titulo: "Banco de horas / Jornada laboral",
    referencia: "Arts. 42-43 - Modifican Arts. 197 bis y 198 LCT",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 42.- Sustitúyese el artículo 197 bis de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">'Artículo 197 bis- <span class="destacado">El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo</span>, el cual deberá formalizarse por escrito, consignando la naturaleza voluntaria de la prestación de horas extras y sus límites, especificando el modo de funcionamiento del sistema y estableciendo un método fehaciente de control que permita a ambas partes registrar las horas efectivamente trabajadas y las horas disponibles para su goce por parte del trabajador.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">A tal efecto, se podrá disponer de un <span class="destacado">régimen de horas extras, banco de horas, francos compensatorios</span>, entre otros institutos relativos a la jornada laboral.</p>

      <p>Dicho régimen, que podrá igualmente ser pactado por el empleador con la representación sindical en la empresa, deberá respetar los descansos mínimos legales, asegurando en todo momento la protección, beneficio e interés del trabajador.'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 43.- Sustitúyese el artículo 198 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p>'Artículo 198- Jornada reducida. La reducción de la jornada máxima legal solamente procederá cuando lo establezcan las disposiciones vigentes en la materia, o se encuentre estipulado en los contratos individuales, Convenios Colectivos de Trabajo u otros acuerdos colectivos celebrados con la representación sindical en la empresa.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Estos últimos podrán establecer <span class="destacado">métodos de cálculo de la jornada máxima en base a promedio</span>, de acuerdo con las características de la actividad, siempre y cuando se respeten los descansos mínimos entre jornada y jornada de <span class="destacado">DOCE (12) horas</span> y de descanso semanal de <span class="destacado">TREINTA Y CINCO (35) horas</span>.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Asimismo, se podrá utilizar el <span class="destacado">banco de horas de modo de compensar la mayor jornada de algún día con la menor de otro</span>, siempre y cuando no se supere el máximo legal de la jornada semanal, o la que estipule el régimen laboral específico aplicable, ya sea, ley especial y/o Convenio Colectivo de Trabajo.'</p>
    `
  },

  huelga: {
    titulo: "Derecho de huelga en servicios esenciales",
    referencia: "Art. 98 - Modifica Art. 24 Ley 25.877 (Líneas 2513-2629)",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 98.- Sustitúyese el artículo 24 de la ley 25.877:</p>

      <p><strong>Artículo 24.-</strong> Los conflictos colectivos que pudieren afectar la normal prestación de servicios esenciales o actividades de importancia trascendental quedan sujetos a las siguientes garantías de prestación de servicios mínimos.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">En lo que respecta a la prestación de servicios mínimos, en el caso de los servicios esenciales, <span class="destacado">en ningún caso se podrá negociar o imponer a las partes una cobertura menor al SETENTA Y CINCO POR CIENTO (75%)</span> de la prestación normal del servicio de que se tratare.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">En el caso de las actividades o servicios de importancia trascendental, <span class="destacado">en ningún caso se podrá negociar o imponer a las partes una cobertura menor al CINCUENTA POR CIENTO (50%)</span>.</p>

      <p><strong>Se considerarán servicios esenciales en sentido estricto las siguientes actividades:</strong></p>

      <p>a. El cuidado de menores y educación de niveles guardería, preescolar, primario y secundario, así como la educación especial;</p>

      <p>b. Los servicios sanitarios y hospitalarios, así como el transporte y distribución de medicamentos e insumos hospitalarios y los servicios farmacéuticos;</p>

      <p>c. La producción, transporte y distribución y comercialización de agua potable, gas, petróleo y otros combustibles y energía eléctrica;</p>

      <p>d. Los servicios de telecomunicaciones, incluyendo internet y comunicaciones satelitales;</p>

      <p>e. El servicio de recolección de residuos;</p>

      <p>f. La aeronáutica comercial y el control de tráfico aéreo y portuario; incluyendo balizamiento, dragado, amarre, estiba, desestiba, remolque de buques y todos los servicios portuarios;</p>

      <p>g. Transporte de caudales; y</p>

      <p>h. Servicios privados de seguridad y custodia.</p>

      <p><strong>Se consideran actividades de importancia trascendental las siguientes:</strong></p>

      <p>a. El transporte marítimo y fluvial de personas y/o mercaderías y/o carga, servicios conexos y operaciones costa afuera;</p>

      <p>b. Los servicios aduaneros y migratorios, y demás vinculados al comercio exterior;</p>

      <p>c. La producción de medicamentos y/o insumos hospitalarios;</p>

      <p>d. El transporte terrestre y subterráneo de personas y/o mercaderías;</p>

      <p>e. Los servicios de radio y televisión;</p>

      <p>f. Las actividades industriales continuas, incluyendo siderurgia y la producción de aluminio, actividad química y la actividad cementera;</p>

      <p>g. La industria alimenticia en toda su cadena de valor;</p>

      <p>h. Los servicios bancarios, financieros, servicios hoteleros y gastronómicos y el comercio electrónico; y</p>

      <p>i. La producción de bienes y/o servicios de toda actividad que estuvieran afectados a compromisos de exportación.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">La Autoridad de Aplicación a propuesta de una comisión independiente y autónoma, denominada <span class="destacado">COMISIÓN DE GARANTÍAS</span>, integrada por CINCO (5) miembros de reconocida solvencia técnica, <span class="destacado">podrá, mediante resolución fundada, calificar como servicio esencial o servicio de importancia trascendental una actividad no incluida en las enumeraciones precedentes</span>, cuando se diere alguna de las siguientes circunstancias:</p>

      <p>a) La extensión y duración de la interrupción pudiere poner en peligro la vida, la salud o la seguridad de la persona;</p>

      <p>b) La actividad afectada constituyere un servicio público de importancia trascendental;</p>

      <p>c) La interrupción pudiere provocar una situación de crisis nacional aguda; y</p>

      <p>d) La interrupción pudiere poner en peligro el adecuado abastecimiento de productos críticos.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><span class="destacado">Las fuerzas de seguridad en ningún caso podrán brindar una cobertura menor al CIEN POR CIENTO (100%)</span> de la prestación normal de su servicio.</p>
    `
  },

  cuotaSindical: {
    titulo: "Cuota sindical",
    referencia: "Art. 37 (Art. 133 LCT) y Art. 137 (Art. 38 Ley 23.551)",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 37.- Sustitúyese el artículo 133 de la Ley de Contrato de Trabajo N° 20.744:</p>

      <p>'Artículo 133- Porcentaje máximo de retención. Conformidad del trabajador. Autorización administrativa. Salvo lo dispuesto en el artículo 130 de esta ley, en el caso de adelanto de remuneraciones, la deducción, retención o compensación no podrá insumir en conjunto más del VEINTE POR CIENTO (20%) del monto total de la remuneración en dinero que tenga que percibir el trabajador en el momento en que se practique.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Las mismas podrán consistir, siempre dentro de dicha proporción, en sumas fijas y previamente determinadas. <span class="destacado">En ningún caso podrán efectuarse las deducciones, retenciones o compensaciones a las que se hace referencia en el artículo 132 de esta ley sin el consentimiento expreso del trabajador</span>, salvo aquéllas que provengan del cumplimiento de las leyes, estatutos profesionales o de Convenios Colectivos de empresa, siempre que sean con destino al o los sindicatos signatarios de éstos.'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 137.- Sustitúyese el artículo 38 de la ley 23.551:</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">'Artículo 38- Los empleadores podrán actuar como agentes de retención de los importes que, en concepto de cuotas de afiliación, deban abonar los trabajadores afiliados a asociaciones sindicales con personería gremial, <span class="destacado">siempre que medie conformidad expresa del trabajador y acuerdo entre las partes</span>.</p>

      <p>A su vez, se deberá contar con resolución de la SECRETARÍA DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL del MINISTERIO DE CAPITAL HUMANO, que lo autorice.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;"><span class="destacado">Cualquiera de las partes del contrato de trabajo podrá dejar sin efecto el acuerdo previo comunicando a la otra con TREINTA (30) días de anticipación</span> por cualquier medio fehaciente.'</p>
    `
  },

  convenios: {
    titulo: "Convenios colectivos",
    referencia: "Arts. 130, 131, 132 - Modifican Arts. 18 y 19 Ley 14.250",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 130.- Sustitúyese el artículo 18 de la ley 14.250:</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">'Artículo 18- <span class="destacado">Los Convenios Colectivos de ámbito mayor no podrán modificar ni disponer el contenido de los convenios de ámbito menor.</span></p>

      <p>Los Convenios Colectivos de empresa, podrán establecer formas de articulación entre unidades de negociación de ámbitos diferentes, ajustándose las partes a sus respectivas facultades de representación.'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 131.- Sustitúyese el artículo 19 de la ley 14.250:</p>

      <p>'Artículo 19- Queda establecido el siguiente orden de prelación de normas:</p>

      <p>a) Un convenio colectivo posterior modifica en cualquier sentido a un convenio colectivo anterior de igual ámbito.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">b) <span class="destacado">Un convenio de ámbito menor, prevalece, dentro de su ámbito de representación personal y territorial, frente a otro convenio de ámbito mayor, anterior o posterior.</span>'</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 132.- Ultraactividad y renegociación:</p>

      <p>En el plazo de UN (1) año contado desde la promulgación de la presente ley, la SECRETARÍA DE TRABAJO convocará a las partes legitimadas para negociar, y/o renegociar y/o ratificar las cláusulas de los Convenios Colectivos de Trabajo que estuvieran vencidos.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Por petición de cualquiera de las partes legitimadas para negociar un Convenio Colectivo de Trabajo, cuyas cláusulas normativas se hallaren vigentes sólo por ultraactividad, <span class="destacado">la autoridad administrativa del trabajo podrá decretar la suspensión de los efectos del acto de homologación cuando se alegare y demostrare sumariamente que su aplicación genera distorsiones económicas graves</span> que afecten el interés general.</p>
    `
  },

  fal: {
    titulo: "Fondo de Asistencia Laboral (FAL)",
    referencia: "Arts. 58-77 - Título II de la Ley de Modernización Laboral",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 58.- Objeto.</p>

      <p>Créanse los Fondos de Asistencia Laboral, con vigencia a partir del segundo mes inmediato siguiente al de la entrada en vigencia de la presente ley, destinados exclusivamente a coadyuvar al cumplimiento de las obligaciones y pagos que se estipulen conforme los artículos 95, 212 párrafos segundo, tercero y cuarto, 232, 233, 241, 245, 246, 247, 248, 250 y 254 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones, y de las indemnizaciones reparadoras de preaviso, integración, y despido, previstas en los estatutos profesionales, por parte de los empleadores del Sector Privado.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Los referidos fondos sólo podrán prestar cobertura respecto de <span class="destacado">trabajadores registrados con una antelación no menor a DOCE (12) meses</span> de la fecha de la extinción de la relación laboral. <span class="destacado">En ningún caso y bajo ninguna circunstancia prestarán cobertura respecto de trabajadores no registrados.</span></p>

      <p>El presente Régimen no modifica, sustituye, ni altera el régimen indemnizatorio.</p>

      <p>Se encuentran excluidos del presente Régimen las relaciones laborales regidas por las leyes Nros. 22.250 (construcción) y 26.844 (casas particulares).</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 59.- Naturaleza jurídica.</p>

      <p>Cada empleador deberá conformar una cuenta como un patrimonio separado, de afectación específica, independiente, inajenable e inembargable, en uno de los fondos administrados por una de las entidades habilitadas a tal fin por la COMISIÓN NACIONAL DE VALORES, a elección del empleador.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 60.- Contribución.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Las cuentas de los Fondos de Asistencia Laboral se conformarán con una contribución mensual obligatoria del <span class="destacado">UNO POR CIENTO (1%) para las grandes empresas</span> y <span class="destacado">DOS Y MEDIO POR CIENTO (2,5%) para las micro, pequeñas y medianas empresas</span> de acuerdo a lo previsto en la Ley 24.467 y sus modificatorias de las remuneraciones que se toman como base para el cálculo de las Contribuciones Patronales con destino al Sistema Integrado Previsional Argentino (SIPA) de cada trabajador.</p>

      <p>Los porcentajes de las cuentas de los Fondos de Asistencia podrán incrementarse hasta el UNO Y MEDIO POR CIENTO (1,5%) para las grandes empresas y hasta el TRES POR CIENTO (3%) para las micro, pequeñas y medianas empresas, cuando así lo disponga el PODER EJECUTIVO NACIONAL.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 64.- Utilización de los recursos de los Fondos.</p>

      <p>Los recursos acumulados en la cuenta correspondiente a cada empleador sólo podrán utilizarse para cubrir el pago de las obligaciones y montos previstos en el artículo 58 de la presente ley, siempre que la relación laboral extinguida hubiera estado registrada.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">En caso de que la relación laboral estuviere registrada de modo deficiente, los recursos de la cuenta podrán ser aplicados <span class="destacado">únicamente para cubrir las obligaciones y pagos que corresponderían si se consideraran solamente los datos de la relación laboral registrada</span>.</p>

      <p>La existencia, inexistencia o insuficiencia de recursos en la cuenta no limita, reduce, altera ni condiciona la responsabilidad del empleador por el pago íntegro de las obligaciones a su cargo derivadas de la extinción del vínculo laboral.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Ante cada situación prevista en el artículo 58 de la presente ley, <span class="destacado">el empleador podrá optar por aplicar los recursos de la cuenta, o una parte de ellos, para el pago total o parcial de dicha obligación, o por no usarlos para ese caso y mantener los recursos en la cuenta</span>.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 65.- Carencia.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">A efectos de su capitalización y con el fin de garantizar la estabilidad financiera, <span class="destacado">el Fondo de Asistencia Laboral no responderá por las extinciones laborales previstas en el artículo 58 de la presente ley, hasta luego de haber recibido las contribuciones correspondientes a al menos SEIS (6) períodos mensuales</span>, en los términos que determine la Reglamentación.</p>

      <p>El PODER EJECUTIVO NACIONAL podrá establecer un plazo mayor, cuando por las características del sector económico o del mercado laboral, entre otros motivos atendibles, así lo aconsejen.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 71.- Entidades habilitadas.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Las entidades habilitadas serán las responsables de la administración, inversión y resguardo de los Fondos de Asistencia Laboral, como también de velar por el cumplimiento del procedimiento de verificación y pago. Las entidades habilitadas únicamente podrán percibir una contraprestación, en concepto de <span class="destacado">comisiones y gastos por todas las funciones que les asigna la presente ley, con un tope de comisión del UNO POR CIENTO (1%)</span>.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 76.- Reducción de contribución patronal.</p>

      <p style="background: #fef2f2; padding: 10px 14px; border-radius: 6px; margin: 12px 0; border-left: 4px solid #dc2626;">Los empleadores, por las relaciones laborales incluidas en el presente Régimen, tendrán una <span class="destacado">reducción de UN (1) punto porcentual para las grandes empresas y DOS puntos y MEDIO (2,5 puntos) para las micro, pequeñas y medianas empresas en las contribuciones patronales con destino a la Seguridad Social</span>.</p>

      <p>Los porcentajes de reducción en las contribuciones patronales con destino a la Seguridad Social referidos en el párrafo precedente podrán incrementarse hasta el DOS POR CIENTO (2%) para las grandes empresas y hasta el TRES POR CIENTO (3%) para las micro, pequeñas y medianas empresas, cuando así lo disponga el PODER EJECUTIVO NACIONAL.</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;">

      <p class="articulo-titulo">ARTÍCULO 77.- Autoridades de Aplicación. Vigencia.</p>

      <p>La SECRETARÍA DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL, la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA), la COMISIÓN NACIONAL DE VALORES y la SECRETARÍA DE FINANZAS del MINISTERIO DE ECONOMÍA, en el marco de sus respectivas competencias, serán los organismos responsables de dictar las normas complementarias y velar por el funcionamiento y cumplimiento del presente régimen. <span class="destacado">El presente Régimen entrará en vigencia a partir del 1 de junio de 2026</span>, junto con el dictado de la Reglamentación y normas de instrumentación pertinentes.</p>
    `
  },

  periodoPrueba: {
    titulo: "Período de prueba",
    referencia: "Art. 40 - Modifica Art. 92 bis LCT",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 40.- Sustitúyese el artículo 92 bis de la Ley N° 20.744:</p>

      <p>El contrato de trabajo por tiempo indeterminado, excepto el referido en el artículo 96, se entenderá celebrado a prueba durante los primeros <span class="destacado">SEIS (6) meses de vigencia</span>. Cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa, sin derecho a indemnización con motivo de la extinción, pero con obligación de preavisar según lo establecido en los artículos 231 y 232.</p>

      <p>El período de prueba se regirá por las siguientes reglas:</p>
      <p>1. Un empleador no puede contratar a un mismo trabajador, más de una vez, utilizando el período de prueba;</p>
      <p>2. El uso abusivo del período de prueba con el objeto de evitar la efectivización de trabajadores será pasible de las sanciones previstas en los regímenes sobre infracciones a las leyes de trabajo;</p>
      <p>3. <span class="destacado">Las partes tienen los derechos y obligaciones propias de la relación laboral</span>, con las excepciones que se establecen en este artículo;</p>
      <p>4. El trabajador tiene derecho, durante el período de prueba, a las prestaciones por accidente o enfermedad del trabajo;</p>
      <p>5. El período de prueba se computará como tiempo de servicio a todos los efectos laborales y de la seguridad social.</p>
    `
  },

  asambleas: {
    titulo: "Asambleas y delegados sindicales",
    referencia: "Art. 138 - Modifica Art. 44 Ley 23.551",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 138.- Sustitúyese el artículo 44 de la Ley N° 23.551:</p>

      <p>Los delegados del personal, las comisiones internas y organismos similares, ejercerán en los lugares de trabajo según el caso, en la sede de la empresa o del establecimiento al que estén asignados la siguiente representación:</p>

      <p>a) De los trabajadores ante el empleador, la autoridad administrativa del trabajo y ante la asociación sindical;</p>

      <p>b) De la asociación sindical ante el empleador y el trabajador;</p>

      <p>c) Cada uno de los delegados del personal tendrá, para el ejercicio de sus funciones, <span class="destacado">un crédito de hasta DIEZ (10) horas mensuales retribuidas</span>, salvo que el convenio colectivo aplicable disponga una cantidad mayor.</p>

      <p><span class="destacado">El ejercicio de este derecho no podrá generar la interrupción de actividades en el área de trabajo.</span></p>

      <p>Los trabajadores que se desempeñen en los cargos indicados gozarán de estabilidad en su empleo durante el ejercicio de su mandato y hasta un año después de finalizado, salvo que mediare justa causa de extinción.</p>
    `
  },

  ultraactividad: {
    titulo: "Ultraactividad de convenios",
    referencia: "Art. 132 - Modifica Art. 6 Ley 14.250",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 132.- Sustitúyese el artículo 6° de la Ley N° 14.250:</p>

      <p>Una convención colectiva de trabajo, cuyo término estuviere vencido, mantendrá la plena vigencia de todas sus cláusulas hasta que una nueva convención colectiva la sustituya, salvo que en la convención colectiva vencida se hubiese acordado lo contrario.</p>

      <p><span class="destacado">De oficio, o por petición de cualquiera de las partes legitimadas para negociar un Convenio Colectivo de Trabajo, cualquiera sea su nivel, cuyas cláusulas normativas se hallaren vigentes sólo por ultraactividad</span>, la autoridad administrativa del trabajo <span class="destacado">podrá decretar la suspensión de los efectos del acto de homologación</span> cuando se alegare y demostrare sumariamente que su aplicación genera distorsiones económicas graves que afecten el interés general.</p>

      <p>La resolución que así lo disponga deberá ser fundada y fijar un plazo para que las partes arriben a un nuevo acuerdo, vencido el cual, y de no haber acuerdo entre las partes, <span class="destacado">las condiciones de trabajo se regirán exclusivamente por la Ley de Contrato de Trabajo</span> y las normas legales aplicables.</p>
    `
  },

  art44eliminado: {
    titulo: "Licencias por enfermedad (ELIMINADO)",
    referencia: "Art. 44 del Senado - RECHAZADO en Diputados",
    texto: `
      <p class="articulo-titulo" style="color: #dc2626;">ARTÍCULO 44 - ELIMINADO EN DIPUTADOS</p>

      <p><strong>Este artículo fue aprobado por el Senado pero ELIMINADO en Diputados</strong> para conseguir los votos necesarios. Gracias a la presión sindical y social, NO entró en vigencia.</p>

      <p class="articulo-titulo">Lo que decía el artículo eliminado:</p>

      <p>"En caso de sufrir un accidente o una enfermedad que no sea consecuencia de la prestación de tareas derivadas del contrato de trabajo, y que impida dicha prestación, el trabajador tendrá derecho a percibir <span class="destacado" style="background: linear-gradient(to bottom, transparent 60%, #fca5a5 60%);">el 50% de su remuneración básica</span> si la imposibilidad de trabajar fuera producto de una actividad voluntaria y consciente del trabajador que implicara algún riesgo en la salud."</p>

      <p>"Si la imposibilidad de trabajar no fuera producto de una actividad voluntaria y consciente del trabajador sobre el riesgo en la salud, percibirá <span class="destacado" style="background: linear-gradient(to bottom, transparent 60%, #fca5a5 60%);">el 75% de tal remuneración</span>."</p>

      <p class="articulo-titulo" style="color: #059669;">Lo que sigue vigente (Art. 208 LCT original):</p>

      <p><span class="destacado">El trabajador percibe el 100% de su remuneración</span> durante la licencia por enfermedad o accidente inculpable, por un período de 3 meses (sin cargas de familia) o 6 meses (con cargas de familia).</p>

      <p style="background: #ecfdf5; padding: 12px; border-radius: 8px; margin-top: 16px;"><strong>IMPORTANTE:</strong> Este es un ejemplo de cómo la movilización puede frenar artículos perjudiciales. El artículo se eliminó porque no había votos suficientes.</p>
    `
  },

  blanqueo: {
    titulo: "Blanqueo laboral (PER)",
    referencia: "Arts. 164-172 - Promoción del Empleo Registrado",
    texto: `
      <p class="articulo-titulo">ARTÍCULO 164.- Regularización de relaciones laborales:</p>

      <p>Los empleadores podrán regularizar las relaciones laborales vigentes del sector privado iniciadas hasta la fecha de promulgación de la presente ley. La regularización podrá comprender <span class="destacado">relaciones laborales no registradas o deficientemente registradas</span>.</p>

      <p class="articulo-titulo">ARTÍCULO 165.- Efectos de la regularización:</p>

      <p>La regularización producirá los siguientes efectos:</p>
      <p>a) <span class="destacado">Extinción de la acción penal</span> prevista en las leyes 24.769 y 27.430;</p>
      <p>b) <span class="destacado">Condonación de infracciones, multas y sanciones</span> de cualquier naturaleza;</p>
      <p>c) <span class="destacado">Baja del REPSAL</span> (Registro de Empleadores con Sanciones Laborales);</p>
      <p>d) <span class="destacado">Condonación mínima del 70%</span> de deudas por aportes y contribuciones.</p>

      <p class="articulo-titulo">ARTÍCULO 166.- Beneficio para trabajadores:</p>

      <p>Los trabajadores regularizados podrán computar hasta <span class="destacado">SESENTA (60) meses de servicios con aportes</span>, calculados sobre el salario mínimo vital y móvil vigente.</p>

      <p class="articulo-titulo">ARTÍCULO 167.- Plazo:</p>

      <p>El plazo para acogerse al régimen será de <span class="destacado">CIENTO OCHENTA (180) días corridos</span> desde la reglamentación.</p>
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

  // Animar los highlights con CSS (funciona mejor con scroll que rough-notation)
  setTimeout(() => {
    animarHighlights();
  }, 100);
}

/**
 * Animar highlights con CSS (aparecen secuencialmente)
 */
function animarHighlights() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const destacados = document.querySelectorAll('#modal-texto .destacado');

  destacados.forEach((el, index) => {
    // Agregar clase para activar la animación CSS
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

  // Quitar clases de animación
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
