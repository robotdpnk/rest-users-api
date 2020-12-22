export function alphabeticOrderFn (prop?:string) {
    if (prop) {
        return function (a: any, b: any) {
            return (a[prop] || '').localeCompare(b[prop]);
        }
    } else {
        return function (a: any, b: any) {
            return (a || '').localeCompare(b);

        }
    }
}