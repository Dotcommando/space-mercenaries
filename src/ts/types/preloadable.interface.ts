export interface IPreloadable {
  [key: string]: any;
  preload: { (): void };
}
