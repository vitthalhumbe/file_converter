export const inferType = (value) => {
    if (value === "") return null;
    if (!isNaN(value)) return Number(value);
    if (value === "true" || value === "false") return value === "true";
    return value;
}