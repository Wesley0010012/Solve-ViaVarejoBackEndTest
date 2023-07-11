import { ParcelProductController } from "../../../src/presentation/controllers/parcel-product-controller";
import { MissingParamError } from "../../../src/presentation/errors/missing-param-error";
import { HttpRequest, HttpResponse } from "../../../src/presentation/protocols/http";

describe('ParcelProductController Test', () => {
  test('Should return 400 if no product was provided', () => {
    const error = new MissingParamError('product');

    const sut = new ParcelProductController();

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
});