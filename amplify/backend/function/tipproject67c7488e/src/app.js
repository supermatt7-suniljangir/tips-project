// https://nrrqsiyft0.execute-api.eu-north-1.amazonaws.com/dev

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const stripe = require("stripe")(
  "sk_test_51PuYRXKZV6JNqDeyIFiSsBYgJPeqV9PEJasaG1DHhfsX3FF7NDahgcLLZSeehyInHeYWB1GovnUhU0jn5AwM1HrG00Vhf29FZ1"
);
const {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const jwt = require("jsonwebtoken");
const JWT_SECRET = "348806";
const axios = require("axios");
const path = "/api";
const tableName = "employees-dev";
const app = express();
const { google } = require("googleapis");
const GOOGLE_CLIENT_ID =
  "298361459600-adoccuoah873sb6piqn4h1fr0o4oic69.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);

app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const partitionKeyName = "empId";
const convertUrlType = (param, type) =>
  type === "N" ? parseInt(param) : param;

/************** HTTP Get method to list objects **************/
app.get(path, async (req, res) => {
  try {
    const data = await ddbDocClient.send(
      new ScanCommand({ TableName: tableName, Select: "ALL_ATTRIBUTES" })
    );
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: `Could not load items: ${err.message}` });
  }
});

/************** HTTP Get method to query objects **************/
app.get(`${path}/:empId`, async (req, res) => {
  const queryParams = {
    TableName: tableName,
    KeyConditions: {
      [partitionKeyName]: {
        ComparisonOperator: "EQ",
        AttributeValueList: [convertUrlType(req.params[partitionKeyName], "S")],
      },
    },
  };
  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: `Could not load items: ${err.message}` });
  }
});

/************** HTTP Get method for a single object **************/
app.get(`${path}/details/:empId`, async (req, res) => {
  const params = {
    [partitionKeyName]: convertUrlType(req.params[partitionKeyName], "S"),
  };
  try {
    const data = await ddbDocClient.send(
      new GetCommand({ TableName: tableName, Key: params })
    );
    res.json(data.Item || data);
  } catch (err) {
    res.status(500).json({ error: `Could not load item: ${err.message}` });
  }
});

/************** HTTP Put method to insert object **************/
app.put(`${path}/employees/update`, async (req, res) => {
  try {
    const data = await ddbDocClient.send(
      new PutCommand({ TableName: tableName, Item: req.body })
    );
    res.json({ success: "put call succeed!", url: req.url, data });
  } catch (err) {
    res.status(500).json({ error: err, url: req.url, body: req.body });
  }
});

/************** HTTP Post method to insert object **************/
app.post(`${path}/employees/add`, async (req, res) => {
  try {
    const data = await ddbDocClient.send(
      new PutCommand({ TableName: tableName, Item: req.body })
    );
    res.json({ success: "post call succeed!", url: req.url, data });
  } catch (err) {
    res.status(500).json({ error: err, url: req.url, body: req.body });
  }
});

/************** HTTP Delete method to remove object **************/
app.delete(`${path}/delete/:empId`, async (req, res) => {
  const params = {
    [partitionKeyName]: convertUrlType(req.params[partitionKeyName], "S"),
  };
  try {
    const data = await ddbDocClient.send(
      new DeleteCommand({ TableName: tableName, Key: params })
    );
    res.json({ url: req.url, data });
  } catch (err) {
    res.status(500).json({ error: err, url: req.url });
  }
});

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({
        message: "Missing authorization code",
      });
    }

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({
      message: "success",
      token,
      user: {
        email,
        name,
        picture,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message || err, // Better error structure
    });
  }
};

app.get(`${path}/auth/google`, googleLogin);


// handle the payment using stripe
// This is your test secret API key.

// const YOUR_DOMAIN = 'http://localhost:4242';

app.post(`${path}/create-checkout-session`, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tip for ${req.body.employee}`,
            },
            unit_amount: req.body.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the payment session." });
  }
});

app.listen(3000, () => console.log("App started"));

module.exports = app;
