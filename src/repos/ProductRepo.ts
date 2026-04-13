import { Product } from '../models/Product.model';



const products: Product[] = [];


export function getAllProducts(): Product[] {
    return products;
}


export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}


export function addProduct(product: Product): void {
    products.push(product);
}



export function updateProduct(updated: Product): boolean {
    const index = products.findIndex(p => p.id === updated.id);
    if (index !== -1) {
        products[index] = updated;
        return true;
    }
    return false;
}



export function deleteProduct(id: string): boolean {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        return true;
    }
    return false;
}