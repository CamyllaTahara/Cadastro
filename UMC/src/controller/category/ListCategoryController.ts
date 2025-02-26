import { Request, Response } from "express";
import {  ListCategoryService } from "../../service/category/ListCategoryService";
class ListCategorysController {
    async handle(request: Request, response: Response) {    
      const listCategoryService = new ListCategoryService();
      const categorys = await listCategoryService.execute();
      return response.json(categorys); 
    }    
  } 
  export { ListCategorysController };