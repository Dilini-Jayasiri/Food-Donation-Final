import { useState,useEffect } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Route, Routes, useNavigate } from 'react-router';
import { useMemo } from 'react';
import Organizations from './Organizations/Organizations';
import { DashboardCustomize, FoodBank, NotificationAdd, People, PeopleAlt } from '@mui/icons-material';
import InstantDonors from './instantdonors/InstantDonors';
import ReservedDonors from './ReservedDonors/ReservedDonors';
import Main from './main/Main';
const drawerWidth = 240;


const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  

const SideList = ({open,setOpen}) => {
    const [orgs,setOrgs] = useState([]);
  useEffect(() => {
      const fetchRequests = async () => {
        const response = await fetch('/requests');
        const json = await response.json()
  
        if (response.ok) {
            setOrgs(json)
        }
      }
      fetchRequests()
    }, [])
  
    const {selectedLink,setSelectedLink} = useState('')
const list = useMemo(()=>[
{title:'Main',icon:<DashboardCustomize/>,link:'',component:<Main {...{setSelectedLink,link:''}}/>},
{title:'Instant Donations',icon:<PeopleAlt/>,link:'/adminInsDon',component:<InstantDonors {...{setSelectedLink,link:'adminInsDon'}}/>},
{title:'Reserved Donations',icon:<FoodBank/>,link:'/adminResDon',component:<ReservedDonors {...{setSelectedLink,link:'adminResDon'}}/>},
{title:'Organizations',icon:<NotificationAdd/>,link:'/adminOrgs',component:<Organizations {...{setSelectedLink,link:'adminOrgs'}}/>},
],[])
    const navigate = useNavigate()
  return (
   <>
   
     <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={()=>setOpen(false)}>
           <ChevronRightIcon /> 
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>navigate(item.link)}
                selected={selectedLink===item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* <Box sx={{mx:'auto',mt:3,mb:1}}>
            <Tooltip title={orgs?.orgName || ''}></Tooltip>
            
        </Box>
        <Box sx={{textAlign:'center'}}>
            {open && <Typography>{orgs?.orgName}</Typography>}
            <Typography variant='body2'>{orgs?.orgEmail}</Typography>

        </Box> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
            {list.map(item=>(
                <Route key={item.title} path={item.link} element={item.component}/>
            ))}
        </Routes>
      </Box>
   </>
  )
}

export default SideList