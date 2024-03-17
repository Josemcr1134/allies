import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { ListProductsServicesComponent } from './list-products-services/list-products-services.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { NewsServicesComponent } from './news-services/news-services.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsServicesRoutingModule } from './products-services.routes';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListProductsServicesComponent,
    NewProductsComponent,
    NewsServicesComponent,
    ServiceDetailComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsServicesRoutingModule,
    NgxDropzoneModule,
    FormsModule
  ]
})
export class ProductsServicesModule { }
