import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import CustomizedDataGrid from './AnalyticsTable';
import Gallery from './AnalyticsGallery'
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const mockAds = [
  {
    id: 'ad-001',
    adID: '001',
    title: 'US Video Campaign',
    regions: ['US', 'CA', 'MX'],
    created: '2024-09-01',
    status: 'Active',
    performanceMetrics: {
      overall: 'High',
      impressions: 50000,
      clicks: 2500,
      CTR: '5%',
      conversionRate: '3%',
      ROI: '150%',
      platforms: {
        Facebook: {
          cost: 'High',
          performance: 'Excellent',
          impressions: 30000,
          clicks: 1500,
          CTR: '5%',
          conversionRate: '3%',
          ROI: '160%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 20000,
          clicks: 1000,
          CTR: '5%',
          conversionRate: '2.5%',
          ROI: '140%'
        }
      }
    },
    impressionStartDate: '2024-09-01',
    mediaType: 'Video',
    platforms: ['Facebook', 'Instagram'],
    creators: ['John Doe', 'Jane Smith']
  },
  {
    id: 'ad-002',
    adID: '002',
    title: 'European Image Ad',
    regions: ['GB', 'FR', 'DE'],
    created: '2024-09-02',
    status: 'Inactive',
    performanceMetrics: {
      overall: 'Medium',
      impressions: 40000,
      clicks: 1200,
      CTR: '3%',
      conversionRate: '1.5%',
      ROI: '80%',
      platforms: {
        Facebook: {
          cost: 'Low',
          performance: 'Average',
          impressions: 25000,
          clicks: 700,
          CTR: '2.8%',
          conversionRate: '1%',
          ROI: '70%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 15000,
          clicks: 500,
          CTR: '3.3%',
          conversionRate: '2%',
          ROI: '90%'
        }
      }
    },
    impressionStartDate: '2024-09-02',
    mediaType: 'Image',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Alice Johnson', 'Bob Brown']
  },
  {
    id: 'ad-003',
    adID: '003',
    title: 'Asian Carousel Promotion',
    regions: ['JP', 'KR', 'CN'],
    created: '2024-09-03',
    status: 'Active',
    performanceMetrics: {
      overall: 'Low',
      impressions: 30000,
      clicks: 800,
      CTR: '2.67%',
      conversionRate: '1%',
      ROI: '50%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Average',
          impressions: 15000,
          clicks: 400,
          CTR: '2.67%',
          conversionRate: '1%',
          ROI: '45%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Low',
          impressions: 15000,
          clicks: 400,
          CTR: '2.67%',
          conversionRate: '1%',
          ROI: '55%'
        }
      }
    },
    impressionStartDate: '2024-09-03',
    mediaType: 'Carousel',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Mike Wilson', 'Lisa Green']
  },
  {
    id: 'ad-004',
    adID: '004',
    title: 'Australia Video Ad',
    regions: ['AU', 'NZ', 'SG'],
    created: '2024-09-04',
    status: 'Active',
    performanceMetrics: {
      overall: 'High',
      impressions: 60000,
      clicks: 3000,
      CTR: '5%',
      conversionRate: '4%',
      ROI: '180%',
      platforms: {
        Facebook: {
          cost: 'High',
          performance: 'Excellent',
          impressions: 35000,
          clicks: 2000,
          CTR: '5.7%',
          conversionRate: '4%',
          ROI: '190%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 25000,
          clicks: 1000,
          CTR: '4%',
          conversionRate: '3%',
          ROI: '160%'
        }
      }
    },
    impressionStartDate: '2024-09-04',
    mediaType: 'Video',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Emma Davis', 'James Lee']
  },
  {
    id: 'ad-005',
    adID: '005',
    title: 'South America Image Campaign',
    regions: ['BR', 'AR', 'CL'],
    created: '2024-09-05',
    status: 'Inactive',
    performanceMetrics: {
      overall: 'Medium',
      impressions: 35000,
      clicks: 1000,
      CTR: '2.86%',
      conversionRate: '1.2%',
      ROI: '70%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Average',
          impressions: 20000,
          clicks: 500,
          CTR: '2.5%',
          conversionRate: '1%',
          ROI: '65%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 15000,
          clicks: 500,
          CTR: '3.3%',
          conversionRate: '1.5%',
          ROI: '75%'
        }
      }
    },
    impressionStartDate: '2024-09-05',
    mediaType: 'Image',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Sophia Martinez', 'David Taylor']
  },
  {
    id: 'ad-006',
    adID: '006',
    title: 'India Carousel Promotion',
    regions: ['IN', 'PK', 'BD'],
    created: '2024-09-06',
    status: 'Active',
    performanceMetrics: {
      overall: 'High',
      impressions: 70000,
      clicks: 3500,
      CTR: '5%',
      conversionRate: '4.5%',
      ROI: '200%',
      platforms: {
        Facebook: {
          cost: 'High',
          performance: 'Excellent',
          impressions: 40000,
          clicks: 2000,
          CTR: '5%',
          conversionRate: '4.5%',
          ROI: '210%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 30000,
          clicks: 1500,
          CTR: '5%',
          conversionRate: '4%',
          ROI: '190%'
        }
      }
    },
    impressionStartDate: '2024-09-06',
    mediaType: 'Carousel',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Daniel Roberts', 'Olivia Clark']
  },
  {
    id: 'ad-007',
    adID: '007',
    title: 'Africa Video Campaign',
    regions: ['ZA', 'NG', 'KE'],
    created: '2024-09-07',
    status: 'Active',
    performanceMetrics: {
      overall: 'Low',
      impressions: 20000,
      clicks: 500,
      CTR: '2.5%',
      conversionRate: '0.8%',
      ROI: '40%',
      platforms: {
        Facebook: {
          cost: 'Low',
          performance: 'Below Average',
          impressions: 12000,
          clicks: 300,
          CTR: '2.5%',
          conversionRate: '0.8%',
          ROI: '35%'
        },
        Instagram: {
          cost: 'Low',
          performance: 'Low',
          impressions: 8000,
          clicks: 200,
          CTR: '2.5%',
          conversionRate: '0.8%',
          ROI: '45%'
        }
      }
    },
    impressionStartDate: '2024-09-07',
    mediaType: 'Video',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Liam Walker', 'Isabella Lewis']
  },
  {
    id: 'ad-008',
    adID: '008',
    title: 'Middle East Image Ad',
    regions: ['EG', 'SA', 'AE'],
    created: '2024-09-08',
    status: 'Inactive',
    performanceMetrics: {
      overall: 'Medium',
      impressions: 25000,
      clicks: 800,
      CTR: '3.2%',
      conversionRate: '1.5%',
      ROI: '60%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 15000,
          clicks: 500,
          CTR: '3.3%',
          conversionRate: '1.7%',
          ROI: '65%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Average',
          impressions: 10000,
          clicks: 300,
          CTR: '3%',
          conversionRate: '1.2%',
          ROI: '55%'
        }
      }
    },
    impressionStartDate: '2024-09-08',
    mediaType: 'Image',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Ella Harris', 'Noah Walker']
  },
  {
    id: 'ad-009',
    adID: '009',
    title: 'Southern Europe Carousel Promotion',
    regions: ['IT', 'ES', 'PT'],
    created: '2024-09-09',
    status: 'Active',
    performanceMetrics: {
      overall: 'High',
      impressions: 80000,
      clicks: 4000,
      CTR: '5%',
      conversionRate: '5%',
      ROI: '220%',
      platforms: {
        Facebook: {
          cost: 'High',
          performance: 'Excellent',
          impressions: 45000,
          clicks: 2500,
          CTR: '5.6%',
          conversionRate: '5%',
          ROI: '230%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 35000,
          clicks: 1500,
          CTR: '4.3%',
          conversionRate: '4.5%',
          ROI: '210%'
        }
      }
    },
    impressionStartDate: '2024-09-09',
    mediaType: 'Carousel',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Mia Scott', 'Ethan Anderson']
  },
  {
    id: 'ad-010',
    adID: '010',
    title: 'France Video Campaign',
    regions: ['FR', 'BE', 'NL'],
    created: '2024-09-10',
    status: 'Active',
    performanceMetrics: {
      overall: 'Low',
      impressions: 15000,
      clicks: 300,
      CTR: '2%',
      conversionRate: '1%',
      ROI: '35%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Below Average',
          impressions: 8000,
          clicks: 150,
          CTR: '1.9%',
          conversionRate: '0.8%',
          ROI: '30%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Low',
          impressions: 7000,
          clicks: 150,
          CTR: '2.1%',
          conversionRate: '1.2%',
          ROI: '40%'
        }
      }
    },
    impressionStartDate: '2024-09-10',
    mediaType: 'Video',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Ava Adams', 'Oliver Young']
  },
  {
    id: 'ad-011',
    adID: '011',
    title: 'Scandinavia Image Ad',
    regions: ['SE', 'NO', 'DK'],
    created: '2024-09-11',
    status: 'Inactive',
    performanceMetrics: {
      overall: 'Medium',
      impressions: 20000,
      clicks: 600,
      CTR: '3%',
      conversionRate: '1.2%',
      ROI: '65%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 12000,
          clicks: 350,
          CTR: '2.9%',
          conversionRate: '1.3%',
          ROI: '60%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Average',
          impressions: 8000,
          clicks: 250,
          CTR: '3.1%',
          conversionRate: '1%',
          ROI: '70%'
        }
      }
    },
    impressionStartDate: '2024-09-11',
    mediaType: 'Image',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Charlotte Moore', 'Lucas Hall']
  },
  {
    id: 'ad-012',
    adID: '012',
    title: 'Eastern Europe Carousel Promotion',
    regions: ['PL', 'CZ', 'SK'],
    created: '2024-09-12',
    status: 'Active',
    performanceMetrics: {
      overall: 'High',
      impressions: 65000,
      clicks: 3200,
      CTR: '4.92%',
      conversionRate: '4%',
      ROI: '190%',
      platforms: {
        Facebook: {
          cost: 'High',
          performance: 'Excellent',
          impressions: 35000,
          clicks: 1800,
          CTR: '5.1%',
          conversionRate: '4.5%',
          ROI: '200%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 30000,
          clicks: 1400,
          CTR: '4.7%',
          conversionRate: '3.5%',
          ROI: '180%'
        }
      }
    },
    impressionStartDate: '2024-09-12',
    mediaType: 'Carousel',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Amelia Lewis', 'Jack Taylor']
  },
  {
    id: 'ad-013',
    adID: '013',
    title: 'Balkans Video Campaign',
    regions: ['RO', 'BG', 'HU'],
    created: '2024-09-13',
    status: 'Active',
    performanceMetrics: {
      overall: 'Low',
      impressions: 18000,
      clicks: 400,
      CTR: '2.22%',
      conversionRate: '0.8%',
      ROI: '45%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Below Average',
          impressions: 10000,
          clicks: 250,
          CTR: '2.5%',
          conversionRate: '0.7%',
          ROI: '40%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Low',
          impressions: 8000,
          clicks: 150,
          CTR: '1.9%',
          conversionRate: '0.9%',
          ROI: '50%'
        }
      }
    },
    impressionStartDate: '2024-09-13',
    mediaType: 'Video',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Harper King', 'Benjamin Wright']
  },
  {
    id: 'ad-014',
    adID: '014',
    title: 'Greek Image Ad',
    regions: ['GR', 'CY', 'MT'],
    created: '2024-09-14',
    status: 'Inactive',
    performanceMetrics: {
      overall: 'Medium',
      impressions: 22000,
      clicks: 700,
      CTR: '3.18%',
      conversionRate: '1.3%',
      ROI: '75%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 13000,
          clicks: 400,
          CTR: '3.08%',
          conversionRate: '1.5%',
          ROI: '70%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Average',
          impressions: 9000,
          clicks: 300,
          CTR: '3.33%',
          conversionRate: '1%',
          ROI: '80%'
        }
      }
    },
    impressionStartDate: '2024-09-14',
    mediaType: 'Image',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Elijah Hernandez', 'Zoe Harris']
  },
  {
    id: 'ad-015',
    adID: '015',
    title: 'Iberian Carousel Promotion',
    regions: ['PT', 'ES', 'IT'],
    created: '2024-09-15',
    status: 'Active',
    performanceMetrics: {
      overall: 'High',
      impressions: 75000,
      clicks: 4000,
      CTR: '5.33%',
      conversionRate: '4.5%',
      ROI: '210%',
      platforms: {
        Facebook: {
          cost: 'High',
          performance: 'Excellent',
          impressions: 40000,
          clicks: 2200,
          CTR: '5.5%',
          conversionRate: '4.8%',
          ROI: '220%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Good',
          impressions: 35000,
          clicks: 1800,
          CTR: '5.14%',
          conversionRate: '4.2%',
          ROI: '200%'
        }
      }
    },
    impressionStartDate: '2024-09-15',
    mediaType: 'Carousel',
    platforms: ['Facebook', 'Instagram'],
    creators: ['Mason Young', 'Grace Hill']
  },
  {
    id: 'ad-016',
    adID: '016',
    title: 'Bulgarian Video Ad',
    regions: ['BG', 'RO', 'HU'],
    created: '2024-09-16',
    status: 'Active',
    performanceMetrics: {
      overall: 'Low',
      impressions: 16000,
      clicks: 350,
      CTR: '2.19%',
      conversionRate: '0.9%',
      ROI: '50%',
      platforms: {
        Facebook: {
          cost: 'Medium',
          performance: 'Below Average',
          impressions: 9000,
          clicks: 200,
          CTR: '2.22%',
          conversionRate: '0.8%',
          ROI: '45%'
        },
        Instagram: {
          cost: 'Medium',
          performance: 'Low',
          impressions: 7000,
          clicks: 150,
          CTR: '2.14%',
          conversionRate: '1%',
          ROI: '55%'
        }
      }
    },
    impressionStartDate: '2024-09-16',
    mediaType: 'Video',
    platforms: ['Facebook', 'Instagram'],
    creators: ['James Miller', 'Emily Baker']
  }
];
         
