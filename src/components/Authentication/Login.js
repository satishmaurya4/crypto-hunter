import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { uiActions } from '../../store/ui-slice';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();




    const handleSubmit = async() => {
        if (!email || !password) {
            dispatch(uiActions.alert({
                open: true,
                message: 'Please fill all the fields.',
                type: 'error'
        }))
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            dispatch(uiActions.alert({
                open: true,
                message: `Log in Successful. Welcome ${result.user.email}`,
                type: "success",
              }));
        } catch (error) {
            dispatch(uiActions.alert({
                open: true,
                message: error.message,
                type: 'error'
            }))
        }
}



  return (
      <Box
          p={3}
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <TextField
              variant='outlined'
              type="email"
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
          />
          <TextField
              variant='outlined'
              type="password"
              label="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
          />
          <Button
              variant='contained'
              size="large"
              sx={{ backgroundColor: "gold", color: '#fff' }}
              onClick={handleSubmit}
          >Login</Button>
   </Box>
  )
}

export default Login