import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        borderRadius: 1 
      }}
    >
      <Avatar 
        src="https://scontent-bom2-3.xx.fbcdn.net/v/t39.30808-1/359810723_648615257304142_4539276130280835842_n.png?stp=dst-png_s148x148&_nc_cat=106&ccb=1-7&_nc_sid=c9219a&_nc_ohc=8coXLIgXIzsQ7kNvgEI3cw6&_nc_ht=scontent-bom2-3.xx&_nc_gid=Aofb5vK1eo4BV18LykiECn7&oh=00_AYDYoaJiUcHkLyRTAb3lVwxcw-aNE8Mnz54vhysGMRWliA&oe=66E0888C" 
        alt="Logo" 
        sx={{ mr: 2 }} 
      />
      <Typography 
        variant="h6" 
        sx={{ color: 'grey', fontWeight: 'bold' }}
      >
       Singapore Airlines
      </Typography>
    </Box>
      <Divider/>

      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
           Kunal rawat
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            kunalrawat425@gmail.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
