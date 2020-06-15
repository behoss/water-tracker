const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode = 0;

  // const { id } = event.pathParameters;

  const params = {
    TableName: "UserData",
    Key: {
      id: 0,
    },
  };

  try {
    // const data = await documentClient.scan(params).promise();
    const data = await documentClient.get(params).promise();
    responseBody = data.Item;
    statusCode = 200;
  } catch (err) {
    responseBody = `Unable to get user data`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      myHeader: "test",
    },
    body: responseBody,
  };

  return response;
};
