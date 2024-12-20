
const Order = require('../../models/order');

// const stripe = require('stripe')('sk_test_51LiyTNSH4QsKt7gAYWZpIajuDuTSeWPEHeErouhsUMtjITkHYE1cLM96gn6LvqicLVyyuy0D32wz2IK60S74ERLy00xyqVFrDo');
const stripe = require('stripe')('sk_test_51LiyTNSH4QsKt7gAYWZpIajuDuTSeWPEHeErouhsUMtjITkHYE1cLM96gn6LvqicLVyyuy0D32wz2IK60S74ERLy00xyqVFrDo');


const createCheckout = async (req, res) => {
    try {
        // console.log(req.body);
        const userid = req.body.cart[0].user._id;

        const lineItems = req.body.cart.map((item) => ({
            "price_data": {
                "currency": "inr",
                "product_data": {
                    "name": item.product.name,
                    "images": ['https://files.worldwildlife.org/wwfcmsprod/images/Panda_in_Tree/hero_full/2wgwt9z093_Large_WW170579.jpg'],
                },
                "unit_amount": item.product.price * 100

            },
            // here start for quantity
            "quantity": item.quantity

        }
        ));
        //here we create customer

        const customer = await stripe.customers.create({
            name: req.body.address.firstname + ' ' + req.body.address.lastname,
            address: {
                line1: req.body.address.address1,
                line2: req.body.address.address2,
                city: req.body.address.city,
                state: req.body.address.state,
                postal_code: req.body.address.postalcode,
                country: 'DE'
            }
        });

        const responseOrder = new Order({
            user: userid,
            item: lineItems,
            customer,
            amount: req.body.totalPrice


        });

        const orderData = await responseOrder.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/paymentScusseful/${orderData._id} `,
            cancel_url: 'http://localhost:3000/cancel',
            customer: customer.id
        });
        await Order.updateOne(
            { _id: orderData._id },
            {
                $set: {
                    session

                }
            })
       
       
        console.log(lineItems, customer);
        res.status(200).json({ message: 'success', session: session.id });
    }

    catch (error) {
        console.log(error)

        res.status(500).json({ message: 'internal server error' });

    }
};


// const setPaymentStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { status, userId } = req.body;

//         const orderUpdatd=await Order.updateOne({ _id: orderId }, { $set: { status } });

//         console.log('status=>', status, userId,orderUpdatd)

//         if (status === 'successful') {

//          const data=   await Cart.deleteMany({ user: userId });

//          console.log('response data=>',data)
           
//         }

//         res.status(200).json({ message: 'success' });
//     } catch (error) {
//         console.error('Error in setPaymentStatus:', error.message);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// };




const setPaymentStatus = async (req, res) => {
    const response = await Order.updateOne(
        req.params,
        {
            $set: {
                status: req.body.status,

            }
        }
    )
    console.log(response.data)
    res.status(200).json({ message: 'success' });
};



module.exports = {
    createCheckout,
    setPaymentStatus
}