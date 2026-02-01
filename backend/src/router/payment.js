const express = require("express");
const stripe = require("../config/stripe");
const { MEMBERSHIP_PLANS } = require("../utils/constants");
const { userAuth } = require("../middlewares/auth");

const paymentRouter = express.Router();

paymentRouter.post(
    "/payment/create-checkout-session",
    userAuth, 
    async (req, res) => {
        try {
            const planType = req.body?.planType;
            const plan = MEMBERSHIP_PLANS[planType];

            if (!plan) {
                return res.status(400).json({
                    message: "Invalid membership plan"
                });
            }
            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: plan.name,            
                                description: plan.description 
                            },
                            unit_amount: plan.price * 100
                        },
                        quantity: 1
                    }
                ],
                success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
                metadata: {
                    userId: req.user._id.toString(), 
                    planType: planType,           
                    durationInDays: plan.period.toString()
                }
            });
            return res.status(200).json({
                session: session,
                url: session.url
            });

        } catch (error) {
            console.error("Stripe Checkout Error:", error);

            return res.status(500).json({
                message: "Failed to create checkout session",
                error: error.message
            });
        }
    }
);

module.exports = paymentRouter;
