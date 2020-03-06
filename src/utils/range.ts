export const range = (from: number, to: number): number[] => {
    const arr = [];
    for (let index = from; index < to; index++) {
        arr.push(index);
    }
    return arr;
};
