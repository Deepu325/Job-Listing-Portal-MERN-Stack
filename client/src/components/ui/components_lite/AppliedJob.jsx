import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { Badge } from '../badge'
import api from '../../../utils/api'
import { Loader2 } from 'lucide-react'

const AppliedJob = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get('/api/v1/applications/user');
        setAppliedJobs(res.data);
      } catch (error) {
        console.error("Failed to fetch applied jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-green-700" />
      </div>
    );
  }

  return (
    <div className='border rounded-2xl overflow-hidden shadow-sm'>
      <Table>
        <TableCaption className="pb-4">A list of jobs you've applied for</TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[150px] font-bold">Date</TableHead>
            <TableHead className="font-bold">Job Title</TableHead>
            <TableHead className="font-bold">Company</TableHead>
            <TableHead className="text-right font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10 text-gray-500 italic">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs.map((app) => (
              <TableRow key={app._id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium">
                  {new Date(app.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-semibold text-gray-900">{app.job?.title || 'Job Deleted'}</TableCell>
                <TableCell className="text-gray-600">{app.job?.company?.name || 'Company Name'}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`
                    ${app.status === 'rejected' ? 'bg-red-500 hover:bg-red-600' :
                      app.status === 'accepted' ? 'bg-green-600 hover:bg-green-700' :
                        app.status === 'shortlisted' ? 'bg-blue-600 hover:bg-blue-700' :
                          'bg-gray-500 hover:bg-gray-600'}
                    px-3 py-1 rounded-full text-xs font-bold shadow-sm
                  `}>
                    {app.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJob
