import { Request, Response } from "express";
import { UpdateOrderService } from "../../service/order/UpdateOrderService";

class UpdateOrderController {

  async handle(request: Request, response: Response) {
    const { id, number , email, product, quantity,price } = request.body;

    const updateOrderService = new UpdateOrderService();

    const order = await updateOrderService.execute({id,
      number,
      email,
      product,
      quantity,
      price
    });
    return response.json(order);
  }
}

export { UpdateOrderController };