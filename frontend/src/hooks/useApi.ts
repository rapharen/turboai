import { useAuth } from '@/context/AuthContext';

const useApi = () => {
  const { user } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (user?.token) {
      headers['Authorization'] = `Token ${user.token}`;
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  };

  return apiFetch;
};

export default useApi;
