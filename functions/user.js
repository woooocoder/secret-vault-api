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

const deleteUser = async (event) => {
  const userId = event.pathParameters.userId;

  const params = {
    TableName: 'User',
    Key: { userId },
  };

  await dynamoDB.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User deleted successfully' }),
  };
};

const updateUser = async (event) => {
  const userId = event.pathParameters.userId;
  const { firstName, lastName, email, password, role } = JSON.parse(event.body);

  const params = {
    TableName: 'User',
    Key: { userId },
    UpdateExpression: 'set firstName = :firstName, lastName = :lastName, email = :email, password = :password, role = :role',
    ExpressionAttributeValues: {
      ':firstName': firstName,
      ':lastName': lastName,
      ':email': email,
      ':password': password,
      ':role': role || 'readonly',
    },
    ReturnValues: 'UPDATED_NEW',
  };

  await dynamoDB.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User updated successfully' }),
  };
};

const getUserById = async (event) => {
  const userId = event.pathParameters.userId;

  const params = {
    TableName: 'User',
    Key: { userId },
  };

  const result = await dynamoDB.get(params).promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'User not found' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};

const getAllUsers = async () => {
  const params = {
    TableName: 'User',
  };

  const result = await dynamoDB.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};

module.exports = { createUser, deleteUser, updateUser, getUserById, getAllUsers };
