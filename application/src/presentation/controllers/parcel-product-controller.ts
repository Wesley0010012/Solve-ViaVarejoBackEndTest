import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";


export class ParcelProductController implements Controller {
  handle(request: HttpRequest): HttpResponse {
    const inputs: Array<string> = ['product', 'paymentCondiction'];

    for(const input of inputs)
      if(!Object.keys(request.body[input]).length)
        return {
          statusCode: 400,
          body: "invalid"
        }

      return {
        statusCode: 200,
        body: "invalid"
      }
  }

}