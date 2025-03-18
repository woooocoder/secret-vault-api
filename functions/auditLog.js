const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const getLogsByProjectId = async (event) => {
  const projectId = document.getElementById("project-id").value;

  const params = {
    TableName: "Logs",
    Key: { projectId },
  };

  const result = await dynamoDB.get(params).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};


const createLog = async (event) => {
  const { projectId, userId, action, timestamp } = JSON.parse(event.body);

  const params = {
    TableName: "Logs",
    Item: {
      projectId,
      userId,
      action,
      timestamp,
    },
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Log created successfully" }),
  };
};

module.exports = { createLog, getLogsByProjectId };