// import React, { useState } from 'react';
// import {
//   AppBar,
//   Box,
//   Button,
//   Container,
//   IconButton,
//   Toolbar,
//   Typography,
// } from '@mui/material';
// import { Lock, Menu } from '@mui/icons-material';



// const NavBar = () => {
  

//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <AppBar>
//         <Container maxWidth="lg">
//           <Toolbar disableGutters>
//             <Box sx={{ mr: 1 }}>
//               <IconButton
//                 size="large"
//                 color="inherit"
//                 onClick={() => setIsOpen(true)}
//               >
//                 <Menu />
//               </IconButton>
//             </Box>
//             <Typography
//               variant="h6"
//               component="h1"
//               noWrap
//               sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
//             >
//               You Are Welcome
//             </Typography>
//             <Typography
//               variant="h6"
//               component="h1"
//               noWrap
//               sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//             >
//               YRW
//             </Typography>
           
            
//           </Toolbar>
//         </Container>
//       </AppBar>
//       <Toolbar />
    
//     </>
//   );
// };

// export default NavBar;