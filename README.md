# DAP-project
Second course project (Omnia)

## Drill and Practice Application

This is a web application for repeated practice of learned content through multiple-choice questions. The application allows users to create topics and add questions with multiple answer options. Users can also answer questions and view statistics. The application provides an API for retrieving random questions and verifying answers.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Usage](#usage)
- [Known Issues](#known-issues)

## Overview

This project is a web application built using a three-tier architecture (client, server, database) and a layered architecture (views, controllers, services, database). It is developed with **Deno** and **Oak** framework. The application uses **PostgreSQL** as the database and **Flyway** for database migrations.

## Features

- User registration and login with secure password storage using bcrypt.
- Admin users can create and delete topics.
- Users can add questions to topics with multiple answer options.
- Users can answer questions and view feedback on their answers.
- API for retrieving random questions and verifying answers.
- Automated tests, including end-to-end tests with Playwright.
- Cross-origin resource sharing (CORS) support for the API.
- Styled using a Bootstrap CDN.

## Technologies Used

- [Deno](https://deno.land/)
- [Oak](https://deno.land/x/oak)
- [PostgreSQL](https://www.postgresql.org/)
- [Flyway](https://flywaydb.org/)
- [Bcrypt](https://deno.land/x/bcrypt)
- [Docker Compose](https://docs.docker.com/compose/)
- [Playwright](https://playwright.dev/) for testing
- [Bootstrap5] (https://getbootstrap.com/) css framework

## Project Structure

The project follows a modular structure:
- **controllers/**: Handles request and response logic.
- **services/**: Business logic and operations.
- **database/**: Database queries and connection handling.
- **views/**: Templates and rendering logic.

## Installation

1. Clone the repository:
```
$ git clone https://github.com/Mattaru/DAP-project.git
```
2. Go to the project dir:
```
$ cd DAP-project
```
3. Run the application with docker compose:
```
$ docker compose up --build -d
```
The application will be available at http://localhost:7777.

## API Endpoints

- GET /api/questions/random
Returns a randomly selected question.
Response Example:
```json
{
  "questionId": 1,
  "questionText": "How much is 1+1?",
  "answerOptions": [
    { "optionId": 1, "optionText": "2" },
    { "optionId": 2, "optionText": "4" },
    { "optionId": 3, "optionText": "6" }
  ]
}
```
- POST /api/questions/answer
Verifies the answer provided by the user.
Request Example:
```json
{
  "questionId": 1,
  "optionsIds": [3, 1, 4]
}
```
Response Example:
```json
{ "correct": false }
```

## Admin Account

The database comes preloaded with an admin account:
- Email: admin@admin.com
- Password: 123456

## Usage

- Main Page: Provides a brief description and statistics of the application.
- Topics Page: Lists all topics and allows admin users to create new topics.
- Quiz Page: Users can take a quiz by selecting a topic and answering questions.
- API: Developers can use the API to retrieve random questions and verify answers.

## Tests

--- Not ready yet ---

## Deployment

--- Not ready yet ---

