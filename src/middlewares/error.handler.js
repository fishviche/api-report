const errorHandler = async (err, req, res, next) => {
  res.json({
    message: err.message,
    error: err.error
  })
};
module.exports = {
  errorHandler
};
