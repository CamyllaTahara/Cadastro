import { Request, Response } from "express";
import { DeleteCategoryService } from "../../service/category/DeleteCategoryService";

class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const deleteCategoryService = new DeleteCategoryService();
    const id= request.params.id;
    const categorys = await deleteCategoryService.execute({id});

    return response.json(categorys);
  }
}

export { DeleteCategoryController };