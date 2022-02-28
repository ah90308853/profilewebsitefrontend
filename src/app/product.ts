export class Product 
{
    productId!: number;
    productName!: string;
    productDescription!: string;

    get getProductId(): number
    {
        return this.productId;
    }

    get getProductName(): string
    {
        return this.productName;
    }

    get getProductDescription(): string
    {
        return this.productDescription;
    }
}
