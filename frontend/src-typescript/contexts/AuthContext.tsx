import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../src/firebase/firebase';
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import { AuthContextType, AuthProviderProps } from './types';

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(true);

    const getToken = async () => {
        if (!currentUser) return null;
        try {
            const token = await currentUser.getIdToken();
            return token;
        } catch (error) {
            console.error("トークン取得エラー", error);
            return null;
        }
    }

    //Googleでログイン
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Google login result:', result.user); 
            return result.user;
        } catch (error) {
            console.error('Google login error:', error);
            setCurrentUser(null);
            throw error;
        }
    };

    //メール・パスワードでアカウント作成
    const signup = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {

            throw error;
        }
    };

    //メール・パスワードでログイン

    const login = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            setCurrentUser(null);
            throw error;
        }
    };

    //ログアウト
    const logout = () => {
        return signOut(auth);
    };

    //ユーザーの認証状態を監視
    useEffect (() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loginWithGoogle,
        signup,
        login,
        logout,
        getToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}