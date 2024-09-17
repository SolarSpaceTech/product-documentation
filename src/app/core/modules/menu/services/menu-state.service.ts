import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class MenuStateService {
  public displayingSubmenuSet = signal(new Set<string>());

  public initMenuState(urlPaths: string[]): void {
    const displayingSubmenuSet = new Set(this.displayingSubmenuSet());

    urlPaths.reduce((id: string, urlPath: string) => {
      let currentId = urlPath;
      if (id) {
        currentId = `${id}/${urlPath}`;
      }
      displayingSubmenuSet.add(currentId);
      return currentId;
    }, '');

    this.displayingSubmenuSet.set(displayingSubmenuSet);
  }

  public toggleMenuBlockItem(id: string): void {
    const displayingSubmenuSet = new Set(this.displayingSubmenuSet());

    if (displayingSubmenuSet.has(id)) {
      displayingSubmenuSet.delete(id);
    } else {
      displayingSubmenuSet.add(id);
    }
    this.displayingSubmenuSet.set(displayingSubmenuSet);
  }
}
