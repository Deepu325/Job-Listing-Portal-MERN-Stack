import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { Badge } from '../badge';
import {
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import api from '../../../utils/api';
import { toast } from 'sonner';

const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJobAndStatus = async () => {
      try {
        setLoading(true);
        // Fetch job details
        const jobRes = await api.get(`/api/v1/jobs/${id}`);
        setJob(jobRes.data);

        // Check application status
        try {
          const appRes = await api.get('/api/v1/applications/user');
          const applications = appRes.data;
          const alreadyApplied = applications.some(app => app.job?._id === id);
          setHasApplied(alreadyApplied);
        } catch (appErr) {
          console.error("Failed to fetch applications status", appErr);
        }
      } catch (error) {
        console.error("Failed to fetch job", error);
        toast.error("Could not load job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJobAndStatus();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      await api.post(`/api/v1/applications/apply/${id}`);
      setHasApplied(true);
      toast.success("Applied successfully!");
    } catch (error) {
      console.error("Application failed", error);
      const message = error.response?.data?.message || "Failed to submit application";
      toast.error(message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-700 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
        <Button onClick={() => navigate('/jobs')} variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-green-700 font-medium mb-6 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-800 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
                <div className="flex flex-wrap gap-4 text-green-50">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Building2 className="h-4 w-4" />
                    {job.company?.name || 'Company Name'}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Briefcase className="h-4 w-4" />
                    {job.jobType}
                  </span>
                </div>
              </div>
              <div className="shrink-0">
                {hasApplied ? (
                  <div className="flex flex-col items-center gap-2">
                    <Button disabled className="bg-green-500/20 text-white border border-green-400/30 cursor-not-allowed px-8 py-6 text-lg rounded-2xl backdrop-blur-md">
                      <CheckCircle2 className="mr-2 h-5 w-5" /> Already Applied
                    </Button>
                    <p className="text-xs text-green-100 italic">Applied on {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <Button
                    onClick={handleApply}
                    disabled={applying}
                    className="bg-white text-green-800 hover:bg-green-50 px-10 py-6 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    {applying ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Applying...
                      </>
                    ) : 'Apply Now'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Description */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  Description
                  <div className="h-1 w-10 bg-green-500 rounded-full"></div>
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    Required Skills
                    <div className="h-1 w-10 bg-green-500 rounded-full"></div>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} className="bg-green-50 text-green-700 hover:bg-green-100 border-green-100 px-4 py-1.5 text-sm font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 px-2">Job Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Posted On</p>
                      <p className="text-sm font-bold text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Salary Range</p>
                      <p className="text-sm font-bold text-gray-900">
                        {job.salary?.min} - {job.salary?.max} {job.salary?.currency}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Status</p>
                      <Badge className="bg-green-100 text-green-700 capitalize border-0 font-bold">
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Card Mini */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-200">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-bold text-gray-900">{job.company?.name}</h4>
                <p className="text-sm text-gray-500 mb-4 italic">About the company</p>
                <Button variant="outline" className="w-full rounded-xl border-gray-200 hover:bg-gray-50 text-gray-600">
                  View Company
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
