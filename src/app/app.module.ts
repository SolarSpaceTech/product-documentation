import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestWaiterInterceptor } from './interceptors';
import { LanguageComponent } from './components/language/language.component';
import { ContentModule } from './core/modules/content';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LanguageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    HeaderComponent,
    FooterComponent,
    BrowserAnimationsModule,
  ],
  providers: [
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestWaiterInterceptor,
      multi: true,
    },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
