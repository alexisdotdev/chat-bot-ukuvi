// Sistema de respuestas automáticas para UKUVI

export interface AutoResponse {
  keywords: string[];
  response: string;
  priority: number; // Mayor número = mayor prioridad
}

export const autoResponses: AutoResponse[] = [
  // Saludos
  {
    keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'qué tal'],
    response: '¡Hola! 👋 Soy el asistente virtual de UKUVI. Estoy aquí para ayudarte con preguntas sobre la plataforma. ¿En qué puedo asistirte hoy?',
    priority: 10
  },

  // Crear contacto
  {
    keywords: ['crear contacto', 'nuevo contacto', 'agregar contacto', 'añadir contacto', 'registrar contacto'],
    response: `Para crear un nuevo contacto en UKUVI, sigue estos pasos:

1. Ve al módulo "Contactos" en el menú lateral izquierdo
2. Haz clic en el botón "Nuevo Contacto" (esquina superior derecha)
3. Completa los campos requeridos:
   - Nombre completo
   - Teléfono
   - Email
   - RFC (opcional pero recomendado)
4. Haz clic en "Guardar"

El contacto quedará registrado y podrás usarlo para cotizaciones y pólizas. ¿Necesitas ayuda con algo más?`,
    priority: 100
  },

  // Crear cotización
  {
    keywords: ['crear cotización', 'nueva cotización', 'cotizar', 'hacer cotización', 'generar cotización'],
    response: `Para crear una cotización en UKUVI:

1. Dirígete al módulo del tipo de seguro que necesitas (Auto, GMM, Vida, Daños, etc.) en el menú lateral
2. Haz clic en "Nueva Cotización"
3. Selecciona la aseguradora con la que deseas cotizar
4. Completa los datos del prospecto y las características de cobertura
5. El sistema generará la cotización automáticamente
6. Puedes enviarla directamente por WhatsApp o email desde el CRM

¿Necesitas ayuda con algún tipo de seguro en específico?`,
    priority: 100
  },

  // Permisos de asesores
  {
    keywords: ['agregar asesor', 'permisos', 'invitar asesor', 'añadir asesor', 'permisos de usuario', 'agregar usuario'],
    response: `Para agregar permisos a asesores en UKUVI:

1. Ve a "Configuración" en el menú lateral
2. Selecciona "Equipo"
3. Haz clic en "Invitar Asesor"
4. Ingresa el email del asesor
5. Selecciona el nivel de permisos:
   - **Visor**: Solo puede ver información
   - **Editor**: Puede crear y modificar
   - **Admin**: Control total de la plataforma
6. Haz clic en "Enviar invitación"

El asesor recibirá un email para configurar su cuenta. ¿Tienes dudas sobre los niveles de permisos?`,
    priority: 100
  },

  // Ubicaciones/Módulos
  {
    keywords: ['dónde está', 'ubicación', 'dónde encuentro', 'dónde puedo', 'módulos', 'menú'],
    response: `Las ubicaciones principales en UKUVI son:

📊 **Dashboard**: Vista general de tu actividad y métricas
👥 **Contactos**: Base de datos de clientes y prospectos
💰 **Cotizadores**: Módulos organizados por tipo de seguro (Auto, GMM, Vida, Daños, etc.)
📄 **Pólizas**: Gestión de pólizas activas
💬 **WhatsApp**: Chat integrado con clientes
✅ **Tickets**: Sistema de tareas y seguimiento
💳 **Cobranza**: Control de pagos y recordatorios
🔄 **Renovaciones**: Alertas de pólizas próximas a vencer

¿Qué módulo necesitas usar?`,
    priority: 90
  },

  // WhatsApp
  {
    keywords: ['whatsapp', 'enviar whatsapp', 'chat', 'mensaje'],
    response: `UKUVI tiene WhatsApp integrado para comunicarte con tus clientes:

- Accede desde el módulo "WhatsApp" en el menú lateral
- Puedes enviar cotizaciones directamente desde cualquier cotizador
- Los mensajes se registran automáticamente en el historial del contacto
- Puedes usar plantillas predefinidas para agilizar tu comunicación

¿Necesitas ayuda para enviar algo específico por WhatsApp?`,
    priority: 80
  },

  // Pólizas
  {
    keywords: ['póliza', 'poliza', 'gestionar póliza', 'ver póliza'],
    response: `En el módulo de **Pólizas** puedes:

- Ver todas las pólizas activas de tus clientes
- Dar seguimiento a pagos y renovaciones
- Actualizar información de pólizas
- Generar reportes
- Configurar alertas de vencimiento

Accede desde "Pólizas" en el menú lateral. ¿Necesitas hacer algo específico con una póliza?`,
    priority: 80
  },

  // Cobranza
  {
    keywords: ['cobrar', 'cobranza', 'pago', 'pagos', 'facturación'],
    response: `El módulo de **Cobranza** te ayuda a:

- Dar seguimiento a pagos pendientes
- Enviar recordatorios automáticos
- Registrar pagos recibidos
- Ver el estatus de cada cliente
- Generar reportes de cobranza

Encuéntralo en el menú lateral bajo "Cobranza". ¿Necesitas registrar un pago?`,
    priority: 80
  },

  // Renovaciones
  {
    keywords: ['renovación', 'renovaciones', 'renovar', 'vencimiento', 'próximo a vencer'],
    response: `El módulo de **Renovaciones** te alerta sobre:

- Pólizas próximas a vencer
- Recordatorios automáticos a clientes
- Seguimiento del proceso de renovación
- Estadísticas de retención

Accede desde "Renovaciones" en el menú lateral. ¿Tienes pólizas próximas a renovar?`,
    priority: 80
  },

  // Tipos de seguro
  {
    keywords: ['seguro de auto', 'seguro auto', 'seguro vehicular'],
    response: `Para cotizar **Seguros de Auto** en UKUVI:

1. Ve al módulo "Auto" en el menú lateral
2. Crea una nueva cotización
3. Completa los datos del vehículo (marca, modelo, año, uso)
4. Selecciona las coberturas deseadas
5. El sistema te mostrará opciones de diferentes aseguradoras

¿Necesitas ayuda con algún paso específico?`,
    priority: 90
  },

  {
    keywords: ['gmm', 'gastos médicos', 'seguro médico', 'seguro de salud'],
    response: `Para cotizar **Gastos Médicos Mayores (GMM)** en UKUVI:

1. Accede al módulo "GMM"
2. Crea nueva cotización
3. Ingresa datos del asegurado (edad, género, ocupación)
4. Define suma asegurrada y deducibles
5. Compara opciones de diferentes aseguradoras

¿Necesitas cotizar para una persona o grupo?`,
    priority: 90
  },

  {
    keywords: ['seguro de vida', 'vida', 'seguro vida'],
    response: `Para cotizar **Seguros de Vida** en UKUVI:

1. Ve al módulo "Vida"
2. Nueva cotización
3. Datos del asegurado (edad, salud, ocupación)
4. Define suma asegurada y beneficiarios
5. Revisa opciones de aseguradoras

¿Es para vida individual o colectivo?`,
    priority: 90
  },

  // Reportes
  {
    keywords: ['reporte', 'reportes', 'estadística', 'estadísticas', 'métricas'],
    response: `UKUVI te permite generar diversos reportes:

- Reporte de ventas por periodo
- Productividad de asesores
- Comisiones generadas
- Pipeline de cotizaciones
- Retención de clientes

Accede a reportes desde el Dashboard o cada módulo específico. ¿Qué tipo de reporte necesitas?`,
    priority: 70
  },

  // Ayuda general
  {
    keywords: ['ayuda', 'help', 'no entiendo', 'cómo funciona'],
    response: `¡Estoy aquí para ayudarte! Puedo asistirte con:

✅ Crear contactos y cotizaciones
✅ Gestionar pólizas y renovaciones
✅ Configurar permisos de asesores
✅ Ubicar módulos en la plataforma
✅ Enviar información por WhatsApp
✅ Seguimiento de cobranza

¿Qué necesitas hacer específicamente?`,
    priority: 50
  },

  // Despedida
  {
    keywords: ['gracias', 'perfecto', 'listo', 'ok', 'entendido', 'adiós', 'chao', 'hasta luego'],
    response: '¡De nada! Si necesitas más ayuda con UKUVI, aquí estaré. ¡Que tengas un excelente día! 😊',
    priority: 10
  },

  // Respuesta por defecto
  {
    keywords: [], // Se activa cuando no hay coincidencias
    response: `No estoy seguro de cómo ayudarte con eso específicamente.

Puedo ayudarte con:
- Crear contactos y cotizaciones
- Gestionar pólizas
- Agregar permisos a asesores
- Ubicar módulos en UKUVI
- Procesos de cobranza y renovaciones

¿Podrías reformular tu pregunta o decirme qué necesitas hacer en UKUVI?`,
    priority: 0
  }
];

// Función para encontrar la mejor respuesta basada en keywords
export function findBestResponse(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase().trim();

  let bestMatch: AutoResponse | null = null;
  let highestPriority = -1;

  for (const response of autoResponses) {
    // Si no tiene keywords, es la respuesta por defecto
    if (response.keywords.length === 0) {
      if (bestMatch === null) {
        bestMatch = response;
      }
      continue;
    }

    // Buscar coincidencias de keywords
    const hasMatch = response.keywords.some(keyword =>
      normalizedMessage.includes(keyword.toLowerCase())
    );

    if (hasMatch && response.priority > highestPriority) {
      highestPriority = response.priority;
      bestMatch = response;
    }
  }

  return bestMatch?.response || autoResponses[autoResponses.length - 1].response;
}

// Función para generar ID de sesión único
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
