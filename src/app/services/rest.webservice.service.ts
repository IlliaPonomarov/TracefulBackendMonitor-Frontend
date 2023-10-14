import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable, map } from "rxjs";
import RestLog, {Request, Response} from "../models/webservice.model";

@Injectable()
export class WebService {

    constructor(private http: HttpClient) { }

      public getWebServices(): Observable<RestLog[]> {

        return this.http.get('assets/webservice.json')
          .pipe(map((response: any) => {
            let rests = response['rests'];

            return rests.map(function (rest: any): RestLog {
                let request: Request = new Request(rest.request.url, rest.request.method, rest.request.parameters, rest.request.headers, rest.request.body);
                let response: Response = new Response(rest.response.status, rest.response.headers, rest.response.body, rest.response.error, rest.response.date);

                return new RestLog(rest.id, rest.service, request, response, rest.date);
              }
            )
          }))
    }
}
