import React from 'react';
import Subtotal from './Subtotal';
import { useStateValue } from '../../../StateProvider/StateProvider';

import classes from './Checkout.module.css';
import CheckoutProduct from '../../Template/CheckoutProduct';
import { auth } from '../../../utilities/firebase/firebase';

const Checkout = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    return (
        <>
            <div className={classes['checkout']}>
                <div className={classes['checkout__left']}>
                <h3>Hello, {user?.email}</h3>
                    <div className={classes["checkout__title"]}>
                        <h1>Shopping Basket</h1>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />

                        ))}
                    </div>
                </div>
                <div className={classes["checkout__right"]}>
                    <Subtotal />
                </div>
            </div>
        </>
    )
}

export default Checkout;
