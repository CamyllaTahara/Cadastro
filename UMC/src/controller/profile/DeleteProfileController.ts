import { Request, Response } from "express";
import { DeleteProfileService } from "../../service/profile/DeleteProfileService";

class DeleteProfileController {
  async handle(request: Request, response: Response) {
    const deleteProfileService = new DeleteProfileService();
    const id= request.params.id;
    const profiles = await deleteProfileService.execute({id});

    return response.json(profiles);
  }
}

export { DeleteProfileController };