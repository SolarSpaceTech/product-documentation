import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues',
  standalone: true,
})
export class ObjectValuesPipe implements PipeTransform {
  public transform<T extends object>(obj: T): Array<T[keyof T]> {
    return Object.values(obj);
  }
}
