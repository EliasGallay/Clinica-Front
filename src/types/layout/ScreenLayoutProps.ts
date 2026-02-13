import { AnyObject } from '../commons/AnyObject';

export interface ScreenLayoutProps {
  fetchData: (filters: AnyObject) => Promise<AnyObject[] | void>;
  mapData: (data: AnyObject) => AnyObject;
}
