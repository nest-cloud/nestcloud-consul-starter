import { IMiddleware } from "nest-feign";
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export class AddHeaderMiddleware implements IMiddleware {
    send(request: AxiosRequestConfig): (response: AxiosResponse) => void {
        request.headers['x-service'] = 'nestcloud-user-service';
        return function (p1: AxiosResponse) {
        };
    }

}
