import * as yup from 'yup';

export const newsValidationSchema = yup.object().shape({
  title: yup.string().required(),
  summary: yup.string().required(),
  category: yup.string().required(),
  publisher_id: yup.string().nullable(),
});
