import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWishList } from 'app/shared/model/wish-list.model';

@Component({
  selector: 'jhi-wish-list-detail',
  templateUrl: './wish-list-detail.component.html'
})
export class WishListDetailComponent implements OnInit {
  wishList: IWishList | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wishList }) => (this.wishList = wishList));
  }

  previousState(): void {
    window.history.back();
  }
}
