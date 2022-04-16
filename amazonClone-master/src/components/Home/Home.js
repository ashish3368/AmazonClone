import classes from './Home.module.css';
import React from 'react'
import Product from '../Template/Product';
import Data from '../../product_details/HomeProductAPI';

const Home = () => {
    return (
        <>
        <div className={classes['home']}>
            <div className={classes['home__container']}>
                <img className={classes['home__image']} src="https://m.media-amazon.com/images/I/61FuWeCuGCL._SX3000_.jpg " alt="" />
                <div className={classes['home__row']}>
                    <Product id={Data[0].id} title={Data[0].title} image={Data[0].image} price={Data[0].price} rating={Data[0].rating}/>
                    <Product id={Data[1].id} title={Data[1].title} image={Data[1].image} price={Data[1].price} rating={Data[1].rating} />
                </div>
                <div className={classes['home__row']}>
                    <Product id={Data[2].id} title={Data[2].title} image={Data[2].image} price={Data[2].price} rating={Data[2].rating} />
                    <Product id={Data[3].id} title={Data[3].title} image={Data[3].image} price={Data[3].price} rating={Data[3].rating} />
                    <Product id={Data[4].id} title={Data[4].title} image={Data[4].image} price={Data[4].price} rating={Data[4].rating} />

                </div>
                <div className={classes['home__row']}>
                <Product title={Data[6].title} image={Data[6].image} price={Data[6].price} rating={Data[6].rating} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;