import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './Controller/http/http.service';
import { ToolbarComponent } from './View/toolbar/toolbar.component';
import { DrawareaComponent } from './View/drawarea/drawarea.component';

import { KonvaModule } from 'ng2-konva';
import { KonvaService } from './konva.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KonvaModule
  ],
  providers: [HttpService, KonvaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
