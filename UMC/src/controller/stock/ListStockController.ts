import { Request, Response } from "express";
import {  ListStockService } from "../../service/stock/ListStockService";
class ListStocksController {
    async handle(request: Request, response: Response) {    
      const listStockService = new ListStockService();
      const stocks = await listStockService.execute();
      return response.json(stocks); 
    }    
  } 
  export { ListStocksController };