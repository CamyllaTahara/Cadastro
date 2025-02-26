import { Request, Response } from "express";
import { CreateOrderService } from "../../service/order/CreateOrderService";
import { privateDecrypt } from "crypto";
class CreateOrderController {
  async handle(request: Request, response: Response) {
   const { number , email, product, quantity , price} = request.body;
   console.log( number)
   console.log(email)
   console.log(product)
   console.log(quantity)
   console.log(price)   
   const order = {
      number:number,
      email:email,
      product:product,
      quantity:quantity,
      price:price
    }; 
    const createOrderService  = new CreateOrderService();
    const ret = await  createOrderService.execute(order);
    return response.json(ret);

  }
}
export { CreateOrderController };