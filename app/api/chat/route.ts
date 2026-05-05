// app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Configuramos el cliente de Groq usando la librería de OpenAI
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 1. Punto de referencia temporal (CRUCIAL para lenguaje natural)
    const now = new Date();
    // Ejemplo: "Hoy es domingo, 12 de abril de 2026, y son las 21:45:00"
    const dateReference = `Hoy es ${now.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} y la hora actual es ${now.toLocaleTimeString('es-ES')}.`;

    // 2. Llamada a Groq
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres un asistente experto en gestión de calendarios. 
          ${dateReference}
          
          Tu tarea es extraer información de eventos de los mensajes del usuario y devolverlos en formato JSON estricto.
          
          REGLAS DE EXTRACCIÓN:
          - "mañana" se refiere al día siguiente de la fecha de referencia.
          - Si no se especifica hora de fin, asume que dura 1 hora.
          - Si el usuario dice "lunes", busca el próximo lunes a partir de la fecha de hoy.
          - Usa el formato ISO 8601 (YYYY-MM-DDTHH:mm:ss) para las fechas.
          - Categorías permitidas: "work", "personal", "health", "other".

          DEBES DEVOLVER ÚNICAMENTE UN OBJETO JSON CON ESTA ESTRUCTURA:
          {
            "title": "nombre del evento",
            "start": "fecha inicio ISO",
            "end": "fecha fin ISO",
            "category": "categoría"
          }`
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1, // Baja temperatura para mayor precisión técnica
      response_format: { type: "json_object" }, // Fuerza la respuesta en JSON puro
    });

    const aiText = chatCompletion.choices[0]?.message?.content || "{}";

    return NextResponse.json({ text: aiText });
  } catch (error: any) {
    console.error("Error en el servidor (Groq):", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud con la IA" },
      { status: 500 }
    );
  }
}