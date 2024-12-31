const stripe = require("../../config/stripe");
const orderModel = require("../../models/orderModel");
const cartModel = require("../../models/cartModel");

const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK;

async function getLineItems(lineItems){
    let productItems = [];

    if(lineItems?.data?.length){
        for(const item of lineItems?.data){
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;
            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount/100,
                quantity: item.quantity,
                image: product.images
            }
            productItems.push(productData);

            


        }
    }
    return productItems;
}

const webhook = async (req,res) => {
    const signature = req.headers['stripe-signature'];
    const payloadString = JSON.stringify(req.body);
    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret : endPointSecret,
      });
    let event;
    try {
        event = stripe.webhooks.constructEvent(
          payloadString,
          header,
          endPointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
    }

    switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
        //   console.log("session",session);
          const line_items = await stripe.checkout.sessions.listLineItems(session.id);

          const productDetails = await getLineItems(line_items);

          const orderDetails = {
            productDetails: productDetails,
            email: session.customer_email,
            userId: session.metadata.userId,
            paymentDetails: {
                paymentId: session.payment_intent,
                payment_method_types: session.payment_method_types,
                payment_status: session.payment_status
            },
            shipping_options: session.shipping_options,
            totalAmount: session.amount_total
        }

        const order = await orderModel(orderDetails);
        const newOrder = await order.save();
        //console.log("newOrder",newOrder);
        if(newOrder?._id){
          const deleteCartItems = await cartModel.deleteMany({userId: session.metadata.userId})
        }



        //   console.log(line_items);
          break;
        default:
          // Unexpected event type
          console.log(`Unhandled event type ${event.type}.`);
      }

    res.status(200).send();
}

module.exports = webhook;