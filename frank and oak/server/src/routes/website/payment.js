const express =require ('express');
const { createCheckout, setPaymentStatus, clearCart } = require('../../controllers/controller');
// const { updatedCartpayment } = require('../../controllers/website/paymentController');

const paymentRouter=express.Router();
paymentRouter.post('/create-checkout',createCheckout);
paymentRouter.put('/update-payment-status/:_id',setPaymentStatus)
paymentRouter.put('/clear-cart',clearCart)
// paymentRouter.get('/:userId',updatedCartpayment)



module.exports=paymentRouter;