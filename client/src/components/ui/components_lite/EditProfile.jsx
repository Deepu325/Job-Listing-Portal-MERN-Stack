import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../button';
import { Label } from '../label';
import { Input } from '../input';
import { User, Mail, Phone, GraduationCap, Briefcase, FileText, Loader2, X, ArrowLeft, Upload, Check, Camera } from 'lucide-react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'sonner';

// Education options
const educationOptions = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree (B.Tech/B.E.)',
    'Bachelor\'s Degree (B.Sc)',
    'Bachelor\'s Degree (B.Com)',
    'Bachelor\'s Degree (BBA)',
    'Bachelor\'s Degree (Other)',
    'Master\'s Degree (M.Tech/M.E.)',
    'Master\'s Degree (MBA)',
    'Master\'s Degree (M.Sc)',
    'Master\'s Degree (Other)',
    'PhD',
    'Other',
];

// Skills options by category
const skillsOptions = {
    'Programming': ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby'],
    'Frontend': ['React', 'Angular', 'Vue.js', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Next.js'],
    'Backend': ['Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'FastAPI', '.NET'],
    'Database': ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'SQL Server', 'Oracle'],
    'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Git'],
    'Data & AI': ['Machine Learning', 'Data Analysis', 'TensorFlow', 'PyTorch', 'Pandas', 'Power BI', 'Tableau'],
    'Design': ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX Design', 'Canva'],
    'Soft Skills': ['Communication', 'Leadership', 'Problem Solving', 'Teamwork', 'Time Management', 'Critical Thinking'],
};

