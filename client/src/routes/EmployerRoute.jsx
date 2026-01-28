import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EmployerRoute = ({ children }) => {
    const { user, isAuth } = useContext(AuthContext);

    // If not authenticated, redirect to login
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated but not an Employer, redirect to profile
    if (user && user.role !== "Employer") {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default EmployerRoute;
