const productController = require("../controllers/productController");

const mockRequest = (
  body = {},
  params = {},
  query = {},
  session = {},
  user = {}
) => {
  return {
    body: body,
    params: params,
    query: query,
    session: session,
    user: user,
  };
};

const mockResponse = () => {
  const rest = {};

  rest.json = jest.fn().mockReturnValue(rest);
  rest.status = jest.fn().mockReturnValue(rest);

  return rest;
};

// // //ADD PRODUCT
describe("product controller with add product function", () => {
  it(`res.json called with{status: 200, message: "success add product"}, data:{namaProduk: namaProduk, qty: qty, price: price, image: image}}`, async function () {
    const req = mockRequest(
      {
        namaProduk: "aril",
        qty: 1,
        price: 1,
        image: "asdf",
      },
      {},
      {},
      {},
      { id: 2 }
    );
    const res = mockResponse();

    await productController.addProduct(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success add product",
    });
  });
});

//GET ALL
describe("product controller with get all function", () => {
  it(`res.json called with{status: 200, message: "success"}, data:{status: status, message: message}}`, async function () {
    const req = mockRequest({}, {}, {}, {}, {});
    const res = mockResponse();

    await productController.getProd(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "Success get all product",
    });
  });
});

//GET BY ID
describe("product controller with get by id function", () => {
  it(`res.json called with{status: 200, message: "success get product"}, data:{name: name, email: email, password: password,}}`, async function () {
    const req = mockRequest({}, { id: 1 }, {}, {}, {});
    const res = mockResponse();

    await productController.show_single_product(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "Success get product",
    });
  });
});

//EDIT PRODUCT
describe("product controller with edit product function", () => {
  it(`res.json called with{status: 200, message: "success edit product"}, data:{namaProduk: namaProduk, qty: qty, price: price, image: image}}`, async function () {
    const req = mockRequest(
      {
        namaProduk: "vavav",
        qty: 1211211,
        price: 1112,
        image: "ad",
      },
      { id: 1 },
      {},
      {},
      { id: 1 }
    );
    const res = mockResponse();

    await productController.update_product(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success",
    });
  });
});

//DELETE PRODUCT
describe("product controller with delete by id function", () => {
  it(`res.json called with{status: 200, message: "success delete product"}, data:{status: status, message: message}}`, async function () {
    const req = mockRequest({}, { id: 1 }, {}, {}, {});
    const res = mockResponse();

    await productController.delete_product(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "Success deleting product",
    });
  });
});
