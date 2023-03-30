export class Regex {
    public static isNumber(data: string): boolean {
        return /\d$/.test(data)
    }
    public static hasNumber(data: string): boolean {
        return /\d/.test(data)
    }
    public static hasLowerCase(data: string): boolean {
        return (/[a-z]/.test(data))
    }
    public static hasUpperCase(data: string): boolean {
        return (/[A-Z]/.test(data))
    }
}