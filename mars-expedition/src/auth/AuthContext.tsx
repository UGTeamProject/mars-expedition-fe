import { createContext, useState, ReactNode } from 'react';

interface User {
    username: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    signup: (userData: User) => void;
    login: (userData: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const signup = (user: User) => {
        setUser(user);
    };

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>;
};
