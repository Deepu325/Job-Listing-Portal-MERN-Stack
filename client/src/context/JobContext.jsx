import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dummy job data fallback
    const dummyJobs = [
        {
            _id: '1',
            title: 'Senior Frontend Developer',
            company: 'TechCorp India',
            location: 'Bangalore',
            jobType: 'Full-time',
            category: 'Technology',
            description: 'We are looking for an experienced frontend developer proficient in React, TypeScript, and modern CSS frameworks.',
            salary: '₹18-25 LPA',
        },
        {
            _id: '2',
            title: 'Backend Engineer',
            company: 'StartupHub',
            location: 'Mumbai',
            jobType: 'Full-time',
            category: 'Engineering',
            description: 'Join our team to build scalable APIs using Node.js and MongoDB.',
            salary: '₹15-22 LPA',
        },
        {
            _id: '3',
            title: 'UI/UX Designer',
            company: 'DesignStudio',
            location: 'Delhi',
            jobType: 'Full-time',
            category: 'Design',
            description: 'Create beautiful user experiences for web and mobile applications.',
            salary: '₹12-18 LPA',
        },
        {
            _id: '4',
            title: 'Digital Marketing Manager',
            company: 'GrowthHackers',
            location: 'Hyderabad',
            jobType: 'Full-time',
            category: 'Marketing',
            description: 'Lead our digital marketing initiatives including SEO, SEM, and social media.',
            salary: '₹14-20 LPA',
        },
        {
            _id: '5',
            title: 'Sales Executive',
            company: 'SalesForce Pro',
            location: 'Pune',
            jobType: 'Full-time',
            category: 'Sales',
            description: 'Drive B2B sales and build client relationships. Excellent communication skills required.',
            salary: '₹8-15 LPA + Commission',
        },
        {
            _id: '6',
            title: 'Financial Analyst',
            company: 'FinanceFirst',
            location: 'Mumbai',
            jobType: 'Full-time',
            category: 'Finance',
            description: 'Analyze financial data and create reports for business decisions. CFA preferred.',
            salary: '₹12-18 LPA',
        },
        {
            _id: '7',
            title: 'Full Stack Developer',
            company: 'WebSolutions',
            location: 'Remote',
            jobType: 'Remote',
            category: 'Technology',
            description: 'Work on end-to-end web applications using MERN stack.',
            salary: '₹12-18 LPA',
        },
        {
            _id: '8',
            title: 'Content Marketing Specialist',
            company: 'ContentKing',
            location: 'Bangalore',
            jobType: 'Full-time',
            category: 'Marketing',
            description: 'Create compelling content for blogs, social media, and email campaigns.',
            salary: '₹8-12 LPA',
        },
        {
            _id: '9',
            title: 'Mechanical Engineer',
            company: 'EngineerWorks',
            location: 'Chennai',
            jobType: 'Full-time',
            category: 'Engineering',
            description: 'Design and develop mechanical systems. CAD/CAM experience required.',
            salary: '₹10-16 LPA',
        },
        {
            _id: '10',
            title: 'Graphic Designer',
            company: 'CreativeAgency',
            location: 'Delhi',
            jobType: 'Full-time',
            category: 'Design',
            description: 'Create visual content for marketing materials, websites, and social media.',
            salary: '₹6-10 LPA',
        },
        {
            _id: '11',
            title: 'Data Analyst',
            company: 'DataDriven',
            location: 'Hyderabad',
            jobType: 'Full-time',
            category: 'Technology',
            description: 'Analyze data sets to provide business insights. SQL and Python required.',
            salary: '₹10-15 LPA',
        },
        {
            _id: '12',
            title: 'Account Manager',
            company: 'ClientFirst',
            location: 'Mumbai',
            jobType: 'Full-time',
            category: 'Sales',
            description: 'Manage key client accounts and ensure customer satisfaction.',
            salary: '₹12-18 LPA',
        },
    ];

    const fetchJobs = async (params = {}) => {
        try {
            setLoading(true);
            const res = await api.get('/api/v1/jobs', { params });
            const fetchedJobs = res.data.jobs || res.data || [];

            // Use dummy data if fetch returns empty and no search params provided
            if (fetchedJobs.length > 0) {
                setJobs(fetchedJobs);
            } else if (Object.keys(params).length === 0) {
                setJobs(dummyJobs);
            } else {
                setJobs([]);
            }
            setError(null);
        } catch (err) {
            console.error('Failed to fetch jobs', err);
            if (Object.keys(params).length === 0) {
                setJobs(dummyJobs); // Fallback only on initial load
            }
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
