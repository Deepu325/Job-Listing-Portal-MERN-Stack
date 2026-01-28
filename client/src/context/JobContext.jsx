import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobs = async (params = {}) => {
        try {
            setLoading(true);
            const res = await api.get('/api/v1/jobs', { params });
            const fetchedJobs = res.data.jobs || res.data || [];

            setJobs(fetchedJobs);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
            setJobs([]);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <JobContext.Provider value={{ jobs, loading, error, fetchJobs }}>
            {children}
        </JobContext.Provider>
    );
};
