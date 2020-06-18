const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

module.exports.get = async (event, context) => {
  let statusCode = 0;
  let responseBody = "";

  // get params from DynamoDB
  const { id } = event.pathParameters;
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id,
    },
  };

  try {
    const data = await db.get(params).promise();
    responseBody = data.Item;
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get user data`;
    statusCode = 500;
  }

  if (responseBody === undefined || responseBody === null) {
    responseBody = `The entry does not exist`;
    statusCode = 404;
    return {
      statusCode,
      responseBody,
    };
  }

  const response = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(responseBody),
  };

  return response;
};

module.exports.create = async (event, context) => {
  let statusCode = 0;
  let responseBody = "";

  // check if values are truthy
  const { total, goal } = JSON.parse(event.body);

  if (typeof total !== "number" || typeof goal !== "number") {
    console.log(`Invalid parameters`, total, goal);
    responseBody = `Invalid parameters`;
    statusCode = 400;
    return {
      statusCode,
      responseBody,
    };
  }

  // create params in DynamoDB
  const { id } = event.pathParameters;
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id,
      total,
      goal,
    },
  };

  try {
    const data = await db.put(params).promise();
    responseBody = data;
    statusCode = 201;
  } catch (error) {
    console.log(`Unable to add user data`, error);
    responseBody = `Unable to add user data`;
    statusCode = 500;
  }

  const response = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(responseBody),
  };

  return response;
};

module.exports.update = async (event, context) => {
  let statusCode = 0;
  let responseBody = "";

  // check if values are truthy
  const { total, goal } = JSON.parse(event.body);
  console.log("PARSED VALUES", total, goal);

  if (typeof total !== "number" || typeof goal !== "number") {
    console.log(`Invalid parameters`, total, goal);
    responseBody = `Invalid parameters`;
    statusCode = 400;
    return {
      statusCode,
      responseBody,
    };
  }

  // update params in DynamoDB
  const { id } = event.pathParameters;
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #total = :total, #goal = :goal",
    ExpressionAttributeNames: {
      "#total": "total",
      "#goal": "goal",
    },
    ExpressionAttributeValues: {
      ":total": total,
      ":goal": goal,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await db.update(params).promise();
    console.log("SERVER RESPONSE", data);
    responseBody = data;
    statusCode = 201;
  } catch (error) {
    console.log(`Unable to add user data`, error);
    responseBody = `Unable to add user data`;
    statusCode = 500;
  }

  const response = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(responseBody),
  };

  return response;
};
