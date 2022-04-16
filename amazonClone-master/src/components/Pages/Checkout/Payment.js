import React, { useEffect, useState } from 'react';

import classes from './Payment.module.css';

import { useStateValue } from '../../../StateProvider/StateProvider';
import CheckoutProduct from '../../Template/CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../../StateProvider/Reducer';
import axios from 'axios';


const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent})=> {
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            navigate("/orders");
        })
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className={classes['payment']}>
            <div className={classes['payment__container']}>
                <h1>Checkout (<Link to='/checkout'>{basket?.length} items</Link>)</h1>
                {/* payment section delivery address */}
                <div className={classes['payment__section']}>
                    <div className={classes['payment__title']}>
                        <h3>Delivery address</h3>
                    </div>
                    <div className={classes["payment__address"]}>
                        <p>{user?.email}</p>
                        <p>144 Rajat Nagar</p>
                        <p>Piplani, Bhopal</p>
                    </div>

                </div>

                {/* payment section review items */}
                <div className={classes['payment__section']}>
                    <div className={classes['payment__title']}>
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className={classes['pyament__items']}>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating} />
                        ))}
                    </div>
                </div>

                {/* payment section payment methods */}
                <div className={classes['payment__section']}>
                    <div className={classes['payment__title']}>
                        <h3>Payment Method</h3>
                    </div>
                    <div className={classes['payment__detail']}>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className={classes['payment__pricecontainer']}>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹ "}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
