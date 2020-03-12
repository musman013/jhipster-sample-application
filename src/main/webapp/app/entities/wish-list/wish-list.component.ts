import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWishList } from 'app/shared/model/wish-list.model';
import { WishListService } from './wish-list.service';
import { WishListDeleteDialogComponent } from './wish-list-delete-dialog.component';

@Component({
  selector: 'jhi-wish-list',
  templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit, OnDestroy {
  wishLists?: IWishList[];
  eventSubscriber?: Subscription;

  constructor(protected wishListService: WishListService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.wishListService.query().subscribe((res: HttpResponse<IWishList[]>) => (this.wishLists = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWishLists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWishList): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWishLists(): void {
    this.eventSubscriber = this.eventManager.subscribe('wishListListModification', () => this.loadAll());
  }

  delete(wishList: IWishList): void {
    const modalRef = this.modalService.open(WishListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.wishList = wishList;
  }
}
