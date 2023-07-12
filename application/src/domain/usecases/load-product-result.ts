import { ProductModel } from "../models/product"


export interface LoadProductResult {
  load(productId: number): Promise<LoadProductResult.Result>
}

export namespace LoadProductResult {
  export type Result = ProductModel | false
}