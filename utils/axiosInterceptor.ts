import Axios from 'axios';
import http from 'http';
import pixsConfig from '../pixs.config';
import { AppError } from '../utils/error';

export { axiosGetIpInterceptor, axiosPostIpInterceptor, axiosObjectInterceptor };

async function axiosGetIpInterceptor(path: string): Promise<any> {
  let response = null;

  if (pixsConfig.useIPv6) {
    try {
      response = await Axios.get(path);
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError('InternalServerError', 'axiosGetIpInterceptor threw error using IPv6', error.message);
      }
    }
  } else {
    let agent = new http.Agent({ family: 4 });
    const axios = Axios.create({
      httpAgent: agent,
    });
    axios.interceptors.request.use((request) => {
      // ! DEBUG
      // console.log(request);
      return request;
    });
    try {
      response = await Axios.get(path);
    } catch (error: any) {
      if (error instanceof AppError) {
        throw error;
      } else {
        throw new AppError('InternalServerError', 'axiosGetIpInterceptor threw error using IPv4', error.message);
      }
    }
  }

  return response;
}

async function axiosPostIpInterceptor(path: string, data: {}, config: {}): Promise<any> {
  return Axios.post(path, data, config);

  // let response = null;
  // if (pixsConfig.useIPv6) {
  //   response = await Axios.get(path);
  // } else {
  //   let agent = new http.Agent({ family: 4 });
  //   const axios = Axios.create({
  //     httpAgent: agent,
  //   });
  //   axios.interceptors.request.use((request) => {
  //     console.log(request);
  //     return request;
  //   });
  //   response = await axios.get(path);
  // }

  // return response;
}

async function axiosObjectInterceptor(config: any): Promise<any> {
  let res;
  try {
    res = await Axios(config);
  } catch (error: any) {
    if (error instanceof AppError) {
      throw error;
    } else {
      throw new AppError('InternalServerError', 'axiosObjectInterceptor threw error', error.message);
    }
  }
  return res;
}
