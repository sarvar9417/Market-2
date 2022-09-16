const { filter } = require("lodash");
const { Market, Product } = require("../constants").models;

const showProductToConnection = async (req, res) => {
  try {
    const { market, productId, connectionMarket, add } = req.body;
    const marketData = await Market.findById(market);
    const marketDataConnection = await Market.findById(connectionMarket);
    if (!marketData || !marketDataConnection) {
      return res
        .status(404)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Diqqat! Mahsulot ma'lumotlari topilmadi" });
    }

    if (add) {
      const checkProduct = product.connections.some(
        (marketId) => marketId.toString() === connectionMarket
      );
      !checkProduct && product.connections.push(connectionMarket);
      await product.save();
    } else {
      product.connections = product.connections.filter(
        (marketId) => marketId.toString() !== connectionMarket
      );
      await product.save();
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const getProductsByConnection = async (req, res) => {
  try {
    const { market, connectionMarket, search, countPage, currentPage } =
      req.body;
    const marketData = await Market.findById(market);
    const marketDataConnection = await Market.findById(connectionMarket);
    if (!marketData || !marketDataConnection) {
      return res
        .status(404)
        .json({ message: "Diqqat! Do'kon ma'lumotlari topilmadi" });
    }
    const code = new RegExp(".*" + search ? search.code : "" + ".*", "i");
    const name = new RegExp(".*" + search ? search.name : "" + ".*", "i");
    const category = new RegExp(
      ".*" + search ? search.category : "" + ".*",
      "i"
    );
    const barcode = new RegExp(".*" + search ? search.barcode : "" + ".*", "i");

    const products = await Product.find({
      market: connectionMarket,
      connections: market,
    })
      .sort({ code: 1 })
      .select("total market category minimumcount connections")
      .populate(
        "price",
        "incomingprice sellingprice incomingpriceuzs sellingpriceuzs tradeprice tradepriceuzs"
      )
      .populate({
        path: "productdata",
        select: "name code barcode",
        match: { name: name, code: code, barcode: barcode },
      })
      .populate({
        path: "category",
        select: "name code",
        match: { code: category },
      })
      .populate("unit", "name")
      .then((products) =>
        filter(
          products,
          (product) => product.productdata !== null && product.category !== null
        )
      );
    const count = products.length;
    const filtered = products.splice(currentPage * countPage, countPage);
    res.status(201).json({
      products: filtered,
      count,
    });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

module.exports = { showProductToConnection, getProductsByConnection };
