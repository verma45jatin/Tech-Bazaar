import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient

export const config = {
    api: {
        bodyParser: false,
    },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
});

const prisma = new PrismaClient(); // Initialize PrismaClient

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    if (!sig) {
        return res.status(400).send("Missing the stripe signature");
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        return res.status(400).send("Webhook error: " + err.message);
    }

    switch (event.type) {
        case "charge.succeeded":
            const charge: Stripe.Charge = event.data.object as Stripe.Charge;

            if (typeof charge.payment_intent === "string") {
                try {
                    await prisma.order.update({
                        where: { paymentIntentId: charge.payment_intent },
                        data: { status: "complete", address: charge.shipping?.address },
                    });
                } catch (err) {
                    return res.status(500).send("Prisma update error: " + err.message);
                }
            }
            break;
        default:
            console.log("Unhandled event type: " + event.type);
    }

    res.json({ received: true });
}
