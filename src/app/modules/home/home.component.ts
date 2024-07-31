import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  public languages$ = this.activatedRoute.data.pipe(
    map(({ languages }) => languages),
  );

  constructor(private readonly activatedRoute: ActivatedRoute) {}
}
