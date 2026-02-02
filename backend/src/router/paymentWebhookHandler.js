const Payment = require("../models/payment");
const stripe = require("../config/stripe");
const { MEMBERSHIP_PLANS } = require("../utils/constants");

const paymentWebHookHandler = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            "whsec_08fb6facd8282dff28a055b5e23a41e3f19f8591ca4f09553546e4df3a9c7a2c"
        );
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err.message);
        return res.status(400).send("Webhook Error");
    }

    console.log("✅ Webhook verified:", event.type);
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const planType = session.metadata.membership_type;
        const plan = MEMBERSHIP_PLANS[planType];

        const durationInMonths = parseInt(plan.period, 10);
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + durationInMonths);

        console.log("orderId = sessionId = ", session.id);
        const newPayment = await Payment.findOneAndUpdate(
            { orderId: session.id },
            {
                $set: {
                    paymentId: session.payment_intent,
                    status: "completed",
                    "notes.expiryDate": expiryDate
                }
            },
            { new: true }
        );

        console.log("✅ Payment updated successfully");
    }

    res.json({ received: true });
};

module.exports = paymentWebHookHandler;
