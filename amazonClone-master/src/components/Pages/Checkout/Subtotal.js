import React from 'react';
import {useNavigate} from 'react-router-dom';
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from '../../../StateProvider/Reducer';
import { useStateValue } from '../../../StateProvider/StateProvider';
import Button from '../../Template/Button';

import classes from './Subtotal.module.css';

const Subtotal = () => {
    const navigate = useNavigate();
    const [{basket}, dispatch] = useStateValue();
    return (
        <div className={classes['subtotal']}>
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtoal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className={classes['subtotal__gift']}>
                            <input type="checkbox" />
                            This Order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹ "}
            />
            <Button onClick={e=> navigate('/payment')}>Proceed to Buy</Button>
        </div>
    )
}

export default Subtotal;
