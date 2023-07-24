import axios from 'axios';
import queryString from 'query-string';
import { UrlInterface, UrlGetQueryInterface } from 'interfaces/url';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUrls = async (query?: UrlGetQueryInterface): Promise<PaginatedInterface<UrlInterface>> => {
  const response = await axios.get('/api/urls', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createUrl = async (url: UrlInterface) => {
  const response = await axios.post('/api/urls', url);
  return response.data;
};

export const updateUrlById = async (id: string, url: UrlInterface) => {
  const response = await axios.put(`/api/urls/${id}`, url);
  return response.data;
};

export const getUrlById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/urls/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUrlById = async (id: string) => {
  const response = await axios.delete(`/api/urls/${id}`);
  return response.data;
};
