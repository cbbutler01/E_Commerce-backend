const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
    try {
      const tags = Tag.findAll({
        include: [{ model: Product, through: ProductTag }]
      });
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = Tag.findByPk( req.params.id, {
      include: [{ model: Product, through: ProductTag}]
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found!'});
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updatedTag[0]) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