function Analytics() {
  const { viewType } = useParams();
  const [value, setValue] = useState(viewType=='gallery'?0:1);
  const [ads, setAds] = useState(mockAds);
  const [searchText, setSearchText] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterAds = () => {
    let filteredAds = mockAds;

    if (searchText.length > 0) {
      filteredAds = filteredAds.filter(ad =>
        ad.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedRegion) {
      filteredAds = filteredAds.filter(ad =>
        ad.regions.includes(selectedRegion)
      );
    }

    if (selectedPlatform) {
      filteredAds = filteredAds.filter(ad =>
        ad.platforms.includes(selectedPlatform)
      );
    }

    if (selectedCreator) {
      filteredAds = filteredAds.filter(ad =>
        ad.creators.includes(selectedCreator)
      );
    }

    if (selectedStatus) {
      filteredAds = filteredAds.filter(ad =>
        ad.status==selectedStatus
      );
    }

    setAds(filteredAds);
  };

  useEffect(() => {
    filterAds();
  }, [searchText, selectedRegion, selectedPlatform, selectedCreator,selectedStatus]);


  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleRegionChange = (val) => {
    setSelectedRegion(val);
  };

  const handlePlatformChange = (val) => {
    setSelectedPlatform(val);
  };

  const handleCreatorChange = (val) => {
    setSelectedCreator(val);
  };

  const handleSelectedStatus = (val) => {
    setSelectedStatus(val);
  };


  return (
    <Box container sx={{ width: '100%', mx:3, p:6 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Ad Library
      </Typography>


      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e) => handleSearch(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Region</InputLabel>
          <Select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            label="Region"
          >
            <MenuItem value="">All</MenuItem>
            {['US', 'CA', 'MX', 'GB', 'FR', 'DE', 'JP', 'KR', 'CN', 'AU', 'NZ', 'SG', 'BR', 'AR', 'CL', 'IN', 'PK', 'BD', 'ZA', 'NG', 'KE', 'EG', 'SA', 'AE', 'IT', 'ES', 'PT', 'SE', 'NO', 'DK', 'PL', 'CZ', 'SK', 'RO', 'BG', 'HU', 'GR', 'CY', 'MT'].map(region => (
              <MenuItem key={region} value={region}>{region}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Platform</InputLabel>
          <Select
            value={selectedPlatform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            label="Platform"
          >
            <MenuItem value="">All</MenuItem>
            {['Facebook', 'Instagram'].map(platform => (
              <MenuItem key={platform} value={platform}>{platform}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => handleSelectedStatus(e.target.value)}
            label="Platform"
          >
            <MenuItem value="">All</MenuItem>
            {['Active', 'Inactive'].map(platform => (
              <MenuItem key={platform} value={platform}>{platform}</MenuItem>
            ))}
          </Select>
        </FormControl>


        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Creator</InputLabel>
          <Select
            value={selectedCreator}
            onChange={(e) => handleCreatorChange(e.target.value)}
            label="Creator"
          >
            <MenuItem value="">All</MenuItem>
            {['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Mike Wilson', 'Lisa Green', 'Emma Davis', 'James Lee', 'Sophia Martinez', 'David Taylor', 'Daniel Roberts', 'Olivia Clark', 'Liam Walker', 'Isabella Lewis', 'Ella Harris', 'Noah Walker', 'Mia Scott', 'Ethan Anderson', 'Ava Adams', 'Oliver Young', 'Charlotte Moore', 'Lucas Hall', 'Amelia Lewis', 'Jack Taylor', 'Harper King', 'Benjamin Wright', 'Elijah Hernandez', 'Zoe Harris', 'Mason Young', 'Grace Hill'].map(creator => (
              <MenuItem key={creator} value={creator}>{creator}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange}  centered>
          <Tab label="Gallery View" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="List View" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{width:'100%'}}>
        <Gallery ads={ads}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomizedDataGrid ads={ads}/>
      </TabPanel>
    </Box>
  );
}
export default Analytics;