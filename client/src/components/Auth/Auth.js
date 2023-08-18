import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux';
import { useHistory} from 'react-router-dom';

import Icon from './icon.js';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import useStyle from './styles';
import Input from './Input.js';
import { signin, signup} from '../../actions/auth.js'
const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {

    const classes = useStyle();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp,setisSignUp] = useState(false);
    const dispatch = useDispatch();
    const [formData , setFormData] = useState(initialState);

    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signup(formData, history))
        } else{
            dispatch(signin(formData, history))
        }
        // console.log(formData);
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
     };

   const switchMode = () => {
    setisSignUp(( previsSignUp) => !previsSignUp)
    setShowPassword(false);
    };

    // const googleSuccess = async (res) => {
    //     // console.log(res);
    //     const result = res?.profileObj;
    //     const token = res?.tokenId;
        
    //     try{

    //         dispatch({ type :'AUTH' , data: { result, token }});
    //         history.push('/');
    //     }catch (error){
    //         console.log(error);
    //     }
    // };
    // const googleFailure = () => {
    //     console.log("google sign in was unsuccessful , try again later");
    // };
    return (

        <Container component="main" maxWidth="xs">

            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />

                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />

                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}

                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <GoogleLogin 
                        clientId="985157517797-i9mmgiku02vu8kubut86bi5c8a3dhme3.apps.googleusercontent.com"
                        render= {(renderProps) => (
                            <Button className={classes.googleButton} color ='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>GooGle Sign In</Button>
                        )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    
                    <Grid container justify='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                        </Button>
                    </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    );
};

export default Auth

