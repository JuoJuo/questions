const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  str: String,
});
module.exports = ResultSchema;
