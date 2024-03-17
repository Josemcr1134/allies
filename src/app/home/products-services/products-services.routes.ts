import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListProductsServicesComponent } from './list-products-services/list-products-services.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { NewsServicesComponent } from './news-services/news-services.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';


const routes: Routes = [
    { path: '', children: [ 
        {path:'ListP&S', component:ListProductsServicesComponent},
        {path:'NewProducts', component:NewProductsComponent},
        {path:'NewServices', component:NewsServicesComponent},
        {path:'ProductDetail', component:ProductDetailComponent},
        {path:'ServiceDetail/:id', component:ServiceDetailComponent},
        {path:'**', redirectTo:'ListP&S'}
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsServicesRoutingModule {}
