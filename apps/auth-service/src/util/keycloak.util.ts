import axios from 'axios';

export class KeycloakUtil {
  static getAxiosInstance() {
    return axios.create({
      timeout: 10000,
    });
  }
}