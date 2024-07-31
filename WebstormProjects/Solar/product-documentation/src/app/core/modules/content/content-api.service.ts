import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContentItemModel, MenuItemModel } from "../../../../models";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ContentApiService {
  private readonly HOST = 'http://localhost:4000/api';

  constructor(private readonly httpClient: HttpClient) {}

  public getMenu(path: string): Observable<MenuItemModel[]> {
    return this.httpClient.get<MenuItemModel[]>(`${this.HOST}/menu/${path}`);
  }

  public getDocument(path: string): Observable<ContentItemModel> {
    return this.httpClient.get<ContentItemModel>(`${this.HOST}/content/${path}`)
  }

  public getDirectory(path: string): Observable<ContentItemModel[]> {
    return this.httpClient.get<ContentItemModel[]>(`${this.HOST}/directory/${path}`)
  }
}
