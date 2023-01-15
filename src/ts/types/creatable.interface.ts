export interface ICreatable {
  [key: string]: any;
  create: { (): void };
}
