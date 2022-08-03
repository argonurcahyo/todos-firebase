import { Box, Typography } from '@mui/material';
import React from 'react'
const styles = ((theme) => ({
 content: {
  flexGrow: 1,
  padding: theme.spacing(3),
 },
 toolbar: theme.mixins.toolbar,
})
);
const Todo = ({ classes = styles }) => {
 return (
  <Box component="main" className={classes.content}>
   <div className={classes.toolbar} />
   <Typography paragraph>
    Hello i am todo
   </Typography>

  </Box>
 )
}

export default Todo