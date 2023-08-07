const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
  
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found."});
    };
  
    return res.status(200).json(categoryData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{model: Product}],
  });

  if (!categoryData) {
    return res.status(404).json({ message: "Category not found."});
  };

  return res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    return res.status(200).json("Created");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Create Error");
  }
});

router.put('/:id', async (req, res) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    return res.status(200).json("Updated.");
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json("Update error.");
  });
});

router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((updatedCategory) => {
    return res.status(200).json("Deleted.");
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json("Delete error.");
  });
});

module.exports = router;
