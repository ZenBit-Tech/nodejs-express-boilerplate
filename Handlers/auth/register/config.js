const Yup = require('yup')

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .required()
    .min(8)
    .max(12),
  name: Yup.string().required(),
})

module.exports.validationSchema = validationSchema
