const router = require('express').Router();
const { Tag, Product } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    if (!tagData) {
      return res.status(404).json({ message: "Tag not found."});
    };
  
    return res.status(200).json(tagData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      return res.status(404).json({ message: "Tag not found."});
    };
  
    return res.status(200).json(tagData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    return res.status(200).json(tagData);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  await Tag.update(req.body, {
    where: { 
      id: req.params.id,
    }
  })
  .then((updatedTag) => {
    return res.status(200).json("Updated.");
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json("Update error.");
  });
});

router.delete('/:id', async (req, res) => {
  Tag.destroy(
    { where: {id: req.params.id}
  })
  .then((tagData) => {
    return res.status(200).json("Deleted.");
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json("Delete error.");
  });
});

module.exports = router;
