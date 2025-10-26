const API_BASE_URL = 'https://healthtrack-backend-redj.onrender.com';

interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  token?: string;
  user?: any;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const json = JSON.parse(text);
      message = json.message || json.error || text;
    } catch {
      // Use text as-is
    }
    throw new ApiError(response.status, message);
  }

  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text() as any;
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}

export const api = {
  // Auth endpoints
  async register(data: { name: string; email: string; password: string; age?: number }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse>(response);
  },

  async login(data: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse>(response);
  },

  // Medications endpoints
  async getMedications() {
    const response = await fetch(`${API_BASE_URL}/medications`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<ApiResponse>(response);
  },

  async addMedication(data: { name: string; dosage: string; frequency: string; instructions?: string }) {
    const response = await fetch(`${API_BASE_URL}/medications`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse>(response);
  },

  async getMedication(id: string) {
    const response = await fetch(`${API_BASE_URL}/medications/${id}`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<ApiResponse>(response);
  },

  // Health Metrics endpoints
  async getMetrics() {
    const response = await fetch(`${API_BASE_URL}/metrics`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<ApiResponse>(response);
  },

  async addMetric(data: any) {
    const response = await fetch(`${API_BASE_URL}/metrics`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse<ApiResponse>(response);
  },

  async getMetricHistory() {
    const response = await fetch(`${API_BASE_URL}/metrics/history`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    return handleResponse<ApiResponse>(response);
  },
};
