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

    const results = await cluster.query(`SELECT ${BUCKET} from ${BUCKET}.${BUCKET}.${BUCKET}`)
    // SELECT todos from todos.todos.todos is returning an array, containing one object, with key 'todos' and value what we're after
    // {"rows":[{"todos":[{"complete":true,"id":1,"text":"Create a serverless function"}]}],"meta":{"requestId":"ff181a9e-ab19-4f93-b16c-f2d943defc99","clientContextId":"fa0619-3963-e444-bac7-dfd084c5d6eea7","status":"success","signature":{"todos":"json"},"warnings":[]}}
    // const results = [{id: 1, text: "Create a serverless function", complete: false}];
    const whatIwant = results.rows.todos

    return {
      statusCode: 200,
      body: JSON.stringify(whatIwant),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }