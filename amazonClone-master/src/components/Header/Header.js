import React from 'react';
import { useStateValue } from '../../StateProvider/StateProvider';

import classes from './css/Header.module.css';


import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { auth } from '../../utilities/firebase/firebase';


const Header = () => {
    const [{ basket, user }, dipatch] = useStateValue();
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    return (
        <div className={classes.header}>
            <Link to="/">
                <div className={classes['header__logo__link']}>
                    <img className={classes['header__logo']} src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo" />
                    <span className={classes['header__logo__in']}>.in</span>
                </div>
            </Link>


            <div className={classes['header__search']}>
                <input className={classes['header__searchInput']} type="text" />
                <SearchIcon className={classes['header__searchIcon']} />
            </div>
            <div className={classes['header__nav']}>
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className={classes['header__option']}>
                        <span className={classes['header__opitonLineOne']}>Hello {user ? user?.email : 'Guest'}</span>
                        <span className={classes['header__opitonLineTwo']}>{user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <div className={classes['header__option']}>
                    <span className={classes['header__opitonLineOne']}>Returns</span>
                    <span className={classes['header__opitonLineTwo']}>& Orders</span>
                </div>
                <div className={classes['header__option']}>
                    <span className={classes['header__opitonLineOne']}>Your</span>
                    <span className={classes['header__opitonLineTwo']}>Prime</span>
                </div>
                <Link to="checkout">
                    <div className={classes['header__optionBasket']}>
                        <ShoppingBasketIcon />
                        <span className={classes['header__optionLineTwo', 'header__basketCount']}>{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Header
