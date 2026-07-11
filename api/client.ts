const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://oq4afpwtja.execute-api.us-east-1.amazonaws.com/prod";

export async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`
    const res = await fetch(url, {
        ...options,
    });
    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }
    return res.json();
}