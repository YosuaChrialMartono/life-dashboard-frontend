export interface SaveToLocalStorageProps {
    key: string,
    value: string, // Must be in json array format
    ignoreStoredValue: boolean,
}
export default function SaveToLocalStorage({ key, value, ignoreStoredValue }: SaveToLocalStorageProps) {
    if (ignoreStoredValue) {
        localStorage.setItem(key, String(value))
    } else {
        const currValue = JSON.parse(localStorage.getItem(key) || "[]")
        const newValue = JSON.stringify([
            ...currValue,
            ...JSON.parse(value),
        ])
        localStorage.setItem(key, newValue)
    }
}