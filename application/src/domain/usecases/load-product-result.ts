import { ProductModel } from "../models/product"


export interface LoadProductResult {
  load(productId: number): Promise<LoadProductResult.Result>|Promise<boolean>
}

export namespace LoadProductResult {
  export type Result = ProductModel
}