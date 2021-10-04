const Order = require('../controllers/order.controller');

module.exports = (app) => {
   
    app.post("/order/getcusorder", Order.getcusorder);

    app.post("/order/getcusdetail", Order.getcusorderdetails);

    app.post("/order/getresorders/:restaurantId", Order.getresorderdetails);

    app.post("/order/addorder", Order.addorder);

    app.post("/order/adddetails", Order.addorderdetails);

    app.post("/order/status", Order.updateStatus);
  
   
};