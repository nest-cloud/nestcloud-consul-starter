import { IInterceptor } from '@nestcloud/feign';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddHeaderInterceptor implements IInterceptor {
  onRequest(request: AxiosRequestConfig): AxiosRequestConfig {
    console.log('middleware1 request');
    return request;
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  onRequestError(error: any): any {
    return Promise.reject(error);
  }

  onResponseError(error: any): any {
    return Promise.reject(error);
  }
}
