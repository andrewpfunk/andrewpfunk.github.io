// TODO connect to database

const handler = async (event) => {
  // only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
    }
  }

  try {

    // TODO query database

    const results = [{id: 1, text: "Create a serverless function", complete: false}];

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }