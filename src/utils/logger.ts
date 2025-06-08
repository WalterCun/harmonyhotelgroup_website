/**
 * Niveles de log soportados
 */
export enum LogLevel {
    TRACE = 6,
    DEBUG = 5,
    INFO = 4,
    LOG = 3,
    WARN = 2,
    ERROR = 1,
    NONE = 0 // Para desactivar completamente el logging
}

/**
 * Interfaz para el logger
 */
export interface Logger {
    trace: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

/**
 * Colores ANSI para la consola
 */
export const LogColors = {
    RESET: "\x1b[0m",
    BRIGHT: "\x1b[1m",
    DIM: "\x1b[2m",
    UNDERSCORE: "\x1b[4m",

    // Colores específicos para cada nivel de log
    TRACE: "\x1b[90m",     // Gris claro
    DEBUG: "\x1b[36m",     // Cian
    INFO: "\x1b[32m",      // Verde
    LOG: "\x1b[0m",        // Blanco (default)
    WARN: "\x1b[33m",      // Amarillo
    ERROR: "\x1b[31m",     // Rojo

    // Colores de fondo para énfasis adicional
    BG_RED: "\x1b[41m",
    BG_YELLOW: "\x1b[43m",

    // Colores para destacar información específica
    FILENAME: "\x1b[35m",  // Magenta para nombres de archivo
    TIME: "\x1b[34m"       // Azul para marcas de tiempo
};


/**
 * Determina si un nivel de log específico debe ser mostrado
 * basado en la configuración del logger y las variables de entorno.
 */
function shouldLog(
    enabled: boolean,
    filename: string,
    level: LogLevel
): boolean {
    if (!enabled) {
        return false;
    }

    // Los niveles WARN y ERROR siempre se muestran
    if (level >= LogLevel.WARN) {
        return true;
    }

    // En el entorno del navegador o donde import.meta.env no está definido
    if (typeof import.meta.env === 'undefined') {
        return enabled;
    }

    // Verifica la variable DEBUG (true/false)
    const debugEnv = import.meta.env.PUBLIC_DEBUG;
    const globalDebugEnabled = debugEnv === 'true' || debugEnv === '1';

    // Si DEBUG es explícitamente false, deshabilita todos los logs (excepto WARN y ERROR)
    if (debugEnv === 'false' || debugEnv === '0') {
        return false;
    }

    // Si enabled es false explícitamente, no mostrar logs (excepto WARN y ERROR)
    if (!enabled) {
        return false;
    }

    // Si no hay DEBUG definido o enabled es true, usar enabled
    const isDebugEnabled = debugEnv !== undefined ? globalDebugEnabled : enabled;

    // Si el debug global está deshabilitado, no imprime nada
    if (!isDebugEnabled) {
        return false;
    }

    // Verifica DEBUG_PRINT para filtrar por nombre de archivo
    const debugPrintEnv = import.meta.env.PUBLIC_DEBUG_PRINT || '';

    // Si DEBUG_PRINT está vacío, usar el valor de enabled/DEBUG
    if (!debugPrintEnv) {
        return isDebugEnabled;
    }

    // DEBUG_PRINT puede contener múltiples nombres de archivo separados por comas
    const debugPatterns = debugPrintEnv.split(',').map(p => p.trim());

    // Comprueba si el nombre del archivo coincide con alguno de los patrones
    return debugPatterns.some(pattern => {
        // Soporte para comodines: * coincide con cualquier cosa
        if (pattern === '*') return true;

        // Soporte para patrones como "auth*" que coincidirían con "auth.service.ts"
        if (pattern.endsWith('*') && filename.startsWith(pattern.slice(0, -1))) {
            return true;
        }

        // Coincidencia exacta
        return filename === pattern;
    });
}

/**
 * Obtiene el nombre del archivo desde donde se llama al logger
 */
function getCallerFilename(): string {
    const stackTrace = new Error().stack || '';
    const stackLines = stackTrace.split('\n');

    // Ignoramos las primeras líneas (Error, getCallerFilename y createLogger)
    // y buscamos la línea que corresponde al llamador real
    const callerLine = stackLines[3] || '';

    // Extraemos el nombre del archivo
    const fileMatch = callerLine.match(/\((.+?):\d+:\d+\)/) ||
        callerLine.match(/at (.+?):\d+:\d+/);

    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (fileMatch && fileMatch[1]) {
        const fullPath = fileMatch[1];
        return fullPath.split('/').pop() || fullPath.split('\\').pop() || 'unknown';
    }

    return 'unknown';
}

/**
 * Obtiene una marca de tiempo formateada para los logs
 */
function getFormattedTime(): string {
    const now = new Date();
    return now.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS
}

/**
 * Formatea una etiqueta de log con colores
 */
function formatLogLabel(level: string, filename: string): string {
    const time = getFormattedTime();
    const color = LogColors[level as keyof typeof LogColors] || LogColors.LOG;

    return `${LogColors.TIME}[${time}]${LogColors.RESET} ${color}[${level}]${LogColors.RESET} ${LogColors.FILENAME}[${filename}]${LogColors.RESET}`;
}

/**
 * Verifica si el entorno soporta colores
 * (los navegadores modernos y la mayoría de terminales lo soportan)
 */
function supportsColor(): boolean {
    // En navegadores modernos o Node.js reciente, los colores son soportados
    // Para entornos específicos, podría añadirse detección más avanzada
    return true;
}

/**
 * Crea un objeto logger que se comporta según los siguientes criterios:
 * - Si enabled=false, no muestra logs normales aunque globalDebug esté en true
 * - Los logs de warn y error siempre se muestran
 * - Implementa tipos adicionales de logs (trace, debug, info)
 *
 * @param enabled Si se debe habilitar el logging para este logger
 * @param filename Nombre de archivo opcional (se detecta automáticamente si no se proporciona)
 * @param minLevel Nivel mínimo de log a mostrar (por defecto LOG)
 */
export function createLogger(
    enabled: boolean,
    filename?: string,
    minLevel: LogLevel = LogLevel.LOG
): Logger {
    // Si no se proporciona un nombre de archivo, intentamos detectarlo automáticamente
    const logFilename = filename || getCallerFilename();

    // Verificamos si el entorno soporta colores
    const useColors = supportsColor();


    return {
        trace: (...args) => {
            if (minLevel <= LogLevel.TRACE && shouldLog(enabled, logFilename, LogLevel.TRACE)) {
                if (useColors) {
                    console.trace(formatLogLabel('TRACE', logFilename), LogColors.TRACE, ...args, LogColors.RESET);
                } else {
                    console.trace(`[TRACE][${logFilename}]`, ...args);
                }
            }
        },
        debug: (...args) => {
            if (minLevel <= LogLevel.DEBUG && shouldLog(enabled, logFilename, LogLevel.DEBUG)) {
                if (useColors) {
                    console.debug(formatLogLabel('DEBUG', logFilename), LogColors.DEBUG, ...args, LogColors.RESET);
                } else {
                    console.debug(`[DEBUG][${logFilename}]`, ...args);
                }
            }
        },
        info: (...args) => {
            if (minLevel <= LogLevel.INFO && shouldLog(enabled, logFilename, LogLevel.INFO)) {
                if (useColors) {
                    console.info(formatLogLabel('INFO', logFilename), LogColors.INFO, ...args, LogColors.RESET);
                } else {
                    console.info(`[INFO][${logFilename}]`, ...args);
                }
            }
        },
        log: (...args) => {
            if (minLevel <= LogLevel.LOG && shouldLog(enabled, logFilename, LogLevel.LOG)) {
                if (useColors) {
                    console.log(formatLogLabel('LOG', logFilename), ...args);
                } else {
                    console.log(`[LOG][${logFilename}]`, ...args);
                }
            }
        },
        warn: (...args) => {
            // Los warnings siempre se muestran
            if (useColors) {
                console.warn(formatLogLabel('WARN', logFilename), LogColors.WARN, ...args, LogColors.RESET);
            } else {
                console.warn(`[WARN][${logFilename}]`, ...args);
            }
        },
        error: (...args) => {
            // Los errores siempre se muestran
            if (useColors) {
                console.error(formatLogLabel('ERROR', logFilename), LogColors.ERROR, LogColors.BRIGHT, ...args, LogColors.RESET);
            } else {
                console.error(`[ERROR][${logFilename}]`, ...args);
            }
        }
    };

}