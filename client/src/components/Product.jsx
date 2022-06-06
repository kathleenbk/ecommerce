import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Product = (props) => {

    const { id } = useParams();
    const [oneProduct, setOneProduct] = useState([]);





    useEffect(() => {
        axios.get('http://localhost:5000/api/products/find/' + id)
            .then(res => {
                setOneProduct(res.data);
            })
            .catch((err) => console.log(err))
    }, [id])

    return (
        <div>
            <div className='main-container d-flex'>


                <div>
                    <img src={oneProduct.image} alt='Product' className='main-image' />
                    <div className='d-flex justify-content-center'>
                        <img src={oneProduct.image} alt='Product' className='mini-image' />
                        <img src={oneProduct.image} alt='Product' className='mini-image' />
                        <img src={oneProduct.image} alt='Product' className='mini-image' />
                        <img src={oneProduct.image} alt='Product' className='mini-image' />
                    </div>
                </div>

                <div>
                    <div className='one-product-info'>
                        <h3 className='main-product-text'>{oneProduct.name}</h3>
                        <p>★ Best Seller</p>
                        <h3 className='main-product-text'>${oneProduct.price}</h3>
                        <h3>Size: {oneProduct.weight} oz</h3>
                        <div className='d-flex '>
                            <button className='mr-2'>How to Use</button>
                            <button>Ingredients</button>
                        </div>
                        <p className='mt-4'>{oneProduct.description}</p>
                        <h4>Great for:</h4>
                        <li className='list'>All Skin Types</li>
                        <li className='list'>All Hair Types</li>
                        <div className='d-flex justify-content-center mt-5'>
                            <button className='add-to-cart'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='more-product-content'>
            </div>
        </div>
    )
}

export default Product