export type TimerSettingSliderItem = {
    name: "workDuration" | "shortRestDuration" | "longRestDuration",
    title: string,
    max: number,
    min: number,
    step: number,
}