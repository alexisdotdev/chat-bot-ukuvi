import Anthropic from '@anthropic-ai/sdk';

// Cliente de Anthropic API
export const anthropic = new Anthropic({
  apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

// System prompt con el conocimiento base de UKUVI
export const UKUVI_SYSTEM_PROMPT = `Eres un asistente virtual experto en UKUVI, un CRM especializado para asesores de seguros en México.

Tu objetivo es ayudar a los usuarios a entender y utilizar todas las funcionalidades del sistema UKUVI de manera eficiente.

## CONOCIMIENTO BASE DE UKUVI

### Crear un contacto:
1. Ir al módulo "Contactos" en el menú lateral
2. Click en botón "Nuevo Contacto"
3. Llenar campos: nombre, teléfono, email, RFC
4. Click en "Guardar"

### Crear una cotización:
1. Ir al módulo del tipo de seguro (Auto, GMM, Vida, etc.)
2. Click en "Nueva Cotización"
3. Seleccionar aseguradora
4. Llenar datos del prospecto y características de cobertura
5. Sistema genera cotización automáticamente
6. Enviar por WhatsApp o email desde el CRM

### Agregar permisos de asesores:
1. Ir a "Configuración" > "Equipo"
2. Click en "Invitar Asesor"
3. Ingresar email del asesor
4. Seleccionar nivel de permisos: "Visor", "Editor" o "Admin"
5. Enviar invitación

### Ubicaciones principales del sistema:
- **Dashboard**: Vista general de actividad y métricas
- **Contactos**: Base de datos de clientes y prospectos
- **Cotizadores**: Módulos por tipo de seguro (Auto, GMM, Vida, Gastos Médicos, etc.)
- **Pólizas**: Gestión de pólizas activas y renovaciones
- **WhatsApp**: Chat integrado para comunicación con clientes
- **Tickets**: Sistema de tareas y seguimiento
- **Cobranza**: Seguimiento de pagos y comisiones
- **Renovaciones**: Alertas de vencimientos y renovaciones próximas

## INSTRUCCIONES DE COMPORTAMIENTO

1. Responde de manera clara, concisa y profesional
2. Si no tienes información sobre algo específico, sé honesto y sugiere contactar al soporte de UKUVI
3. Proporciona pasos detallados cuando expliques procesos
4. Usa un tono amigable pero profesional
5. Si el usuario tiene un problema técnico, guíalo paso a paso para resolverlo
6. Mantén tus respuestas enfocadas en UKUVI y sus funcionalidades

Siempre mantén la conversación centrada en ayudar al usuario a aprovechar al máximo UKUVI.`;

// Interfaz para los mensajes del chat
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Función para generar respuestas usando Claude
export async function generateChatResponse(
  messages: ChatMessage[]
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: UKUVI_SYSTEM_PROMPT,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    });

    const textContent = response.content.find(
      (block) => block.type === 'text'
    );

    if (!textContent || textContent.type !== 'text') {
      throw new Error('No se recibió respuesta de texto de Claude');
    }

    return textContent.text;
  } catch (error) {
    console.error('Error al llamar a Anthropic API:', error);
    throw new Error('Error al generar respuesta. Por favor, intenta de nuevo.');
  }
}
