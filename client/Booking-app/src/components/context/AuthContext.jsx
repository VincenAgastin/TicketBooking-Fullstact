import { createContext, useEffect, useReducer } from "react";

// Attempt to get the user from localStorage and parse it
let user = null;

try {
    const storedUser = localStorage.getItem("user");
    // Check if storedUser is not null and parse it
    user = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
    console.error("Error parsing user from localStorage:", error);
}

const INITIAL_STATE = {
    user: user,
    loading: false,
    error: null
};

const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS": // Fixed case typo from "SUCCESS" to "LOGIN_SUCCESS"
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
