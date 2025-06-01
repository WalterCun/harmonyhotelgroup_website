/**
 * Clase de utilidades para manipulación de fechas
 * Proporciona métodos estáticos para operaciones comunes con fechas
 */


// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export  class DateUtils {
    /**
     * Calcula la diferencia en días entre dos fechas
     * @param fechaInicio - Fecha de inicio en formato string (YYYY-MM-DD)
     * @param fechaFin - Fecha de fin en formato string (YYYY-MM-DD)
     * @param incluirUltimoDia - Si se debe incluir el último día en el cálculo (por defecto: false)
     * @returns Número de días entre las fechas o 0 si las fechas son inválidas
     */
    static differenceDays(
        fechaInicio: string,
        fechaFin: string,
        incluirUltimoDia = false
    ): number {
        try {
            const inicio = new Date(fechaInicio);
            const fin = new Date(fechaFin);

            // Verificar que las fechas sean válidas
            // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
            if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
                console.error('Fechas inválidas:', {fechaInicio, fechaFin});
                return 0;
            }

            // Calcular diferencia en milisegundos
            const diferenciaMilisegundos = fin.getTime() - inicio.getTime();

            // Convertir a días
            const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

            // Opcional: incluir el día de salida
            return incluirUltimoDia ? diferenciaDias + 1 : diferenciaDias;
        } catch (error) {
            console.error('Error al calcular diferencia de días:', error);
            return 0;
        }
    }

    /**
     * Obtiene una fecha con días añadidos o restados
     * @param fecha - Fecha base (string en formato YYYY-MM-DD o Date)
     * @param dias - Número de días a añadir (negativo para restar)
     * @returns Nueva fecha como string en formato YYYY-MM-DD
     */
    static addDays(fecha: string | Date, dias: number): string {
        try {
            const fechaObj = typeof fecha === 'string' ? new Date(fecha) : new Date(fecha.getTime());
            fechaObj.setDate(fechaObj.getDate() + dias);

            return fechaObj.toISOString().split('T')[0];
        } catch (error) {
            console.error('Error al añadir días:', error);
            return '';
        }
    }

    /**
     * Obtiene la fecha actual en formato YYYY-MM-DD
     * @returns Fecha actual como string en formato YYYY-MM-DD
     */
    static obtenerFechaActual(): string {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0];
    }

}