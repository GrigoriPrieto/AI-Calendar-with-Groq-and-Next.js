// types/event.ts

export interface CalendarEvent {
  id?: string;          
  title: string;
  start: string;        // Usaremos string (ISO 8601) para facilitar el manejo con inputs
  end: string;
  description?: string;
  location?: string;
  category: 'work' | 'personal' | 'health' | 'other';
}

// Este tipo lo usaremos para lo que nos devuelva la IA 
export interface AIResponse {
  success: boolean;
  event?: Partial<CalendarEvent>; // Un evento parcial con lo que la IA logre extraer
  error?: string;
}
