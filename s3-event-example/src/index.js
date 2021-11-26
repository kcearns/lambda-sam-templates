const aws = require('aws-sdk')
const uuid = require('uuid')

const DynamoDB = new aws.DynamoDB.DocumentClient({ region: "us-east-1" })

exports.handler = async (event) => {
    const key = event.Records[0].s3.object.key

    let params = {
        TableName: process.env.DB_NAME,
        Item: {
            id: uuid.v4(),
            image: key,
        }
    }    

    try {
        await DynamoDB.put(params).promise()
        console.log({"success": true, "msg": params})
    } catch (err) {
        console.log({"success": false, "msg": err.message})
    }
}
              