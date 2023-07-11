import { ParcelProductController } from "../../../src/presentation/controllers/parcel-product-controller";
import { HttpRequest, HttpResponse } from "../../../src/presentation/protocols/http";

describe('ParcelProductController Test', () => {
  test('Should return 400 if no product was provided', () => {
    const sut = new ParcelProductController();

    const request: HttpRequest = {
      body: {
        product: {

        },
        paymentCondiction: {
          entryValue: 9999,
          parcelsQuantity: 9999
        }
      }
    };

    const response: HttpResponse = sut.handle(request);

    expect(response.statusCode).toBe(400);
  })
});