export const getCategoryColorVar = (color: string) => {
    const match = color.match(/bg-\[(--color-cat-\w+)]/);
    return match ? match[1] : '--color-cat-random';
};