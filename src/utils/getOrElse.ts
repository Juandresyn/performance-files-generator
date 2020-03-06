export const getOrElse = <K, V>(map: Map<K, V>, key: K, orElse: () => V): V => {
    if (map.has(key)) {
        return map.get(key);
    }
    return orElse();
};
