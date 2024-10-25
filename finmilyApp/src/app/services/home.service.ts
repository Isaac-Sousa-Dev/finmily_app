import { Observable } from "rxjs";
import { HttpClient } from  '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()

export class HomePageService {

    base_path = 'localhost:3000/manager/home';
    http: any;

    constructor(
        public httpClient: HttpClient
    ) {
        this.http = httpClient;
        console.log('Home Service')
        this.getHomePageData();
    }

    // Get home data
    getHomePageData(): Observable<any> {
        return this.http
        .get(this.base_path)
        .pipe((response: any) => {
            return response;
        })
    }
}