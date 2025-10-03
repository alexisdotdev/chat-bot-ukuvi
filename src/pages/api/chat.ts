import type { APIRoute } from 'astro';
import { findBestResponse } from '../../lib/autoResponses';
import { saveConversation } from '../../lib/supabase';

// Rate limiting: almacena timestamps de mensajes por sesión
const messageTimestamps = new Map<string, number[]>();
const RATE_LIMIT = 10; // máximo 10 mensajes
const RATE_LIMIT_WINDOW = 60 * 1000; // por minuto (60 segundos)

/**
 * Verifica si una sesión ha excedido el límite de rate limiting
 */
function isRateLimited(sessionId: string): boolean {
  const now = Date.now();
  const timestamps = messageTimestamps.get(sessionId) || [];

  // Filtrar timestamps dentro de la ventana de tiempo
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  // Actualizar timestamps para esta sesión
  messageTimestamps.set(sessionId, recentTimestamps);

  // Verificar si se excedió el límite
  return recentTimestamps.length >= RATE_LIMIT;
}

/**
 * Registra un nuevo mensaje para rate limiting
 */
function recordMessage(sessionId: string): void {
  const now = Date.now();
  const timestamps = messageTimestamps.get(sessionId) || [];
  timestamps.push(now);
  messageTimestamps.set(sessionId, timestamps);
}

/**
 * Endpoint POST /api/chat
 * Recibe un mensaje del usuario, lo procesa con Claude y lo guarda en Supabase
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    // Parsear el body de la petición
    const body = await request.json();
    const { message, sessionId } = body;

    // Validar datos requeridos
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'El mensaje es requerido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!sessionId || typeof sessionId !== 'string') {
      return new Response(
        JSON.stringify({ error: 'El session ID es requerido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verificar rate limiting
    if (isRateLimited(sessionId)) {
      return new Response(
        JSON.stringify({
          error: 'Has excedido el límite de mensajes. Por favor espera un momento.',
        }),
        {
          status: 429,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Registrar este mensaje para rate limiting
    recordMessage(sessionId);

    // Generar respuesta automática basada en palabras clave
    const assistantResponse = findBestResponse(message);

    // Guardar conversación completa en Supabase
    try {
      console.log('Intentando guardar conversación...', { sessionId, message, assistantResponse });
      await saveConversation(sessionId, message, assistantResponse);
      console.log('✅ Conversación guardada exitosamente');
    } catch (error) {
      console.error('❌ Error al guardar conversación en Supabase:', error);
      console.error('Detalles del error:', JSON.stringify(error, null, 2));
      // No fallar la petición si falla el guardado, solo registrar el error
      // La respuesta ya fue generada exitosamente
    }

    // Retornar la respuesta
    return new Response(
      JSON.stringify({
        response: assistantResponse,
        sessionId,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error en el endpoint /api/chat:', error);
    return new Response(
      JSON.stringify({
        error: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
