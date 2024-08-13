const validate = (schema) => async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      return;
    }
    await schema.validate(body);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error, message });
  }
};
module.exports = { validate };
