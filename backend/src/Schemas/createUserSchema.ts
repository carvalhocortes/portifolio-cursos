import * as Yup from 'yup';

export default Yup.object({
  body: Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
  }).required(),
});
