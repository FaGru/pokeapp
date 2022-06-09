export interface Result {
  name: string;
  url: string;
}

export interface AllTypesRootObject {
  count: number;
  next?: any;
  previous?: any;
  results: Result[];
}
