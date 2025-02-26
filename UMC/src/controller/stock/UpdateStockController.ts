import { Request, Response } from "express";
import { UpdateStockService } from "../../service/stock/UpdateStockService";

class UpdateStockController {

  async handle(request: Request, response: Response) {
    const { id, product, quantity, category, supplier } = request.body;

    const updateStockService = new UpdateStockService();

    const stock = await updateStockService.execute({id,
      product,
      quantity,
      category,
      supplier,
    });
    return response.json(stock);
  }
}

export { UpdateStockController };