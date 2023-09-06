import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from '@mui/joy';

function AnalyticsTable({ analyticsData }) {
  return (
    <TableContainer component={Paper} sx={{mt:2}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Addon Name</TableCell>
            <TableCell>Downloads</TableCell>
            <TableCell> Page Visits</TableCell>
            <TableCell>Times Rated</TableCell>
            <TableCell>Average Rating</TableCell>
            <TableCell>Download Rate</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analyticsData.map((data) => (
            <TableRow key={data.addonId}>
              <TableCell>{data.addonName}</TableCell>
              <TableCell>{data.downloads.reduce((sum, rating) => sum + rating, 0)}</TableCell>
              <TableCell>{data.pageVisits.reduce((sum, value) => sum + value, 0)}</TableCell>
              <TableCell>{data.ratingsCount.reduce((sum, value) => sum + value, 0)}</TableCell>
              <TableCell>
                {data.averageRating
                .filter(rating => rating !== 0)
                .reduce((sum, rating, index, array) => sum + rating / array.length, 0).toFixed(2)}
                </TableCell>
                <TableCell>{data.downloadRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AnalyticsTable;
