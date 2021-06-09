export function time(ms = Date.now()): string {
    const date = new Date(ms).toString().split(/ +/);
    return `${date[0]} ${date[2]} ${date[1]} ${date[3]} ${date[4]}`;
}

export function toHumanString(ms = Date.now()): string {
    let totalSeconds = (ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}