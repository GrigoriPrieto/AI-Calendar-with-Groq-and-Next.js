// services/gemini.ts
import { AIResponse } from "../types/event";

export const parseEventWithAI = async (userInput: string): Promise<AIResponse> => {
  try {
    // Llamamos a NUESTRA propia API que creamos en app/api/chat/route.ts
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Extrae datos de este evento: "${userInput}". 
        Devuelve SOLO un JSON con: title, start, end, location, category.`
      }),
    });

    const data = await response.json();

    if (data.error) throw new Error(data.error);

    // Limpiamos el texto por si la IA añade bloques de código markdown
    const jsonString = data.text.replace(/```json|```/g, "").trim();
    
    return { 
      success: true, 
      event: JSON.parse(jsonString) 
    };
  } catch (error: any) {
    console.error("Error en el servicio gemini.ts:", error);
    return { success: false, error: error.message };
  }
};