import React, { useState, useEffect } from 'react';
import { Search, BookOpen, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

// ==================== DATA: 40 RECOMENDACIONES GAFI COMPLETAS ====================
const recomendaciones = [
  { num: 1, nombre: "Evaluación de riesgos y enfoque basado en riesgo", categoria: "A", catNombre: "Políticas y coordinación ALA/CFT", descripcion: "Los países deben identificar, evaluar y entender los riesgos de lavado de activos y financiamiento del terrorismo que enfrentan, y tomar medidas, incluyendo la designación de una autoridad o mecanismo para coordinar acciones de evaluación de riesgos, y aplicar recursos encaminados a asegurar que se mitiguen eficazmente los riesgos." },
  { num: 2, nombre: "Cooperación y coordinación nacional", categoria: "A", catNombre: "Políticas y coordinación ALA/CFT", descripcion: "Los países deben contar con políticas ALA/CFT a nivel nacional, que tomen en cuenta los riesgos identificados, las cuales deben ser revisadas periódicamente, y deben designar a una autoridad o contar con un mecanismo de coordinación o de otro tipo que sea responsable de dichas políticas." },
  { num: 3, nombre: "Delito de lavado de activos", categoria: "B", catNombre: "Lavado de activos y decomiso", descripcion: "Los países deben tipificar el lavado de activos en base a la Convención de Viena y la Convención de Palermo. Los países deben aplicar el delito de lavado de activos a todos los delitos graves, con la finalidad de incluir la mayor gama posible de delitos determinantes." },
  { num: 4, nombre: "Decomiso y medidas provisionales", categoria: "B", catNombre: "Lavado de activos y decomiso", descripcion: "Los países deben adoptar medidas similares a las establecidas en la Convención de Viena, la Convención de Palermo y el Convenio Internacional para la Represión del Financiamiento del Terrorismo, incluyendo medidas legislativas, que permitan a sus autoridades competentes congelar o incautar y decomisar bienes lavados, producto del LA o delitos determinantes o FT o instrumentos utilizados o destinados al uso en la comisión de estos delitos." },
  { num: 5, nombre: "Delito de financiamiento del terrorismo", categoria: "C", catNombre: "Financiamiento del terrorismo y proliferación", descripcion: "Los países deben tipificar el financiamiento del terrorismo en base al Convenio Internacional para la Represión del Financiamiento del Terrorismo, y deben tipificar no solo el financiamiento de actos terroristas sino también el financiamiento de organizaciones terroristas y terroristas individuales aún en ausencia de un vínculo con un acto o actos terroristas específicos." },
  { num: 6, nombre: "Sanciones financieras dirigidas relacionadas con el terrorismo y el FT", categoria: "C", catNombre: "Financiamiento del terrorismo y proliferación", descripcion: "Los países deben implementar regímenes de sanciones financieras dirigidas para cumplir con las Resoluciones del Consejo de Seguridad de las Naciones Unidas relativas a la prevención y represión del terrorismo y el financiamiento del terrorismo. Las Resoluciones exigen que los países congelen sin demora los fondos u otros activos de, y aseguren que ningún fondo u otros activos se pongan a disposición, directa o indirectamente, de o para beneficio de cualquier persona o entidad designada." },
  { num: 7, nombre: "Sanciones financieras dirigidas relacionadas con la proliferación", categoria: "C", catNombre: "Financiamiento del terrorismo y proliferación", descripcion: "Los países deben implementar sanciones financieras dirigidas para cumplir con las Resoluciones del Consejo de Seguridad de las Naciones Unidas relativas a la prevención, represión e interrupción de la proliferación de armas de destrucción masiva y su financiamiento." },
  { num: 8, nombre: "Organizaciones sin fines de lucro", categoria: "C", catNombre: "Financiamiento del terrorismo y proliferación", descripcion: "Los países deben revisar la idoneidad de las leyes y regulaciones relativas a las organizaciones sin fines de lucro (OSFL) que el país ha identificado como vulnerables al abuso para el financiamiento del terrorismo. Los países deben aplicar medidas focalizadas y proporcionales, en línea con el enfoque basado en riesgo, a dichas OSFL para protegerlas del abuso para financiamiento del terrorismo." },
  { num: 9, nombre: "Leyes de secreto de las instituciones financieras", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los países deben asegurar que las leyes de secreto de las instituciones financieras no impidan la implementación de las Recomendaciones del GAFI." },
  { num: 10, nombre: "Debida diligencia del cliente", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Debe prohibirse a las instituciones financieras que mantengan cuentas anónimas o cuentas con nombres obviamente ficticios. Debe exigirse a las instituciones financieras que emprendan medidas de Debida Diligencia del Cliente (DDC) cuando: establezcan relaciones comerciales; realicen transacciones ocasionales; exista una sospecha de LA/FT; o la institución financiera tenga dudas sobre la veracidad o idoneidad de los datos de identificación del cliente obtenidos previamente." },
  { num: 11, nombre: "Mantenimiento de registros", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Debe exigirse a las instituciones financieras que mantengan, por un período de al menos cinco años, todos los registros necesarios sobre las transacciones, tanto locales como internacionales, para que éstas les permitan cumplir con rapidez con las peticiones de información solicitada por las autoridades competentes. Estos registros deben ser suficientes para permitir la reconstrucción de transacciones individuales de manera tal que se proporcione, de ser necesario, evidencia para el enjuiciamiento de una actividad criminal." },
  { num: 12, nombre: "Personas Expuestas Políticamente", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Debe exigirse a las instituciones financieras que, con respecto a las Personas Expuestas Políticamente (PEPs) extranjeras (ya sea un cliente o beneficiario final), además de ejecutar medidas normales de debida diligencia del cliente, cuenten con sistemas apropiados de gestión de riesgo para determinar si el cliente o el beneficiario final es una PEP; obtener la aprobación de la alta gerencia; tomar medidas razonables para establecer la fuente de la riqueza y la fuente de los fondos; y llevar a cabo un monitoreo continuo intensificado de la relación comercial." },
  { num: 13, nombre: "Banca corresponsal", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Con respecto a la banca corresponsal transfronteriza y otras relaciones similares, debe exigirse a las instituciones financieras que, además de ejecutar medidas normales de debida diligencia del cliente, reúnan información suficiente sobre la institución representada, evalúen los controles ALA/CFT de la institución representada, obtengan la aprobación de la alta gerencia, y documenten las responsabilidades respectivas de cada institución." },
  { num: 14, nombre: "Servicios de transferencia de dinero o valores", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los países deben tomar medidas para asegurar que las personas naturales o jurídicas que prestan servicios de transferencia de dinero o valores (STDV) tengan licencia o estén registradas, y sujetas a sistemas eficaces para el monitoreo y para asegurar el cumplimiento con los requisitos nacionales para combatir el LA/FT." },
  { num: 15, nombre: "Nuevas tecnologías", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los países y las instituciones financieras deben identificar y evaluar los riesgos de lavado de activos o financiamiento del terrorismo que pudieran surgir con respecto a (a) el desarrollo de nuevos productos y nuevas prácticas comerciales, incluyendo nuevos mecanismos de envío, y (b) el uso de nuevas tecnologías o tecnologías en desarrollo para productos tanto nuevos como los existentes. Esta evaluación de riesgo debe realizarse antes del lanzamiento de los nuevos productos, prácticas comerciales o el uso de tecnologías nuevas o en desarrollo." },
  { num: 16, nombre: "Transferencias electrónicas", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los países deben asegurar que las instituciones financieras incluyan la información sobre el ordenante que se requiere, y la información requerida del beneficiario, en las transferencias electrónicas y mensajes relacionados, y que la información permanezca con la transferencia electrónica o mensaje relacionado a lo largo de toda la cadena de pago." },
  { num: 17, nombre: "Dependencia en terceros", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los países pueden permitir a las instituciones financieras que dependan de terceros para llevar a cabo los elementos (a)-(c) del proceso de DDC o para presentar negocios, siempre que se cumplan los criterios establecidos. Cuando dicha dependencia es permitida, la responsabilidad última por las medidas de DDC permanece en la institución financiera que depende del tercero." },
  { num: 18, nombre: "Controles internos y sucursales y filiales extranjeras", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Debe exigirse a las instituciones financieras que implementen programas contra el LA/FT. Los grupos financieros deben implementar a nivel de todo el grupo programas contra el LA/FT, incluyendo políticas y procedimientos para intercambiar información dentro del grupo para propósitos ALA/CFT. Las instituciones financieras deben asegurarse de que sus sucursales y filiales de participación mayoritaria en el extranjero apliquen medidas ALA/CFT consistentes con los requisitos del país de origen." },
  { num: 19, nombre: "Países de mayor riesgo", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Debe exigirse a las instituciones financieras que apliquen medidas de debida diligencia intensificada a las relaciones comerciales y transacciones con personas naturales y jurídicas, e instituciones financieras, de países para los cuales el GAFI hace un llamado en este sentido. El tipo de medidas de debida diligencia intensificada aplicadas debe ser eficaz y proporcional a los riesgos." },
  { num: 20, nombre: "Reporte de operaciones sospechosas", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Si una institución financiera sospecha o tiene motivos razonables para sospechar que los fondos son producto de una actividad criminal, o están relacionados al financiamiento del terrorismo, a ésta se le debe exigir, por ley, que reporte con prontitud sus sospechas a la Unidad de Inteligencia Financiera (UIF)." },
  { num: 21, nombre: "Revelación (tipping-off) y confidencialidad", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Las instituciones financieras, sus directores, funcionarios y empleados deben: estar protegidos por la ley frente a la responsabilidad penal y civil por violación de cualquier restricción sobre la revelación de información impuesta mediante contrato o mediante cualquier disposición legislativa, reglamentaria o administrativa, si éstos reportan sus sospechas de buena fe a la UIF. Debe prohibirse a las instituciones financieras, sus directores, funcionarios y empleados, por ley, que revelen (tipping-off) el hecho de que se está presentando un ROS o información relacionada a la UIF." },
  { num: 22, nombre: "APNFD: Debida diligencia del cliente", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los requisitos de debida diligencia del cliente y mantenimiento de registros establecidos en las Recomendaciones 10, 11, 12, 15 y 17 se aplican a las Actividades y Profesiones No Financieras Designadas (APNFD) en las situaciones específicas establecidas para cada categoría." },
  { num: 23, nombre: "APNFD: Otras medidas", categoria: "D", catNombre: "Medidas preventivas", descripcion: "Los requisitos establecidos en las Recomendaciones 18 a 21 se aplican a todas las Actividades y Profesiones No Financieras Designadas, sujeto a las siguientes calificaciones según la categoría de APNFD." },
  { num: 24, nombre: "Transparencia y beneficiario final de las personas jurídicas", categoria: "E", catNombre: "Transparencia y beneficiario final", descripcion: "Los países deben tomar medidas para prevenir el uso indebido de las personas jurídicas para el lavado de activos o el financiamiento del terrorismo. Los países deben asegurar que exista información adecuada, precisa y oportuna sobre el beneficiario final y el control de las personas jurídicas, que las autoridades competentes puedan obtener o a la que puedan tener acceso oportunamente." },
  { num: 25, nombre: "Transparencia y beneficiario final de otras estructuras jurídicas", categoria: "E", catNombre: "Transparencia y beneficiario final", descripcion: "Los países deben tomar medidas para prevenir el uso indebido de otras estructuras jurídicas para el lavado de activos o el financiamiento del terrorismo. En particular, los países deben asegurar que exista información adecuada, precisa y oportuna sobre los fideicomisos expresos, incluyendo información sobre el fideicomitente, fiduciario y beneficiarios." },
  { num: 26, nombre: "Regulación y supervisión de las instituciones financieras", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los países deben asegurar que las instituciones financieras estén sujetas a una regulación y supervisión adecuadas y que implementen eficazmente las Recomendaciones del GAFI. Las autoridades competentes o los supervisores financieros deben tomar las medidas legales o reglamentarias necesarias para impedir que los delincuentes o sus asociados mantengan, o sean el beneficiario final de, una participación significativa o mayoritaria, o que ocupen una función gerencial en una institución financiera." },
  { num: 27, nombre: "Facultades de los supervisores", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los supervisores deben contar con facultades adecuadas para supervisar o monitorear las instituciones financieras y asegurar su cumplimiento con los requisitos para combatir el lavado de activos y el financiamiento del terrorismo, incluyendo la autoridad para realizar inspecciones. Los supervisores deben estar autorizados para exigir a las instituciones financieras la producción de cualquier información que sea pertinente para el monitoreo de dicho cumplimiento, e imponer sanciones en línea con la Recomendación 35." },
  { num: 28, nombre: "Regulación y supervisión de las APNFD", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Las Actividades y Profesiones No Financieras Designadas deben estar sujetas a medidas de regulación y supervisión según se establece a continuación. Los casinos deben estar sujetos a un régimen regulatorio y de supervisión integral. Los países deben asegurar que las otras categorías de APNFD estén sujetas a sistemas eficaces para monitorear y asegurar su cumplimiento con los requisitos ALA/CFT." },
  { num: 29, nombre: "Unidades de Inteligencia Financiera", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los países deben establecer una Unidad de Inteligencia Financiera (UIF) que sirva como un centro nacional para la recepción y análisis de: (a) reportes de transacciones sospechosas; y (b) otra información relevante al lavado de activos, delitos determinantes asociados y el financiamiento del terrorismo, y para la comunicación de los resultados de ese análisis. La UIF debe ser capaz de obtener información adicional de los sujetos obligados y debe tener acceso oportuno a la información financiera, administrativa y del orden público que requiera para desempeñar sus funciones apropiadamente." },
  { num: 30, nombre: "Responsabilidades de las autoridades del orden público e investigativas", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los países deben asegurar que las autoridades del orden público designadas tengan responsabilidad para las investigaciones del lavado de activos y el financiamiento del terrorismo dentro del marco de las políticas nacionales ALA/CFT." },
  { num: 31, nombre: "Facultades de las autoridades del orden público e investigativas", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Cuando se llevan a cabo investigaciones de lavado de activos y delitos determinantes asociados, y de financiamiento del terrorismo, debe haber facultades disponibles para que las autoridades competentes puedan obtener acceso a todos los documentos e información necesarios para utilizarlos en esas investigaciones, así como en los enjuiciamientos y acciones relacionadas." },
  { num: 32, nombre: "Transporte de efectivo", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los países deben contar con medidas establecidas para detectar el transporte físico transfronterizo de efectivo e instrumentos negociables al portador, incluyendo a través de un sistema de declaración y/o revelación." },
  { num: 33, nombre: "Estadísticas", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los países deben mantener estadísticas integrales sobre los asuntos relevantes a la eficacia y eficiencia de sus sistemas ALA/CFT. Estas deben incluir estadísticas sobre los ROS recibidos y comunicados; sobre investigaciones, procesamientos y condenas por LA/FT; sobre bienes congelados, incautados y decomisados; y sobre asistencia legal mutua u otras peticiones internacionales para cooperación." },
  { num: 34, nombre: "Guía y retroalimentación", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Las autoridades competentes, los supervisores y los OAR deben establecer directrices y proporcionar retroalimentación que ayude a las instituciones financieras y Actividades y Profesiones No Financieras Designadas en la aplicación de las medidas nacionales para combatir el lavado de activos y el financiamiento del terrorismo, y en particular, en la detección y reporte de transacciones sospechosas." },
  { num: 35, nombre: "Sanciones", categoria: "F", catNombre: "Facultades de autoridades competentes", descripcion: "Los países deben asegurar que exista una gama de sanciones eficaces, proporcionales y disuasivas, sean penales, civiles o administrativas, disponibles para tratar a las personas naturales o jurídicas cubiertas por las Recomendaciones 6 y 8 a 23, que no cumplan con los requisitos ALA/CFT." },
  { num: 36, nombre: "Instrumentos internacionales", categoria: "G", catNombre: "Cooperación internacional", descripcion: "Los países deben tomar medidas inmediatas para convertirse en parte de, e implementar plenamente, la Convención de Viena, 1988; la Convención de Palermo, 2000; el Convenio Internacional para la Represión del Financiamiento del Terrorismo de las Naciones Unidas, 1999; y la Convención de Mérida, 2003." },
  { num: 37, nombre: "Asistencia legal mutua", categoria: "G", catNombre: "Cooperación internacional", descripcion: "Los países deben prestar, rápidamente, la gama más amplia posible de asistencia legal mutua en relación a investigaciones, procedimientos judiciales y procesos relacionados con el lavado de activos, delitos determinantes asociados y el financiamiento del terrorismo." },
  { num: 38, nombre: "Asistencia legal mutua: congelamiento y decomiso", categoria: "G", catNombre: "Cooperación internacional", descripcion: "Los países deben asegurar que tengan la autoridad para tomar medidas rápidas en respuesta a solicitudes de países extranjeros para identificar, congelar, incautar y decomisar bienes lavados; producto del lavado de activos, delitos determinantes y financiamiento del terrorismo; instrumentos usados en la comisión de dichos delitos o instrumentos que se pretende usar." },
  { num: 39, nombre: "Extradición", categoria: "G", catNombre: "Cooperación internacional", descripcion: "Los países deben ejecutar constructivamente y, de ser posible, sin demoras indebidas las peticiones de extradición relacionadas con el lavado de activos y el financiamiento del terrorismo. Los países también deben tomar todas las medidas posibles para asegurar que no se proporcionen refugios seguros a los individuos acusados de financiamiento del terrorismo, actos terroristas u organizaciones terroristas." },
  { num: 40, nombre: "Otras formas de cooperación internacional", categoria: "G", catNombre: "Cooperación internacional", descripcion: "Los países deben asegurar que sus autoridades competentes puedan prestar, rápidamente, la gama más amplia de cooperación internacional en relación con el lavado de activos, delitos determinantes asociados y el financiamiento del terrorismo." },
];

const categorias = [
  { letra: "A", nombre: "Políticas y coordinación ALA/CFT", color: "#a663cc", rango: "R.1-2", icon: "📋" },
  { letra: "B", nombre: "Lavado de activos y decomiso", color: "#ff8361", rango: "R.3-4", icon: "💰" },
  { letra: "C", nombre: "Financiamiento del terrorismo y proliferación", color: "#e84855", rango: "R.5-8", icon: "🎯" },
  { letra: "D", nombre: "Medidas preventivas", color: "#87d895", rango: "R.9-23", icon: "🛡️" },
  { letra: "E", nombre: "Transparencia y beneficiario final", color: "#4ecdc4", rango: "R.24-25", icon: "🔍" },
  { letra: "F", nombre: "Facultades de autoridades competentes", color: "#ffe66d", rango: "R.26-35", icon: "⚖️" },
  { letra: "G", nombre: "Cooperación internacional", color: "#95e1d3", rango: "R.36-40", icon: "🌍" },
];

// Casos para Detective GAFI - MÁS DIFÍCILES Y SUTILES
const casosDetective = [
  // Casos sutiles donde varias R podrían aplicar
  { caso: "Un banco detectó que un cliente depositó $150,000 USD en efectivo en 3 días, fraccionando los montos. El oficial de cumplimiento documentó la situación pero decidió esperar a ver si continuaba el patrón antes de reportar.", respuesta: 20, explicacion: "La R.20 exige reportar con prontitud cuando existan sospechas. Esperar a 'confirmar' el patrón viola la obligación de reporte oportuno." },
  { caso: "Una SOFIPO realizó DDC completa a un nuevo cliente que resultó ser sobrino de un diputado federal. Sin embargo, no aplicó medidas adicionales porque consideró que 'sobrino' no es un vínculo directo.", respuesta: 12, explicacion: "La R.12 sobre PEPs incluye a familiares cercanos y asociados. El sobrino de un diputado requiere debida diligencia reforzada." },
  { caso: "Un banco mexicano estableció relación de corresponsalía con un banco de Belice. Verificó su licencia bancaria y revisó su sitio web, pero no evaluó sus controles ALA/CFT ni obtuvo aprobación de la alta gerencia.", respuesta: 13, explicacion: "La R.13 requiere evaluar específicamente los controles ALA/CFT del banco respondedor y obtener aprobación de alta gerencia para banca corresponsal." },
  { caso: "Una fintech lanzó un servicio de pagos P2P vinculado a criptoactivos. El equipo de compliance revisó los riesgos, pero lo hizo 2 meses después del lanzamiento porque estaban ocupados con auditoría.", respuesta: 15, explicacion: "La R.15 exige que la evaluación de riesgos de nuevas tecnologías se realice ANTES del lanzamiento, no después." },
  { caso: "Un centro cambiario mantiene sus expedientes de clientes por 4 años después de cerrada la cuenta, argumentando que su sistema solo permite ese período de almacenamiento.", respuesta: 11, explicacion: "La R.11 establece un mínimo de 5 años de conservación de registros. Las limitaciones técnicas no son excusa para incumplir." },
  { caso: "La UIF del país depende directamente del Ministerio de Hacienda para su presupuesto y para autorizar cualquier comunicación de inteligencia a otras autoridades.", respuesta: 29, explicacion: "La R.29 requiere que las UIFs tengan autonomía operativa. Depender de autorización ministerial para comunicar información vulnera esta independencia." },
  { caso: "Un banco multinacional tiene políticas ALA/CFT corporativas, pero permite que su filial en un país con regulación débil aplique estándares locales menos estrictos.", respuesta: 18, explicacion: "La R.18 exige que las filiales extranjeras apliquen medidas ALA/CFT consistentes con el país de origen cuando los estándares locales son menores." },
  { caso: "Una institución aplicó DDC simplificada a todas las transferencias electrónicas internacionales menores a $1,000 USD, sin incluir información completa del ordenante.", respuesta: 16, explicacion: "La R.16 sobre transferencias electrónicas exige información completa del ordenante sin importar el monto en transferencias transfronterizas." },
  { caso: "El área de compliance de un banco reportó una operación sospechosa. Tres días después, el gerente de la sucursal llamó al cliente para 'verificar datos' y mencionó que habían detectado 'irregularidades' en su cuenta.", respuesta: 21, explicacion: "La R.21 prohíbe el tipping-off. Alertar al cliente sobre irregularidades después de un reporte constituye revelación indebida." },
  { caso: "Un notario formalizó la compraventa de un inmueble de $15 millones. Verificó identidades pero no indagó sobre el origen de los fondos porque 'el comprador es un empresario conocido'.", respuesta: 22, explicacion: "La R.22 exige que las APNFD (incluidos notarios) realicen DDC completa sin excepciones por reputación. El origen de fondos debe verificarse." },
  { caso: "El país tiene tipificado el lavado de activos pero solo aplica cuando el delito precedente es narcotráfico, fraude o secuestro.", respuesta: 3, explicacion: "La R.3 exige que el LA aplique a TODOS los delitos graves, no solo a una lista limitada de delitos determinantes." },
  { caso: "Las autoridades congelaron fondos de una persona designada por la ONU por terrorismo, pero lo hicieron 45 días después de la designación mientras 'verificaban' la información.", respuesta: 6, explicacion: "La R.6 exige congelar 'sin demora' (idealmente 24-48 horas). 45 días viola claramente el requisito de inmediatez." },
  { caso: "Un país tiene registro mercantil actualizado de todas las sociedades, pero no existe obligación de identificar a los beneficiarios finales detrás de los accionistas corporativos.", respuesta: 24, explicacion: "La R.24 exige información sobre el beneficiario final real, no solo sobre accionistas nominales o corporativos." },
  { caso: "Una casa de bolsa aplicó medidas reforzadas a un cliente de Irán por estar en lista GAFI. Sin embargo, las medidas consistieron únicamente en pedir una carta del cliente explicando el origen de sus fondos.", respuesta: 19, explicacion: "La R.19 requiere medidas de debida diligencia intensificada EFICACES y proporcionales, no solo declaraciones del propio cliente." },
  { caso: "El supervisor financiero realizó inspección a un banco y detectó incumplimientos graves en PLD. Emitió una 'carta de recomendaciones' solicitando mejoras pero sin consecuencia alguna.", respuesta: 35, explicacion: "La R.35 exige sanciones eficaces, proporcionales y disuasivas. Una simple carta sin consecuencias no cumple este estándar." },
  { caso: "México rechazó una solicitud de asistencia legal de Colombia para obtener registros bancarios, argumentando que la solicitud no venía por el canal diplomático tradicional.", respuesta: 37, explicacion: "La R.37 promueve prestar asistencia amplia sin barreras innecesarias. Rechazar por tecnicismos de canal viola el espíritu de cooperación." },
  { caso: "Una fundación que canaliza donativos al extranjero opera sin ninguna supervisión específica porque el país no considera a las OSFL como sujetos obligados.", respuesta: 8, explicacion: "La R.8 exige que las OSFL vulnerables a abuso de FT estén sujetas a supervisión proporcional a sus riesgos." },
  { caso: "Un exchange de criptoactivos opera en México sin registro, argumentando que 'solo facilita intercambios entre usuarios' y no toca directamente los fondos.", respuesta: 14, explicacion: "La R.14 exige que los servicios de transferencia de valor estén registrados. Los exchanges facilitan transferencias y deben registrarse." },
  { caso: "Un banco confía en un tercero para realizar la DDC de clientes referidos. Cuando el tercero no pudo verificar a un cliente, el banco aceptó la cuenta 'bajo monitoreo especial'.", respuesta: 17, explicacion: "La R.17 establece que la responsabilidad de DDC permanece en el banco aunque delegue en terceros. Aceptar clientes no verificados viola esto." },
  { caso: "El país publica estadísticas de ROS recibidos pero no lleva registro de cuántas investigaciones resultaron de ellos ni de los bienes decomisados.", respuesta: 33, explicacion: "La R.33 exige estadísticas integrales que incluyan investigaciones, procesamientos, condenas y bienes decomisados, no solo ROS." },
];

// Preguntas Trivia - Pool ampliado
const preguntasTrivia = [
  { pregunta: "¿Cuántas Recomendaciones tiene el GAFI?", opciones: ["35", "40", "45", "50"], correcta: 1 },
  { pregunta: "¿Qué Recomendación trata sobre Personas Expuestas Políticamente (PEPs)?", opciones: ["R.10", "R.12", "R.15", "R.20"], correcta: 1 },
  { pregunta: "¿Cuántos años mínimo deben conservarse los registros según R.11?", opciones: ["3 años", "5 años", "7 años", "10 años"], correcta: 1 },
  { pregunta: "¿Qué Recomendación prohíbe el 'tipping-off'?", opciones: ["R.19", "R.20", "R.21", "R.22"], correcta: 2 },
  { pregunta: "¿Qué categoría agrupa las R.36 a R.40?", opciones: ["Medidas preventivas", "Cooperación internacional", "Sanciones", "Transparencia"], correcta: 1 },
  { pregunta: "¿Qué Recomendación trata sobre la Unidad de Inteligencia Financiera?", opciones: ["R.26", "R.28", "R.29", "R.30"], correcta: 2 },
  { pregunta: "¿Qué Recomendación habla de nuevas tecnologías y activos virtuales?", opciones: ["R.13", "R.14", "R.15", "R.16"], correcta: 2 },
  { pregunta: "¿Qué Recomendación cubre el transporte transfronterizo de efectivo?", opciones: ["R.30", "R.31", "R.32", "R.33"], correcta: 2 },
  { pregunta: "¿Qué significa APNFD?", opciones: ["Actividades y Profesiones No Financieras Designadas", "Asociación de Profesionales No Financieros", "Análisis de Perfiles No Financieros", "Autoridad de Prevención Nacional"], correcta: 0 },
  { pregunta: "¿Cuál es la primera Recomendación del GAFI?", opciones: ["Cooperación nacional", "Evaluación de riesgos y EBR", "Delito de lavado", "DDC"], correcta: 1 },
  { pregunta: "¿Qué Recomendación habla de sanciones financieras dirigidas por terrorismo?", opciones: ["R.5", "R.6", "R.7", "R.8"], correcta: 1 },
  { pregunta: "¿La banca corresponsal está cubierta en qué Recomendación?", opciones: ["R.12", "R.13", "R.14", "R.15"], correcta: 1 },
  { pregunta: "¿Qué Recomendación trata sobre transferencias electrónicas?", opciones: ["R.14", "R.15", "R.16", "R.17"], correcta: 2 },
  { pregunta: "¿Cuántas categorías agrupan las 40 Recomendaciones?", opciones: ["5", "6", "7", "8"], correcta: 2 },
  { pregunta: "¿Qué Recomendación habla del beneficiario final de personas jurídicas?", opciones: ["R.22", "R.23", "R.24", "R.25"], correcta: 2 },
  { pregunta: "¿La R.20 trata sobre...?", opciones: ["PEPs", "Tipping-off", "Reporte de operaciones sospechosas", "Sanciones"], correcta: 2 },
  { pregunta: "¿Qué organismo emite las 40 Recomendaciones?", opciones: ["ONU", "FMI", "GAFI/FATF", "Banco Mundial"], correcta: 2 },
  { pregunta: "¿La R.35 trata sobre...?", opciones: ["Estadísticas", "Sanciones", "Guía y retroalimentación", "Extradición"], correcta: 1 },
  { pregunta: "¿Qué Recomendación cubre las OSFL (organizaciones sin fines de lucro)?", opciones: ["R.5", "R.6", "R.7", "R.8"], correcta: 3 },
  { pregunta: "¿La debida diligencia del cliente (DDC) se establece en...?", opciones: ["R.8", "R.9", "R.10", "R.11"], correcta: 2 },
  { pregunta: "¿Qué Recomendación trata sobre controles internos y filiales extranjeras?", opciones: ["R.16", "R.17", "R.18", "R.19"], correcta: 2 },
  { pregunta: "¿La Convención de Viena y Palermo se mencionan en qué Recomendación?", opciones: ["R.3", "R.36", "R.39", "Ambas R.3 y R.36"], correcta: 3 },
  { pregunta: "¿Qué Recomendación cubre los servicios de transferencia de dinero (STDV)?", opciones: ["R.13", "R.14", "R.15", "R.16"], correcta: 1 },
  { pregunta: "¿Cuántas Recomendaciones conforman las 'Medidas preventivas' (Categoría D)?", opciones: ["10", "12", "15", "18"], correcta: 2 },
  { pregunta: "¿La R.7 trata sobre sanciones relacionadas con...?", opciones: ["Terrorismo", "Proliferación de ADM", "Lavado de activos", "Corrupción"], correcta: 1 },
];

// ==================== UTILIDADES ====================
const getWeekSeed = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return now.getFullYear() * 52 + weekNumber;
};

const shuffleWithSeed = (array, seed) => {
  const shuffled = [...array];
  let currentSeed = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getWeekRange = () => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1} - ${endOfWeek.getDate()}/${endOfWeek.getMonth() + 1}`;
};

// ==================== COMPONENTES ====================

const Header = () => (
  <div className="text-center mb-6">
    <h1 className="text-2xl md:text-3xl font-bold" style={{ color: '#a663cc' }}>
      🎯 Domina las 40R del GAFI
    </h1>
    <p className="text-xs md:text-sm mt-1" style={{ color: '#4d4d4d' }}>
      Semana: {getWeekRange()} | Por 360educa
    </p>
  </div>
);

const CTAMembresia = () => (
  <div className="mt-6 p-4 rounded-lg text-center" style={{ backgroundColor: '#f8f4fc', border: '2px solid #a663cc' }}>
    <p className="font-semibold text-sm md:text-base" style={{ color: '#393e41' }}>
      ¿Quieres dominar las 40 Recomendaciones y aprobar tu certificación CNBV?
    </p>
    <a
      href="https://www.360educa.com/courses/membresia360-cnbv"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-3 px-6 py-2 rounded-full font-bold text-white transition-all hover:opacity-90"
      style={{ backgroundColor: '#a663cc' }}
    >
      Conoce la Membresía360 CNBV <ExternalLink size={16} />
    </a>
  </div>
);

// ==================== JUEGO 1: RULETA GAFI ====================
const RuletaGAFI = () => {
  const [spinning, setSpinning] = useState(false);
  const [currentRec, setCurrentRec] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setResult('timeout');
      setTotal(t => t + 1);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const spin = () => {
    setSpinning(true);
    setResult(null);
    setSelectedCat(null);
    const newRotation = rotation + 1440 + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      const randomRec = recomendaciones[Math.floor(Math.random() * 40)];
      setCurrentRec(randomRec);
      setSpinning(false);
      setTimeLeft(15);
      setTimerActive(true);
    }, 2000);
  };

  const checkAnswer = (catLetra) => {
    if (!timerActive) return;
    setTimerActive(false);
    setSelectedCat(catLetra);
    setTotal(t => t + 1);
    if (catLetra === currentRec.categoria) {
      setResult('correct');
      setScore(s => s + 1);
    } else {
      setResult('wrong');
    }
  };

  const reset = () => {
    setCurrentRec(null);
    setResult(null);
    setSelectedCat(null);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm mb-4" style={{ color: '#4d4d4d' }}>
          Gira la ruleta y clasifica la Recomendación en su categoría correcta. ¡Tienes 15 segundos!
        </p>
        <div className="flex justify-center gap-4 mb-4">
          <span className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#87d895' }}>
            ✓ {score}
          </span>
          <span className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#4d4d4d' }}>
            Total: {total}
          </span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div 
          className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 flex items-center justify-center transition-transform duration-2000 ease-out"
          style={{ 
            borderColor: '#a663cc',
            background: 'conic-gradient(#a663cc 0deg 51deg, #ff8361 51deg 103deg, #e84855 103deg 154deg, #87d895 154deg 206deg, #4ecdc4 206deg 257deg, #ffe66d 257deg 309deg, #95e1d3 309deg 360deg)',
            transform: `rotate(${rotation}deg)`
          }}
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
      </div>

      {!currentRec && !spinning && (
        <div className="text-center">
          <button
            onClick={spin}
            className="px-8 py-3 rounded-full font-bold text-white text-lg transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: '#a663cc' }}
          >
            🎰 ¡Girar Ruleta!
          </button>
        </div>
      )}

      {spinning && (
        <div className="text-center">
          <p className="text-xl animate-pulse" style={{ color: '#a663cc' }}>Girando...</p>
        </div>
      )}

      {currentRec && !spinning && !result && (
        <div className="space-y-4">
          <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#f8f4fc' }}>
            <p className="text-sm" style={{ color: '#4d4d4d' }}>Clasifica esta Recomendación:</p>
            <p className="text-lg md:text-xl font-bold mt-2" style={{ color: '#393e41' }}>
              R.{currentRec.num}: {currentRec.nombre}
            </p>
          </div>
          
          <div className="text-center">
            <span 
              className={`text-3xl font-bold ${timeLeft <= 5 ? 'animate-pulse' : ''}`}
              style={{ color: timeLeft <= 5 ? '#ff8361' : '#87d895' }}
            >
              ⏱️ {timeLeft}s
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {categorias.map(cat => (
              <button
                key={cat.letra}
                onClick={() => checkAnswer(cat.letra)}
                className="p-2 md:p-3 rounded-lg text-white font-semibold text-xs md:text-sm transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: cat.color }}
              >
                {cat.letra}. {cat.nombre.length > 20 ? cat.nombre.substring(0, 20) + '...' : cat.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="text-center space-y-4">
          <div 
            className="p-4 rounded-lg"
            style={{ 
              backgroundColor: result === 'correct' ? '#e8f8ea' : '#ffeaea',
              border: `2px solid ${result === 'correct' ? '#87d895' : '#ff8361'}`
            }}
          >
            {result === 'correct' && <p className="text-2xl">✅ ¡Correcto!</p>}
            {result === 'wrong' && (
              <>
                <p className="text-2xl">❌ Incorrecto</p>
                <p className="mt-2 text-sm" style={{ color: '#393e41' }}>
                  La R.{currentRec.num} pertenece a: <strong>{currentRec.categoria}. {currentRec.catNombre}</strong>
                </p>
              </>
            )}
            {result === 'timeout' && (
              <>
                <p className="text-2xl">⏰ ¡Tiempo!</p>
                <p className="mt-2 text-sm" style={{ color: '#393e41' }}>
                  La respuesta era: <strong>{currentRec.categoria}. {currentRec.catNombre}</strong>
                </p>
              </>
            )}
          </div>
          <button
            onClick={reset}
            className="px-6 py-2 rounded-full font-bold text-white"
            style={{ backgroundColor: '#a663cc' }}
          >
            Girar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== JUEGO 2: DETECTIVE GAFI (MÁS DIFÍCIL) ====================
const DetectiveGAFI = () => {
  const seed = getWeekSeed();
  const casos = shuffleWithSeed(casosDetective, seed).slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentCaso = casos[currentIndex];
  
  // 6 opciones para hacerlo más difícil - incluye opciones relacionadas/confusas
  const getOpciones = () => {
    const correcta = currentCaso.respuesta;
    const correctaRec = recomendaciones.find(r => r.num === correcta);
    
    // Obtener otras recomendaciones de la misma categoría (confusas)
    const mismaCategoria = recomendaciones.filter(r => r.categoria === correctaRec.categoria && r.num !== correcta);
    
    // Obtener recomendaciones de otras categorías
    const otrasCategorias = recomendaciones.filter(r => r.categoria !== correctaRec.categoria);
    
    // Seleccionar 2-3 de la misma categoría (para confundir) y el resto de otras
    const confusas = shuffleWithSeed(mismaCategoria, seed + currentIndex).slice(0, Math.min(2, mismaCategoria.length));
    const otras = shuffleWithSeed(otrasCategorias, seed + currentIndex + 100).slice(0, 5 - confusas.length);
    
    return shuffleWithSeed([correcta, ...confusas.map(r => r.num), ...otras.map(r => r.num)], seed + currentIndex + 200);
  };

  const opciones = getOpciones();

  const checkAnswer = (num) => {
    setSelectedAnswer(num);
    setShowResult(true);
    if (num === currentCaso.respuesta) {
      setScore(s => s + 1);
    }
  };

  const nextCase = () => {
    if (currentIndex < casos.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">🕵️</div>
        <h3 className="text-2xl font-bold" style={{ color: '#393e41' }}>¡Caso cerrado!</h3>
        <p className="text-xl">
          Tu puntuación: <span style={{ color: '#a663cc' }} className="font-bold">{score}/{casos.length}</span>
        </p>
        <p style={{ color: '#4d4d4d' }}>
          {score >= 8 ? "🏆 ¡Excelente detective de compliance!" : 
           score >= 6 ? "🌟 ¡Muy buen trabajo!" :
           score >= 4 ? "💪 Buen esfuerzo, sigue practicando." : 
           "📚 Necesitas repasar las 40 Recomendaciones."}
        </p>
        <button
          onClick={restart}
          className="px-6 py-2 rounded-full font-bold text-white"
          style={{ backgroundColor: '#a663cc' }}
        >
          Investigar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm" style={{ color: '#4d4d4d' }}>Caso {currentIndex + 1}/{casos.length}</span>
        <span className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#87d895' }}>
          ✓ {score}
        </span>
      </div>

      <div className="p-4 rounded-lg" style={{ backgroundColor: '#f8f4fc', border: '1px solid #a663cc' }}>
        <p className="text-sm font-semibold mb-2" style={{ color: '#a663cc' }}>🔍 CASO:</p>
        <p className="text-sm" style={{ color: '#393e41' }}>{currentCaso.caso}</p>
      </div>

      <p className="text-center font-semibold text-sm" style={{ color: '#393e41' }}>
        ¿Qué Recomendación del GAFI se incumple principalmente?
      </p>

      <div className="grid grid-cols-2 gap-2">
        {opciones.map(num => {
          const rec = recomendaciones.find(r => r.num === num);
          let bgColor = '#f0f0f0';
          let borderColor = '#ddd';
          if (showResult) {
            if (num === currentCaso.respuesta) {
              bgColor = '#87d895';
              borderColor = '#87d895';
            } else if (num === selectedAnswer) {
              bgColor = '#ff8361';
              borderColor = '#ff8361';
            }
          }
          return (
            <button
              key={num}
              onClick={() => !showResult && checkAnswer(num)}
              disabled={showResult}
              className="p-2 rounded-lg text-left transition-all hover:scale-102"
              style={{ 
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                color: showResult && (num === currentCaso.respuesta || num === selectedAnswer) ? 'white' : '#393e41'
              }}
            >
              <span className="font-bold text-sm">R.{num}</span>
              <span className="text-xs block leading-tight" style={{ color: showResult && (num === currentCaso.respuesta || num === selectedAnswer) ? 'white' : '#4d4d4d' }}>
                {rec?.nombre.length > 35 ? rec?.nombre.substring(0, 35) + '...' : rec?.nombre}
              </span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div 
          className="p-4 rounded-lg"
          style={{ 
            backgroundColor: selectedAnswer === currentCaso.respuesta ? '#e8f8ea' : '#ffeaea',
            border: `1px solid ${selectedAnswer === currentCaso.respuesta ? '#87d895' : '#ff8361'}`
          }}
        >
          <p className="font-semibold mb-2">
            {selectedAnswer === currentCaso.respuesta ? '✅ ¡Correcto!' : '❌ Incorrecto'}
          </p>
          <p className="text-xs" style={{ color: '#393e41' }}>{currentCaso.explicacion}</p>
        </div>
      )}

      {showResult && (
        <div className="text-center">
          <button
            onClick={nextCase}
            className="px-6 py-2 rounded-full font-bold text-white"
            style={{ backgroundColor: '#a663cc' }}
          >
            {currentIndex < casos.length - 1 ? 'Siguiente caso →' : 'Ver resultados'}
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== JUEGO 3: SPEED CLASSIFIER ====================
const SpeedClassifier = () => {
  const seed = getWeekSeed();
  const [gameState, setGameState] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentRec, setCurrentRec] = useState(null);
  const [queue, setQueue] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (gameState === 'playing') {
      setQueue(shuffleWithSeed([...recomendaciones], seed + Date.now()));
    }
  }, [gameState]);

  useEffect(() => {
    if (queue.length > 0 && !currentRec && gameState === 'playing') {
      setCurrentRec(queue[0]);
      setQueue(q => q.slice(1));
    }
  }, [queue, currentRec, gameState]);

  useEffect(() => {
    let interval;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('finished');
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setScore(0);
    setCurrentRec(null);
    setFeedback(null);
  };

  const classify = (catLetra) => {
    if (currentRec.categoria === catLetra) {
      setScore(s => s + 1);
      setFeedback({ type: 'correct' });
    } else {
      setFeedback({ type: 'wrong', correct: currentRec.categoria });
    }
    setTimeout(() => {
      setFeedback(null);
      setCurrentRec(null);
    }, 300);
  };

  if (gameState === 'ready') {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">⚡</div>
        <h3 className="text-xl font-bold" style={{ color: '#393e41' }}>Speed Classifier</h3>
        <p className="text-sm" style={{ color: '#4d4d4d' }}>Clasifica el máximo de Recomendaciones en 60 segundos.</p>
        <p className="text-xs" style={{ color: '#4d4d4d' }}>Toca la categoría correcta (A-G) lo más rápido posible.</p>
        <button
          onClick={startGame}
          className="px-8 py-3 rounded-full font-bold text-white text-lg"
          style={{ backgroundColor: '#a663cc' }}
        >
          ¡Comenzar!
        </button>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">🏆</div>
        <h3 className="text-2xl font-bold" style={{ color: '#393e41' }}>¡Tiempo!</h3>
        <p className="text-4xl font-bold" style={{ color: '#a663cc' }}>{score}</p>
        <p style={{ color: '#4d4d4d' }}>Recomendaciones clasificadas correctamente</p>
        <p className="text-sm" style={{ color: '#4d4d4d' }}>
          {score >= 30 ? "🌟 ¡Experto GAFI!" : 
           score >= 20 ? "👏 ¡Muy bien!" : 
           score >= 10 ? "💪 ¡Sigue practicando!" : 
           "📚 Hora de estudiar las 40R"}
        </p>
        <button
          onClick={startGame}
          className="px-6 py-2 rounded-full font-bold text-white"
          style={{ backgroundColor: '#a663cc' }}
        >
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span 
          className={`text-2xl font-bold ${timeLeft <= 10 ? 'animate-pulse' : ''}`}
          style={{ color: timeLeft <= 10 ? '#ff8361' : '#87d895' }}
        >
          ⏱️ {timeLeft}s
        </span>
        <span className="text-2xl font-bold" style={{ color: '#a663cc' }}>
          ✓ {score}
        </span>
      </div>

      {currentRec && (
        <div 
          className="p-4 rounded-lg text-center transition-colors duration-200"
          style={{ 
            backgroundColor: feedback?.type === 'correct' ? '#e8f8ea' : 
                            feedback?.type === 'wrong' ? '#ffeaea' : '#f8f4fc'
          }}
        >
          <p className="text-2xl font-bold" style={{ color: '#a663cc' }}>R.{currentRec.num}</p>
          <p className="text-xs mt-1" style={{ color: '#393e41' }}>{currentRec.nombre}</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {categorias.map(cat => (
          <button
            key={cat.letra}
            onClick={() => currentRec && classify(cat.letra)}
            className="p-3 rounded-lg text-white font-bold text-xl transition-all active:scale-95"
            style={{ backgroundColor: cat.color }}
          >
            {cat.letra}
          </button>
        ))}
      </div>

      <div className="text-xs text-center grid grid-cols-2 gap-1" style={{ color: '#4d4d4d' }}>
        <span>A=Políticas</span>
        <span>B=Lavado</span>
        <span>C=FT/Prolif.</span>
        <span>D=Preventivas</span>
        <span>E=Transparencia</span>
        <span>F=Autoridades</span>
        <span className="col-span-2">G=Cooperación Int.</span>
      </div>
    </div>
  );
};

// ==================== JUEGO 4: MATCH 40R (Memorama) ====================
const Match40R = () => {
  const seed = getWeekSeed();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const initGame = () => {
    const selected = shuffleWithSeed([...recomendaciones], seed + Date.now()).slice(0, 6);
    const pairs = selected.flatMap(rec => [
      { id: `num-${rec.num}`, pairId: rec.num, type: 'num', content: `R.${rec.num}` },
      { id: `name-${rec.num}`, pairId: rec.num, type: 'name', content: rec.nombre }
    ]);
    setCards(shuffleWithSeed(pairs, seed + Date.now() + 1));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pairId)) return;
    
    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id));
      
      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setMatched(m => [...m, first.pairId]);
          setFlipped([]);
          if (matched.length + 1 === 6) {
            setGameComplete(true);
          }
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  if (gameComplete) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">🎉</div>
        <h3 className="text-2xl font-bold" style={{ color: '#393e41' }}>¡Completado!</h3>
        <p className="text-xl">
          Movimientos: <span style={{ color: '#a663cc' }} className="font-bold">{moves}</span>
        </p>
        <p style={{ color: '#4d4d4d' }}>
          {moves <= 10 ? "🌟 ¡Memoria prodigiosa!" : 
           moves <= 15 ? "👏 ¡Muy bien!" : 
           "💪 ¡Sigue practicando!"}
        </p>
        <button
          onClick={initGame}
          className="px-6 py-2 rounded-full font-bold text-white"
          style={{ backgroundColor: '#a663cc' }}
        >
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: '#4d4d4d' }}>Empareja el número con su descripción</span>
        <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#f0f0f0' }}>
          Mov: {moves}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {cards.map(card => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.pairId);
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="h-20 md:h-24 rounded-lg transition-all duration-300 flex items-center justify-center p-2"
              style={{
                backgroundColor: matched.includes(card.pairId) ? '#87d895' : 
                                isFlipped ? '#f8f4fc' : '#a663cc',
                color: matched.includes(card.pairId) ? 'white' : 
                       isFlipped ? '#393e41' : 'white',
                border: isFlipped && !matched.includes(card.pairId) ? '2px solid #a663cc' : 'none'
              }}
            >
              {isFlipped ? (
                <span className={`text-center ${card.type === 'num' ? 'text-lg font-bold' : 'text-xs leading-tight'}`}>
                  {card.type === 'name' && card.content.length > 30 ? card.content.substring(0, 30) + '...' : card.content}
                </span>
              ) : (
                <span className="text-2xl">❓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ==================== JUEGO 5: TRIVIA GAFI ====================
const TriviaGAFI = () => {
  const seed = getWeekSeed();
  const preguntas = shuffleWithSeed([...preguntasTrivia], seed).slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = preguntas[currentIndex];

  const checkAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQuestion.correcta) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < preguntas.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center space-y-4">
        <div className="text-6xl">🧠</div>
        <h3 className="text-2xl font-bold" style={{ color: '#393e41' }}>¡Trivia completada!</h3>
        <p className="text-4xl font-bold" style={{ color: '#a663cc' }}>{score}/{preguntas.length}</p>
        <p style={{ color: '#4d4d4d' }}>
          {score >= 9 ? "🏆 ¡Experto GAFI certificado!" : 
           score >= 7 ? "🌟 ¡Muy buen conocimiento!" : 
           score >= 5 ? "📚 Vas por buen camino." : 
           "💪 Hora de repasar las 40R."}
        </p>
        <button
          onClick={restart}
          className="px-6 py-2 rounded-full font-bold text-white"
          style={{ backgroundColor: '#a663cc' }}
        >
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: '#4d4d4d' }}>Pregunta {currentIndex + 1}/{preguntas.length}</span>
        <span className="px-3 py-1 rounded-full text-white text-sm" style={{ backgroundColor: '#87d895' }}>
          ✓ {score}
        </span>
      </div>

      <div className="p-4 rounded-lg" style={{ backgroundColor: '#f8f4fc' }}>
        <p className="text-base font-semibold" style={{ color: '#393e41' }}>{currentQuestion.pregunta}</p>
      </div>

      <div className="space-y-2">
        {currentQuestion.opciones.map((opcion, index) => {
          let bgColor = '#f0f0f0';
          let textColor = '#393e41';
          if (showResult) {
            if (index === currentQuestion.correcta) {
              bgColor = '#87d895';
              textColor = 'white';
            } else if (index === selectedAnswer) {
              bgColor = '#ff8361';
              textColor = 'white';
            }
          }
          return (
            <button
              key={index}
              onClick={() => !showResult && checkAnswer(index)}
              disabled={showResult}
              className="w-full p-3 rounded-lg text-left transition-all text-sm"
              style={{ backgroundColor: bgColor, color: textColor }}
            >
              {opcion}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="text-center">
          <button
            onClick={nextQuestion}
            className="px-6 py-2 rounded-full font-bold text-white"
            style={{ backgroundColor: '#a663cc' }}
          >
            {currentIndex < preguntas.length - 1 ? 'Siguiente →' : 'Ver resultados'}
          </button>
        </div>
      )}
    </div>
  );
};

// ==================== PESTAÑA CONSULTA 40R ====================
const Consulta40R = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [expandedRec, setExpandedRec] = useState(null);

  const filteredRecs = recomendaciones.filter(rec => {
    const matchesSearch = searchTerm === '' || 
      rec.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `R.${rec.num}`.includes(searchTerm) ||
      `${rec.num}`.includes(searchTerm);
    
    const matchesCategoria = selectedCategoria === null || rec.categoria === selectedCategoria;
    
    return matchesSearch && matchesCategoria;
  });

  return (
    <div className="space-y-4">
      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por número, nombre o palabra clave..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:border-purple-500 text-sm"
          style={{ borderColor: '#e0e0e0' }}
        />
      </div>

      {/* Navegación por categorías */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategoria(null)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            selectedCategoria === null ? 'text-white' : 'text-gray-600 bg-gray-100'
          }`}
          style={{ backgroundColor: selectedCategoria === null ? '#a663cc' : undefined }}
        >
          Todas
        </button>
        {categorias.map(cat => (
          <button
            key={cat.letra}
            onClick={() => setSelectedCategoria(cat.letra)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              selectedCategoria === cat.letra ? 'text-white' : ''
            }`}
            style={{ 
              backgroundColor: selectedCategoria === cat.letra ? cat.color : '#f0f0f0',
              color: selectedCategoria === cat.letra ? 'white' : '#4d4d4d'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.letra}</span>
          </button>
        ))}
      </div>

      {/* Info de categoría seleccionada */}
      {selectedCategoria && (
        <div 
          className="p-3 rounded-lg text-white text-sm"
          style={{ backgroundColor: categorias.find(c => c.letra === selectedCategoria)?.color }}
        >
          <span className="font-bold">{selectedCategoria}.</span> {categorias.find(c => c.letra === selectedCategoria)?.nombre} ({categorias.find(c => c.letra === selectedCategoria)?.rango})
        </div>
      )}

      {/* Contador de resultados */}
      <p className="text-xs" style={{ color: '#4d4d4d' }}>
        Mostrando {filteredRecs.length} de 40 Recomendaciones
      </p>

      {/* Lista de Recomendaciones */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {filteredRecs.map(rec => {
          const cat = categorias.find(c => c.letra === rec.categoria);
          const isExpanded = expandedRec === rec.num;
          
          return (
            <div 
              key={rec.num}
              className="rounded-lg border overflow-hidden transition-all"
              style={{ borderColor: cat?.color }}
            >
              <button
                onClick={() => setExpandedRec(isExpanded ? null : rec.num)}
                className="w-full p-3 text-left flex items-start gap-3"
                style={{ backgroundColor: '#fafafa' }}
              >
                <span 
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: cat?.color }}
                >
                  {rec.num}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: '#393e41' }}>
                    R.{rec.num}: {rec.nombre}
                  </p>
                  <p className="text-xs" style={{ color: '#4d4d4d' }}>
                    {cat?.letra}. {cat?.nombre}
                  </p>
                </div>
                {isExpanded ? <ChevronUp size={20} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />}
              </button>
              
              {isExpanded && (
                <div className="p-3 bg-white border-t text-sm" style={{ color: '#393e41', borderColor: '#eee' }}>
                  {rec.descripcion}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Link a documento oficial */}
      <div className="pt-2 border-t" style={{ borderColor: '#eee' }}>
        <a
          href="https://biblioteca.gafilat.org/?p=7500"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full p-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
          style={{ backgroundColor: '#f8f4fc', color: '#a663cc', border: '2px solid #a663cc' }}
        >
          <BookOpen size={18} />
          Ver documento oficial GAFILAT
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: '🎰', name: 'Ruleta', component: RuletaGAFI },
    { icon: '🕵️', name: 'Detective', component: DetectiveGAFI },
    { icon: '⚡', name: 'Speed', component: SpeedClassifier },
    { icon: '🔗', name: 'Match', component: Match40R },
    { icon: '🧠', name: 'Trivia', component: TriviaGAFI },
    { icon: '📚', name: '40R', component: Consulta40R },
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-md mx-auto">
        <Header />

        {/* Tabs */}
        <div className="flex justify-between mb-4 bg-white rounded-full p-1 shadow-sm">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-2 px-1 rounded-full text-center transition-all`}
              style={{
                backgroundColor: activeTab === index ? '#a663cc' : 'transparent',
                color: activeTab === index ? 'white' : '#4d4d4d'
              }}
            >
              <span className="text-base md:text-lg">{tab.icon}</span>
              <span className="text-xs block">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Contenido del juego activo */}
        <div className="bg-white rounded-2xl p-4 shadow-lg" style={{ minHeight: '400px' }}>
          <ActiveComponent />
        </div>

        <CTAMembresia />

        <p className="text-center text-xs mt-4" style={{ color: '#4d4d4d' }}>
          🔄 Contenido actualizado cada semana | © 2026 360educa
        </p>
      </div>
    </div>
  );
}
