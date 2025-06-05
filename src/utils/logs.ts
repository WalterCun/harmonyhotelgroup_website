/**
 * Crea un objeto logger que solo registra cuando está habilitado
 */
export interface Logger {
    log: (message: string, data?: any) => void;
    warn: (message: string, data?: any) => void;
    error: (message: string, data?: any) => void;
}

export function createLogger(enabled: boolean): Logger {
    return {
        log: (message, data) => enabled && console.log(message, data),
        warn: (message, data) => console.warn(message, data),
        error: (message, data) => console.error(message, data)
    };
}
