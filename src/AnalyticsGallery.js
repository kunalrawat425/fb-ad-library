import React, { useState } from 'react';
import { Box,Grid, Typography, Divider, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import AdCard from './components/AdCard';

export const groupAdsByDate = (ads, view) => {
  return ads.reduce((groups, ad) => {
    const date = new Date(ad.created);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    
    const monthYearKey = `${month} ${year}`;
    const yearKey = `${year}`;

    const key = view === 'monthYear' ? monthYearKey : yearKey;
    
    if (!groups[key]) {
      groups[key] = [];
    }
    
    groups[key].push(ad);
    return groups;
  }, {});
};

const Gallery = ({ads}) => {
  const [grouping, setGrouping] = useState('monthYear');
  const groupedAds = groupAdsByDate(ads, grouping);

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end',paddingBottom:"40px" }}>

      <ToggleButtonGroup
        value={grouping}
        variant='contained' 
        exclusive
        onChange={(event, newGrouping) => setGrouping(newGrouping)}
        aria-label="Group by"
      >
        <ToggleButton color='primary' value="monthYear" aria-label="Group by Month-Year">Month-Year</ToggleButton>
        <ToggleButton color='primary' value="year" aria-label="Group by Year">Year</ToggleButton>
      </ToggleButtonGroup>
      </Box>
      {Object.keys(groupedAds).map((key) => (
        <Box key={key} sx={{ marginBottom: 4 }}>
          <Typography variant="h6">{key}</Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            {groupedAds[key].map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <AdCard ad={ad}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Gallery;