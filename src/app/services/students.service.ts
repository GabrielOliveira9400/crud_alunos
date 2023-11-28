import { Injectable } from '@angular/core';
import {map, Observable, of, switchMap} from 'rxjs';
import { Students } from '../interface/students';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}
  private api = 'http://localhost:3000/students';
  public list(): Observable<Students[]> {
    return this.httpClient.get<Students[]>(this.api);
  }

  public createStudent(newStudent: Students): Observable<Students[]> {
    return this.httpClient.post<Students[]>(this.api, newStudent);
  }

  public deleteStudent(_id: string): Observable<Students[]> {
    return this.httpClient.delete<Students[]>(`${this.api}/${_id}`);
  }

  public editStudent(_id: string, newStudent: Students): Observable<Students[]> {
    return this.httpClient.put<Students[]>(`${this.api}/${_id}`, newStudent);
  }

  public getStudent(_id: string): Observable<Students> {
    return this.httpClient.get<Students>(`${this.api}/${_id}`);
  }
}
