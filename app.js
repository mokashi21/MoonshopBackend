const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();
const path = require("path");

const instance = new Razorpay({
  key_id: "rzp_test_USpbx1ret88BDh",
  key_secret: "ytdp8mYC7gDQUosTAzLsnT2Z",
});

app.use(express.static(path.join(__dirname + "/public")));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for fetching payments
app.get("/fetch-payments", async (req, res) => {
  try {
    const response = await instance.payments.all({
      from: "2016-08-01",
      to: "2016-08-20",
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/create-order", (req, res) => {
  const options = {
    amount: 5000,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  instance.orders.create(options, (err, order) => {
    if (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      console.log("Created order:", order);
      res.json(order);
    }
  });
});

// app.get("/", (req, res) => {
//   res.send("Hello from Express server!");
// });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
