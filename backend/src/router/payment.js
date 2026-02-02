const express = require("express");
const stripe = require("../config/stripe");
const { MEMBERSHIP_PLANS } = require("../utils/constants");
const { userAuth } = require("../middlewares/auth");
const Payment = require("../models/payment");

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
                    membership_type: planType,           
                    durationInDays: plan.period.toString()
                }
            });

            const payment = new Payment({
                userId: req.user._id,
                orderId: session.id,
                status: session.status,
                amount: session.amount_total / 100,
                currency: session.currency,
                receipt: session.payment_intent,
                notes: {
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                    emailId: req.user.emailId,
                    membership_type: {
                        ...plan
                    }
                }
            })

            const savePayment = await payment.save();

            return res.status(200).json({
                url: session.url,
                savePayment: savePayment
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
