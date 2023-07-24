import { NewsInterface } from 'interfaces/news';
import { UrlInterface } from 'interfaces/url';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PublisherInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  news?: NewsInterface[];
  url?: UrlInterface[];
  user?: UserInterface;
  _count?: {
    news?: number;
    url?: number;
  };
}

export interface PublisherGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
