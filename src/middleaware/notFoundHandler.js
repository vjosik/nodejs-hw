export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.url} not found`,
  });
};
