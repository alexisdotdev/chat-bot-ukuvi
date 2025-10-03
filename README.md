# 🤖 Chatbot UKUVI - Asistente Virtual

Chatbot inteligente powered by Claude AI (Anthropic) para asistir a usuarios en el uso del CRM UKUVI. Este proyecto está construido con Astro, React, y está optimizado para deploy en Vercel.

## 🌟 Características

- ✅ **Integración con Claude AI** - Respuestas inteligentes usando el modelo Claude 3.5 Sonnet
- ✅ **Base de datos Supabase** - Almacenamiento de conversaciones y historial
- ✅ **Rate Limiting** - Límite de 10 mensajes por minuto por sesión
- ✅ **Interfaz moderna** - UI responsive y atractiva construida con React
- ✅ **Loading States** - Indicadores visuales durante el procesamiento
- ✅ **Manejo de errores** - Mensajes amigables ante cualquier fallo
- ✅ **Nueva conversación** - Botón para limpiar historial y empezar de nuevo
- ✅ **Deploy en Vercel** - Configurado para deployment con un solo click

## 📁 Estructura del Proyecto

```
chatbot-ukuvi/
├── src/
│   ├── components/
│   │   └── ChatInterface.tsx      # Componente React del chat
│   ├── lib/
│   │   ├── anthropic.ts           # Cliente de Claude API
│   │   └── supabase.ts            # Cliente de Supabase
│   ├── pages/
│   │   ├── index.astro            # Página principal
│   │   └── api/
│   │       └── chat.ts            # Endpoint API para el chat
│   └── styles/
│       └── chat.css               # Estilos del chat
├── astro.config.mjs               # Configuración de Astro
├── package.json                    # Dependencias del proyecto
├── vercel.json                     # Configuración para Vercel
├── .env.example                    # Template de variables de entorno
└── README.md                       # Este archivo
```

## 🚀 Instalación Local

### Prerrequisitos

- Node.js 18+ o superior
- pnpm (recomendado) o npm
- Cuenta en [Anthropic](https://console.anthropic.com/) para obtener API key
- Cuenta en [Supabase](https://supabase.com/) para la base de datos

### Pasos

1. **Clonar el repositorio (o usar el proyecto existente)**

```bash
cd chatbot-ukuvi
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Anthropic API Key
ANTHROPIC_API_KEY=tu_api_key_de_anthropic

# Supabase Configuration
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

4. **Configurar la base de datos en Supabase**

Ejecuta el siguiente SQL en el SQL Editor de Supabase para crear la tabla necesaria:

```sql
-- Crear tabla para almacenar mensajes del chat
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por session_id
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);

-- Crear índice para ordenar por fecha
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Crear policy para permitir lecturas públicas (ajustar según necesidades de seguridad)
CREATE POLICY "Allow public read access" ON chat_messages
  FOR SELECT USING (true);

-- Crear policy para permitir inserciones públicas (ajustar según necesidades de seguridad)
CREATE POLICY "Allow public insert access" ON chat_messages
  FOR INSERT WITH CHECK (true);
```

5. **Ejecutar en modo desarrollo**

```bash
pnpm dev
```

El proyecto estará disponible en `http://localhost:4321`

## 📦 Deploy en Vercel

### Opción 1: Deploy desde la interfaz de Vercel

1. **Sube el proyecto a GitHub** (si aún no lo has hecho)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/chatbot-ukuvi.git
git push -u origin main
```

2. **Importa el proyecto en Vercel**

   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Astro

3. **Configura las variables de entorno**

   En la sección "Environment Variables" de Vercel, agrega:

   ```
   ANTHROPIC_API_KEY=tu_api_key_de_anthropic
   SUPABASE_URL=tu_url_de_supabase
   SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   ```

4. **Deploy**

   - Click en "Deploy"
   - Espera a que termine el build y deployment
   - Tu chatbot estará disponible en `https://tu-proyecto.vercel.app`

### Opción 2: Deploy desde la CLI de Vercel

```bash
# Instalar Vercel CLI globalmente
pnpm add -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🌐 Configurar Subdominio Personalizado

Para configurar `chatbot.alexisramos.build`:

1. **En Vercel Dashboard:**
   - Ve a tu proyecto
   - Click en "Settings" > "Domains"
   - Agrega el dominio: `chatbot.alexisramos.build`

2. **En tu proveedor DNS:**
   - Agrega un registro CNAME:
     ```
     Type: CNAME
     Name: chatbot
     Value: cname.vercel-dns.com
     ```

3. **Espera la propagación DNS** (puede tomar hasta 48 horas, normalmente unos minutos)

## 🛠️ Comandos Disponibles

| Comando | Acción |
|---------|--------|
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Construye el proyecto para producción en `./dist/` |
| `pnpm preview` | Preview del build de producción localmente |

## 🔧 Tecnologías Utilizadas

- **[Astro](https://astro.build)** - Framework web moderno
- **[React](https://react.dev)** - Librería UI para componentes interactivos
- **[Anthropic Claude AI](https://www.anthropic.com)** - Modelo de lenguaje para respuestas inteligentes
- **[Supabase](https://supabase.com)** - Base de datos PostgreSQL y backend
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vercel](https://vercel.com)** - Platform de deployment

## 📚 Knowledge Base del Chatbot

El chatbot tiene conocimiento pre-programado sobre:

- Crear contactos en UKUVI
- Generar cotizaciones de seguros
- Gestionar permisos de asesores
- Navegación por los módulos del CRM
- Y mucho más...

Para modificar el conocimiento base, edita el `UKUVI_SYSTEM_PROMPT` en `src/lib/anthropic.ts`.

## 🔐 Seguridad

- Las variables de entorno nunca deben committearse al repositorio
- Supabase RLS (Row Level Security) debe configurarse según tus necesidades de seguridad
- El rate limiting está implementado para prevenir abuso (10 mensajes/minuto)
- Considera agregar autenticación si el chatbot contendrá información sensible

### Personalizar estilos

Edita `src/styles/chat.css` para cambiar colores, fuentes, y layout.

### Modificar rate limiting

En `src/pages/api/chat.ts`, ajusta:

```typescript
const RATE_LIMIT = 10; // número de mensajes
const RATE_LIMIT_WINDOW = 60 * 1000; // ventana en milisegundos
```

## 🐛 Troubleshooting

### Error: "Failed to fetch"
- Verifica que las variables de entorno estén correctamente configuradas
- Revisa que Supabase esté accesible

### Error: "Anthropic API error"
- Verifica que tu API key de Anthropic sea válida
- Revisa que tengas créditos disponibles en tu cuenta

### Estilos no se cargan
- Ejecuta `pnpm build` y luego `pnpm preview` para verificar en producción
- Verifica que `src/styles/chat.css` esté siendo importado en el componente

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
