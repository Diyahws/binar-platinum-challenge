const { Product } = require("../models");

module.exports = {
  addProduct: async (req, res) => {
    const { namaProduk = "", qty = "", price = "", image = "" } = req.body;
    if (namaProduk == "" || qty == "" || price == "" || image == "") {
      if (namaProduk == "") {
        return res.status(500).json({
          status: 500,
          message: "fill product name",
        });
      }
      if (qty == "") {
        return res.status(500).json({
          status: 500,
          message: "fill qty product",
        });
      }
      if (price == "") {
        return res.status(500).json({
          status: 500,
          message: "fill price product",
        });
      }
      if (image == "") {
        return res.status(500).json({
          status: 500,
          message: "fill product image url",
        });
      }
    }

    const dataProd = {
      user_id: req.user.id,
      namaProduk: namaProduk,
      qty: qty,
      price: price,
      image: image,
      published: "true",
    };

    const addProd = await Product.create(dataProd);
    if (dataProd == null) {
      return res.status(500).json({
        status: 500,
        message: "failed add product",
      });
    }

    res.status(200).json({
      status: 200,
      message: "success add product",
      response: addProd,
    });
  },
  getProd: async (req, res) => {
    await Product.findAll({
      raw: true,
      nest: true,
    })
      .then((resp) => {
        res.status(200).json({
          status: 200,
          message: "Success get all product",
          data: resp,
        });
      })
      .catch((err) => {
        res.status(500);
        res.json({
          message: err.message,
        });
      });
  },
  show_single_product: async (req, res) => {
    await Product.findOne({
      raw: true,
      nest: true,
      where: {
        id: req.params.id,
      },
    })
      .then((resp) => {
        if (resp == null) {
          res.status(404);
          res.json({
            message: `data with id ${req.params.id} not found`,
            // response: resp,
          });
        } else {
          res.status(200);
          res.status(200).json({
            status: 200,
            message: "Success get product",
            response: resp,
          });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({
          message: err.message,
        });
      });
  },
  update_product: async (req, res) => {
    const { id } = req.params;
    const { namaProduk = "", qty = "", price = "", image = "" } = req.body;
    const data = await Product.findOne({
      where: {
        id: id,
      },
    });
    if (data == null) {
      return res.status(404).json({
        status: 404,
        message: `no product with id ${id} found`,
      });
    }
    const product_user = await Product.findOne({
      raw: true,
      nest: true,
      where: {
        user_id: req.user.id,
      },
    })
    if (product_user == null) {
      return res.status(404).json({
        status: 404,
        message: `this user has no access to edit product with id ${id}`,
      });
    }
    await Product.update(
      {
        user_id: req.user.id,
        namaProduk: namaProduk,
        qty: qty,
        price: price,
        image: image,
        published: true,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(function (resp) {
        res.status(200);
        res.json({
          status: 200,
          message: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  delete_product: async (req, res) => {
    const data = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "no product found",
      });
    }
    const product_user = await Product.findOne({
      raw: true,
      nest: true,
      where: {
        user_id: req.user.id,
      },
    })
    if (product_user == null) {
      return res.status(404).json({
        status: 404,
        message: `this user has no access to delete product with id ${req.params.id}`,
      });
    }
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((resp) => {
        if (resp == null) {
          res.status(404);
          res.json({
            message: `data with id ${req.params.id} not found`,
            response: resp,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "Success deleting product",
          });
        }
      })
      .catch((err) => {
        res.status(500);
        res.json({
          message: err.message,
        });
      });
  },
};
