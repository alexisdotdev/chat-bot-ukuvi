import { useState, useEffect, useRef } from 'react';
import '../styles/chat.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generar session ID al montar el componente
  useEffect(() => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);

    // Mensaje de bienvenida
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! Soy el asistente virtual de UKUVI. ¿En qué puedo ayudarte hoy?',
      },
    ]);
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enviar mensaje
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) {
      return;
    }

    const userMessage = inputValue.trim();
    setInputValue('');
    setError(null);

    // Agregar mensaje del usuario a la UI
    const newUserMessage: Message = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Llamar al API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener respuesta');
      }

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);

      // Mostrar mensaje de error en el chat
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `❌ Lo siento, ocurrió un error: ${errorMessage}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Limpiar historial
  const handleClearHistory = () => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    setMessages([
      {
        role: 'assistant',
        content: '¡Hola! Soy el asistente virtual de UKUVI. ¿En qué puedo ayudarte hoy?',
      },
    ]);
    setError(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-content">
          <h1>Asistente UKUVI</h1>
          <p>Tu guía para usar el CRM de seguros</p>
        </div>
        <button
          onClick={handleClearHistory}
          className="clear-button"
          title="Nueva conversación"
        >
          🔄
        </button>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">
              <div className="message-text">{msg.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu pregunta sobre UKUVI..."
          className="message-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  );
}
