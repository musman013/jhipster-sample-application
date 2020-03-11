import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWishList, WishList } from 'app/shared/model/wish-list.model';
import { WishListService } from './wish-list.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-wish-list-update',
  templateUrl: './wish-list-update.component.html'
})
export class WishListUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    restricted: [],
    customer: []
  });

  constructor(
    protected wishListService: WishListService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wishList }) => {
      this.updateForm(wishList);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(wishList: IWishList): void {
    this.editForm.patchValue({
      id: wishList.id,
      title: wishList.title,
      restricted: wishList.restricted,
      customer: wishList.customer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wishList = this.createFromForm();
    if (wishList.id !== undefined) {
      this.subscribeToSaveResponse(this.wishListService.update(wishList));
    } else {
      this.subscribeToSaveResponse(this.wishListService.create(wishList));
    }
  }

  private createFromForm(): IWishList {
    return {
      ...new WishList(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      restricted: this.editForm.get(['restricted'])!.value,
      customer: this.editForm.get(['customer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWishList>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomer): any {
    return item.id;
  }
}
