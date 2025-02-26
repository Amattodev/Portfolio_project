import { User as FirebaseUser } from 'firebase/auth';

export interface AuthContextType {
    currentUser: FirebaseUser | null;
    loginWithGoogle: () => Promise<FirebaseUser>;
    signup: (email: string, password: string) => Promise<FirebaseUser>;
    login: (email: string, password: string) => Promise<FirebaseUser>;
    logout: () => Promise<void>;
    getToken: () => Promise<string | null>;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}

export interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export interface SearchProviderProps {
    children: React.ReactNode;
}