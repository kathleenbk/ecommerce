import React, {useState, useEffect} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const KEY = "pk_test_51L61O4D1rXljlRwg4FCOAwmkJeCUoFdqviSyfeiAYH0HOPoBvJ6irhRx7GOAICAUIRPMjR2J2ID9noLGqaMEHfvS004hckVXST"


const Pay = () => {
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token)
    };

    

    useEffect(() =>{
        const makeRequest = async () => {
            try{
                const res = await axios.post("http://localhost:5000/api/checkout/payment", 
                {
                    tokenId: stripeToken.id,
                    amount:2000,
                }
                );
                console.log(res.data);

            }catch(err){
                console.log(err)
            }
        };
        stripeToken && makeRequest();
        

    }, [stripeToken])

    return (
        <div>
            <StripeCheckout name="The Fat Tree" 
            image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F06%2F26%2Ftiny-white-kitten-873941684-2000.jpg" 
            billingAddress 
            shippingAddress 
            description = "Your total is $$$"
            amount={2000} 
            token={onToken}
            stripeKey={KEY}>
                <button className='btn btn-success'>PAY</button>
            </StripeCheckout>
        </div>
    )
}

export default Pay