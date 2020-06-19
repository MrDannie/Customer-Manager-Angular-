const Customer = require("../models/customer");
const State = require("../models/states");

//To get one Customer//
exports.getCustomer = (req, res) => {
  const custId = +req.params.id;

  Customer.findOne({ id: custId })
    .then((customer) => {
      res.status(200).json(customer);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//To  Update a Customer//
exports.updateCustomer = (req, res) => {
  if (!req.body) {
    throw new Error("Customer and associated stateId required");
  }

  Customer.updateOne(
    { id: +req.params.id },
    {
      $set: {
        id: +req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: {
          name: req.body.state.name,
          abbreviation: req.body.state.abbreviation,
        },
      },
    }
  )
    .then((customer) => {
      res.status(201).json({
        customer: customer,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// app.put("/api/inventory/:sku", (req, res, next) => {
//   return Inventory.updateOne(
//     { sku: req.params.sku },  // <-- find stage
//     { $set: {                // <-- set stage
//        id: req.body.id,     // <-- id not _id
//        sku: req.body.sku,
//        total_qty: req.body.total_qty,
//        current_qty: req.body.current_qty
//       }
//     }
//   ).then(result => {
//     res.status(200).json({ message: "Update successful!" });
//   });
// });

exports.getCustomerPage = (req, res) => {
  const skip = +req.params.skip;
  top = +req.params.top;
  Customer.count((err, customerCount) => {
    let count = customerCount;
    res.setHeader("X-InlineCount", count);

    Customer.find({})
      .sort({ id: 1 })
      .skip(skip)
      .limit(top)
      .exec((err, customers) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(customers);
        }
      });
  });
};

//To Insert a Customer
exports.insertCustomer = (req, res) => {
  Customer.find({})
    .then((allCustomers) => {
      var listOfCustId = allCustomers.map((cust) => cust.id);
      var largestId = Math.max.apply(Math, listOfCustId);

      const customer = new Customer({
        id: ++largestId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
      });

      customer
        .save()
        .then((customer) => {
          res.json({
            customer: customer,
            status: true,
          });
        })
        .catch((error) => {
          res.json(error);
        });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteCustomer = (req, res, next) => {
  const custId = +req.params.id;
  Customer.deleteOne({ id: custId })
    .then(() => {
      res.status(201).json({
        status: true,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
