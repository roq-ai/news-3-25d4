import axios from 'axios';
import queryString from 'query-string';
import { TranslationInterface, TranslationGetQueryInterface } from 'interfaces/translation';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTranslations = async (
  query?: TranslationGetQueryInterface,
): Promise<PaginatedInterface<TranslationInterface>> => {
  const response = await axios.get('/api/translations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTranslation = async (translation: TranslationInterface) => {
  const response = await axios.post('/api/translations', translation);
  return response.data;
};

export const updateTranslationById = async (id: string, translation: TranslationInterface) => {
  const response = await axios.put(`/api/translations/${id}`, translation);
  return response.data;
};

export const getTranslationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/translations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTranslationById = async (id: string) => {
  const response = await axios.delete(`/api/translations/${id}`);
  return response.data;
};
