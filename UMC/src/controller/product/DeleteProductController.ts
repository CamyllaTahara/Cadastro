import { Request, Response } from "express";
import { DeleteProductService } from "../../service/product/DeleteProductService";

class DeleteProductController {
  async handle(request: Request, response: Response) {
    const deleteProductService = new DeleteProductService();
    const id= request.params.id;
    const products = await deleteProductService.execute({id});

    return response.json(products);
  }
}

export { DeleteProductController };