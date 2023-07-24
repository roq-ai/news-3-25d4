import { TranslationInterface } from 'interfaces/translation';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface NewsInterface {
  id?: string;
  title: string;
  summary: string;
  category: string;
  publisher_id?: string;
  created_at?: any;
  updated_at?: any;
  translation?: TranslationInterface[];
  publisher?: PublisherInterface;
  _count?: {
    translation?: number;
  };
}

export interface NewsGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  summary?: string;
  category?: string;
  publisher_id?: string;
}
