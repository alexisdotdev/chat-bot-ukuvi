import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaz para el registro de conversación en Supabase
export interface ConversationRecord {
  id?: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  created_at?: string;
  metadata?: any;
}

/**
 * Guarda una conversación (par de mensajes usuario-bot) en Supabase
 */
export async function saveConversation(
  sessionId: string,
  userMessage: string,
  botResponse: string,
  metadata?: any
): Promise<void> {
  console.log('📤 saveConversation llamado con:', {
    sessionId,
    userMessageLength: userMessage.length,
    botResponseLength: botResponse.length
  });

  try {
    const dataToInsert = {
      session_id: sessionId,
      user_message: userMessage,
      bot_response: botResponse,
      created_at: new Date().toISOString(),
      metadata: metadata || null,
    };

    console.log('📝 Datos a insertar:', dataToInsert);

    const { data, error } = await supabase.from('conversations').insert(dataToInsert);

    console.log('📨 Respuesta de Supabase - data:', data, 'error:', error);

    if (error) {
      console.error('❌ Error de Supabase:', error);
      console.error('Código de error:', error.code);
      console.error('Mensaje:', error.message);
      console.error('Detalles:', error.details);
      throw error;
    }

    console.log('✅ Conversación guardada exitosamente en Supabase');
  } catch (error) {
    console.error('❌ Error en saveConversation:', error);
    throw error;
  }
}

/**
 * Obtiene el historial de conversaciones de una sesión
 */
export async function getSessionConversations(
  sessionId: string
): Promise<ConversationRecord[]> {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error al obtener conversaciones de Supabase:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en getSessionConversations:', error);
    throw new Error('No se pudo obtener el historial de conversaciones');
  }
}

/**
 * Genera un UUID v4 válido para usar como session_id
 */
export function generateSessionId(): string {
  // Generar UUID v4 compatible con PostgreSQL
  return crypto.randomUUID();
}
