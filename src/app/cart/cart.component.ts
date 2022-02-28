import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { Client } from '../client';
import { LoggedInClientServiceService } from '../logged-in-client-service.service';
import { ProductAndSupplierInCart } from '../product-and-supplier-in-cart';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent
{
  client: Client = new Client();
  cart: ProductAndSupplierInCart[] = [];

  cartTotal: number = 0;
  checkoutSuccess!: boolean;

  constructor(private warehouseService: WarehouseService, private loggedInClientService: LoggedInClientServiceService) 
  { 
    warehouseService.getLoggedInClientCart().subscribe
    (
      response => 
      {
        if (response.length > 0)
        {
          this.cart = response; this.cartTotal = this.cart[0].cart.total;
        }
        else
        {
          this.cart = [];
          this.cartTotal = 0;
        }
      }
    );

    warehouseService.getLoggedInClientProfile().subscribe
    (
      response => this.client = response
    );
  }

  checkout()
  {
    this.warehouseService.checkout(this.client.clientId).subscribe
    (
      response => 
      {
        this.checkoutSuccess = response;
        this.loggedInClientService.setLoggedInClient(this.client.clientId);
      }
    );
  }

  get getCartTotal()
  {
    return this.cartTotal;
  }

  get getClient()
  {
    return this.client;
  }

}
