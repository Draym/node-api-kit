export class Regex {
    public static hasNumber(data) {
        return /\d/.test(data);
    }
    public static hasLowerCase(data) {
        return (/[a-z]/.test(data));
    }
    public static hasUpperCase(data) {
        return (/[A-Z]/.test(data));
    }
}