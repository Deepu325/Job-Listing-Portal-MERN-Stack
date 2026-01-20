import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { Item } from '@radix-ui/react-radio-group'
import { Badge } from '../badge'

const AppliedJob = () => {
  return (
    <div className='border rounded-lg overflow-hidden shrink-0'>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            [1, 2, 3, 4].map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium">23-12-2023</TableCell>
                <TableCell>Software Engineer</TableCell>
                <TableCell>Amazon</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${index === 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}>
                    {index === 1 ? 'Rejected' : 'Selected'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJob
