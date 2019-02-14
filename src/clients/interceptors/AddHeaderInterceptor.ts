import { IInterceptor } from "nest-feign";
import { AxiosResponse, AxiosRequestConfig } from 'axios';

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
