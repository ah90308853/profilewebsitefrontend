import { Product } from "./product";
import { Supplier } from "./supplier";

export class ProductAndSupplier 
{
    product!: Product;
    supplier!: Supplier;

    price!: number;
    quantity!: number;
    offeringName!: string;
    offeringDescription!: string;

    constructor(product: Product, supplier: Supplier, price: number, quantity: number, offeringName: string, offeringDescription: string)
    {
        this.product = product;
        this.supplier = supplier;
        this.price = price;
        this.quantity = quantity;
        this.offeringName = offeringName;
        this.offeringDescription = offeringDescription;
    }
}
