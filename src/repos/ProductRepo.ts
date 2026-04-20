import { PrismaClient, Product } from '@prisma/client';
const prisma = new PrismaClient();

// Get all products
export async function getAllProducts(): Promise<Product[]> {
    return await prisma.product.findMany();
}

// Get a product by id
export async function getProductById(id: number): Promise<Product | null> {
    return await prisma.product.findUnique({ where: { id } });
}

// Add a new product
export async function addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    return await prisma.product.create({ data: product });
}

// Update a product
export async function updateProduct(updated: Product): Promise<boolean> {
    const result = await prisma.product.updateMany({
        where: { id: updated.id },
        data: {
            name: updated.name,
            description: updated.description,
            price: updated.price,
            image: updated.image,
        },
    });
    return result.count > 0;
}

// Delete a product
export async function deleteProduct(id: number): Promise<boolean> {
    const result = await prisma.product.deleteMany({ where: { id } });
    return result.count > 0;
}