import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interfaz para el mensaje guardado en Supabase
export interface ChatMessageRecord {
  id?: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

/**
 * Guarda un mensaje en la base de datos de Supabase
 */
export async function saveMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  try {
    const { error } = await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role,
      content,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error al guardar mensaje en Supabase:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error en saveMessage:', error);
    throw new Error('No se pudo guardar el mensaje en la base de datos');
  }
}

/**
 * Obtiene el historial de mensajes de una sesión
 */
export async function getSessionMessages(
  sessionId: string
): Promise<ChatMessageRecord[]> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error al obtener mensajes de Supabase:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error en getSessionMessages:', error);
    throw new Error('No se pudo obtener el historial de mensajes');
  }
}

/**
 * Genera un ID de sesión único
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
