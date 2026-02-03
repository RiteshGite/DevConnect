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
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type !== "checkout.session.completed") {
        return res.json({ received: true });
    }

    const session = event.data.object;

    if (!session.metadata || !session.metadata.membership_type) {
        return res.json({ received: true });
    }

    const planType = session.metadata.membership_type;
    const plan = MEMBERSHIP_PLANS[planType];

    if (!plan) {
        return res.json({ received: true });
    }

    const durationInMonths = parseInt(plan.period, 10);
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + durationInMonths);

    await Payment.findOneAndUpdate(
        {
            orderId: session.id,
            status: { $ne: "completed" } 
        },
        {
            $set: {
                paymentId: session.payment_intent,
                status: "completed",
                "notes.expiryDate": expiryDate
            }
        }
    );

    res.json({ received: true });
};

module.exports = paymentWebHookHandler;
