import { IFilterGroup } from './IFilterGroup';

export interface IProcessOptions {
  css: string;
  filters: string|string[];
  customFilter: IFilterGroup;
  postcssSyntax?: any;
}
