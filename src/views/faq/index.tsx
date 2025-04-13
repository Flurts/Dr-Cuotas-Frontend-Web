import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqView() {
  const faqs = [
    {
      question: 'Sobre Dr.Cuotas',
      answer: [
        '¿Qué es Dr. Cuotas? Dr. Cuotas es la primera plataforma que permite una financiación accesible y de calidad para servicios de cirugía estética.',
        '¿Cómo funciona el proceso de financiación? Ofrecemos planes de capitalización aprobados por los I.G.J.N. Res. 01010 y sus modificatorias. Los detalles específicos sobre cómo acceder a estos planes se pueden encontrar en nuestro sitio web.',
        '¿Qué servicios de cirugía estética están disponibles? Actualmente, ofrecemos financiamiento para varios procedimientos estéticos como aumento de mamas, escultura corporal, y rejuvenecimiento facial.',
        '¿Qué sucede si soy adjudicado en un sorteo? Si eres adjudicado, no tendrás que pagar más por el financiamiento de tu cirugía estética.',
        '¿Cómo puedo registrarme en la plataforma? Puedes registrarte directamente en nuestro sitio web siguiendo las instrucciones en la sección de registro.',
        '¿Qué métodos de pago aceptan? Aceptamos varios métodos de pago. Para más detalles, por favor visita nuestra sección de medios de pago en el sitio web.',
        '¿Cómo puedo contactar a Dr. Cuotas? Puedes contactarnos a través del correo electrónico contacto@drcuotas.com.',
        '¿Tienen una aplicación móvil? Sí, nuestra aplicación estará disponible próximamente en App Store y Google Play.',
      ],
    },
    {
      question: 'Sobre Pacientes',
      answer: [
        '¿Qué tipos de cirugías puedo financiar con DrCuotas? Puedes financiar una variedad de procedimientos estéticos, incluyendo aumento de mamas, escultura corporal, y rejuvenecimiento facial.',
        '¿Cómo se realiza la adjudicación de los sorteos? La adjudicación se realiza mediante sorteos mensuales, garantizando una oportunidad justa para todos los participantes.',
        '¿Qué sucede si no soy adjudicado en un sorteo? Si no eres adjudicado, puedes seguir participando en los sorteos mensuales sin costo adicional.',
        '¿Qué documentos necesito para solicitar financiamiento? Necesitarás presentar documentos de identidad y comprobantes de ingresos para evaluar tu capacidad de pago.',
        '¿Cuánto tiempo toma el proceso de aprobación? El proceso de aprobación puede variar, pero generalmente toma entre 1 a 2 semanas.',
      ],
    },
    {
      question: 'Sobre Doctores',
      answer: [
        '¿Cómo puedo afiliarme a DrCuotas como proveedor de servicios? Puedes afiliarte a través de nuestro sitio web llenando un formulario de solicitud y proporcionando la documentación requerida.',
        '¿Qué beneficios ofrece DrCuotas a los doctores afiliados?  Ofrecemos acceso a una amplia base de pacientes potenciales y la posibilidad de recibir pagos seguros a través de nuestra plataforma.',
        '¿Cómo se gestiona el pago a los doctores por los procedimientos financiados? Los pagos se gestionan a través de la plataforma DrCuotas, asegurando una transacción segura y oportuna.',
        '¿Qué requisitos deben cumplir los doctores para afiliarse? Los doctores deben tener licencia vigente y cumplir con los estándares de calidad establecidos por DrCuotas.',
        '¿Cómo puedo contactar con DrCuotas para resolver dudas sobre la afiliación? Puedes contactarnos a través del correo electrónico contacto@drcuotas.com o llamarnos al número proporcionado en nuestra página de contacto.',
      ],
    },
    {
      question: 'Sobre Cirugías y Cuidado',
      answer: [
        '¿Cómo debo prepararme para la cirugía? Es importante seguir las indicaciones del médico, que pueden incluir ayuno previo, evitar ciertos medicamentos, y realizarse los exámenes prequirúrgicos necesarios.',
        '¿Cuánto tiempo dura la cirugía? La duración depende del tipo de procedimiento, pero generalmente varía entre 1 a 4 horas.',
        '¿Qué exámenes prequirúrgicos necesito? Los exámenes comunes incluyen análisis de sangre, electrocardiograma, y, en algunos casos, estudios de imagen como radiografías.',
        '¿Cuál es el tiempo de recuperación postoperatoria? El tiempo de recuperación varía según el procedimiento, pero puede oscilar entre una semana y varios meses.',
        '¿Qué cuidados debo tener después de la cirugía? Es crucial seguir las instrucciones postoperatorias del médico, que pueden incluir reposo, evitar esfuerzos físicos, y tomar medicamentos prescritos.',
        '¿Puedo comer o beber antes de la cirugía? Generalmente, se recomienda ayuno de 8 horas antes de la cirugía, pero tu médico te dará instrucciones específicas.',
        '¿Es dolorosa la recuperación? Puede haber molestias postoperatorias que se manejan con analgésicos recetados por el médico.',
        '¿Cuándo podré retomar mis actividades normales? Depende del tipo de cirugía y tu recuperación personal, pero tu médico te indicará cuándo es seguro hacerlo.',
      ],
    },
    {
      question: 'Sobre Confianza y Seguridad',
      answer: [
        '¿Cómo puedo estar seguro de que el profesional es calificado? Todos los médicos afiliados a DrCuotas tienen licencias vigentes y cumplen con los estándares de calidad establecidos. Además, puedes revisar sus credenciales y experiencia en nuestro sitio web.',
        '¿Qué medidas de seguridad se toman durante la cirugía? Los procedimientos se realizan en clínicas y hospitales certificados que siguen estrictos protocolos de seguridad y esterilización.',
        '¿Cómo puedo verificar las opiniones de otros pacientes? En nuestra plataforma, encontrarás reseñas y testimonios de pacientes anteriores que han utilizado los servicios de nuestros profesionales.',
        '¿Qué hago si tengo dudas sobre el procedimiento? Puedes programar una consulta prequirúrgica con tu médico para discutir todas tus inquietudes ',
        '¿Qué sucede si hay complicaciones durante la recuperación? Nuestro equipo de soporte y tu médico están disponibles para brindarte asistencia y guiarte en caso de cualquier complicación postoperatoria.',
        '¿Los profesionales siguen actualizaciones médicas y de seguridad? Sí, nuestros médicos se mantienen actualizados con las últimas prácticas y protocolos de seguridad en cirugía estética.',
      ],
    },
    {
      question: 'Sobre Condiciones de Uso',
      subsections: [
        {
          title: '1.1 Obligaciones del Usuario',
          content: [
            `1.1. Hacer uso correcto de LA APLICACIÓN Y/O SITIO WEB: El Usuario se compromete a utilizar LA APLICACIÓN Y/O SITIO WEB de conformidad con la ley, estas Condiciones Generales, así como con la moral y buenas costumbres generalmente aceptadas y el orden público.`,
            `El Usuario se obliga a abstenerse de utilizar LA APLICACIÓN Y/O SITIO WEB con fines o efectos ilícitos, contrarios a lo establecido en estas Condiciones Generales, lesivos de los derechos e intereses de terceros...`,
          ],
        },
        {
          title: '1.2 Conducta general. Queda prohibido',
          content: [
            `1.2.1 El acceso a LA APLICACIÓN Y/O SITIO WEB por personas menores de 18 años de edad.`,
            `1.2.2. Utilizar LA APLICACIÓN Y/O SITIO WEB, directa o indirectamente, para violar
            cualquier ley aplicable, cualquiera fuese su naturaleza, ya sea internacional,
            nacional, provincial o local;
            `,
            `1.2.3. transmitir material pornográfico u obsceno; `,
            `1.2.4. transmitir, distribuir o almacenar cualquier tipo de información, datos o
            materiales que violen leyes o regulaciones internacionales, nacionales o
            provinciales;`,
            `1.2.5. enviar o transmitir información cuyo contenido sea, directa o indirectamente, y
sin que lo siguiente se considere una limitación, trasgresor, profano, abusivo,
difamatorio y/o fraudulento, o que revele asuntos privados o personales que
afecten a persona alguna, o que de alguna manera violen derechos de terceros;`,
            `1.2.6. utilizar los servicios utilizando un nombre falso, erróneo o inexistente, ya sea
como persona física o jurídica;`,
            `1.2.7. transmitir material que el Usuario no tenga derecho a transmitir con arreglo a
las leyes vigentes (ya sea de “Copyright”, marca registrada, secreto comercial,
patentes u otros derechos de la propiedad de terceros) o con arreglo a relaciones
contractuales o fiduciarias (tales como los contratos de no divulgación);`,
            `1.2.8. efectuar acciones que restrinjan, denieguen o impidan a cualquier individuo,
grupo, entidad u organización, el uso de los contenidos o servicios ofrecidos a
través de LA APLICACIÓN Y/O SITIO WEB;
`,
          ],
        },
        {
          title: '1.3. Seguridad. Queda prohibido:',
          content: [
            `1.3.1. intentar la violación de los sistemas de autenticación, verificación de identidad y
seguridad del servidor, redes o cuentas de Usuarios; esto incluye, y no se limita, a
tratar de acceder a datos no destinados al Usuario, intentar ingresar en el
servidor o cuentas sin contar con la expresa autorización para hacerlo, o
intentar probar la seguridad de nuestras redes, utilizando herramientas para
pruebas de intrusión u otras similares (por ejemplo de mapeo de rutas de red
Windows, de mapeo de rutas de red Unix, de mapeo de puertos, clientes DNS,
browser SNMP, scanner de vulnerabilidades; Proxy de intercepción; Spider;
Analizador de vulnerabilidades web, Suite completa de análisis de seguridad
web; Sniffer de paquetes de red; Sniffer de passwords; Cliente TCP; Cliente y
servidor TCP y UDP; analizador de redes inalámbricas para Linux; analizador de
redes inalámbricas para Windows; Sistemas de obtención de contraseñas WEP;
etc.)`,
            `1.3.2. intentar interrupciones en las comunicaciones de Internet, tales como alterar
información de ruteo, sobrecargar deliberadamente un servicio, efectuar ataques
informáticos a otras computadoras sobre Internet, entre otros;
`,
            `1.3.3. utilizar cualquier programa, comando o grupo de comandos, o enviar mensajes
de cualquier tipo, destinados a interferir con la sesión establecida por un
Usuario en cualquier punto de Internet;`,
            `1.3.4. efectuar cualquier tipo de monitoreo que implique la intercepción de
información no destinados al Usuario;
`,
            `1.3.5. enviar o transmitir archivos que contengan virus u otras características
destructivas que puedan afectar de manera adversa el funcionamiento de una
computadora ajena y/o puedan afectar el correcto funcionamiento de las
mismas y/o de LA APLICACIÓN Y/O SITIO WEB;`,
          ],
        },
        {
          title: '1.4. Medios para la obtención de Contenidos:',
          content: [
            `1.4.1. El Usuario deberá abstenerse de obtener e incluso de intentar obtener
informaciones, mensajes, gráficos, dibujos, archivos de sonido y/o imagen,
fotografías, grabaciones, software y, en general, cualquier clase de material
accesibles a través de LA APLICACIÓN Y/O SITIO WEB (en adelante, los
"Contenidos") empleando para ello medios o procedimientos distintos de los que,
según los casos, se hayan puesto a su disposición a este efecto o se hayan indicado
a este efecto en las páginas web donde se encuentren los Contenidos o, en
general, de los que se empleen habitualmente en Internet a este efecto y siempre
que no entrañen un riesgo de daño o inutilización de LA APLICACIÓN Y/O SITIO
WEB y/o de los Contenidos`,
          ],
        },
        {
          title: '1.5. Uso correcto de los Contenidos:',
          content: [
            `1.5.1. El Usuario se obliga a usar los Contenidos y los Servicios ofrecidos de forma
diligente, correcta y lícita y, en particular, se compromete a abstenerse de:
`,
            `1.5.1.1. utilizarlos de forma, con fines o efectos contrarios a la ley, a la moral y a
las buenas costumbres generalmente aceptadas o al orden público;`,
            `1.5.1.2. reproducir o copiar, distribuir, permitir el acceso del público a través de
cualquier modalidad de comunicación pública, transformar o modificarlos,
a menos que se cuente con la autorización del titular de los
correspondientes derechos o ello resulte legalmente permitido;
`,
            `1.5.1.3. suprimir, eludir o manipular el "Copyright" y demás datos identificativos
de los derechos de DR. CUOTAS o de sus titulares incorporados a los
Contenidos, así como los dispositivos técnicos de protección, las huellas
digitales o cualesquiera mecanismos de información que pudieren
contener los Contenidos;
`,
            `1.5.1.4. emplear los Contenidos y, en particular, la información de cualquier clase
obtenida a través de LA APLICACIÓN Y/O SITIO WEB o de los Servicios
para comercializar o divulgar de cualquier modo dicha información.
`,
          ],
        },
        {
          title: '1.5.2 Introducción de Hipervínculos:',
          content: [
            `1.5.2.1. Los Usuarios y, en general, aquellas personas que se propongan establecer
un hipervínculo entre su página web y LA APLICACIÓN Y/O SITIO WEB (en
adelante, el "Hipervínculo") deberán cumplir las condiciones siguientes:
`,
            `1.5.2.1.1. el Hipervínculo únicamente permitirá el acceso a las páginas web o
a las plataformas para descargar LA APLICACIÓN Y/O SITIO WEB,
pero no podrá reproducirlas de ninguna forma;`,
            `1.5.2.1.2. no se establecerán Hipervínculos con las páginas web de LA
APLICACIÓN Y/O SITIO WEB distintas de la home-page o página
primera de la APLICACIÓN o de los Contenidos (deep linking);`,
            `1.5.2.1.3. no se creará un browser, ni un border enviroment, ni un frame sobre
las páginas web de LA APLICACIÓN Y/O SITIO WEB (framing);`,
            `1.5.2.1.4. no se realizarán manifestaciones o indicaciones falsas, inexactas o
incorrectas sobre las páginas web de LA APLICACIÓN Y/O SITIO
WEB y de los Contenidos y, en particular, no se declarará ni dará a
entender que DR. CUOTAS S.A. ha autorizado el Hipervínculo o que
ha supervisado o asumido de cualquier forma los contenidos o
servicios ofrecidos o puestos a disposición de la página web en la que
se establece el Hipervínculo;
`,
            `1.5.2.1.5. excepción hecha de aquellos signos que formen parte del mismo
Hipervínculo, la página web o la aplicación en la que se establezca el
Hipervínculo no contendrá ninguna marca, nombre comercial,
rótulo de establecimiento, denominación, logotipo, eslogan u otros
signos distintivos pertenecientes a LA APLICACIÓN Y/O SITIO WEB;`,
            `1.5.2.1.6. la página web en la que se establezca el Hipervínculo no contendrá
informaciones o contenidos ilícitos, contrarios a la moral y buenas
costumbres generalmente aceptadas y al orden público, así como
tampoco contendrá contenidos contrarios a cualesquiera derechos
de terceros.`,
            `1.5.2.2. El establecimiento del Hipervínculo no implica en ningún caso la existencia
de relaciones entre DR CUOTAS y el propietario del sitio web con el que se
establezca, ni la aceptación y aprobación por parte de DR CUOTAS de sus
contenidos o servicios salvo que dicha relación se encuentre plasmada en
un acuerdo escrito entre ambas partes, rigiéndose en tal caso por las
previsiones de dicho contrato.
`,
          ],
        },
        {
          title: '1.6 Indemnidades:',
          content: [
            `1.6.1. El Usuario defenderá y mantendrá indemne a DR CUOTAS, contra todo daño y/o
perjuicio, cualquiera fuese su naturaleza, inclusive los gastos por honorarios de
abogados, que pudieran surgir con motivo u ocasión de cualquier acción o
demanda iniciada por un tercero como consecuencia del incumplimiento del
Usuario de cualquiera de las cláusulas del presente contrato, o de la violación por
el mismo de cualquier ley o derecho de un tercero.
De la misma manera, el Usuario mantendrá indemne a DR CUOTAS, así como
también a sus funcionarios, directores, empleados, representantes, presentes o
futuros, de y contra todo daño y/o perjuicio, cualquiera fuese su naturaleza,
derivado u ocasionado, directa o indirectamente, por la utilización de los
Servicios ofrecidos en LA APLICACIÓN Y/O SITIO WEB, cuando se deriven o sean
ocasionados, directa o indirectamente, del incumplimiento del Usuario de
cualquiera de las cláusulas del presente contrato, o de la violación por el mismo
de cualquier ley o derecho de un tercero`,
          ],
        },
        {
          title: '1.7 Utilización bajo exclusiva responsabilidad:',
          content: [
            `1.7.1. El Usuario es consciente de y acepta voluntariamente que el uso de LA
APLICACIÓN Y/O SITIO WEB y de los Contenidos tiene lugar, en todo caso, bajo
su única y exclusiva responsabilidad.`,
            `1.7.2. El Usuario reconoce y acepta que es el único responsable de mantener la
confidencialidad de sus contraseñas asociadas a cualquiera de los Servicios a los
que accede a través de LA APLICACIÓN Y/O SITIO WEB. En consecuencia, acepta
que será el único responsable ante DR. CUOTAS de todas y cada una de las
actividades que se desarrollen mediante el acceso a LA APLICACIÓN Y/O SITIO
WEB a través de sus contraseñas`,
            `1.7.3. Asimismo, el Usuario se compromete a notificar de inmediato a DR. CUOTAS de
cualquier uso no autorizado de sus contraseñas de que tenga conocimiento`,
            `1.7.4. El Usuario comprende que dadas las condiciones de seguridad que ofrece hoy
Internet, debe tener presente que al divulgar información personal en línea, ya
sea al momento de suscribirse, contratar algún producto y/o servicio o utilizando
algún tipo de chat o comunicación virtual, la misma puede ser recogida o
utilizada por otros.`,
          ],
        },
        {
          title: '1.8 Consecuencias del incumplimiento:',
          content: [
            `1.8.1. Medidas disciplinarias: En caso de incumplimiento de estos Términos y
Condiciones, DR. CUOTAS podrá, a su exclusivo criterio y sin necesidad de
notificación previa:
`,
            `1.8.1.1. Suspender temporalmente o cancelar de manera definitiva la cuenta del
Usuario infractor.`,
            `1.8.1.2. Denegar el acceso futuro a la Plataforma y sus servicios.
`,
            `1.8.1.3. Informar a las autoridades competentes en caso de detectar actividad
ilegal`,
            `1.8.2. Derecho a Reclamar Daños y Perjuicios: El Usuario acepta que, en caso de
incurrir en actividades que generen perjuicios a DR. CUOTAS o a terceros, será
responsable por los daños y perjuicios ocasionados, incluyendo los costos
legales y honorarios profesionales que deriven de cualquier reclamación judicial
o extrajudicial.`,
            `1.8.3. Notificación y Derecho a Descargo: En caso de suspensión o cancelación de
una cuenta, DR. CUOTAS notificará al Usuario mediante el correo electrónico
registrado. El Usuario podrá presentar un descargo dentro de un plazo de 10
días hábiles, el cual será evaluado por DR. CUOTAS a fin de resolver si procede
la rehabilitación del acceso.`,
          ],
        },
        {
          title: '2. Límite de Responsabilidad y Exclusión de Garantías:',
          content: [
            `2.1. Rol de Dr. Cuotas y Exclusión de Responsabilidad`,
            `2.1.1. Intermediación comercial: DR. CUOTAS actúa exclusivamente como
intermediario en la promoción de cirugías estéticas, facilitando la conexión entre
los usuarios y los médicos prestadores del servicio. En ningún caso DR. CUOTAS
participa en la prestación del servicio médico ni en la ejecución de los
procedimientos contratados a través de la plataforma.`,
            `2.1.2. Independencia del Médico: El Usuario reconoce y acepta que los médicos que
ofrecen sus servicios a través de la plataforma operan de manera autónoma e
independiente, sin que exista una relación laboral, de sociedad, mandato o
dependencia con DR. CUOTAS. La calidad, seguridad y resultados del servicio
médico dependen exclusivamente del profesional contratado, quien asume la
total responsabilidad por su actuación.`,
            `2.1.3. Exclusión de Responsabilidad por la Prestación del Servicio Médico: DR.
CUOTAS no garantiza ni se responsabiliza por: a) la idoneidad, competencia,
habilitación o desempeño de los médicos; b) la seguridad, efectividad o
resultados de los procedimientos médicos; c) cualquier daño, perjuicio o lesión
derivada del acto médico, incluyendo pero sin limitarse a mala praxis, reacciones
adversas o complicaciones.`,
            `2.1.4. Obligación de Indemnidad del Médico: El médico prestador del servicio se
obliga a mantener indemne a DR. CUOTAS ante cualquier reclamo, demanda o
acción legal iniciada por pacientes o terceros, derivados de la prestación del
servicio médico. En caso de que DR. CUOTAS fuera condenado al pago de una
indemnización por hechos imputables al médico, este deberá reembolsar
íntegramente a DR. CUOTAS los montos abonados, incluyendo costos legales y
honorarios.
`,
          ],
        },
        {
          title: '3. LA APLICACIÓN Y/O SITIO WEB: ',
          content: [
            `3.1.1. Funcionamiento de LA APLICACIÓN Y/O SITIO WEB y los Servicios.`,
            `3.1.1.1. General.
`,
            `1.1.1. General.
3.1.1.1.1. DR CUOTAS contrata su acceso a Internet con un tercero proveedor
del mismo. Usted acepta y reconoce que LA APLICACIÓN Y/O SITIO
WEB puede no siempre estar disponible debido a dificultades
técnicas o fallas de Internet, del proveedor, o por cualquier otro
motivo ajeno a DR CUOTAS. En consecuencia, DR CUOTAS no
garantiza la disponibilidad y continuidad del funcionamiento de LA
APLICACIÓN Y/O SITIO WEB; como tampoco garantiza la utilidad de
LA APLICACIÓN Y/O SITIO WEB para la realización de ninguna
actividad en particular, ni su infalibilidad y, en particular, aunque no
de modo exclusivo, que los Usuarios puedan efectivamente utilizar
LA APLICACIÓN Y/O SITIO WEB y acceder a las distintas páginas
web que forman la misma.
`,
            `3.1.1.1.2. DR CUOTAS excluye cualquier responsabilidad por los daños y
perjuicios de toda naturaleza que sean originados en forma directa,
indirecta o remota, por la interrupción, suspensión, finalización,
falta de disponibilidad o de continuidad del funcionamiento de LA
APLICACIÓN Y/O SITIO WEB, por la defraudación de la utilidad que
los Usuarios hubieren podido atribuir a LA APLICACIÓN Y/O SITIO
WEB, a la falibilidad de LA APLICACIÓN Y/O SITIO WEB, y en
particular, aunque no de modo exclusivo, por los fallos en el acceso a
las distintas páginas web o a LA APLICACIÓN Y/O SITIO WEB.`,
            `3.1.1.1.3. Cabe destacar que cualquier información o gestión disponible a
través de LA APLICACIÓN Y/O SITIO WEB puede ser también
satisfecha en forma personal o telefónica a través de los números de
contacto de LA APLICACIÓN Y/O SITIO WEB. DR CUOTAS no se
responsabiliza por cualquier daño, perjuicio o pérdida en el equipo
del Usuario originado por fallas en el sistema, servidor o en Internet.`,
            `3.1.1.1.4. Modificación de las condiciones de uso: DR CUOTAS se reserva el
derecho de modificar las condiciones de uso y revocación en
cualquier momento, notificando previamente al Usuario por medios
electrónicos. Si el Usuario no está de acuerdo con los cambios, podrá
solicitar la baja de su cuenta sin penalidad alguna.
`,
            `3.1.1.1.5. Derecho de Admisión y permanencia: DR CUOTAS se reserva el
derecho de denegar el acceso a LA APLICACIÓN Y/O SITIO WEB a
cualquier persona que haya incumplido estos Términos y
Condiciones en el pasado, haya sido sancionada por malas prácticas
o represente un riesgo para la seguridad de LA APLICACIÓN Y/O
SITIO WEB y sus USUARIOS.
`,
            `3.1.1.2. CONTENIDOS
`,
            `3.1.1.2.1. El Usuario acepta y entiende que el uso y/o interpretación de la
información brindada en este sitio y las decisiones que se tomen en
razón de las mismas, son realizadas enteramente bajo su propio
riesgo. En consecuencia, queda expresamente aclarado que las
decisiones a que el Usuario arribe son producto de sus facultades
discrecionales.
`,
            `3.1.1.2.2. DR. CUOTAS puede en cualquier momento modificar las opiniones y
expresiones contenidas en el sitio sin previo aviso`,
            `3.1.1.2.3. La información contenida en la plataforma es de carácter
meramente informativo y no constituye asesoramiento
médico ni diagnóstico profesional. DR. CUOTAS no será
responsable por interpretaciones erróneas o decisiones
basadas en la información publicada.
`,
            `3.1.1.2.4. DR. CUOTAS NO SE RESPONSABILIZA BAJO NINGUNA
CIRCUNSTANCIA POR LA INTERPRETACIÓN Y/O POR LA
INCORRECTA INTERPRETACIÓN DE LO EXPRESADO EN EL SITIO EN
FORMA EXPLÍCITA O IMPLÍCITA, NI DE SU USO INDEBIDO, ASÍ
COMO TAMPOCO SERÁ RESPONSABLE POR LOS PERJUICIOS
DIRECTOS O INDIRECTOS CAUSADOS POR O A QUIENES FUERAN
INDUCIDOS A TOMAR U OMITIR DECISIONES O MEDIDAS, AL
CONSULTAR EL SITIO.
`,
            `3.1.1.2.5. DR. CUOTAS no asume responsabilidad de ninguna índole, si en
razón del acceso a LA APLICACIÓN Y/O SITIO WEB o por cualquier
transferencia de datos, el equipo del Usuario se viese afectado por
algún virus, o por la presencia de otros elementos en los contenidos
que puedan producir alteraciones en el sistema informático,
documentos electrónicos o ficheros de los Usuarios, siendo
responsabilidad del Usuario contar con los sistemas antivirus
adecuados para proteger su ordenador.`,
            `3.1.1.2.6. DR. CUOTAS no se responsabiliza por los daños y perjuicios de toda
naturaleza que puedan deberse a la transmisión, difusión,
almacenamiento, puesta a disposición, recepción, obtención o acceso
a los contenidos, y en particular, aunque no de modo exclusivo, por
los daños y perjuicios que puedan deberse a:`,
            `3.1.1.2.6.1. el incumplimiento de la ley, la moral y las buenas costumbres
generalmente aceptadas o el orden público como
consecuencia de la transmisión, difusión, almacenamiento,
puesta a disposición, recepción, obtención o acceso a los
contenidos;`,
            `3.1.1.2.6.2. la infracción de los derechos de propiedad intelectual e
industrial, de los secretos empresariales, de compromisos
contractuales de cualquier clase, de los derechos al honor, a la
intimidad personal y familiar y a la imagen de las personas, de
los derechos de propiedad y de toda otra naturaleza
pertenecientes a un tercero como consecuencia de la
transmisión, difusión, almacenamiento, puesta a disposición,
recepción, obtención o acceso a los contenidos;`,
            `3.1.1.2.6.3. la realización de actos de competencia desleal y publicidad
ilícita como consecuencia de la transmisión, difusión,
almacenamiento, puesta a disposición, recepción, obtención o
acceso a los contenidos;`,
            `3.1.1.2.6.4. la inadecuación para cualquier clase de propósito y la
defraudación de las expectativas generadas por los
contenidos;
`,
            `3.1.1.2.6.5. el incumplimiento, retraso en el cumplimiento, cumplimiento
defectuoso o terminación por cualquier causa de las
obligaciones contraídas por terceros y contratos realizados
con terceros a través de o con motivo del acceso a los
contenidos;`,
            `3.1.1.2.6.6. los vicios y defectos de toda clase de los contenidos
transmitidos, difundidos, almacenados, puestos a disposición o
de otra forma transmitidos o puestos a disposición, recibidos,
obtenidos o a los que se haya accedido a través del LA
APLICACIÓN Y/O SITIO WEB.
`,
            `3.1.1.2.7. Responsabilidad por los contenidos, productos y servicios
alojados fuera de LA APLICACIÓN Y/O SITIO WEB.`,
            `3.1.1.2.7.1. LA APLICACIÓN Y/O SITIO WEB, con el único objeto facilitarle
a los Usuarios la búsqueda de y acceso a la información
disponible en Internet, pone a disposición de los Usuarios
dispositivos técnicos de enlace, directorios, buscadores,
herramientas de búsqueda o cualquier otro tipo de
vinculación telemática. Esto permite a los Usuarios acceder a
sitios de Internet pertenecientes a y/o gestionados por
Terceros (en adelante los "Sitios Enlazados").
`,
            `3.1.1.2.7.2. DR. CUOTAS no ofrece ni comercializa por sí ni por medio de
terceros los productos y servicios disponibles en los Sitios
Enlazados.
El Usuario acepta y entiende que Internet contiene materiales
de todo tipo, editados y no editados, algunos de los cuales
pueden contener escenas de sexo explícito o pueden ser
ofensivos para con usted o su grupo familiar.`,
            `3.1.1.2.7.3. DR. CUOTAS no controla previamente, aprueba, vigila ni hace
propios los productos, y servicios, contenidos, información,
datos, archivos, productos y cualquier clase de material
existente en los Sitios Enlazados.
`,
            `3.1.1.2.7.4. En consecuencia, su acceso, o el de su grupo familiar, a estos
materiales es considerado a su exclusivo riesgo. El Usuario,
por tanto, debe extremar la prudencia en la valoración y
utilización de los servicios, información, datos, archivos,
productos y cualquier clase de material existente en los Sitios
Enlazados.
`,
            `3.1.1.2.7.5. DR. CUOTAS no asume ningún tipo de responsabilidad por los
daños y perjuicios de toda clase que puedan deberse a:
a) el funcionamiento, disponibilidad, accesibilidad o
continuidad de los sitios enlazados; b) el mantenimiento de los
servicios, información, datos, archivos, productos y cualquier
clase de material existente en los sitios enlazados; c) la
prestación o transmisión de los servicios, información, datos,
archivos, productos y cualquier clase de material existente en
los sitios enlazados; d) la calidad, licitud, fiabilidad y utilidad
de los servicios, información, datos, archivos, productos y
cualquier clase de material existente en los sitios enlazados, y
de los servicios prestados por terceros a través del LA
APLICACIÓN Y/O SITIO WEB.`,
            `3.1.1.3. Derecho de Revocación:`,
            `3.1.1.3.1. Facultades de DR. CUOTAS: DR CUOTAS se reserva el derecho de
suspender temporalmente o cancelar definitivamente la cuenta de
un Usuario en los siguientes casos: Incumplimiento de los
Términos y Condiciones o de cualquier normativa aplicable;
Falsificación de identidad o suministro de información incorrecta
o fraudulenta; Uso indebido de la Plataforma, incluyendo intentos
de hackeo, ataques a la seguridad o introducción de malware;
Incumplimiento de obligaciones de pago, cuando corresponda;
Uso de la cuenta para fines ilícitos o contrarios a la moral y
buenas costumbres; Conductas abusivas, fraudulentas o
difamatorias hacia otros usuarios, médicos o el equipo de DR.
CUOTAS; Reiteración de reclamos o quejas fundamentadas de
otros usuarios o médicos sobre conductas inapropiadas.`,
            `3.1.1.3.1.1. Procedimiento y Notificación: En caso de suspensión o
cancelación, DR. CUOTAS notificará al Usuario a través del
correo electrónico registrado, indicando las causas de la
medida. En casos graves o de riesgo para la seguridad de la
Plataforma, la cancelación podrá realizarse de manera
inmediata y sin previo aviso`,
            `3.1.1.3.1.2. Derecho a Descargo: El Usuario podrá presentar un
descargo dentro de un plazo de 10 días hábiles a partir de la
notificación, enviando su justificación a [correo de
contacto]. DR. CUOTAS analizará el caso y comunicará su
resolución en un plazo no mayor a 15 días hábiles.`,
            `3.1.1.3.1.3. Efectos de la Cancelación: Una vez cancelada la cuenta, el
Usuario perderá el acceso a la Plataforma y a todos los
servicios asociados. En caso de que existan pagos pendientes
o compromisos contractuales, DR. CUOTAS se reserva el
derecho de iniciar las acciones legales correspondientes para
su cobro.
`,
            `3.1.1.3.2. Revocación voluntaria por parte del usuario`,
            `3.1.1.3.2.1. Solicitud de baja: El Usuario podrá solicitar la cancelación
de su cuenta en cualquier momento, enviando una solicitud a
[correo de contacto] o mediante las opciones habilitadas en
la Plataforma.
`,
            `3.1.1.3.2.2. Efectos de la Revocación: la baja de la cuenta no afectará a
las obligaciones previamente adquiridas por el Usuario,
incluyendo pagos pendientes o cirugías en proceso de
contratación. DR. CUOTAS podrá conservar ciertos datos del
Usuario por el tiempo requerido por la normativa vigente,
especialmente en casos de obligaciones contractuales, fiscales
o de prevención de fraudes.`,
          ],
        },
      ],
    },
    {
      question: 'Sobre Términos y Condiciones',
      answer: [
        `A continuación se describen los Términos y Condiciones Generales (en adelante las "Condiciones Generales") aplicables a la utilización de los servicios y contenidos suministrados por el Sitio de Internet www.drcuotas.com (en adelante, la "LA APLICACIÓN Y/O SITIO WEB") que Dr. Cuotas S.A. (en adelante "DR. CUOTAS") pone a disposición de los Usuarios en general.
    
    Los presentes Términos y Condiciones Generales abarcan a las “CONDICIONES DE UTILIZACIÓN DE LA APLICACIÓN Y/O SITIO WEB” y a la “POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES”.
    
    La utilización de LA APLICACIÓN Y/O SITIO WEB implica la aceptación expresa, plena y sin reservas por parte del Usuario de todos y cada uno de los Términos y Condiciones Generales en la versión publicada por DR. CUOTAS en LA APLICACIÓN Y/O SITIO WEB en el momento en que el Usuario acceda al mismo.
    
    En consecuencia, el Usuario debe leer atentamente las Condiciones Generales previo a la utilización de LA APLICACIÓN Y/O SITIO WEB. Asimismo, la utilización de LA APLICACIÓN Y/O SITIO WEB se encuentra sometida a todos los avisos, reglamentos de uso e instrucciones puestos en conocimiento del Usuario por DR. CUOTAS, los que se integrarán a estas condiciones en cuanto estos no se opongan a ellos.
    
    DR. CUOTAS está constantemente innovando a fin de ofrecer el mejor servicio posible a sus Usuarios. Por el presente acuerdo, usted reconoce y acepta que el contenido y la naturaleza de los Servicios que proporciona DR. CUOTAS pueden variar ocasionalmente sin previo aviso.
    
    Como parte de esta permanente innovación, usted reconoce y acepta que DR. CUOTAS pueda suspender, ya sea de forma permanente o temporal, los Servicios, o alguna de las funciones incluidas en estos, para usted o para los Usuarios en general, a discreción de DR. CUOTAS y sin previo aviso. Usted podrá interrumpir el uso que haga de los Servicios en cualquier momento que lo desee. No es necesario que informe de ello a DR. CUOTAS.
    
    A fin de poder acceder a determinados Servicios, es posible que se le solicite información personal, por ejemplo, datos identificativos e información de contacto, como parte del proceso de registro en el Servicio o como parte del uso continuado de los Servicios. Usted se compromete a que cualquier información de registro que facilite a DR. CUOTAS será precisa, correcta y actual.
    
    Teniendo en cuenta que DR. CUOTAS puede modificar en cualquier momento estos términos y condiciones, le sugerimos consultarlos periódicamente.
    
    El presente acuerdo no podrá ser interpretado como un contrato de sociedad, mandato, agencia, o que genere ningún tipo de relación entre DR. CUOTAS y el Usuario. Si alguna de las condiciones que anteceden fuera declarada nula, dicha nulidad no afectará en modo alguno la validez o exigibilidad del resto de las condiciones previstas en este acuerdo.
    
    Este acuerdo no podrá ser enmendado o modificado por el Usuario, a excepción de que sea por medio de un documento escrito y firmado tanto por el Usuario como por el representante legal de DR. CUOTAS.
    
    Nuestra falta de acción con respecto a una violación del convenio por parte del Usuario u otros no afecta nuestro derecho actuar frente a una violación posterior o similar.
    
    Los acápites del presente acuerdo están puestos únicamente como referencia, y de ninguna manera definen, limitan, delimitan o describen el ámbito o la extensión de dicha sección.
    
    Toda notificación u otra comunicación que deba efectuarse bajo el presente, deberá realizarse por escrito: (i) al Usuario: al domicilio informado por el Usuario o a la cuenta de correo electrónico declarada; (ii) a DR. CUOTAS: a la casilla -------------@.com o a la calle ………………….., Piso ……… de la Ciudad de Corrientes.`,
      ],
    },
    {
      question: 'Sobre Politica de Privacidad',
      subsections: [
        {
          title: '4. Objetivo:',
          content: [
            `4.1. En DR. CUOTAS consideramos que la protección de los datos y la privacidad de las
personas es uno de los pilares que forman parte del desarrollo de sus actividades y de la
entrega de sus servicios. Es nuestra prioridad cuidar la información de socios,
proveedores, prestadores, colaboradores y otras terceras partes con las cuales nos
relacionamos y, para ello, trabajamos día a día buscando la mejora continua.`,
            `4.2. Dado que nuestra sede se encuentra en Argentina, cumplimos con el marco normativo
de este país: Ley 25.326, sus modificatorias y disposiciones complementarias. Además,
como prestamos servicios a terceros a quienes alcanzan otras normativas, establecemos
acuerdos que permiten definir nuestro compromiso con el cumplimiento de sus
requerimientos en materia de protección de datos personales.`,
            `4.3. En esta Política de Privacidad describimos los datos que gestionamos, las finalidades de
su tratamiento, los casos en los que compartimos datos con terceros, los derechos que
poseen los titulares de datos personales y cómo DR. CUOTAS protege dichos datos en
todo su ciclo de vida`,
          ],
        },
        {
          title: '5. Alcance:',
          content: [
            `Esta Política de Privacidad se aplica a todos los sitios web, aplicaciones móviles
disponibilizados y a los servicios en línea que DR. CUOTAS brinda`,
          ],
        },
        {
          title: '6. Recolección de datos personales:',
          content: [
            `6.1. En DR. CUOTAS recolectamos datos personales de socios con el objeto de prestar los
servicios con los que nos hemos comprometido. A modo ejemplificativo acopiamos:
Datos identificatorios (Nombre completo, DNI, datos biométricos, credenciales de
acceso, etc.); Datos de contacto (dirección postal, teléfonos, correo electrónico, etc.);
Datos de salud (consumos, enfermedades crónicas, condiciones particulares de salud,
etc.); Datos de pago (cuenta bancaria, tarjetas de crédito, cuenta corriente, CUIT, etc.).`,
            `6.2. Asimismo, recolectamos datos personales de nuestros proveedores y prestadores con el
objeto de cumplir con los contratos suscriptos. A modo ejemplificativo acopiamos: Datos
de contacto (dirección postal, teléfonos, correo electrónico, DNI, CUIT); Datos bancarios
e impositivos (cuenta bancaria, cuenta corriente, condiciones impositivas); Datos de
contratación (condiciones del servicio, valores de contratación)`,
            `6.3. Además podemos recolectar datos de contacto brindados por terceros para realizar un
acercamiento en respuesta a intereses manifestados por los mismos. Estos datos son
obtenidos de los titulares en cada caso, a través de nuestros sitios web, aplicaciones
móviles o redes sociales`,
            `6.4. Asimismo recolectamos datos durante la navegación de usuarios en nuestros sitios web,
mediante la utilización de cookies. En este caso los datos pueden ser: Información de los
dispositivos o computadoras desde los que el usuario accede al sitio, tipo o versión del
navegador o del sistema operativo y otras configuraciones; Dirección IP de internet
utilizada para conectarse a nuestros sitios web; Movimientos del usuario dentro de los
sitios web como por ejemplo accesos a información publicada, transacciones realizadas.`,
            `6.5. Datos Sensibles y Consentimiento Expreso: En los casos en que se requiera la
recolección de datos sensibles, tales como información médica o de salud, el Usuario
deberá otorgar su consentimiento expreso mediante la aceptación de una
autorización específica, conforme lo establecido en la Ley 25.326 de Protección de Datos
Personales de Argentina. El Usuario podrá revocar su consentimiento en cualquier
momento, sin efectos retroactivos, solicitando la eliminación de dichos datos, salvo en
los casos en que su conservación sea requerida por razones legales o contractuales.
`,
          ],
        },
        {
          title: '7. Uso de los datos personales:',
          content: [
            `El tratamiento que en DR. CUOTAS realizamos de los datos
personales tiene por objetivo en todos los casos brindar servicio a nuestros socios y
mejorarlo en el tiempo, para lo cual también gestionamos datos de prestadores y
proveedores quienes forman parte de la entrega de dicho servicio. En esta línea, utilizamos
los datos recolectados con las siguientes finalidades: Brindar servicio a los socios; Mejorar el
servicio al socio; Prevenir, detectar y tratar usos inapropiados del servicio o abusos del
mismo; Cumplir con obligaciones legales y contractuales; Prevenir, detectar y tratar
incidentes que pongan en riesgo la seguridad los datos y privacidad de los socios o terceros;
Otorgar beneficios adicionales a los socios.`,
            `7.1. Transferencia internacional de los datos personales: Algunas de las soluciones
tecnológicas que implementamos para brindar nuestro servicio se encuentran alojadas
en proveedores de nube. En estos casos es posible que los datos residan físicamente en
otros países. Cuando esto sucede nos ocupamos de garantizar la seguridad de los datos
mediante acuerdos contractuales y normas corporativas vinculantes que requieren el
cumplimiento de la presente política`,
            `7.2. Cesión de datos personales: En DR. CUOTAS no comercializamos datos personales de
ningún tipo, ni bajo ninguna circunstancia. A continuación, se detallan los terceros con
quienes podemos compartir, transferir o enviar datos a terceros y sus motivos:
Prestadores y proveedores: bajo acuerdos que garanticen la confidencialidad y
protección de los datos personales para brindar servicio a nuestros socios; Entidades
gubernamentales y Organismos de control: cuando sea requerido por ley o para el
cumplimiento de normativas regulatorias; Médicos y prestadores de servicio: para la
gestión de cirugías contratadas por los usuarios.
`,
            `7.3. Conservación de datos personales: Los datos personales serán conservados mientras
dure la relación contractual y durante el tiempo necesario para cumplir con
obligaciones legales y fiscales. Una vez finalizado este período, serán eliminados o
anonimizados de manera segura, salvo en los casos en que su conservación sea
necesaria para la defensa de derechos o cumplimiento de normativas.
`,
          ],
        },
        {
          title: '8. Derechos del titular de los datos personales: ',
          content: [
            `En cumplimiento de lo establecido por la
Ley 25.326 disponibilizamos a los titulares de datos personales la posibilidad de ejercer sus
derechos mediante procedimientos establecidos. De esta forma el titular puede solicitar:
Información al organismo de control relativa a la existencia de archivos, registros, bases o
bancos de datos personales, sus finalidades y la identidad de sus responsables; El acceso a la
información: lo cual permite al titular conocer qué información posee DR. CUOTAS de él; La
rectificación de la información: lo cual permite al titular corregir ciertos datos que DR.
CUOTAS posee de él en caso que los mismos no fuesen íntegros o adecuados; La actualización
de la información: lo cual permite al titular modificar ciertos datos que DR. CUOTAS posee de
él en caso que los mismos se encontrasen desactualizados; La supresión de datos: lo cual
posibilita la eliminación por parte de DR. CUOTAS de aquellos datos que el titular indique.`,
            `8.1. Cabe aclarar que no procederemos a la supresión de los datos cuando: Pudiese causar
un perjuicio al interés legítimo del titular o terceros; Cuando hubiese una relación
contractual vigente para cuyo desarrollo y gestión se precisen los datos; Cuando sea
preciso su mantenimiento para gestionar intereses legítimos de cobro o de gestión de
DR. CUOTAS; Cuando por imposición de la legislación vigente exista obligación de
conservar los datos.`,
          ],
        },
        {
          title: '9. Protección de los datos personales:',
          content: [
            `En DR. CUOTAS implementamos diferentes medidas
de seguridad, tecnológicas y de procesos, para proteger los datos personales que gestiona.
Las mismas tienen por objeto proteger la confidencialidad, integridad y disponibilidad de los
datos, de manera que sólo sean accedidos o modificadas por las personas autorizadas y se
encuentren disponibles en tiempo y forma cuando sean requeridos. Algunos de los controles
implementados son los siguientes:`,
            `9.1. Practicamos la privacidad y seguridad por diseño, es decir que consideramos los
requisitos desde el primer momento en que se comienza un proyecto o mejora de
procesos y/o sistemas.
`,
            `9.2. Evaluamos los riesgos de los cambios o innovaciones en el tratamiento de datos con el
objeto de mitigarlos hasta niveles aceptables`,
            `9.3. Implementamos el criterio de “necesidad de saber” a la hora de asignar permisos de
acceso/modificación/eliminación de datos, es decir que sólo se otorgan permisos a
quienes lo requieren para el cumplimiento de sus funciones`,
            `9.4. Realizamos concientización y capacitación interna en materia de protección de datos
y privacidad.`,
            `9.5. Implementamos controles de acceso a los sistemas y los datos donde éstos se
encuentren de acuerdo a su criticidad, incluyendo políticas de contraseñas, múltiples
factores de autenticación, esquemas de autorización, entre otros.`,
            `9.6. Ciframos los datos en reposo y en tránsito con el objeto de que no sean inteligibles por
terceros no autorizados.`,
            `9.7. No utilizamos datos reales en ambientes no productivos como por ejemplo ambientes
de prueba`,
            `9.8. Implementamos controles de detección y prevención de fuga de datos de acuerdo a
políticas establecidas.
`,
            `9.9. Resguardamos los datos con copias de seguridad adecuadamente protegidas`,
            `9.10. Implementamos controles de acceso físico a los datos en los centros de procesamiento
y oficinas`,
            `9.11. Contamos con un proceso de gestión de incidentes de seguridad, dar respuesta rápida
a los mismos y proceder a su remediación minimizando efectos adversos. Dicha
gestión contempla la información a terceros afectados en caso de compromiso de sus
datos.`,
          ],
        },
        {
          title: '9.12. Datos del responsable de tratamiento de datos:',
          content: [
            `DR. CUOTAS con domicilio en
calle …………………………………….., es responsable de las bases de datos que gestiona.
Cualquier consulta o contacto relacionado con esta materia podrá efectuarse a
------------------------@------------.com.ar`,
          ],
        },
        {
          title:
            '10. Modificaciones a la política de privacidad y protección de datos personales',
          content: [
            `DR.
CUOTAS podrá actualizar esta política para reflejar cambios normativos o mejoras en sus
prácticas de seguridad. En caso de modificaciones sustanciales, se notificará a los usuarios a
través de la plataforma y se requerirá su aceptación para continuar con el uso del servicio.`,
          ],
        },
      ],
    },
    {
      question: 'Sobre Disposciones Comunes',
      subsections: [
        {
          title: '11. Jurisdicción y Derecho Aplicable',
          content: [
            `Las presentes Condiciones Generales se regirán por las
leyes de la República Argentina. Las partes acuerdan que cualquier disputa o reclamo que
surja de o con relación a, o en conexión con la ejecución o cumplimiento de este Acuerdo,
incluyendo sin limitación, cualquier disputa sobre la validez, interpretación, exigibilidad o
incumplimiento de este Acuerdo, y/o cualquier disputa sobre las operaciones comerciales
que realicen los Usuarios a través de los sitios, será exclusiva y finalmente resueltas por la
Justicia Nacional Ordinaria en lo Comercial de la Ciudad de Corrientes de la República
Argentina.`,
          ],
        },
        {
          title: '12. Propiedad Intelectual: ',
          content: [
            `Todos los contenidos de este sitio, incluyendo, sin carácter
limitativo, los textos (incluyendo los comentarios, disertaciones, exposiciones y
reproducciones), gráficos, logos, iconos, imágenes, archivos de audio y video, software y
todas y cada una de las características que se encuentran en LA APLICACIÓN Y/O SITIO WEB
son propiedad exclusiva de DR. CUOTAS y/o de sus proveedores de Contenidos, y los mismos
están protegidos por las leyes internacionales de propiedad intelectual. Las mejoras y/o
modificaciones de los Contenidos del LA APLICACIÓN Y/O SITIO WEB son propiedad
exclusiva de DR. CUOTAS. Todo el software utilizado en este Sitio es propiedad de DR.
CUOTAS y/o de sus proveedores de software. Su uso indebido, así como su reproducción
serán objeto de las acciones judiciales que correspondan.`,
            `La utilización de los servicios brindados por DR. CUOTAS no podrá, en ningún supuesto, ser
interpretada como una autorización y/o concesión de licencia de los derechos intelectuales
de DR. CUOTAS y/o de un tercero.`,
            `Los Contenidos y el software de LA APLICACIÓN Y/O SITIO WEB pueden ser utilizados como
una herramienta de compra y/o comunicación, o una fuente de información. Cualquier otro
uso, incluyendo la reproducción, modificación, distribución y/o transmisión, ya sea total o
parcial, de los Contenidos de LA APLICACIÓN Y/O SITIO WEB está estrictamente prohibido,
sin la expresa autorización de DR. CUOTAS.
`,
            `DR. CUOTAS es una marca registradas de Andrés Aníbal Argiel en Argentina. Los gráficos,
logos y nombres que identifican los Contenidos y los Servicios también son marcas
registradas de Andres Aníbal Argiel. Estas marcas registradas no pueden ser usadas en
conexión con productos o servicios que no pertenezcan a DR. CUOTAS, en cualquier forma
que pueda causar confusión entre los Usuarios y/o que desacredite a ORGANIZACIÓN DE
SERVICIOS DIRECTOS EMPRESARIOS`,
            `Todos los textos imágenes, diseños, compilaciones y cualquier tipo de material que aparezca
en este sitio web están registrados © 2025 por DR. CUOTAS S.A.. Todos los derechos
reservados. Prohibida la duplicación, distribución o almacenamiento en cualquier medio.
Este Sitio (o cualquier porción de este Sitio) no puede ser reproducido, duplicado, copiado,
vendido, revendido o explotado con otros fines distintos de aquellos expresamente permitidos
por DR. CUOTAS S.A. All rights reserved. Do not duplicate, distribute, or store in any form.`,
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="w-full h-80 lg:h-screen flex flex-col justify-center items-center p-4 sm:p-8 ">

        <div className="w-full h-full flex flex-col justify-start">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col justify-center "
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-drcuotasTertiary-text font-bold text-xs lg:text-base uppercase leading-tight tracking-tight">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-drcuotasTertiary-text text-[10px] lg:text-xs z-40 p-4">
                  {faq.subsections ? (
                    <ul className="space-y-2">
                      {faq.subsections.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem
                              value={`sub-item-${index}-${subIdx}`}
                            >
                              <AccordionTrigger className="text-drcuotasTertiary-text font-semibold text-xs lg:text-sm">
                                {sub.title}
                              </AccordionTrigger>
                              <AccordionContent className="text-drcuotasTertiary-text text-[10px] lg:text-xs p-4">
                                {Array.isArray(sub.content) ? (
                                  <span className="list-disc list-inside space-y-1 flex flex-col gap-4">
                                    {sub.content.map((paragraph, i) => (
                                      <p key={i}>{paragraph}</p>
                                    ))}
                                  </span>
                                ) : (
                                  <p>{sub.content}</p>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside">
                      {faq.answer.map((answer, idx) => (
                        <li key={idx}>{answer}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="w-full hidden lg:flex flex-row gap-2 justify-center items-center">
          <a
            href="/Dr_Cuotas.pdf"
            download
            className="h-20 w-80 bg-drcuotasPrimary-bg text-white rounded-xl hover:bg-blue-700 transition flex justify-center items-center"
          >
            <p className="text-sm font-black text-white uppercase leading-tight tracking-tight">
              Descargar Informacion
            </p>
          </a>
          <a
            href="/Dr_Cuotas.pdf"
            download
            className="h-20 w-80 bg-white border-2 border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl hover:bg-blue-700 transition flex justify-center items-center"
          >
            <p className="text-sm font-black uppercase leading-tight tracking-tight">
              Descargar PDF
            </p>
          </a>
        </div>


      </div>
    </>
  );
}
