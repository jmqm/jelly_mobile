const TICKS_PER_MILLISECOND = 10000;

export const ticksToMilliseconds = (ticks: number) => {
    return ticks / TICKS_PER_MILLISECOND;
};

export const ticksToMinutes = (ticks: number) => {
    return ticksToMilliseconds(ticks) / 60000;
};

export const minutesToMilliseconds = (minutes: number) => {
    return secondsToMilliseconds(minutes * 60);
};

export const secondsToMilliseconds = (seconds: number) => {
    return seconds * 1000;
};
