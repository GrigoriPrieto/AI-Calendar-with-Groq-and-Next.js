# ✨ Smart Planner AI

Un calendario inteligente desarrollado con **Next.js 15** que utiliza Inteligencia Artificial (**Llama 3 vía Groq**) para interpretar lenguaje natural y agendar eventos automáticamente.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Groq](https://img.shields.io/badge/AI_Engine-Llama_3.3_Groq-orange?style=for-the-badge)

## 🚀 Características

- 🧠 **Procesamiento de Lenguaje Natural**: Escribe "Cena con el equipo el próximo viernes a las 8pm" y la IA calculará la fecha exacta y creará el evento.
- 📅 **Calendario Interactivo**: Visualización profesional mediante FullCalendar con vistas de mes y semana.
- ⚡ **Velocidad Extrema**: Gracias a la infraestructura de Groq, la extracción de datos es casi instantánea.
- 🛡️ **Arquitectura Segura**: Las peticiones de IA se gestionan en el servidor (API Routes) para proteger las API Keys.

## 🛠️ Tecnologías utilizadas

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **IA:** [Groq SDK](https://groq.com/) (Modelo Llama-3.3-70b)
- **Calendario:** [FullCalendar](https://fullcalendar.io/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)

## 📦 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/smart-planner-ai.git](https://github.com/TU_USUARIO/smart-planner-ai.git)
   cd smart-planner-ai

2. **Instalar dependencias**
    ```bash
    npm install

3. **Configurar variables del entorno**
    Crea un archivo **.env.local** en la raiz y añade tu clave de Groq:
    ´´´bash
    GROQ_API_KEY=tu_api_key_aqui

4. **Ejecutar en modo desarrollo:**
    ´´´bash
    npm run dev

    Abre http://localhost:3000 en tu navegador
    
**💡 Cómo funciona**
    El proyecto utiliza un System Prompt dinámico que inyecta la fecha y hora actual en cada petición. Esto permite que modelos de lenguaje (LLMs) que normalmente no tienen noción del tiempo puedan entender conceptos relativos como "mañana", "el lunes que viene" o "dentro de dos horas".

**Ejemplo de la lógica del servidor**
    ´´´TypeScript
    
const now = new Date();
const dateReference = `Hoy es ${now.toLocaleDateString()}`;
// ... la IA recibe este contexto para calcular las fechas ISO

**Licencia**
    Este proyecto es de código abierto y está bajo la licencia MIT.
    

