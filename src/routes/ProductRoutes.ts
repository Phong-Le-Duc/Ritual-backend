import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../repos/ProductRepo';

const router = Router();

// GET /api/products - return all products
router.get('/products', async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
});

// GET /api/products/:id - return a single product by id
router.get('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = await getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// POST /api/products - add a new product
router.post('/products', async (req, res) => {
    const { name, description, price, image } = req.body;
    if (!name || !description || !price || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const product = await addProduct({ name, description, price, image });
    res.status(201).json(product);
});

// PUT /api/products/:id - update a product
router.put('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { name, description, price, image } = req.body;
    if (!name || !description || !price || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const success = await updateProduct({ id, name, description, price, image });
    if (success) {
        res.json({ message: 'Product updated' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// PATCH /api/products/:id - partially update a product
router.patch('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = await getProductById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const updated = { ...product, ...req.body, id };
    const success = await updateProduct(updated);
    if (success) {
        res.json({ message: 'Product updated', product: updated });
    } else {
        res.status(500).json({ message: 'Update failed' });
    }
});

// DELETE /api/products/:id - delete a product
router.delete('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    const success = await deleteProduct(id);
    if (success) {
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

export default router;