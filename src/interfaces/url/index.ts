import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface UrlInterface {
  id?: string;
  url: string;
  publisher_id?: string;
  created_at?: any;
  updated_at?: any;

  publisher?: PublisherInterface;
  _count?: {};
}

export interface UrlGetQueryInterface extends GetQueryInterface {
  id?: string;
  url?: string;
  publisher_id?: string;
}
