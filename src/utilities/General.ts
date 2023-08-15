export const removeHtmlTags = (input: string) => {
    const regex = /<[^>]+>/g;
    return input.replace(regex, '');
};

export const clamp = (min: number, preferred: number, max: number) => {
    return Math.min(Math.max(preferred, min), max);
};
