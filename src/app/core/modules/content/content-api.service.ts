import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BreadcrumbsModel, ContentItemModel, MenuItemModel } from "../../../../models";
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

  public getBreadcrumbs(path: string): Observable<BreadcrumbsModel> {
    return this.httpClient.get<BreadcrumbsModel>(`${this.HOST}/breadcrumbs/${path}`)
  }

  public getSearchIndexes(lang: string): Observable<BreadcrumbsModel> {
    // @TODO: model
    return this.httpClient.get<any>(`${this.HOST}/search-indexes/${lang}`)
  }
}
