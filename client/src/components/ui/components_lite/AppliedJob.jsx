import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { Item } from '@radix-ui/react-radio-group'
import { Badge } from '../badge'

const AppliedJob = () => {
  return (
    <div>
       <Table>
          <TableCaption>Recent Applied Jobs</TableCaption>
          <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {
              [1,2,3,4,5].map((Item,index) => (
                <TableRow key={index}>
                    <TableCell>23-12-2023</TableCell>
                    <TableCell>Software Engineer</TableCell>
                    <TableCell>Amazon</TableCell>
                    <TableCell className="text-right"><Badge> Selected</Badge></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
       </Table>
    </div>
  )
}

export default AppliedJob
