import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";

//* Con este axios adapter le doy forma a la consulta HTTP ( en este caso GET )a partir de mi http-adapter. 
//* Este provider luego sera el que provea el servicio get en cualqueira de mis modulos
//! Para inyectarlo recordar exportarlo en el common.module e importarlo en el modulo que se desee

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    
    private readonly axios: AxiosInstance  = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error ('This is an error - check logs');
        }
    }
    
}