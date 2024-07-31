import { Injectable } from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class MenuStateService {
  private displayingSubmenuSetBehaviorSubject = new BehaviorSubject(new Set<string>());
  public displayingSubmenuSet$: Observable<Set<string>> = this.displayingSubmenuSetBehaviorSubject.asObservable();

  public initMenuState(urlPaths: string[]): void {
    const displayingSubmenuSet: Set<string> = new Set(this.displayingSubmenuSetBehaviorSubject.getValue());

    urlPaths.reduce((id: string, urlPath: string) => {
      let currentId = urlPath;
      if (id) {
        currentId = `${id}/${urlPath}`;
      }
      displayingSubmenuSet.add(currentId);
      return currentId;
    }, '');

    this.displayingSubmenuSetBehaviorSubject.next(displayingSubmenuSet);
  }

  public toggleMenuBlockItem(id: string): void {
    const displayingSubmenuSet: Set<string> = new Set(this.displayingSubmenuSetBehaviorSubject.getValue());
    if (displayingSubmenuSet.has(id)) {
      displayingSubmenuSet.delete(id);
    } else {
      displayingSubmenuSet.add(id);
    }
    this.displayingSubmenuSetBehaviorSubject.next(displayingSubmenuSet);
  }
}
