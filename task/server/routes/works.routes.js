const { Router } = require("express");
const router = Router();
const Works = require("../models/works");

router.post("/add", async (req, res) => {
  try {
    const { title, price, level, category, image, description, state } =
      req.body;
    const newWorks = {
      title,
      price,
      level,
      category,
      image,
      description,
      state,
    };

    const work = await Works.create(newWorks);
    res.json({ status: "ok", msg: "Ish bazaga qo'shildi", work });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res) => {
  const { search, title, price, category, level, state } = req.body;
  try {
    if (search) {
      const data = await Works.find({ title: search }).exec();
      res.json({ status: "ok", msg: "successfully", data });
    } else if (price) {
      const data = await Works.find({ price: price }).exec();
      res.json({ status: "ok", msg: "successfully", data });
    } else if (title) {
      const data = await Works.find({ title }).exec();
      res.json({ status: "ok", msg: "successfully", data });
    } else if (category) {
      const data = await Works.find({ category }).exec();
      res.json({ status: "ok", msg: "successfully", data });
    } else if (level) {
      const data = await Works.find({ level }).exec();
      res.json({ status: "ok", msg: "successfully", data });
    } else if (state) {
      const data = await Works.find({ state }).exec();
      res.json({ status: "ok", msg: "successfully", data });
    } else {
      const data = await Works.find().exec();
      res.json({ status: "ok", msg: "successfully", data });
    }
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const data = await Works.findById(req.params.id);

    res.json({ status: "ok", msg: "successfully", data });
  } catch (err) {
    res.json({ status: "bad", msg: err.message });
  }
});

router.get("/create/get", async (req, res) => {
  try {
    const work = {
      title: "",
      price: "",
      category: "",
      title: "",
      level: "",
      image: "",
      description: "",
      state: "",
    };

    res.json({ status: "ok", msg: "work", work });
  } catch (err) {
    res.json({ status: "bad", msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const respons = await Works.findByIdAndRemove(req.params.id);
    res.json({ status: "ok", msg: "Ish Bazadan o'chirildi !", respons });
  } catch (err) {
    console.log(err.message);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const respons = await Works.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    console.log(body);
    res.json({ status: "ok", msg: "Ish yangilandi", respons });
  } catch (err) {
    console.log(err.message);
  }
});
// router.get("/all/one", async (req, res) => {
//   try {
//     const result = await Questions.aggregate([
//       { $match: { level: 1 } },
//       { $sample: { size: 15 } },
//     ]);
//     if (result) {
//       res.json({
//         status: "ok",
//         msg: "Birinchi level bo'yicha ma'lumot",
//         result,
//       });
//     } else {
//       res.json({
//         status: "bad",
//         msg: "Birinchi level bo'yicha ma'lumot topilmadi",
//       });
//       res.redirect("/explore");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });
// router.get("/all/two", async (req, res) => {
//   try {
//     const result = await Questions.aggregate([
//       { $match: { level: 2 } },
//       { $sample: { size: 15 } },
//     ]);
//     if (result) {
//       res.json({
//         status: "ok",
//         msg: "Ikkinchi level bo'yicha ma'lumot",
//         result,
//       });
//     } else {
//       res.json({
//         status: "bad",
//         msg: "Ikkinchi level bo'yicha ma'lumot topilmadi",
//       });
//       res.redirect("/explore");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });
// router.get("/all/three", async (req, res) => {
//   try {
//     const result = await Questions.aggregate([
//       { $match: { level: 3 } },
//       { $sample: { size: 15 } },
//     ]);
//     if (result) {
//       res.json({
//         status: "ok",
//         msg: "Uchinchi level bo'yicha ma'lumot",
//         result,
//       });
//     } else {
//       res.json({
//         status: "bad",
//         msg: "Uchinchi level bo'yicha ma'lumot topilmadi",
//       });
//       res.redirect("/explore");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });
// router.get("/all/:id", async (req, res) => {
//   try {
//     const result = await Questions.findById(req.params.id);
//     if (result) {
//       res.json({ status: "ok", msg: "Id bo'yicha ma'lumot", result });
//     } else {
//       res.json({ status: "bad", msg: "Id bo'yicha ma'lumot topilmadi" });
//       res.redirect("/explore");
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const body = req.body;
//     const { id } = req.params;
//     const respons = await Questions.findByIdAndUpdate(
//       id,
//       { $set: body },
//       { new: true }
//     );
//     console.log(body);
//     res.json({ status: "ok", msg: "Savol yangilandi", respons });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

module.exports = router;
