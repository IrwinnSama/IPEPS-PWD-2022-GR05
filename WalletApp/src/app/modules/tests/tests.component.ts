import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ApiResponse} from "@shared/model";
import {Skill} from "@shared/model/entity/skill.interface";
import {HttpService} from "@shared/service";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

@Injectable()
export class TestsComponent implements OnInit{

  public errorHandler(error: { error: { message: any; }; status: any; message: any; }): Observable<ApiResponse> {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error.message);
    } else {
      return throwError(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }
  }

  ngOnInit(): void {
    let $res = this.listSkills(this.api)

    $res.subscribe(data => {
      console.log(data);
    })

    console.log("Listing skill");
    console.log($res);
  }

  constructor(private http: HttpService) {}

  api: string = "http://localhost:2022/api/skill/list"

  skillObject = {
    title: "Hello",
    description: "Test"
  }

  listSkills = (url: string) : Observable<Skill> => {
    return this.http.get(url + "");
  }




}
