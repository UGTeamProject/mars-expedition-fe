import { createContext, useState, ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { api } from '../services/api';

interface User {
    username: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    signup: (userData: { username: string; email: string; password: string }) => Promise<void>;
    login: (credentials: { usernameOrEmail: string; password: string }) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [_, setCookie, removeCookie] = useCookies(['JSESSIONID']);

    const signup = async (userData: { username: string; email: string; password: string }) => {
        try {
            const response = await api.post('/player', userData);
            const { token } = response.data;
            setCookie('JSESSIONID', token, { path: '/', httpOnly: false, sameSite: 'strict' });

            console.log('User registered:', response.data);
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    const login = async (credentials: { usernameOrEmail: string; password: string }) => {
        try {
            const response = await api.post('/player/login', credentials);
            const { username, token } = response.data;

            setCookie('JSESSIONID', token, { path: '/', httpOnly: false, sameSite: 'strict' });
            localStorage.setItem('username', username);

            console.log('Login successful');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        removeCookie('JSESSIONID', { path: '/' });
        localStorage.removeItem('username');
    };

    return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
};
