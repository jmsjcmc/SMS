import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
interface User {
    id: string;
    name: string;
    email: string;
}
// Define what the context will contain
interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    logIn: (userData: User, token: string) => void;
    logOut: () => void;
    updateUser: (updatedUserData: Partial<User>) => void;
    checkAuthStatus: () => Promise<void>;
}
// Create the context with a proper default type
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Custom hook for consuming the context
export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
// Define props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}
// Provider component
export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');
            if (token && userStr) {
                const userData: User = JSON.parse(userStr);
                setUser(userData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Auth check failer:', error);
            logOut();
        } finally {
            setLoading(false);
        }
    }

    const logIn = (userData: User, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };
    
    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
    };

    const updateUser = (updateUserData: Partial<User>) => {
        const newUserData = {...user, ...updateUserData} as User;
        localStorage.setItem('user', JSON.stringify(newUserData));
        setUser(newUserData);
    };

    const value: AuthContextType = {
        user,
        loading,
        isAuthenticated,
        logIn,
        logOut,
        updateUser,
        checkAuthStatus
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

