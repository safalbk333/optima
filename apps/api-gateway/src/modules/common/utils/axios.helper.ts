import axios from 'axios';
import { Agent } from 'https';

export const getAxiosInstance = () => {
  const bypassSsl = process.env.BYPASS_SSL === 'true';
  return axios.create({
    httpsAgent: bypassSsl
      ? new Agent({ rejectUnauthorized: false })
      : undefined,
    timeout: 60000,
  });
};
