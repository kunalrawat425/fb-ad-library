import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function CustomizedDataGrid({ads}) {

  // Filter and search function
  const getFilteredRows = () => {
    return ads;
    return mockAds.filter(row => {
      const matchesSearchText = Object.values(row).some(
        value => typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      );

      const matchesRegionFilter = !selectedRegion || row.regions.includes(selectedRegion);
      const matchesPlatformFilter = !selectedPlatform || row.platforms.includes(selectedPlatform);
      const matchesCreatorFilter = !selectedCreator || row.creators.includes(selectedCreator);

      return matchesSearchText && matchesRegionFilter && matchesPlatformFilter && matchesCreatorFilter;
    });
  };

  // Define columns with sorting enabled
  const columns = [
    { field: 'adID', headerName: 'Ad ID', width: 130 },
    { field: 'title', headerName: 'Title', width: 230 },
    { field: 'regions', headerName: 'Regions', width: 180 },
    { field: 'created', headerName: 'Created Date', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'performanceMetrics', headerName: 'Performance Metrics', width: 200 },
    { field: 'impressionStartDate', headerName: 'Impression Start Date', width: 200 },
    { field: 'mediaType', headerName: 'Media Type', width: 150 },
    { field: 'platforms', headerName: 'Platforms', width: 200 },
    { field: 'creators', headerName: 'Creators', width: 200 }
  ];

  return (
    <Box sx={{width:"100%" }}>

      <div style={{ height: 600, width: '100%',maxWidth:"1300px" }}>
        <DataGrid
          rows={getFilteredRows()}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
        />
      </div>
    </Box>
  );
}