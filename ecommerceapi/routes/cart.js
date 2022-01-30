const Cart = require("../models/Cart");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET Cart
router.get("/find/:id", async (req, res) => {
  try {
    const Cart = await Cart.findById(req.params.id);
    res.status(200).json({ Cart });
  } catch (error) {
    res.status(500).json(error);
  }
});

// // GET ALL CartS
// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let Carts;
//     if (qNew) {
//       Carts = await Cart.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       Carts = await Cart.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       Carts = await Cart.find();
//     }

//     res.status(200).json(Carts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
