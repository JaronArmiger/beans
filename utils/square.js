const { Client, Environment, ApiError } = require('square');
require('dotenv').config();

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const { paymentsApi } = client;

exports.createPaymentPromise = (requestBody) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await paymentsApi
        .createPayment(requestBody);

      resolve({
        title: 'Payment Successful',
        result: response.result,
      });
    } catch (error) {
      let errorResult = null;
      if (error instanceof ApiError) {
        errorResult = error.errors;
        console.log(error.errors);
      } else {
        errorResult = error;
      };
      reject({
        title: 'Payment Failure',
        result: errorResult,
      });
    };
  })
};