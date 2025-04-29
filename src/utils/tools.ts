// Crear un rango del 1 al 5
export function range(start:number, end:number) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}