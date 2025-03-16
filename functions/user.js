const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const createUser = async (event) => {
  const { firstName, lastName, email, password, role } = JSON.parse(event.body);
  const userId = Date.now().toString(); // Unique ID

  const params = {
    TableName: 'User',
    Item: {
      userId,
      firstName,
      lastName,
      email,
      password,
      role: role || 'readonly',
    },
  };

  await dynamoDB.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'User created successfully' }),
  };
};

module.exports = { createUser };
