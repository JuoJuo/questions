const { Result } = require('../model');

async function getResult(pageNum = 1, pageSize = 1000) {
  const docs = await Result
    .find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  return docs;
}


async function postResult(str) {
  const rs = await Result({ str: JSON.stringify(str) }).save();
  console.log(rs)
}

module.exports = {
  getResult,
  postResult,
};
