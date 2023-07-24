import { NewsInterface } from 'interfaces/news';
import { GetQueryInterface } from 'interfaces';

export interface TranslationInterface {
  id?: string;
  news_id?: string;
  language: string;
  translated_text: string;
  created_at?: any;
  updated_at?: any;

  news?: NewsInterface;
  _count?: {};
}

export interface TranslationGetQueryInterface extends GetQueryInterface {
  id?: string;
  news_id?: string;
  language?: string;
  translated_text?: string;
}
