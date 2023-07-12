import { ProductModel } from "../../../src/domain/models/product";
import { LoadProductResult } from "../../../src/domain/usecases/load-product-result";
import { ParcelProductController } from "../../../src/presentation/controllers/parcel-product-controller";
import { InternalServerError } from "../../../src/presentation/errors/internal-server-error";
import { InvalidCompatibilityError } from "../../../src/presentation/errors/invalid-compatibity-error";
import { InvalidParamError } from "../../../src/presentation/errors/invalid-param-error";
import { MissingParamError } from "../../../src/presentation/errors/missing-param-error";
import { NotFoundedError } from "../../../src/presentation/errors/not-founded-error";
import { HttpRequest, HttpResponse } from "../../../src/presentation/protocols/http";

interface SutTypes {
  sut: ParcelProductController,
  loadProductResult: LoadProductResult
}

const makeLoadProductResult = (): LoadProductResult => {
  class LoadProductResultStub implements LoadProductResult {
    load(productId: number): Promise<LoadProductResult.Result> {
      return Promise.resolve({
        code: 1,
        name: "valid_name",
        value: 100
      });
    }

  }

  return new LoadProductResultStub;
}

const makeSut = (): SutTypes => {
  const loadProductResult = makeLoadProductResult();
  const sut = new ParcelProductController(loadProductResult);

  return {
    sut,
    loadProductResult
  };
}

describe('ParcelProductController Test', () => {
  test('Should return 400 if no product was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no paymentCondiction was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no product code was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no product name was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no product value was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no paymentCondiction entryValue was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Should return 400 if no paymentCondiction parcelsQuantity was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if invalid product code was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if minor or equal to zero product code was provided', async () => {
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

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if invalid product value was provided', async () => {
    const error = new InvalidParamError('product.value');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: 'any_value'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if minor of zero value was provided', async () => {
    const error = new InvalidParamError('product.value');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '0'
        },
        paymentCondiction: {
          entryValue: '9999',
          parcelsQuantity: '9999'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if invalid paymentCondiction entryValue was provided', async () => {
    const error = new InvalidParamError('paymentCondiction.entryValue');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: 'any_entry',
          parcelsQuantity: 'any_parcels'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if minor of zero paymentCondiction entryValue was provided', async () => {
    const error = new InvalidParamError('paymentCondiction.entryValue');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '-1',
          parcelsQuantity: 'any_parcels'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if invalid paymentCondiction parcelsQuantity was provided', async () => {
    const error = new InvalidParamError('paymentCondiction.parcelsQuantity');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: 'any_parcels'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if minor or equal to zero paymentCondiction parcelsQuantity was provided', async () => {
    const error = new InvalidParamError('paymentCondiction.parcelsQuantity');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '0'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure return 400 if product not exists', async () => {
    const error = new NotFoundedError('product');

    const { sut, loadProductResult } = makeSut();

    jest.spyOn(loadProductResult, 'load').mockImplementationOnce((productId: number): Promise<LoadProductResult.Result> => {
      return Promise.resolve(false);
    });

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '1'
        }
      }
    };

    const response: HttpResponse = await sut.handle(request);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(error.message);
  });

  test('Ensure loadProductResult have called with correct product code', async () => {
    const { sut, loadProductResult } = makeSut();

    const loadProductSpy = jest.spyOn(loadProductResult, 'load');

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'any_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '1'
        }
      }
    };

    await sut.handle(request);

    expect(loadProductSpy).toHaveBeenCalledWith(parseFloat(request.body.product.code));
  });

  test('Ensure return 400 if product code was not compatible with request', async () => {
    const error = new InvalidCompatibilityError('code', 'product');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '999',
          name: 'invalid_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '1'
        }
      }
    };

    const result: HttpResponse = await sut.handle(request);

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe(error.message);
  });

  test('Ensure return 400 if product name was not compatible with request', async () => {
    const error = new InvalidCompatibilityError('name', 'product');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'invalid_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '1'
        }
      }
    };

    const result: HttpResponse = await sut.handle(request);

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe(error.message);
  });

  test('Ensure return 400 if product value was not compatible with request', async () => {
    const error = new InvalidCompatibilityError('value', 'product');

    const { sut } = makeSut();

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'valid_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '1'
        }
      }
    };

    const result: HttpResponse = await sut.handle(request);

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toBe(error.message);
  });

  test('Ensure return 500 if loadProductResult throws', async () => {
    const error = new InternalServerError();

    const { loadProductResult, sut } = makeSut();

    jest.spyOn(loadProductResult, 'load').mockImplementationOnce((): Promise<LoadProductResult.Result> => {
      throw new Error('Some error...');
    });

    const request: HttpRequest = {
      body: {
        product: {
          code: '1',
          name: 'valid_name',
          value: '1'
        },
        paymentCondiction: {
          entryValue: '1',
          parcelsQuantity: '1'
        }
      }
    };

    const result: HttpResponse = await sut.handle(request);

    expect(result.statusCode).toBe(500);
    expect(result.body.message).toBe(error.message);
  });

});