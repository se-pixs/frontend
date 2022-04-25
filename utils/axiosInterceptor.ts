import Axios from 'axios';
import http from 'http';
import pixsConfig from '../pixs.config';

export { axiosGetIpInterceptor, axiosPostIpInterceptor, axiosObjectInterceptor };

async function axiosGetIpInterceptor(path: string): Promise<any> {
  let response = null;

  if (pixsConfig.useIPv6) {
    response = await Axios.get(path);
  } else {
    let agent = new http.Agent({ family: 4 });
    const axios = Axios.create({
      httpAgent: agent,
    });
    axios.interceptors.request.use((request) => {
      console.log(request);
      return request;
    });
    response = await axios.get(path);
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
  const res = await Axios(config);
  return res;
}
