import { Component } from '@angular/core';
import { Client } from '../client';
import { LoggedInClientServiceService } from '../logged-in-client-service.service';
import { Product } from '../product';
import { ProductAndSupplier } from '../product-and-supplier';
import { SwitchCategoryService } from '../switch-category.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-storefront-categories-offerings',
  templateUrl: './storefront-categories-offerings.component.html',
  styleUrls: ['./storefront-categories-offerings.component.css']
})
export class StorefrontCategoriesOfferingsComponent
{
  private products: Product[] = [];
  private productAndSuppliers: ProductAndSupplier[] = [];
  private client: Client = new Client();

  private categorySwitch: boolean = true;
  private addToCartStatus!: boolean;

  
  constructor(private warehouseService: WarehouseService, private switchCategoryService: SwitchCategoryService, private loggedInClientService: LoggedInClientServiceService) 
  {
    switchCategoryService.getCategorySwitchStatus().subscribe
    (
      response => this.categorySwitch = response
    );

    warehouseService.getCurrentProducts().subscribe
    (
      response => this.products = response
    );

    warehouseService.getLoggedInClientProfile().subscribe
    (
      response => this.client = response
    );
  }

  get getProducts()
  {
    return this.products;
  }

  get getProductAndSuppliers()
  {
    return this.productAndSuppliers;
  }

  get getClient()
  {
    return this.client;
  }

  getCategorySwitch()
  {
    return this.categorySwitch;
  }

  addProductAndSupplierToCart(productAndSupplierIndex: number)
  {
    let productId = this.productAndSuppliers[0].product.productId;
    let supplierId = this.productAndSuppliers[productAndSupplierIndex].supplier.supplierId;
    
    if (this.productAndSuppliers[productAndSupplierIndex].quantity >= 1)
    {
      this.warehouseService.addToCart(productId, supplierId).subscribe
      (
        response => 
        {
          this.addToCartStatus = response;
          this.loggedInClientService.setLoggedInClient(this.loggedInClientService.getCurrentLoggedInClient().value);
          this.productAndSuppliers[productAndSupplierIndex].quantity--;
        }
      );
    }
  }

  switchCategory(productId?: number)
  {
    if(this.categorySwitch && (productId == 0 || productId))
    {
      this.switchCategoryService.switchCategory();
      console.log("productId in switchCategory(): " + productId);
      this.warehouseService.productOfferings(productId).subscribe
      (
        response => {this.productAndSuppliers = response;}
      )
    }
    else
    {
      this.switchCategoryService.switchCategory();
    }
  }

  fetchProductImage(productName: string)
  {
    if(productName === "Peripherals")
    {
      return "../../assets/desk.jpg";
    }
    else if(productName === "Laptops")
    {
      return "../../assets/laptop.jpg";
    }
    else if(productName === "Desktops")
    {
      return "../../assets/desktop.jpg";
    }
    else
    {
      return "../../assets/defaultcategory.jpg";
    }
  }

  fetchOfferingImage(offeringName: string)
  {
    if(offeringName === "Mouse")
    {
      return "../../assets/mouse.jpg";
    }
    else if(offeringName === "Speakers")
    {
      return "../../assets/speaker.jpg";
    }
    else if(offeringName === "Headphones")
    {
      return "../../assets/headphones.jpg";
    }
    else if(offeringName === "Everyday Laptop")
    {
      return "../../assets/midlinelaptop.jpg";
    }
    else if(offeringName === "Business Laptop")
    {
      return "../../assets/toplinelaptop.jpg";
    }
    else if(offeringName === "Business Desktop")
    {
      return "../../assets/businessdesktop.jpg";
    }
    else if(offeringName === "Gaming Desktop")
    {
      return "../../assets/gamingdesktop.jpg";
    }
    else if(offeringName === "Server")
    {
      return "../../assets/server.jpg";
    }
    else
    {
      return "../../assets/defaultproduct.jpg";
    }
  }
}
