export interface IinitialForm {
  [key: string]: unknown;
}
export interface IformValidations {
  [key: string]: [(value: string) => boolean, string];
}
export interface IformValid {
  [key: string]: string | null;
}