import { Star } from '@material-ui/icons';
import React from 'react';

import Button from '../Template/Button';
import {useStateValue} from '../../StateProvider/StateProvider';

import classes from './Product.module.css';

const Product = ({id, title, image, price, rating}) => {
    const [{basket}, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            },
        });
    };
    const total = {price};
    console.warn(total);
    return (
        <div className={classes['product']} key={id}>
        <img src={image} alt={title}/>
            <div className={classes['product__info']}>
                <p>{title}</p>
                <p className={classes['product__price']}>
                    <strong>₹{price}</strong>
                </p>
                <div className={classes['product__rating']}>
                    {Array(rating).fill().map((_, i) =>(
                        <Star className={classes['product__starIcon']} />
                    ))}
                </div>
            </div>
            <Button style={{width: "20em"}} onClick={addToBasket}>Add to basket</Button>
        </div>
    );
}

export default Product
