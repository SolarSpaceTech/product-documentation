import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeUriComponent',
  standalone: true,
})
export class DecodeUriComponentPipe implements PipeTransform {
  transform(value: string): string {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
}
