export interface SaveToLocalStorageProps {
    key: string,
    value: any,
    ignoreStoredValue: boolean,
}
export default function SaveToLocalStorage({ key, value, ignoreStoredValue }: SaveToLocalStorageProps) {
    if (ignoreStoredValue) {
        localStorage.setItem(key, String(value))
    }
}