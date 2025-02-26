import { Request, Response } from "express";
import {  ListProfileService } from "../../service/profile/ListProfileService";
class ListProfilesController {
    async handle(request: Request, response: Response) {    
      const listProfileService = new ListProfileService();
      const profiles = await listProfileService.execute();
      return response.json(profiles); 
    }    
  } 
  export { ListProfilesController };