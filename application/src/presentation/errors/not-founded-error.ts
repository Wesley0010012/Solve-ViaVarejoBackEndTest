

export class NotFoundedError extends Error {
  constructor(modelName: string) {
    super(`${modelName} : not founded`);
    this.name = "NotFoundedError";
  }
}