import * as yup from 'yup';

export const urlValidationSchema = yup.object().shape({
  url: yup.string().required(),
  publisher_id: yup.string().nullable(),
});