const EditProfile = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
    });
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [resume, setResume] = useState(null);
    const [currentResume, setCurrentResume] = useState(null);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
    const [uploadingPicture, setUploadingPicture] = useState(false);

    // Fetch existing profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/v1/profile/jobseeker');
                const profile = res.data;
                setFormData({
                    fullName: profile.fullName || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                    education: profile.education || '',
                    experience: profile.experience || '',
                });
                if (profile.skills && Array.isArray(profile.skills)) {
                    setSelectedSkills(profile.skills);
                } else if (profile.skills && typeof profile.skills === 'string') {
                    setSelectedSkills(profile.skills.split(',').map(s => s.trim()).filter(s => s));
                }
                // Set current resume
                if (profile.resume) {
                    setCurrentResume({
                        path: profile.resume,
                        name: profile.resumeOriginalName || 'Resume'
                    });
                }
                // Set current profile picture
                if (profile.profilePicture) {
                    setCurrentProfilePicture(profile.profilePicture);
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
                toast.error('Failed to load profile data');
                navigate('/profile');
            } finally {
                setFetching(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const removeSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleResumeUpload = async () => {
        if (!resume) return;

        try {
            setUploadingResume(true);
            const formData = new FormData();
            formData.append('resume', resume);

            const res = await api.post('/api/v1/profile/resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setCurrentResume({
                path: res.data.resume,
                name: res.data.name
            });
            setResume(null);
            toast.success('Resume uploaded successfully!');
        } catch (error) {
            console.error('Failed to upload resume', error);
            toast.error(error.response?.data?.message || 'Failed to upload resume');
        } finally {
            setUploadingResume(false);
        }
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    };

    const handlePictureUpload = async () => {
        if (!profilePicture) return;

        try {
            setUploadingPicture(true);
            const formData = new FormData();
            formData.append('profilePicture', profilePicture);

            const res = await api.post('/api/v1/profile/resume/picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setCurrentProfilePicture(res.data.profilePicture);
            setProfilePicture(null);
            toast.success('Profile picture updated!');
        } catch (error) {
            console.error('Failed to upload picture', error);
            toast.error(error.response?.data?.message || 'Failed to upload picture');
        } finally {
            setUploadingPicture(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email) {
            toast.error('Please fill in required fields');
            return;
        }

        try {
            setLoading(true);

            const profileData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                education: formData.education,
                skills: selectedSkills.join(', '),
                experience: formData.experience,
            };

            await api.post('/api/v1/profile/jobseeker', profileData);

            toast.success('Profile updated successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Failed to update profile', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="max-w-2xl mx-auto my-10 px-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Profile
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Edit Your Profile</h1>
                    <p className="text-gray-600 mb-8 text-center">Update your details below</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                                    {currentProfilePicture ? (
                                        <img
                                            src={`http://localhost:4000/${currentProfilePicture}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <User className="h-12 w-12" />
                                        </div>
                                    )}
                                </div>
                                <label
                                    htmlFor="profilePicture"
                                    className="absolute bottom-0 right-0 bg-green-700 hover:bg-green-800 text-white p-2 rounded-full cursor-pointer transition-colors"
                                >
                                    <Camera className="h-4 w-4" />
                                </label>
                                <input
                                    type="file"
                                    id="profilePicture"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    onChange={handlePictureChange}
                                    className="hidden"
                                />
                            </div>
                            {profilePicture && (
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-sm text-gray-600">{profilePicture.name}</span>
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={handlePictureUpload}
                                        disabled={uploadingPicture}
                                        className="bg-green-700 hover:bg-green-800"
                                    >
                                        {uploadingPicture ? (
                                            <Loader2 className="animate-spin h-4 w-4" />
                                        ) : (
                                            'Upload'
                                        )}
                                    </Button>
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mt-2">Click the camera icon to change your photo</p>
                        </div>

                        {/* Full Name */}
                        <div>
                            <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4" />
                                Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                                <Mail className="h-4 w-4" />
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                                <Phone className="h-4 w-4" />
                                Phone Number
                            </Label>
                            <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 98765 43210"
                                className="w-full"
                            />
                        </div>

                        {/* Education - Dropdown */}
                        <div>
                            <Label htmlFor="education" className="flex items-center gap-2 mb-2">
                                <GraduationCap className="h-4 w-4" />
                                Education
                            </Label>
                            <select
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                            >
                                <option value="">Select your education level</option>
                                {educationOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        {/* Skills - Multi-select with categories */}
                        <div>
                            <Label className="flex items-center gap-2 mb-2">
                                <Briefcase className="h-4 w-4" />
                                Skills
                            </Label>

                            {/* Selected Skills */}
                            {selectedSkills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                                    {selectedSkills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-700 text-white rounded-full text-sm"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="hover:bg-green-800 rounded-full p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Skills by Category */}
                            <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                                {Object.entries(skillsOptions).map(([category, skills]) => (
                                    <div key={category} className="border-b border-gray-100 last:border-b-0">
                                        <div className="px-3 py-2 bg-gray-50 font-medium text-gray-700 text-sm sticky top-0">
                                            {category}
                                        </div>
                                        <div className="p-3 flex flex-wrap gap-2">
                                            {skills.map((skill) => (
                                                <button
                                                    key={skill}
                                                    type="button"
                                                    onClick={() => toggleSkill(skill)}
                                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedSkills.includes(skill)
                                                        ? 'bg-green-700 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {skill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Selected: {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        {/* Experience/About */}
                        <div>
                            <Label htmlFor="experience" className="flex items-center gap-2 mb-2">
                                <User className="h-4 w-4" />
                                About You / Experience
                            </Label>
                            <textarea
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="Tell employers about yourself, your experience, and what you're looking for..."
                                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <Label className="flex items-center gap-2 mb-2">
                                <FileText className="h-4 w-4" />
                                Resume
                            </Label>

                            {/* Current Resume */}
                            {currentResume && (
                                <div className="mb-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-green-700" />
                                        <span className="text-green-800">Current: {currentResume.name}</span>
                                    </div>
                                    <a
                                        href={`http://localhost:4000/${currentResume.path}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View
                                    </a>
                                </div>
                            )}

                            {/* Upload New Resume */}
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    id="resume"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                <Button
                                    type="button"
                                    onClick={handleResumeUpload}
                                    disabled={!resume || uploadingResume}
                                    className="bg-green-700 hover:bg-green-800"
                                >
                                    {uploadingResume ? (
                                        <Loader2 className="animate-spin h-4 w-4" />
                                    ) : (
                                        <><Upload className="h-4 w-4 mr-1" /> Upload</>
                                    )}
                                </Button>
                            </div>
                            {resume && (
                                <p className="text-sm text-gray-600 mt-2">Selected: {resume.name}</p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/profile')}
                                className="flex-1 py-3"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-green-700 hover:bg-green-800 py-3"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
