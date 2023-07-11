import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../config/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');

    const auth = getAuth(app);

    const signUp = async (email, password) => {
        try {
            setLoader(true);
            return await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            setLoader(true);
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    };

    const logout = async () => {
        try {
            return await signOut(auth);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    };

    const updateUser = async (displayName, photo) => {
        try {
            await updateProfile(auth.currentUser, { displayName: displayName, photoURL: photo });
            setUser(auth.currentUser);
        } catch (error) {
            setError(error.code);
            throw error;
        }
    };

    // Observe user state (auth)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoader(false);
        });

        return () => unsubscribe();
    }, [auth]);

    const contextValue = {
        user,
        loader,
        setLoader,
        signUp,
        login,
        logout,
        updateUser,
        error,
        setError
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
