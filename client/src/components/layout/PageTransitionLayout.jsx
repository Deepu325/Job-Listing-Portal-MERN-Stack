import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../ui/components_lite/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import api from '@/utils/api';

const PageTransitionLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);

    // Sync profile data to ensure Navbar is always up to date
    useEffect(() => {
        const syncProfile = async () => {
            if (user) {
                try {
                    let endpoint = "/api/v1/profile/jobseeker";
                    if (user.role === "Employer") {
                        endpoint = "/api/v1/profile/employer";
                    }

                    const res = await api.get(`${endpoint}?t=${new Date().getTime()}`);

                    // Check if profile needs update
                    const currentProfile = user.profile || {};
                    const newProfile = res.data;

                    // JSON stringify comparison is safer for deep objects, or just check key fields
                    // For now, let's update if the core ID or picture/logo changed, or if we didn't have a profile before
                    const currentImage = currentProfile.profilePicture || currentProfile.logo;
                    const newImage = newProfile.profilePicture || newProfile.logo;

                    if (!user.profile || currentImage !== newImage || currentProfile._id !== newProfile._id) {
                        const updatedUser = { ...user, profile: res.data };
                        dispatch(setUser(updatedUser));
                    }
                } catch (error) {
                    // Silent fail or token invalid
                }
            }
        };
        syncProfile();
    }, [location.pathname, dispatch]); // specific dependencies to avoid loops, run on route change


    return (
        <div className={`flex flex-col min-h-screen relative ${location.pathname === '/' ? '' : 'pt-24'}`}>
            <Navbar />
            <main className="flex-grow z-10">
                <Outlet />
            </main>
        </div>
    );
};

export default PageTransitionLayout;
