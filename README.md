# Task API

A RESTful API to manage tasks

## Features

- Authentication
- Create, update, and delete tasks

## Endpoints

| Endpoint          | Method | Description             |
| ----------------- | ------ | ----------------------- |
| /v1/register      | POST   | Create a user account   |
| /v1/login         | POST   | Login to a user account |
| /v1/tasks         | POST   | Create a task           |
| /v1/tasks         | GET    | Get tasks               |
| /v1/tasks/:taskId | GET    | Get a task              |
| /v1/tasks/:taskId | PUT    | Update a task           |
| /v1/tasks/:taskId | DELETE | Delete a task           |

## License

MIT
