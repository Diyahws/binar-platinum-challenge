const authController = require("../controllers/authController");

const mockRequest = (
  body = {},
  params = {},
  query = {},
  headers = {},
  session = {},
  user = {}
) => {
  return {
    body: body,
    params: params,
    query: query,
    headers: headers,
    session: session,
    user: user,
  };
};

const mockResponse = () => {
  const res = {};

  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);

  return res;
};

describe("auth controller with register function", () => {
  it('res.json called with{status: 200, message: "success register"}', async () => {
    const req = mockRequest(
      {
        name: "davasa",
        email: "thomasdbat@gmail.com",
        password: "admin123",
        rePassword: "admin123",
      },
      {},
      {},
      {},
      { roles: "admin" }
    );
    const res = mockResponse();

    const testUser = await authController.registerUser(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "success register",
    });
  }, 2000);
});

describe("auth controller with Login function", () => {
  it('res.json called with{status: 200, message: "Success Login"}', async () => {
    const req = mockRequest(
      { email: "thomasdbat@gmail.com", password: "admin123" },
      {},
      {},
      {},
      {}
    );
    const res = mockResponse();

    await authController.loginUser(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      status: 200,
      message: "Success Login",
    });
  }, 2000);
});
