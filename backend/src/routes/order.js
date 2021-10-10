const Order = require('../controllers/order.controller');

module.exports = (app) => {
   
    app.post("/api/order/getcusorder", Order.getcusorder);

    app.post("/api/order/getcusdetail", Order.getcusorderdetails);

    app.post("/api/order/getresorders/:restaurantId", Order.getresorderdetails);

    app.post("/api/order/addorder", Order.addorder);

    app.post("/api/order/adddetails", Order.addorderdetails);

    app.post("/api/order/status", Order.updateStatus);
  
   
};