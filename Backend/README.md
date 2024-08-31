# LaunchPad Online Assessment Backend

#### This project aims to create the backend service of a conversational chatbot with the help of readily available LLMs such as OpenAI.

## Requirements
- Python v3.12
- Docker

## How to Start

### Step 1: Start up your Docker application

### Step 2: Add environment variables for the OpenAI API Key

### Step 3: Ensure that your local MongoDB instance is running.

### Step 4: Run the docker containers
Run the following command locally in the terminal
```bash
docker compose up
```
This will start up both the Conversations and Query API

### Step 5: Run the API

The API documentation could be found here: http://localhost:3000/docs

### Step 6: Running the Tests
Run the following command to run the automated test cases
```bash
docker compose exec -t conversations pytest
```

## Tech Stack Used
- Python
- FastAPI
- Pydantic
- Beanie
- OpenAI
- MongoDB
- Pre-commit
- PytTest
- Docker
