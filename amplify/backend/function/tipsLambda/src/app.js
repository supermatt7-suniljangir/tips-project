
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const stripe = require('stripe')('sk_test_51PuYRXKZV6JNqDeyIFiSsBYgJPeqV9PEJasaG1DHhfsX3FF7NDahgcLLZSeehyInHeYWB1GovnUhU0jn5AwM1HrG00Vhf29FZ1');
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = "employees";
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


const path = "/employees";
const partitionKeyName = "username";
const convertUrlType = (param, type) => type === "N" ? parseInt(param) : param;

/************** HTTP Get method to list objects **************/
app.get(path, async (req, res) => {
  try {
    const data = await ddbDocClient.send(new ScanCommand({ TableName: tableName, Select: 'ALL_ATTRIBUTES' }));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: `Could not load items: ${err.message}` });
  }
});

/************** HTTP Get method to query objects **************/
app.get(`${path}/:username`, async (req, res) => {
  const queryParams = {
    TableName: tableName,
    KeyConditions: {
      [partitionKeyName]: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [convertUrlType(req.params[partitionKeyName], "S")]
      }
    }
  };
  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: `Could not load items: ${err.message}` });
  }
});


/************** HTTP Get method for a single object **************/
app.get(`${path}/details/:username`, async (req, res) => {
  const params = { [partitionKeyName]: convertUrlType(req.params[partitionKeyName], "S") };
  try {
    const data = await ddbDocClient.send(new GetCommand({ TableName: tableName, Key: params }));
    res.json(data.Item || data);
  } catch (err) {
    res.status(500).json({ error: `Could not load item: ${err.message}` });
  }
});

/************** HTTP Put method to insert object **************/
app.put(`${path}/add`, async (req, res) => {
  try {
    const data = await ddbDocClient.send(new PutCommand({ TableName: tableName, Item: req.body }));
    res.json({ success: 'put call succeed!', url: req.url, data });
  } catch (err) {
    res.status(500).json({ error: err, url: req.url, body: req.body });
  }
});

/************** HTTP Post method to insert object **************/
app.post(`${path}/add`, async (req, res) => {
  try {
    const data = await ddbDocClient.send(new PutCommand({ TableName: tableName, Item: req.body }));
    res.json({ success: 'post call succeed!', url: req.url, data });
  } catch (err) {
    res.status(500).json({ error: err, url: req.url, body: req.body });
  }
});

/************** HTTP Delete method to remove object **************/
app.delete(`${path}/delete/:username`, async (req, res) => {
  const params = { [partitionKeyName]: convertUrlType(req.params[partitionKeyName], "S") };
  try {
    const data = await ddbDocClient.send(new DeleteCommand({ TableName: tableName, Key: params }));
    res.json({ url: req.url, data });
  } catch (err) {
    res.status(500).json({ error: err, url: req.url });
  }
});

// handle the payment using stripe
// This is your test secret API key.


// const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/employees/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Tip for ${req.body.employee}`,
              
            },
            unit_amount: req.body.amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'An error occurred while creating the payment session.' });
  }
});










app.listen(3000, () => console.log("App started"));

module.exports = app;




// /*
// Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
//     http://aws.amazon.com/apache2.0/
// or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and limitations under the License.
// */
// // https://y9b5ss7vhl.execute-api.eu-north-1.amazonaws.com/dev


// const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
// const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
// const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// const bodyParser = require('body-parser')
// const express = require('express')

// const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
// const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// let tableName = "employees";
// if (process.env.ENV && process.env.ENV !== "NONE") {
//   tableName = tableName + '-' + process.env.ENV;
// }

// const userIdPresent = false; // TODO: update in case is required to use that definition
// const partitionKeyName = "empId";
// const partitionKeyType = "S";
// const sortKeyName = "";
// const sortKeyType = "";
// const hasSortKey = sortKeyName !== "";
// const path = "/api";
// const UNAUTH = 'UNAUTH';
// const hashKeyPath = '/:' + partitionKeyName;
// const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// // declare a new express app
// const app = express()
// app.use(bodyParser.json())
// app.use(awsServerlessExpressMiddleware.eventContext())

// // Enable CORS for all methods
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "*")
//   next()
// });

// // convert url string param to expected Type
// const convertUrlType = (param, type) => {
//   switch(type) {
//     case "N":
//       return Number.parseInt(param);
//     default:
//       return param;
//   }
// }

// /************************************
// * HTTP Get method to list objects *
// ************************************/

// app.get(path, async function(req, res) {
//   var params = {
//     TableName: tableName,
//     Select: 'ALL_ATTRIBUTES',
//   };

//   try {
//     const data = await ddbDocClient.send(new ScanCommand(params));
//     res.json(data.Items);
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({error: 'Could not load items: ' + err.message});
//   }
// });

// /************************************
//  * HTTP Get method to query objects *
//  ************************************/

// app.get(path + hashKeyPath, async function(req, res) {
//   const condition = {}
//   condition[partitionKeyName] = {
//     ComparisonOperator: 'EQ'
//   }

//   if (userIdPresent && req.apiGateway) {
//     condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
//   } else {
//     try {
//       condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition
//   }

//   try {
//     const data = await ddbDocClient.send(new QueryCommand(queryParams));
//     res.json(data.Items);
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({error: 'Could not load items: ' + err.message});
//   }
// });

// /*****************************************
//  * HTTP Get method for get single object *
//  *****************************************/

// app.get(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
//   const params = {};
//   if (userIdPresent && req.apiGateway) {
//     params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName];
//     try {
//       params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }
//   if (hasSortKey) {
//     try {
//       params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let getItemParams = {
//     TableName: tableName,
//     Key: params
//   }

//   try {
//     const data = await ddbDocClient.send(new GetCommand(getItemParams));
//     if (data.Item) {
//       res.json(data.Item);
//     } else {
//       res.json(data) ;
//     }
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({error: 'Could not load items: ' + err.message});
//   }
// });


// /************************************
// * HTTP put method for insert object *
// *************************************/

// app.put(path, async function(req, res) {

//   if (userIdPresent) {
//     req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   try {
//     let data = await ddbDocClient.send(new PutCommand(putItemParams));
//     res.json({ success: 'put call succeed!', url: req.url, data: data })
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({ error: err, url: req.url, body: req.body });
//   }
// });

// /************************************
// * HTTP post method for insert object *
// *************************************/

// app.post(path, async function(req, res) {

//   if (userIdPresent) {
//     req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   try {
//     let data = await ddbDocClient.send(new PutCommand(putItemParams));
//     res.json({ success: 'post call succeed!', url: req.url, data: data })
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({ error: err, url: req.url, body: req.body });
//   }
// });

// /**************************************
// * HTTP remove method to delete object *
// ***************************************/

// app.delete(path + '/object' + hashKeyPath + sortKeyPath, async function(req, res) {
//   const params = {};
//   if (userIdPresent && req.apiGateway) {
//     params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName];
//      try {
//       params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }
//   if (hasSortKey) {
//     try {
//       params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
//     } catch(err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let removeItemParams = {
//     TableName: tableName,
//     Key: params
//   }

//   try {
//     let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
//     res.json({url: req.url, data: data});
//   } catch (err) {
//     res.statusCode = 500;
//     res.json({error: err, url: req.url});
//   }
// });

// app.listen(3000, function() {
//   console.log("App started")
// });

// // Export the app object. When executing the application local this does nothing. However,
// // to port it to AWS Lambda we will create a wrapper around that will load the app from
// // this file
// module.exports = app


