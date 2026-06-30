// Simplified API wrapper for the Hackathon frontend
const BASE_URL = "http://localhost:8000/api/v1";

// In a real application, this is managed by Context/Zustand and stored securely.
// For the demo, we assume the token is acquired and placed in localStorage.
export const getAuthToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("access_token");
    }
    return null;
};

// Hackathon auto-login to ensure the demo never fails on 401
const ensureAuth = async () => {
    let token = getAuthToken();
    if (!token) {
        try {
            const formData = new URLSearchParams();
            formData.append("username", "admin@industrialbrain.ai");
            formData.append("password", "admin123");
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formData.toString()
            });
            if (res.ok) {
                const data = await res.json();
                token = data.access_token;
                if (token) {
                    localStorage.setItem("access_token", token);
                }
            }
        } catch (e) {
            console.error("Auto-login failed", e);
        }
    }
    return token;
};

export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const token = await ensureAuth();
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
};

export const uploadFile = async (file: File) => {
    const token = await ensureAuth();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/ingest/upload`, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
};

export const copilotChat = async (query: string) => {
    return apiCall("/copilot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: [] })
    });
};

export const evaluateCompliance = async (equipment_tag: string, target_regulation: string) => {
    return apiCall("/compliance/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equipment_tag, target_regulation })
    });
};
