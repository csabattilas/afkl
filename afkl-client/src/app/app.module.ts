import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogonComponent} from './logon/logon.component';
import {BookingComponent} from './booking/booking.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkHandler} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
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
