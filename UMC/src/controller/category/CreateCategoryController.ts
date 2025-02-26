import { Request, Response } from "express";
import { CreateCategoryService } from "../../service/category/CreateCategoryService";
class CreateCategoryController {
  async handle(request: Request, response: Response) {
   const { name, supplier} = request.body;
   console.log(name)
   console.log(supplier)  
   const category = {
      name:name,
      supplier:supplier,
    }; 
    const createCategoryService  = new CreateCategoryService();
    const ret = await  createCategoryService.execute(category);
    return response.json(ret);

  }
}
export { CreateCategoryController };