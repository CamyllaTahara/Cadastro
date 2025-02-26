import { Request, Response } from "express";
import { CreateStockService } from "../../service/stock/CreateStockService";
class CreateStockController {
  async handle(request: Request, response: Response) {
   const { product, quantity, category, supplier } = request.body;
   console.log(product)
   console.log(quantity)
   console.log(category)
   console.log(supplier)   
   const stock = {
      product:product,
      quantity:quantity,
      category:category,
      supplier:supplier
    }; 
    const createStockService  = new CreateStockService();
    const ret = await  createStockService.execute(stock);
    return response.json(ret);

  }
}
export { CreateStockController };