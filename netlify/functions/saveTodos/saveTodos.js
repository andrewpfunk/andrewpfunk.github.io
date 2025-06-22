// TODO connect to database

const handler = async (event) => {
  // only allow PUT requests
  if (event.httpMethod !== 'PUT') {
    return {
      statusCode: 405,
    }
  }

  try {
    // TODO save todos to database

    const result = '["Hello from saveTodos function"]';

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
