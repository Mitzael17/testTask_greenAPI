export function deleteHTMLTags(value: string) {

    value = value.replaceAll('<br>', '\n');
    value = value.replaceAll('&nbsp;', ' ');

    return value.replace(/<(.|\n)*?>/g, '');

}