import { Cart } from "./cart";
import { ProductAndSupplier } from "./product-and-supplier";

export class ProductAndSupplierInCart 
{
    cart!: Cart;
    productAndSupplier!: ProductAndSupplier;
    
    quantity!: number;
}
