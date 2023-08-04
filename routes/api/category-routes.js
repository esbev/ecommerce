const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
  
    if (!categoryData) {
      res.status(404).json({ message: "Category not found."});
      return;
    };
  
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product}],
  });

  if (!categoryData) {
    res.status(404).json({ message: "Category not found."});
    return;
  };

  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  category.update(req.body)
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
