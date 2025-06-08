/**
 * Crea un objeto logger que solo registra cuando está habilitado
 * y/o cuando el archivo está incluido en la variable de entorno DEBUG_PRINT
 */
export interface Logger {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}


/**
 * Comprueba si el logger debe estar habilitado basado en:
 * 1. La variable de entorno DEBUG (habilita/deshabilita globalmente)
 * 2. Si el nombre del archivo está incluido en la variable de entorno DEBUG_PRINT
 * En producción, si DEBUG es false o DEBUG_PRINT está vacío, no se imprime nada
 */
function isLoggerEnabled(enabled: boolean, filename: string): boolean {
    // En el entorno del navegador o donde process no está definido
    if (typeof process === 'undefined') {
        return enabled;
    }

    // Verifica la variable DEBUG (true/false) - sobreescribe el parámetro enabled
    const debugEnv = process.env.DEBUG;
    const globalDebugEnabled = debugEnv === 'true' || debugEnv === '1';

    // Si DEBUG es explícitamente false, deshabilita todos los logs
    if (debugEnv === 'false' || debugEnv === '0') {
        return false;
    }

    // Si no hay DEBUG definido, usa el parámetro enabled
    const isDebugEnabled = debugEnv !== undefined ? globalDebugEnabled : enabled;

    // Si el debug global está deshabilitado, no imprime nada
    if (!isDebugEnabled) {
        return false;
    }

    // Verifica DEBUG_PRINT para filtrar por nombre de archivo
    const debugPrintEnv = process.env.DEBUG_PRINT || '';

    // Si DEBUG_PRINT está vacío, usa el valor de enabled/DEBUG
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
        if (pattern.endsWith('*') && filename.startsWith(pattern.slice(0, -1))) return true;

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

export function createLogger(enabled: boolean, filename?: string): Logger {
    // Si no se proporciona un nombre de archivo, intentamos detectarlo automáticamente
    const logFilename = filename || getCallerFilename();

    return {
        log: (...args) => {
            if (isLoggerEnabled(enabled, logFilename)) {
                console.log(`[${logFilename}]`, ...args);
            }
        },
        warn: (...args) => {
            if (isLoggerEnabled(enabled, logFilename)) {
                console.warn(`[${logFilename}]`, ...args);
            }
        },
        error: (...args) => {
            // Los errores también siguen la misma lógica de filtrado
            if (isLoggerEnabled(enabled, logFilename)) {
                console.error(`[${logFilename}]`, ...args);
            }
        }
    };
}

/*
// Uso básico - desactivado por defecto
const logger = createLogger(false);

// En algún archivo auth.service.ts
const authLogger = createLogger(false, 'auth.service.ts');
authLogger.log('Intento de autenticación');
// Solo se mostrará si DEBUG=true y DEBUG_PRINT incluye auth.service.ts o está vacío

// Puedes especificar manualmente el nombre del archivo
const paymentLogger = createLogger(false, 'payment');

* */