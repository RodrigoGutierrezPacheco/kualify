export function formatDateWithoutTimeZone(dateString: string): string {
    // Asumimos que dateString viene en formato aaaa-mm-dd
    const [year, month, day] = dateString.split('-');
    // Creamos la fecha en UTC para evitar problemas de zona horaria
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      timeZone: 'UTC' // Forzar a usar UTC en la visualización
    });
}