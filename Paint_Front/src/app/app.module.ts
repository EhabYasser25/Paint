import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PaintComponent } from './View/paint/paint.component';
import { HttpService } from './Controller/http/http.service';
import { LayerComponent } from './layer/layer.component';

@NgModule({
  declarations: [
    AppComponent,
    PaintComponent,
    LayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
