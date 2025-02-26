import { Request, Response } from "express";
import { UpdateProfileService } from "../../service/profile/UpdateProfileService";

class UpdateProfileController {

  async handle(request: Request, response: Response) {
    const { id, email, password } = request.body;

    const updateProfileService = new UpdateProfileService();

    const profile = await updateProfileService.execute({id,
      email,
      password
    });
    return response.json(profile);
  }
}

export { UpdateProfileController };