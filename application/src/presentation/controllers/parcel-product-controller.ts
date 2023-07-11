import { isNumberObject } from "util/types";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { InvalidParamError } from "../errors/invalid-param-error";

export class ParcelProductController implements Controller {
  handle(request: HttpRequest): HttpResponse {
    const inputs: Array<string> = ['product', 'paymentCondiction'];

    for(const input of inputs)
      if(!Object.keys(request.body[input]).length)
        return badRequest(new MissingParamError(input));

    const productInputs: Array<string> = ['code', 'name', 'value'];
    const { product } = request.body;

    for(const input of productInputs)
      if(!product[input])
        return badRequest(new MissingParamError('product.' + input));

    const paymentCondictionInputs: Array<string> = ['entryValue', 'parcelsQuantity'];
    const { paymentCondiction } = request.body;

    for(const input of paymentCondictionInputs)
      if(!paymentCondiction[input])
        return badRequest(new MissingParamError('paymentCondiction.' + input));

    const { code, name, value } = product;
    const pCode = parseFloat(code);
    const pValue = parseFloat(value);

    if(!pCode || pCode < 0)
      return badRequest(new InvalidParamError('product.code'));

    if(!pValue || pValue < 0)
      return badRequest(new InvalidParamError('product.value'));

    return {
      statusCode: 200,
      body: 'passed'
    }
  }

}