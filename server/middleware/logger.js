module.exports = (req, res, next) => {
  console.log(req.method, req.url);

  return next(req, res);
};
