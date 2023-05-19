import {DateComponents, FormatDatePattern} from "../types/utils/dateToFormat";

export function dateToFormat(date: Date, format: FormatDatePattern): string {

    const dateComponents: DateComponents = {
        Y: '' + date.getFullYear(),
        m: '0' + (date.getMonth() + 1),
        d: '0' + date.getDate(),
        h: '0' + date.getHours(),
        i: '0' + date.getMinutes(),
        s: '0' + date.getSeconds()
    }

    return format.replace(/[A-z]/g, function (letter) {

        return letter !== 'Y' ? dateComponents[letter as keyof DateComponents].slice(-2) : dateComponents[letter as keyof DateComponents];

    });

}