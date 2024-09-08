import { Card, CardContent, CardMedia, Typography, Box, Button, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const AdCard = ({ ad }) => {
  const performanceMetrics = {
    Facebook: {
      cost: 'Medium',
      performance: 'Above Average',
      impressions: 12000,
      clicks: 300,
      CTR: '2.5%',
      conversionRate: '1.2%',
      ROI: '60%'
    },
    Instagram: {
      cost: 'Medium',
      performance: 'High',
      impressions: 10000,
      clicks: 250,
      CTR: '2.5%',
      conversionRate: '1.5%',
      ROI: '70%'
    }
  };

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardMedia
        component={ad.mediaType === 'Video' ? 'video' : 'img'}
        controls={ad.mediaType === 'Video'}
        height="440"
        image={ad.mediaUrl}
        alt={ad.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {ad.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {ad.description}
        </Typography>
        <Box mb={2}>
          <Typography variant="title">Performance Metrics</Typography>
          <Box display="flex" flexDirection="column">
            {Object.entries(performanceMetrics).map(([platform, metrics]) => (
              <Box key={platform} mb={1} p={1} border={1} borderColor="divider" borderRadius={1}>
                <Typography variant="title">{platform}</Typography>
                <Typography variant="body2">Cost: {metrics.cost}</Typography>
                <Typography variant="body2">Conversion Rate: {metrics.conversionRate}</Typography>
                <Typography variant="body2">ROI: {metrics.ROI}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Overall Rating</Typography>
          <Chip label={ad.performanceMetrics.overall} color={ad.performanceMetrics.overall === 'High' ? 'success' : ad.performanceMetrics === 'Medium' ? 'warning' : 'error'} />
        </Box>
        <Box display="flex" justifyContent="flex-end" >
          <Link to="/analytics/new-page">
            <Button variant="contained">Show More</Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdCard;