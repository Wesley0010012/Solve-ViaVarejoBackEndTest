

export class InvalidCompatibilityError extends Error {
  constructor(comparableName: string, modelName: string) {
    super(`Incompatibility founded: ${comparableName} in ${modelName}`);
    this.name = 'InvalidCompatibilityError';
  }
}