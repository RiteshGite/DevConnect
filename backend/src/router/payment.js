const express = require("express");
const stripe = require("../config/stripe");
const { MEMBERSHIP_PLANS } = require("../utils/constants");
const { userAuth } = require("../middlewares/auth");
const Payment = require("../models/payment");

const paymentRouter = express.Router();

paymentRouter.post("/payment/create-checkout-session", userAuth, async (req, res) => {
  try {
    const { planType } = req.body;

    const plan = MEMBERSHIP_PLANS[planType];

    if (!plan) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",

      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,

      metadata: {
        userId: req.user._id.toString(),
        planType,
      },

    });

    const payment = new Payment({
      userId: req.user._id,
      paymentId: session.payment_intent,
      orderId: session.id,
      amount: plan.price,
      currency: "inr",
      receipt: session.receipt_url,
      notes: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        membershipType: planType
      }
    });

    await payment.save();

    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = paymentRouter;
