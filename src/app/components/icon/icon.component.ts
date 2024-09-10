import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
} from '@angular/core';
import { CacheInterceptor } from 'app/interceptors';
import { of, Subject } from 'rxjs';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { IconSizeEnum } from 'app/enum';

@Component({
  selector: 'app-icon',
  template: '',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IconComponent implements OnChanges, OnInit {
  @Input()
  @HostBinding('attr.data-sc-icon')
  public icon: string = '';

  @Input({ transform: numberAttribute })
  @HostBinding('attr.data-sc-size')
  public size: IconSizeEnum = IconSizeEnum.Small;

  private readonly reload$: Subject<void> = new Subject<void>();

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly httpClient: HttpClient,
  ) {}

  ngOnChanges(): void {
    this.reload$.next();
  }

  ngOnInit(): void {
    this.reload$
      .pipe(
        startWith(null),
        switchMap(() =>
          this.httpClient
            .get(this.href, {
              responseType: 'text',
              params: { [CacheInterceptor.TOKEN]: 'true' },
            })
            .pipe(
              catchError((e: Error) => {
                console.error(e);

                return of('');
              }),
            ),
        ),
      )
      .subscribe((svg: string) => (this.elementRef.nativeElement.innerHTML = svg));
  }

  get href(): string {
    return `assets/icons/${this.size}/${this.icon}.svg#${this.icon}`
  }
}
