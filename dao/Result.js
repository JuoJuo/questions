const { Result } = require('../model');

async function getResult(pageNum = 1, pageSize = 1000) {
  const docs = await Result
    .find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  return docs;
}


async function postResult(g) {
  const docs = await Result.find({ phone: g.phone });

  if (docs.length === 0) {
    return await new Result(g).save();
  } else {
    return 1000;
  }
}

module.exports = {
  getResult,
  postResult,
};
