import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    rootUrl : string = "https://api.spaceXdata.com/v3/";
  	constructor(private http: HttpClient) { }

    apiRequest(action, method, payload = null): Observable<any>{
        let that = this,
            result: Observable<Object>,
            httpRequest: any;

        result = new Observable(
            subscriber =>{
                if (action == null || method == null) {
                    subscriber.error("API info for action: " + action + " not found!");
                    return;
                }

                httpRequest = this.createHttpRequest(action, method, payload);

                httpRequest.subscribe(
                    response =>{
                        subscriber.next(response);
                        subscriber.complete();
                    },
                    error =>{
                        subscriber.error(error);
                        subscriber.complete();
                    }
                );
            } 
        )

        return result;
    }

    createHttpRequest(action, method, payload = null): Observable<any>{
        let httpRequest, 
            headerOptions = {
                'Content-Type': 'application/json'
            }, options;

        options = { headers: new HttpHeaders(headerOptions) };

        switch(method.toLowerCase()){
            case "get":
                httpRequest = this.http.get(this.rootUrl + action, options);
                break;
        }

        return httpRequest;
    }
}
