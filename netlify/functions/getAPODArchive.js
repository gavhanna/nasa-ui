const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const response = await axios.get(
      `${process.env.NETLIFY_NASA_ROOT}/planetary/apod?api_key=${process.env.NETLIFY_NASA_API_KEY}&start_date=${event.queryStringParameters.start_date}&end_date=${event.queryStringParameters.end_date}`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
