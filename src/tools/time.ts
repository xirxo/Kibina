export function time(ms = Date.now()): string {
    return new Date(ms).toLocaleDateString();
}