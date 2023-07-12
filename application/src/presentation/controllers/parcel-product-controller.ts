import { isNumberObject } from "util/types";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest } from "../helpers/http-helpers";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { InvalidParamError } from "../errors/invalid-param-error";
import { LoadProductResult } from "../../domain/usecases/load-product-result";
import { NotFoundedError } from "../errors/not-founded-error";
import { ProductModel } from "../../domain/models/product";
import { InvalidCompatibilityError } from "../errors/invalid-compatibity-error";

export class ParcelProductController implements Controller {
  constructor(private readonly loadProduct: LoadProductResult) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
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

    if(!pCode || pCode <= 0)
      return badRequest(new InvalidParamError('product.code'));

    if(!pValue || pValue <= 0)
      return badRequest(new InvalidParamError('product.value'));

    const { entryValue, parcelsQuantity } = paymentCondiction;
    const pEntryValue = parseFloat(entryValue);
    const pParcelsQuantity = parseFloat(parcelsQuantity);

    if(!pEntryValue || pEntryValue < 0)
      return badRequest(new InvalidParamError('paymentCondiction.entryValue'));

    if(!pParcelsQuantity || pParcelsQuantity <= 0)
      return badRequest(new InvalidParamError('paymentCondiction.parcelsQuantity'));

    const productResult: ProductModel | boolean = await this.loadProduct.load(pCode);

    if(!productResult)
      return badRequest(new NotFoundedError('product'));

    if(productResult.code !== pCode)
      return badRequest(new InvalidCompatibilityError('code', 'product'));

    if(productResult.name !== name)
      return badRequest(new InvalidCompatibilityError('name', 'product'));

    if(productResult.value !== pValue)
      return badRequest(new InvalidCompatibilityError('value', 'product'));

    return {
      statusCode: 200,
      body: 'passed'
    }
  }

}