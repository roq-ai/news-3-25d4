import * as yup from 'yup';

export const translationValidationSchema = yup.object().shape({
  language: yup.string().required(),
  translated_text: yup.string().required(),
  news_id: yup.string().nullable(),
});
