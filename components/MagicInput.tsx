"use client";

import { useState } from 'react';
import { parseEventWithAI } from '../services/gemini.ts';
import { CalendarEvent } from '../types/event';

// 1. Definimos qué "props" recibe este componente
interface MagicInputProps {
  onEventCreated: (event: CalendarEvent) => void;
}

// 2. Pasamos las props desestructuradas a la función
export default function MagicInput({ onEventCreated }: MagicInputProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMagic = async () => {
    if (!text.trim()) return; // No enviar si está vacío
    
    setLoading(true);
    const result = await parseEventWithAI(text);
    setLoading(false);
    
    if (result.success && result.event) {
      // 3. ¡Ahora sí! Aquí usamos la función que viene del padre
      onEventCreated(result.event as CalendarEvent); 
      setText(""); // Limpiamos el input tras el éxito
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <textarea 
        className="w-full p-2 border rounded resize-none focus:ring-2 focus:ring-blue-500 outline-none text-black"
        rows={3}
        placeholder="Ej: Reunión con el equipo el viernes a las 4pm en la oficina"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        onClick={handleMagic}
        disabled={loading || !text}
        className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
      >
        {loading ? "✨ Interpretando..." : "✨ Agendar con IA"}
      </button>
    </div>
  );
}