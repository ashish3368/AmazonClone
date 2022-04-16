import { Star } from '@material-ui/icons';
import React from 'react';
import { useStateValue } from '../../StateProvider/StateProvider';
import Button from './Button';
import classes from './Checkoutproduct.module.css';

const CheckoutProduct = ({id, image, title, price, rating}) => {
    const [{basket}, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    return (
        <div className={classes['checkoutproduct']}>
        <img className={classes['checkoutproduct__image']} src={image} alt={title}/>
            <div className={classes['checkoutproduct__info']}>
                <p>{title}</p>
                <p className={classes['checkoutproduct__price']}>
                    <strong>₹{price}</strong>
                </p>
                <div className={classes['checkoutproduct__rating']}>
                    {Array(rating).fill().map((_, i) =>(
                        <Star className={classes['checkoutproduct__starIcon']} />
                    ))}
                </div>
                <Button style={{width: "20em"}} onClick={removeFromBasket}>Remove</Button>
            </div> 
        </div>
    )
}

export default CheckoutProduct
