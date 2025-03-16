# Secret Vault API

This project is a serverless API built with AWS Lambda, API Gateway, DynamoDB, and Docker. The API provides functionality for managing users, projects, and secrets in a secure environment. Currently, only the `createUser` endpoint is implemented, but the rest of the API is under development.

## Current Features

- **`POST /create-user`** - Create a new user in DynamoDB.
  - **Request Body** (JSON):
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "role": "dev"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User created successfully"
    }
    ```
  - **Implementation**: Uses AWS Lambda with DynamoDB to store user data.

## Technologies Used

- **Serverless Framework**: For deploying serverless applications to AWS.
- **AWS Lambda**: For running serverless functions in response to HTTP requests.
- **Amazon DynamoDB**: For storing user data and other entities (like projects and secrets).
- **API Gateway**: To expose HTTP endpoints and trigger Lambda functions.
- **Docker**: For local development and testing.

## Setup and Installation

### Prerequisites

- **AWS CLI**: Set up and configured with your AWS credentials.
- **Serverless Framework**: Make sure you have the Serverless Framework installed globally.
- **Docker** (optional): For running the application locally in a container.

### Steps to Get Started

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <project_directory>

2. ** Install dependencies**:
    ```bash
    npm install

3. **Configure AWS CLI**
    ```bash
    aws configure

4. **Deploy with Serverless**
    ```bash
    serverless deploy

5. **Docker (optional)**
   -    **Build the docker image**
        ```bash
        docker build -t secret-vault-api

   -    **Run the Docker container**
        ```bash
        docker run -p 3000:3000 secret-vault-api

## TODO
**The following features are still under development:**
- Projects: Endpoints for CRUD'ing projects
- Secrets: Endpoints for CRUD'ing secrets
- Authentication & Authorization: Integration with AWS Cognito for managing access control
- Audit Logs: Tracking user actions and maintaining logs of API usage

