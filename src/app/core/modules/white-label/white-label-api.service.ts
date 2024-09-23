import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MenuItemModel } from "../../../../models";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class WhiteLabelApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public get(): Observable<MenuItemModel[]> {
    return this.httpClient.get<MenuItemModel[]>(`/assets/white-label.json`);
  }
}
