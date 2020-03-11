import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.JhipsterSampleApplicationCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.JhipsterSampleApplicationProductModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.JhipsterSampleApplicationCustomerModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.JhipsterSampleApplicationAddressModule)
      },
      {
        path: 'wish-list',
        loadChildren: () => import('./wish-list/wish-list.module').then(m => m.JhipsterSampleApplicationWishListModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
