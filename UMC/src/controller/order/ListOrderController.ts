import { Request, Response } from "express";
import {  ListOrderService } from "../../service/order/ListOrderService";
class ListOrdersController {
    async handle(request: Request, response: Response) {    
      const listOrderService = new ListOrderService();
      const orders = await listOrderService.execute();
      return response.json(orders); 
    }    
  } 
  export { ListOrdersController };