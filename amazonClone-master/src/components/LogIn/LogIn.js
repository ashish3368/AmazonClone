import React, { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import classes from './LogIn.module.css';
import Button from '../Template/Button';

import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../utilities/firebase/firebase';
const condition = "https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940";
const privacy = "https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380"

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            if(auth) {
                navigate('/');
            }
        } catch (error) {console.log(error.message);
        }
    }
    const register = async (e) => {
        e.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            console.log(user);
            if(auth){
                navigate('/');
            }
        } catch (error) {alert(error.message);
        }
        
    }
    return (
        <div className={classes['login']}>
            <Link to="/">
                <div className={classes['login__logo__link']}>
                    <img className={classes['login__logo']} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="amazon-logo" />
                    <span className={classes['login__logo__in']}>.in</span>
                </div>
            </Link>
            <div className={classes["login__container"]}>
                <h1>Sign-In</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <Button className={classes['login__signinbutton']} type='submit' onClick={signIn}
                    >Sign In</Button>
                </form>
                <p>
                    By continuing, you agree to Amazon's
                    <span><a href={condition}>Conditions of Use</a></span>
                    and
                    <span><a href={privacy}>Privacy Notice</a></span>
                </p>
                <Button className={classes['login__registerbutton']} onClick={register} >Create your Amazon account</Button>
            </div>
        </div>
    )
}

export default LogIn;
