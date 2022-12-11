import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from "primeng/colorpicker";
import { enableRipple } from '@syncfusion/ej2-base';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PaintComponent } from './View/paint/paint.component';
import { HttpService } from './Controller/http/http.service';

enableRipple(true);

@NgModule({
  declarations: [
    AppComponent,
    PaintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
<<<<<<< Updated upstream
    HttpClientModule
=======
    HttpClientModule,
    KonvaModule,
    ColorPickerModule
>>>>>>> Stashed changes
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
