const notFound = (req, res) =>
  res.status(404).send("Reaquested Route does not exist");

module.exports = notFound;
