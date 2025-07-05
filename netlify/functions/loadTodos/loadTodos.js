const couchbase = require('couchbase')

const ENDPOINT = process.env.COUCHBASE_ENDPOINT
const USERNAME = process.env.COUCHBASE_USERNAME
const PASSWORD = process.env.COUCHBASE_PASSWORD
const BUCKET = process.env.COUCHBASE_BUCKET

const couchbaseClientPromise = couchbase.connect('couchbases://' + ENDPOINT, {
  username: USERNAME,
  password: PASSWORD,
  timeouts: {
    kvTimeout: 10000, // milliseconds
  },
})

const handler = async (event) => {
  // only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
    }
  }

  try {

    const cluster = await couchbaseClientPromise
    const bucket = cluster.bucket(BUCKET)
    const scope = bucket.scope(BUCKET)
    const collection = scope.collection(BUCKET)

    // this either crashes or returns {}
    const results = collection.get(BUCKET)

    // this works (and is what I expect to get from collection.get)
    // const results = [{
    //   "id": 1,
    //   "text": "Create a serverless function",
    //   "complete": true
    // }]

    return {
      statusCode: 200,
      body: JSON.stringify(results.content),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }