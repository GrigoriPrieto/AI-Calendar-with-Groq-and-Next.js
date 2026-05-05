"use client";
import { useState } from "react";
import MagicInput from "@/components/MagicInput";
import Calendar from "@/components/Calendar";
import { CalendarEvent } from "@/types/event";

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Esta función añade el evento que viene de la IA a la lista
  const addEvent = (newEvent: CalendarEvent) => {
    setEvents((prev) => [...prev, { ...newEvent, id: crypto.randomUUID() }]);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Planner ✨</h1>
          <p className="text-gray-600">IA + Calendario: La combinación perfecta.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Input */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Añadir Evento</h2>
            <MagicInput onEventCreated={addEvent} />
          </div>

          {/* Columna derecha: Calendario */}
          <div className="lg:col-span-2">
            <Calendar events={events} />
          </div>
        </div>
      </div>
    </main>
  );
}