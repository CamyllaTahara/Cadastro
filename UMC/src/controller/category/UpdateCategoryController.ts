import { Request, Response } from "express";
import { UpdateCategoryService } from "../../service/category/UpdateCategoryService";

class UpdateCategoryController {

  async handle(request: Request, response: Response) {
    const { id, name, supplier} = request.body;

    const updateCategoryService = new UpdateCategoryService();

    const category = await updateCategoryService.execute({id,
      name,
      supplier,
    });
    return response.json(category);
  }
}

export { UpdateCategoryController };