const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    // find all products
    const products = await Product.findAll({
      include: [
        // include the associated Category model
        { model: Category },
        // include the associated Tag model
        { model: Tag },
      ],
    });

    // return the products along with their associated Category and Tag data
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // find a single product by its `id`
    const product = await Product.findOne({
      where: { id: productId },
      include: [
        // include the associated Category model
        { model: Category },
        // include the associated Tag model
        { model: Tag },
      ],
    });

    if (!product) {
      // If no product is found with the given id, send a 404 response.
      return res.status(404).json({ message: 'Product not found' });
    }

    // return the product along with its associated Category and Tag data
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve the product' });
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const { product_name, price, stock, tagIds } = req.body;

    // Create the new product in the database
    const newProduct = await Product.create({
      product_name,
      price,
      stock,
    });

    // If tagIds array is provided in the request body, associate the product with the given tags.
    if (tagIds && tagIds.length > 0) {
      await newProduct.setTags(tagIds);
    }

    // Fetch the newly created product along with its associated Category and Tag data
    const createdProduct = await Product.findOne({
      where: { id: newProduct.id },
      include: [
        { model: Category },
        { model: Tag },
      ],
    });

    // Return the newly created product with its associated Category and Tag data in the response
    res.status(201).json(createdProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create the product' });
  }
});

// update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedRows) => {
      // Check if any rows were updated (updatedRows[0] represents the number of updated rows)
      if (updatedRows[0] > 0) {
        // Product was successfully updated
        if (req.body.tagIds && req.body.tagIds.length) {
          // ... (existing code for updating product tags)
          // Return the updated product data with a success message
          res.json({
            success: true,
            message: 'Product updated successfully',
            updatedProduct: req.body,
          });
        } else {
          // Return the updated product data with a success message if no tags were updated
          res.json({
            success: true,
            message: 'Product updated successfully',
            updatedProduct: req.body,
          });
        }
      } else {
        // No product was updated, as the product with the given ID was not found
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    })
    .catch((err) => {
      // Handle errors that occurred during the update process
      console.error(err);
      res.status(400).json({ success: false, error: 'Error updating product' });
    });
});
// delete product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product with the given id
    const product = await Product.findByPk(productId);

    if (!product) {
      // If no product is found with the given id, send a 404 response.
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product from the database
    await product.destroy();

    // If the product has associated tags, remove the corresponding entries from the ProductTag model.
    if (product.tagIds && product.tagIds.length > 0) {
      await ProductTag.destroy({ where: { product_id: productId } });
    }

    // Send a success response
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete the product' });
  }
});

module.exports = router;
