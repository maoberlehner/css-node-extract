import { IFilterGroup } from './IFilterGroup';

export interface IFilterDefinitions {
  atRules: IFilterGroup;
  custom: IFilterGroup;
  declarations: IFilterGroup;
  functions: IFilterGroup[];
  mixins: IFilterGroup[];
  rules: IFilterGroup;
  silent: IFilterGroup[];
  variables: IFilterGroup[];
}
