import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkHandler} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {BookingModule} from './booking/booking.module';
import {LogonModule} from './logon/logon.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BookingModule,
    LogonModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink): { cache: InMemoryCache, link: HttpLinkHandler } {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.graphqlUri
        }),
      };
    },
    deps: [HttpLink]
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
