const ResultSchema = require('./Result');
const conn = require('./Connection');

const Result = conn.model('Result', ResultSchema);

module.exports = {
  Result,
};
