import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Cart } from './cart';
import { Client } from './client';
import { LoggedInClientServiceService } from './logged-in-client-service.service';
import { Message } from './message';
import { Product } from './product';
import { ProductAndSupplier } from './product-and-supplier';
import { ProductAndSupplierInCart } from './product-and-supplier-in-cart';
import { Supplier } from './supplier';

@Injectable()
export class WarehouseService 
{
  private ROOTURL: string = "http://hireme.us-east-1.elasticbeanstalk.com";
  private newMessageUrl: string = this.ROOTURL + "/newmessage";
  private newClientUrl: string = this.ROOTURL + "/newclient";
  private newProductUrl: string = this.ROOTURL + "/newproduct";
  private newSupplierUrl: string = this.ROOTURL + "/newsupplier";
  private newProductAndSupplierUrl: string = this.ROOTURL + "/newproductandsupplier";
  private productsUrl: string = this.ROOTURL + "/products";
  private suppliersUrl: string = this.ROOTURL + "/suppliers"
  private clientsUrl: string = this.ROOTURL + "/clients"
  private productOfferingsUrl: string = this.ROOTURL + "/productofferings"
  private supplierOfferingsUrl: string = this.ROOTURL + "/supplierofferings"
  private clientUrl: string = this.ROOTURL + "/client";
  private cartUrl: string = this.ROOTURL + "/cart";
  private supplierUrl: string = this.ROOTURL + "/supplier";
  private productUrl: string = this.ROOTURL + "/product";
  private addToCartUrl: string = this.ROOTURL + "/addtocart";
  private checkoutUrl: string = this.ROOTURL + "/checkout";

  private loggedInClientId!: number;

  private currentProducts: ReplaySubject<Product[]> = new ReplaySubject<Product[]>();
  private currentClients: ReplaySubject<Client[]> = new ReplaySubject<Client[]>();

  private headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  private loggedInClientProfile: ReplaySubject<Client> = new ReplaySubject<Client>();
  private loggedInClientCart: ReplaySubject<ProductAndSupplierInCart[]> = new ReplaySubject<ProductAndSupplierInCart[]>();

  constructor(private loggedInClientService: LoggedInClientServiceService, private http: HttpClient, private fb: FormBuilder) 
  {
    this.products().subscribe
    (
      response => this.currentProducts.next(response)
    );

    this.clients().subscribe
    (
      response => this.currentClients.next(response)
    );

    this.loggedInClientService.getCurrentLoggedInClient().subscribe
    (
      response => 
      {
        this.client(response).subscribe
        (
          response => 
          {
            this.loggedInClientProfile.next(response);
            this.loggedInClientId = response.clientId;
          }
        );
        this.cart(response).subscribe
        (
          response => this.loggedInClientCart.next(response)
        );
      }
    );
  }

  getCurrentProducts(): ReplaySubject<Product[]>
  {
    return this.currentProducts;
  }

  getCurrentClients(): ReplaySubject<Client[]>
  {
    return this.currentClients;
  }

  getLoggedInClientProfile(): ReplaySubject<Client>
  {
    return this.loggedInClientProfile;
  }

  getLoggedInClientCart(): ReplaySubject<ProductAndSupplierInCart[]>
  {
    return this.loggedInClientCart;
  }

  newMessage(message: Message): Observable<boolean>
  {
    return this.http.post<boolean>(this.newMessageUrl, message);
  }

  newClient(client: Client): Observable<number>
  {
    return this.http.post<number>(this.newClientUrl, client);
  }

  newProduct(product: Product): Observable<number>
  {
    let productId =  this.http.post<number>(this.newProductUrl, product);
    this.products().subscribe
    (
      response => this.currentProducts.next(response)
    )
    return productId;
  }

  newSupplier(supplier: Supplier): Observable<number>
  {
    return this.http.post<number>(this.newSupplierUrl, supplier,);
  }

  newProductAndSupplier(productAndSupplier: ProductAndSupplier): Observable<boolean>
  {
    return this.http.post<boolean>(this.newProductAndSupplierUrl, productAndSupplier);
  }

  products(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.productsUrl);
  }

  suppliers(): Observable<Supplier[]>
  {
    return this.http.get<Supplier[]>(this.suppliersUrl);
  }

  clients(): Observable<Client[]>
  {
    return this.http.get<Client[]>(this.clientsUrl);
  }

  client(clientId: number): Observable<Client>
  {
    return this.http.post<Client>(this.clientUrl, clientId, {headers: this.headers});
  }

  product(productId: number): Observable<Product>
  {
    return this.http.post<Product>(this.productUrl, productId, {headers: this.headers});
  }

  supplier(supplierId: number): Observable<Supplier>
  {
    return this.http.post<Supplier>(this.supplierUrl, supplierId, {headers: this.headers});
  }

  cart(clientId: number): Observable<ProductAndSupplierInCart[]>
  {
    return this.http.post<ProductAndSupplierInCart[]>(this.cartUrl, clientId, {headers: this.headers});
  }

  addToCart(productId: number, supplierId: number): Observable<boolean>
  {
    let idList = [this.loggedInClientId, productId, supplierId];

    return this.http.post<boolean>(this.addToCartUrl, idList);
  }

  checkout(clientId: number): Observable<boolean>
  {
    return this.http.post<boolean>(this.checkoutUrl, clientId);
  }

  productOfferings(productId: number): Observable<ProductAndSupplier[]>
  {
    return this.http.post<ProductAndSupplier[]>(this.productOfferingsUrl, productId);
  }
}