import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { WishListComponentsPage, WishListDeleteDialog, WishListUpdatePage } from './wish-list.page-object';

const expect = chai.expect;

describe('WishList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let wishListComponentsPage: WishListComponentsPage;
  let wishListUpdatePage: WishListUpdatePage;
  let wishListDeleteDialog: WishListDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load WishLists', async () => {
    await navBarPage.goToEntity('wish-list');
    wishListComponentsPage = new WishListComponentsPage();
    await browser.wait(ec.visibilityOf(wishListComponentsPage.title), 5000);
    expect(await wishListComponentsPage.getTitle()).to.eq('jhipsterSampleApplicationApp.wishList.home.title');
    await browser.wait(ec.or(ec.visibilityOf(wishListComponentsPage.entities), ec.visibilityOf(wishListComponentsPage.noResult)), 1000);
  });

  it('should load create WishList page', async () => {
    await wishListComponentsPage.clickOnCreateButton();
    wishListUpdatePage = new WishListUpdatePage();
    expect(await wishListUpdatePage.getPageTitle()).to.eq('jhipsterSampleApplicationApp.wishList.home.createOrEditLabel');
    await wishListUpdatePage.cancel();
  });

  it('should create and save WishLists', async () => {
    const nbButtonsBeforeCreate = await wishListComponentsPage.countDeleteButtons();

    await wishListComponentsPage.clickOnCreateButton();

    await promise.all([wishListUpdatePage.setTitleInput('title'), wishListUpdatePage.customerSelectLastOption()]);

    expect(await wishListUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    const selectedRestricted = wishListUpdatePage.getRestrictedInput();
    if (await selectedRestricted.isSelected()) {
      await wishListUpdatePage.getRestrictedInput().click();
      expect(await wishListUpdatePage.getRestrictedInput().isSelected(), 'Expected restricted not to be selected').to.be.false;
    } else {
      await wishListUpdatePage.getRestrictedInput().click();
      expect(await wishListUpdatePage.getRestrictedInput().isSelected(), 'Expected restricted to be selected').to.be.true;
    }

    await wishListUpdatePage.save();
    expect(await wishListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await wishListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last WishList', async () => {
    const nbButtonsBeforeDelete = await wishListComponentsPage.countDeleteButtons();
    await wishListComponentsPage.clickOnLastDeleteButton();

    wishListDeleteDialog = new WishListDeleteDialog();
    expect(await wishListDeleteDialog.getDialogTitle()).to.eq('jhipsterSampleApplicationApp.wishList.delete.question');
    await wishListDeleteDialog.clickOnConfirmButton();

    expect(await wishListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
