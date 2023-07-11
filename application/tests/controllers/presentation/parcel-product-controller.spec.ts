import { ParcelProductController } from "../../../src/presentation/controllers/parcel-product-controller";
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
          entryValue: 9999,
          parcelsQuantity: 9999
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
});