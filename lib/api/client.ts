const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {

        },
        ...options,
    });
    if (!res.ok) {
        throw new Error(`API Error: {res.status}`);
    }
    return res.json();
}