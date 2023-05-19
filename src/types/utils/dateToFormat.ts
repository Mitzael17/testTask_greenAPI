export type FormatDatePattern = 'Y-m-d' |'Y-m' | 'Y' | 'Y-m-d h:i:s' | 'Y-m-d h:i' | 'Y-m-d h' | 'h:i:s' | 'h:i' | 'h';

export interface DateComponents {
    Y: string,
    m: string,
    d: string,
    h: string,
    i: string,
    s: string
}