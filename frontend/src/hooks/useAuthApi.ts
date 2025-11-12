import {useAuth} from '@/context/AuthContext';

const useAuthApi = () => {
    const {login} = useAuth();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const loginUser = async (username: string, password: string) => {
        const response = await fetch(`${apiUrl}/login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        login({username, token: data.token});
        return data;
    };

    const registerUser = async (username: string, password: string) => {
        const response = await fetch(`${apiUrl}/register/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    };

    return {loginUser, registerUser};
};

export default useAuthApi;
