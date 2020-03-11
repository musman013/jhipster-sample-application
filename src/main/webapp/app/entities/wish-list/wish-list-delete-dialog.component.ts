import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWishList } from 'app/shared/model/wish-list.model';
import { WishListService } from './wish-list.service';

@Component({
  templateUrl: './wish-list-delete-dialog.component.html'
})
export class WishListDeleteDialogComponent {
  wishList?: IWishList;

  constructor(protected wishListService: WishListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wishListService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wishListListModification');
      this.activeModal.close();
    });
  }
}
