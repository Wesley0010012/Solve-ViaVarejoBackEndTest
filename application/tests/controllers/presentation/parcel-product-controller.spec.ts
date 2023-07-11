import { ParcelProductController } from "../../../src/presentation/controllers/parcel-product-controller";
import { InvalidParamError } from "../../../src/presentation/errors/invalid-param-error";
import { MissingParamError } from "../../../src/presentation/errors/missing-param-error";
import { HttpRequest, HttpResponse } from "../../../src/presentation/protocols/http";

interface SutTypes {
  sut: ParcelProductController,
}

const makeSut = (): SutTypes => {
  const sut = new ParcelProductController;

  return {
    sut
  };
}

describe('ParcelProductController Test', () => {
  test('Should return 400 if no product was provided', () => {
    const error = new MissingParamError('product');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {},
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no paymentCondiction was provided', () => {
    const error = new MissingParamError('paymentCondiction');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: 123,
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {}
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no product code was provided', () => {
    const error = new MissingParamError('product.code');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '',
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no product name was provided', () => {
    const error = new MissingParamError('product.name');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: 'any_code',
          name: '',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no product value was provided', () => {
    const error = new MissingParamError('product.value');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: 'any_code',
          name: 'any_name',
          value: ''
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no paymentCondiction entryValue was provided', () => {
    const error = new MissingParamError('paymentCondiction.entryValue');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: 'any_code',
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no paymentCondiction parcelsQuantity was provided', () => {
    const error = new MissingParamError('paymentCondiction.parcelsQuantity');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: 'any_code',
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: ''
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if invalid product code was provided', () => {
    const error = new InvalidParamError('product.code');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: 'any_code',
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if minor or equal to zero product code was provided', () => {
    const error = new InvalidParamError('product.code');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '0',
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });
});