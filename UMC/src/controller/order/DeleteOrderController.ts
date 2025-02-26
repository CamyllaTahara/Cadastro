import { Request, Response } from "express";
import { DeleteOrderService } from "../../service/order/DeleteOrderService";

class DeleteOrderController {
  async handle(request: Request, response: Response) {
    const deleteOrderService = new DeleteOrderService();
    const id= request.params.id;
    const orders = await deleteOrderService.execute({id});

    return response.json(orders);
  }
}

export { DeleteOrderController };