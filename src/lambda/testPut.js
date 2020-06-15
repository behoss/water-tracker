const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const params = {
    TableName: "demo",
    Item: {
      id: "2237",
      firstname: "Benjamin",
      lastname: "Great",
    },
  };

  try {
    const response = await documentClient.put(params).promise();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
