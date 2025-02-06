import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
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
            throw error;
        }
    };

    //メール・パスワードでアカウント作成
    const signup = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            throw error;
        }
    };

    //メール・パスワードでログイン

    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
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