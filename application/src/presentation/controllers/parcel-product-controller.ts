import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";


export class ParcelProductController implements Controller {
  handle(request: HttpRequest): HttpResponse {
    const inputs: Array<string> = ['product', 'paymentCondiction'];

    for(const input of inputs)
      if(!Object.keys(request.body[input]).length)
        return badRequest(new MissingParamError(input));

    const productInputs: Array<string> = ['code', 'name', 'value'];

    for(const input of productInputs)
      if(!request.body.product[input])
        return badRequest(new MissingParamError('product.' + input));

    const paymentCondictionInputs: Array<string> = ['entryValue', 'parcelsQuantity'];

    for(const input of paymentCondictionInputs)
      if(!request.body.paymentCondiction[input])
        return badRequest(new MissingParamError('paymentCondiction.' + input));

      return {
        statusCode: 200,
        body: "invalid"
      }
  }

}