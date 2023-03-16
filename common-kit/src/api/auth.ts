export default class Auth {
    apiKey: string | null
    token: string | null

    private constructor(token: string | null, apiKey: string | null) {
        this.token = token
        this.apiKey = apiKey
    }

    public static extract(wrapper: {[key: string]: any}): Auth {
        return new Auth(wrapper.token, wrapper.apiKey)
    }

    public static token(value: string): Auth {
        return new Auth(value, null)
    }

    public static apiKey(value: string): Auth {
        return new Auth(null, value)
    }

    public static full(token: string, apiKey: string) {
        return new Auth(token, apiKey)
    }

    public populateHeader(headers: { [key: string]: string }) {
        if (this.token != null) {
            headers['Authorization'] = `Bearer ${this.token}`
        }
        if (this.apiKey != null) {
            headers['x-api-key'] = this.apiKey
        }
    }
}