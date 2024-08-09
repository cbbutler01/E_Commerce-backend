const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = Category.findByPk( req.params.id, {
      include: [{ model: Product }]
    });
    
    if (!category) {
      res.status(404).json({ message: 'No category found!'});
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No category found!'})
      return;
    }

    res.status(200).json(updateCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const category = Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!category) {
      res.status(404).json({ message: 'No category found!'})
      return;
    }

    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
