import { Request, Response } from "express";
import { UpdateProductService } from "../../service/product/UpdateProductService";

class UpdateProductController {

  async handle(request: Request, response: Response) {
    const { id, name, code, price, category } = request.body;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({id,
      name,
      code,
      price,
      category,
    });
    return response.json(product);
  }
}

export { UpdateProductController };