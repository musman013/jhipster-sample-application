import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWishList, WishList } from 'app/shared/model/wish-list.model';
import { WishListService } from './wish-list.service';
import { WishListComponent } from './wish-list.component';
import { WishListDetailComponent } from './wish-list-detail.component';
import { WishListUpdateComponent } from './wish-list-update.component';

@Injectable({ providedIn: 'root' })
export class WishListResolve implements Resolve<IWishList> {
  constructor(private service: WishListService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWishList> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wishList: HttpResponse<WishList>) => {
          if (wishList.body) {
            return of(wishList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WishList());
  }
}

export const wishListRoute: Routes = [
  {
    path: '',
    component: WishListComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.wishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WishListDetailComponent,
    resolve: {
      wishList: WishListResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.wishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WishListUpdateComponent,
    resolve: {
      wishList: WishListResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.wishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WishListUpdateComponent,
    resolve: {
      wishList: WishListResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterSampleApplicationApp.wishList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
