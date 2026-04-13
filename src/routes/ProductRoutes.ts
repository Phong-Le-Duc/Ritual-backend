import { Router, Request, Response } from 'express';
import { getAllProducts } from '../repos/ProductRepo';
import { getProductById } from '../repos/ProductRepo';
import { addProduct } from '../repos/ProductRepo';
import { updateProduct } from '../repos/ProductRepo';
import { deleteProduct } from '../repos/ProductRepo';

const router = Router();



// GET /api/products - return all products
router.get('/products', (req: Request, res: Response) => {
    const products = getAllProducts();
    res.json(products);
});



// GET /api/products/:id - return a single product by id
router.get('/products/:id', (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const product = getProductById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// POST /api/products - add a new product
router.post('/products', (req: Request, res: Response) => {
    const { id, name, description, price, imageUrl } = req.body;
    if (!id || !name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    addProduct({ id, name, description, price, imageUrl });
    res.status(201).json({ message: 'Product added' });
});


// PUT /api/products/:id - update a product
router.put('/products/:id', (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { name, description, price, imageUrl } = req.body;
    if (!name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const updated = { id, name, description, price, imageUrl };
    const success = updateProduct(updated);
    if (success) {
        res.json({ message: 'Product updated' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});



// DELETE /api/products/:id - delete a product
router.delete('/products/:id', (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const success = deleteProduct(id);
    if (success) {
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

export default router;