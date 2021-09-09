let AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
const comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});

const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/get-word-cloud/:id', async function (request, response) {
  console.log(request.params)
  let params = {
    TableName: 'OrderFeedback',
    Key: {
      "Restaurant_name": request.params.id
    }
  };
  let data = await client.get(params).promise();
  let reviews = data.Item.Reviews;

  let comprehendParams = {
    LanguageCode: 'en',
    TextList: reviews
  };
  let entities = await new Promise((resolve, reject) => {
    comprehend.batchDetectEntities(comprehendParams, function(error, data) {
      resolve(data.ResultList);
    });
  });
  return response.status(200).json({
    reviewsWordCloud: entities
  })
})

app.post('/create-order', cors(corsOptions), async function (request, response) {
  let data = request.body
  let dynamoInsertData = {
    TableName: 'Orders',
    Item: {
      OrderID: new Date().getTime(),
      status: 'Placed',
      Restaurant_name: data.restaurantName,
      Order_items: data.items,
      Order_price: Math.random() * 10
    }
  }
  await client.put(dynamoInsertData).promise()
  return response.status(200).json({
    message: 'Order is placed.'
  })
})

app.get('/get-orders', cors(corsOptions), async function (request, response) {
  let params = {
    TableName: 'Orders'
  };
  let items =  await client.scan(params).promise();
  return response.status(200).json({
    orders: items
  })
})

app.get('/get-restaurants', async function (request, response, next) {
  let params = {
    TableName: 'Restaurant'
  };
  let items =  await client.scan(params).promise();
  return response.status(200).json({
    restaurants: items
  });
})

app.get('/get-food-items', async function (request, response) {
  let params = {
    TableName: 'FoodItems'
  };
  let items =  await client.scan(params).promise();
  return response.status(200).json({
    foodItems: items
  })
})

app.post('/add-feedback', async function(request, response) {
  let data = request.body
  let params = {
    TableName: 'OrderFeedback',
    ProjectionExpression: "Restaurant_name, Reviews",
    FilterExpression: "Restaurant_name = :Restaurant_name",
    ExpressionAttributeValues: {
      ":Restaurant_name": data.restaurantName
    }
  };
  let feedbacks = await client.scan(params).promise()
  if (feedbacks.Items.length > 0) {
    let allFeedbacks = feedbacks.Items[0].Reviews;
    allFeedbacks.push(data.feedback);
    let putParams = {
      TableName: 'OrderFeedback',
      Item: {
        "Restaurant_name": data.restaurantName,
        "Reviews": allFeedbacks
      }
    };
    await client.put(putParams).promise();
    return response.status(200).json({message: "Feedback added"});
  }
})

module.exports.handler = serverless(app);