import { Request, Response } from "express";
import { CreateProfileService } from "../../service/profile/CreateProfileService";
class CreateProfileController {
  async handle(request: Request, response: Response) {
   const { email,password } = request.body;
   console.log(email, password)
 
   const profile = {
      email:email,
      password:password,
      
    }; 
    const createProfileService  = new CreateProfileService();
    const ret = await  createProfileService.execute(profile);
    return response.json(ret);

  }
}
export { CreateProfileController };