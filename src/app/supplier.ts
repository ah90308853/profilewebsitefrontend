export class Supplier 
{
    supplierId!: number;
    supplierName!: string;
    supplierDescription!: string;

    get getSupplierId(): number
    {
        return this.supplierId;
    }

    get getSupplierName(): string
    {
        return this.supplierName;
    }

    get getSupplierDescription(): string
    {
        return this.supplierDescription;
    }
}
