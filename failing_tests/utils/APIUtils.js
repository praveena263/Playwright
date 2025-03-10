class APIUtils {
  constructor(apiContext) {
    this.apiContext = apiContext;
    //this.loginPayload=loginPayload
    this.response = {};
  }
  async getToken(loginPayload) {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: loginPayload }
    );
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    this.response.token = token;
    return this.response.token;
  }

  async createOrder(orderPayload) {
    //let response={};
    //response.token=await this.getToken()
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: await this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    console.log("MY mesa : " + orderResponseJson);
    // const orderId = orderResponseJson.orders[0];
    // this.response.orderId = orderId;
    // return this.response.orderId;
    this.response.orderId = orderResponseJson.orders[1];
    return this.response.orderId;
  }
}
module.exports = { APIUtils };
