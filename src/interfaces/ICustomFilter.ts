import { IFilterGroup } from './IFilterGroup';

export interface ICustomFilter {
  [key: string]: IFilterGroup[];
}
