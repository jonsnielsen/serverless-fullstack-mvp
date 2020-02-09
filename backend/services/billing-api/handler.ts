export const main = (event: any, context: any, cb) => {
  cb(null, {
    statusCode: 200,
    body: JSON.stringify('hello from billing handler'),
  })
}
