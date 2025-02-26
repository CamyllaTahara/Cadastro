import { Request, Response } from "express";
import { DeleteStockService } from "../../service/stock/DeleteStockService";

class DeleteStockController {
  async handle(request: Request, response: Response) {
    const deleteStockService = new DeleteStockService();
    const id= request.params.id;
    const stocks = await deleteStockService.execute({id});

    return response.json(stocks);
  }
}

export { DeleteStockController };