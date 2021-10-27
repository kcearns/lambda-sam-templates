const AWS = require("aws-sdk");
const uuid = require("uuid");

const DynamoDB = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

exports.handler = async (event) => {
  const { body } = event.Records[0]
  let params = {
    TableName: process.env.DB_NAME,
    Item: {
      id: uuid.v4(),
      msg: body,
    },
  };
  try {
    await DynamoDB.put(params).promise()
    console.log({"success": true, "msg": params})
  } catch (err) {
    console.log({"success": false, "msg": err.message})
  }
}