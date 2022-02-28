import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductAndSupplier } from '../product-and-supplier';
import { Supplier } from '../supplier';
import { SwitchCategoryService } from '../switch-category.service';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-storefront',
  templateUrl: './storefront.component.html',
  styleUrls: ['./storefront.component.css']
})
export class StorefrontComponent
{
  private products: Product[] = [];
  private suppliers: Supplier[] = [];

  private categorySwitch!: boolean;
  
  private clientForm = this.fb.group
  (
    {
      name: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(30)]}),
      address: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*"), Validators.maxLength(50)]}),
      money: new FormControl(null, {validators: [Validators.required, Validators.pattern("[0-9]*")]})
    }
  )

  private productForm = this.fb.group
  (
    {
      productName: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(30)]}),
      productDescription: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(100)]})
    }
  )

  private supplierForm = this.fb.group
  (
    {
      supplierName: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(30)]}),
      supplierDescription: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(100)]})
    }
  )

  private productAndSupplierForm = this.fb.group
  (
    {
      productId: new FormControl(null, {validators: [Validators.required, Validators.pattern("[0-9]*")]}),
      supplierId: new FormControl(null, {validators: [Validators.required, Validators.pattern("[0-9]*")]}),
      price: new FormControl(null, {validators: [Validators.required, Validators.pattern("[0-9]*")]}),
      quantity: new FormControl(null, {validators: [Validators.required, Validators.pattern("[0-9]*")]}),
      offeringName: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(30)]}),
      offeringDescription: new FormControl(null, {validators: [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.maxLength(100)]})
    }
  )

  constructor(private warehouseService: WarehouseService, private switchCategoryService: SwitchCategoryService, private fb: FormBuilder)
  {
    switchCategoryService.getCategorySwitchStatus().subscribe
    (
      response => this.categorySwitch = response
    );

    warehouseService.products().subscribe
    (
      response => this.products = response
    );

    warehouseService.suppliers().subscribe
    (
      response => this.suppliers = response
    );
  }
  
  getCategorySwitch()
  {
    return this.categorySwitch;
  }

  switchCategory()
  {
    this.switchCategoryService.switchCategory();
  }

  reset()
  {
    this.switchCategoryService.reset();
  }

  get getProducts()
  {
    return this.products;
  }

  get getSuppliers()
  {
    return this.suppliers;
  }
  
  get getClientForm()
  {
    return this.clientForm;
  }

  get getProductForm()
  {
    return this.productForm;
  }

  get getSupplierForm()
  {
    return this.supplierForm;
  }

  get getProductAndSupplierForm()
  {
    return this.productAndSupplierForm;
  }

  getClientFormField(fieldName: string)
  {
    return this.clientForm.get(fieldName) as FormControl;
  }

  getProductFormField(fieldName: string)
  {
    return this.productForm.get(fieldName) as FormControl;
  }

  getSupplierFormField(fieldName: string)
  {
    return this.supplierForm.get(fieldName) as FormControl;
  }

  getProductAndSupplierFormField(fieldName: string)
  {
    return this.productAndSupplierForm.get(fieldName) as FormControl;
  }

  newClient()
  {
    this.warehouseService.newClient(this.clientForm.value).subscribe();
  }

  newProduct()
  {
    this.warehouseService.newProduct(this.productForm.value).subscribe();
  }

  newSupplier()
  {
    this.warehouseService.newSupplier(this.supplierForm.value).subscribe();
  }

  newProductAndSupplier()
  {
    let product!: Product;
    this.warehouseService.product(this.getProductAndSupplierFormField('productId').value).subscribe
    (
      response => 
      {
        product = response;
        let supplier!: Supplier;
        this.warehouseService.supplier(this.getProductAndSupplierFormField('supplierId').value).subscribe
        (
          response => 
          {
            supplier = response;

            let productAndSupplier: ProductAndSupplier = new ProductAndSupplier
            (
              product,
              supplier,
              this.getProductAndSupplierFormField('price').value,
              this.getProductAndSupplierFormField('quantity').value,
              this.getProductAndSupplierFormField('offeringName').value,
              this.getProductAndSupplierFormField('offeringDescription').value
            );

            this.warehouseService.newProductAndSupplier(productAndSupplier).subscribe();
          }
        );
      }
    );
  }
}