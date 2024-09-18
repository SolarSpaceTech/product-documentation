import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private LOCALSTORAGE_PREFIX = 'scdoc-';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public getValue(keyName: string, defaultValue?: string): string | null {
    if (this.isBrowser) {
      const value = localStorage.getItem(this.getFullKeyName(keyName));
      return value ?? (defaultValue || null);
    }
    return defaultValue || null;
  }

  public setValue(keyName: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.getFullKeyName(keyName), value);
    }
  }

  public removeValue(keyName: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.getFullKeyName(keyName));
    }
  }

  private getFullKeyName(keyName: string): string {
    return `${this.LOCALSTORAGE_PREFIX}${keyName}`;
  }
}
