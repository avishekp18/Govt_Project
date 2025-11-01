// import React, { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // You could add language, theme, etc. here

//     const state = {
//         loading,
//         setLoading,
//         error,
//         setError,
//     };

//     return (
//         <AppContext.Provider value={state}>
//             {children}
//         </AppContext.Provider>
//     );
// };
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1. ADD THIS STATE
    // 'hi' = Hindi, 'en' = English. Default to Hindi.
    const [language, setLanguage] = useState('hi');

    // 2. ADD THIS FUNCTION
    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'hi' ? 'en' : 'hi'));
    };

    // 3. ADD TO THE VALUE
    const state = {
        loading,
        setLoading,
        error,
        setError,
        language, // <-- Add this
        toggleLanguage, // <-- Add this
    };

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    );
};