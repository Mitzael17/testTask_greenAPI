import {CookieOptions} from "../types/utils/cookie";

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (const optionKey in options) {

        updatedCookie += "; " + optionKey;

        const optionValue = options[optionKey as keyof CookieOptions];

        if (optionValue !== true) updatedCookie += "=" + optionValue;

    }

    document.cookie = updatedCookie;

}

export function getCookie(name: string): string|undefined {

    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;

}

export function deleteCookie(name: string): void {

    setCookie(name, "", {
        'max-age': -1
    })

}