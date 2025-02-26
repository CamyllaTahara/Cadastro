import { Request, Response } from "express";
import { CreateProductService } from "../../service/product/CreateProductService";
class CreateProductController {
  async handle(request: Request, response: Response) {
   const { name, code, price, category} = request.body;
   console.log(name)
   console.log(code)
   console.log(price)
   console.log(category)   
   const product = {
      name:name,
      code:code,
      price:price,
      category:category
    }; 
   
    const createProductService  = new CreateProductService();
    const ret = await  createProductService.execute(product);
    return response.json(ret);

  }
}
export { CreateProductController };