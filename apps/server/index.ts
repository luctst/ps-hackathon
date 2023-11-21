import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { publicProcedure, router } from './trpc';
import { v4 } from 'uuid';

const BASE_URL = 'https://api-m.sandbox.paypal.com';

const PARTNER_ID = 'AcG9tUFUS4-MEUvw0QU1Qeicds-pn0GJy27nLHwbrGJPtX1GSRjMxLPKrqY_Oo5VfshkHr2Tdx7ZNEpn';
const PARTNER_BN_CODE = 'PrestaShop_Cart_PSXO_Testing';
const MERCHANT_ID = 'WGB2BUWE22BZE';
const CLIENT_TOKEN = 'A21AALIy80GgqtUfBSOTiCOljk7AntM3BpI1eyTaRBN9CtjehzvFpZj51yTNkGbILi5W9L30UwfVW1V-LP0vvi73ifX3oLIKQ';

const appRouter = router({
    createOrder: publicProcedure
        .query(async () => {

            const correlationId = v4();
            const ids = btoa(`{"iss":"${PARTNER_ID}","payer_id":"${MERCHANT_ID}"}`);
            const authAssertionHeader = `${btoa('{"alg":"none"}')}.${ids}.`;
            const orderResponse = fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CLIENT_TOKEN}`,

                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                    'PayPal-Partner-Attribution-ID': `${PARTNER_BN_CODE}`,
                    'Paypal-Auth-Assertion': authAssertionHeader,
                    'PayPal-Request-Id': correlationId,
                },
                body: JSON.stringify({
                    "intent": "CAPTURE",
                    "purchase_units": [{
                        "items": [
                            {
                                "sku": "TA1000",
                                "name": "T-Shirt",
                                "description": "Green XL",
                                "quantity": "1",
                                "unit_amount": {
                                    "currency_code": "USD",
                                    "value": "100.00"
                                }
                            }
                        ],
                        "amount": {
                            "currency_code": "USD",
                            "value": "100.00",
                            "breakdown": {
                                "item_total": {
                                    "currency_code": "USD",
                                    "value": "100.00"
                                }
                            }
                        },
                        "payee": {
                            "email_address": "sb-u4347jj25086086@business.example.com",
                            "merchant_id": "WGB2BUWE22BZE"
                        },
                        "shipping": {
                            "name":{
                                "full_name": "John Doe"
                            },
                            "address": {
                                "address_line_1": "123 Townsend St",
                                "address_line_2": "Floor 6",
                                "admin_area_2": "San Francisco",
                                "admin_area_1": "CA",
                                "postal_code": "94107",
                                "country_code": "US"
                            }
                        }
                    }],
                    "payment_source": {
                        "paypal": {
                            "name": {
                                "given_name": "John",
                                "surname": "Doe"
                            },
                            "email_address": "sb-vl6xe28012962@personal.example.com",
                            "experience_context": {
                                "locale": "en-US",
                                "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                                "payment_method_selected": "PAYPAL",
                                "brand_name": "PrestaShop Test Store",
                                "landing_page": "LOGIN",
                                "shipping_preference": "SET_PROVIDED_ADDRESS",
                                "return_url": "https://example.com/returnUrl",
                                "cancel_url": "https://example.com/cancelUrl"
                            },
                            "attributes": {
                                "vault": {
                                    "store_in_vault": "ON_SUCCESS",
                                    "usage_type": "MERCHANT",
                                    "customer_type": "CONSUMER",
                                    "permit_multiple_payment_tokens": true
                                }
                            },
                        }
                    }
                })
            });

            return orderResponse
                .then((response) => response.json());
        }),
    captureOrder: publicProcedure
        .input((orderId: unknown) => {
            // If the value is of type string, return it.
            // It will now be inferred as a string.
            if (typeof orderId === 'string') return orderId;

            // Uh oh, looks like that input wasn't a string.
            // We will throw an error instead of running the procedure.
            throw new Error(`Invalid input: ${typeof orderId}`);
        })
        .query(async (opts: any) => {
            const orderId = opts.input;
            const URL = `${BASE_URL}/v2/checkout/orders/${orderId}/capture`;

            const correlationId = v4();
            const ids = btoa(`{"iss":"${PARTNER_ID}","payer_id":"${MERCHANT_ID}"}`);
            const authAssertionHeader = `${btoa('{"alg":"none"}')}.${ids}.`;

            const orderResponse = fetch(URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${CLIENT_TOKEN}`,

                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                    'PayPal-Partner-Attribution-ID': `${PARTNER_BN_CODE}`,
                    'Paypal-Auth-Assertion': authAssertionHeader,
                    'PayPal-Request-Id': correlationId,
                }
            });

            return orderResponse
                .then((response) => response.json());
        })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

server.listen(4000);
