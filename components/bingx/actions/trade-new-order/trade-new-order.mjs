import bingx from "../../bingx.app.mjs";

export default {
  name: "BingX Trade New Order",
  version: "0.1.1",
  key: "bingx-trade-new-order",
  description: "Place a New Order [reference](https://bingx-api.github.io/docs/swap/trade-api.html#_1-place-a-new-order).",
  props: {
    bingx,
    symbol: {
      propDefinition: [
        bingx,
        "symbol",
      ],
    },
    side: {
      propDefinition: [
        bingx,
        "side",
      ],
    },
    entrustPrice: {
      propDefinition: [
        bingx,
        "entrustPrice",
      ],
    },
    entrustVolume: {
      propDefinition: [
        bingx,
        "entrustVolume",
      ],
    },
    tradeType: {
      propDefinition: [
        bingx,
        "tradeType",
      ],
    },
    action: {
      propDefinition: [
        bingx,
        "action",
      ],
    },
    takerProfitPrice: {
      label: "Taker Profit Price",
      description: "The take profit price",
      type: "string",
      optional: true,
    },
    stopLossPrice: {
      label: "Stop Loss Price",
      description: "The take loss price",
      type: "string",
      optional: true,
    },
  },
  type: "action",
  async run({ $ }) {
    const API_METHOD = "POST";
    const API_PATH = "/api/v1/user/trade";

    if (this.takerProfitPrice) {
      this.takerProfitPrice = parseFloat(this.takerProfitPrice.replace(",", "."));
    }

    if (this.stopLossPrice) {
      this.stopLossPrice = parseFloat(this.stopLossPrice.replace(",", "."));
    }

    const parameters = {
      "symbol": this.symbol,
      "side": this.side,
      "entrustPrice": this.bingx.convertToFloat(this.entrustPrice),
      "entrustVolume": this.bingx.convertToFloat(this.entrustVolume),
      "tradeType": this.tradeType,
      "action": this.action,
      "takerProfitPrice": this.takerProfitPrice,
      "stopLossPrice": this.stopLossPrice,
    };
    const returnValue = await this.bingx.makeRequest(API_METHOD, API_PATH, parameters);
    $.export("$summary", `New Future Order for ${this.symbol}`);
    return returnValue;
  },
};
