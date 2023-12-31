const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req,res) =>{

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency:'inr',

        metadata:{integration_check:'accept_a_payment'}
    });

    res.status(200).json({
        success:true,
        client_secret: paymentIntent.client_secret
    })

}

exports.sendAPIKey = async(req,res) => {
    res.status(200).json({
        stripe_APi_key : process.env.STRIPE_API_KEY,
    })
}
