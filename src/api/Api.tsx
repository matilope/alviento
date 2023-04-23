import { Auth } from "aws-amplify";
import { API } from "aws-amplify";

export default class AlvientoApi {
  
  private apiName: string;
  init: { headers: { Authorization: string; }; } | undefined;

  constructor() {
    this.apiName = "apibackend";
  }

  async getAuth() {
    return `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
  }

  async get(path: string) {
    this.init = {
      headers: {
        Authorization: await this.getAuth()
      }
    }
    return await API.get(this.apiName, path, this.init);
  }

  async post(path: string, init: object) {
    return await API.post(this.apiName, path, init);
  }

  async put(path: string, init: object) {
    return await API.put(this.apiName, path, init);
  }

  async delete(path: string, init: object) {
    return await API.del(this.apiName, path, init);
  }

}