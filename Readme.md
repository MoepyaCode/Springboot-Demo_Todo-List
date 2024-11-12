# Todo Application

A simple Todo List manager application built with Spring Boot for the backend and React with TypeScript (Vite) for the frontend. The application is containerized using Docker for easy setup and deployment.

#

### Prerequisites

To run this application, ensure you have the following installed:

- **Docker**: For running the application in containers.
- **Docker Compose**: For running the containers together.
- **Java 17**: (If you need to make backend modifications outside Docker.)
- **Node & npm**: (If you need to make frontend modifications outside Docker.)

##

### Running the Application with Docker

Follow these steps to run the application containers:

1. **Clone the Repository**

   ```    
   git clone <repository-url>
   cd todo-application
   ```

2. **Start the Application with Docker Compose**

    Run the following command in the root directory of the repository to build and start both the frontend and backend containers:

    ```
    docker-compose up -d --build
    ```

    This command will:
	- Build both the backend and frontend Docker images.
	- Start the backend container on port 8080 and the frontend container on port 5173.

3. __Access the Application__

	- __Frontend__: Open http://localhost:5173 in your browser.
	- __Backend__: API endpoints are available at http://localhost:8080/api/todos.

    ##
    __API Endpoints (Backend)__

    The backend API provides the following endpoints for managing todos:
	- POST /api/todos - Create a new todo.
	- GET /api/todos - Retrieve all todos.
	- GET /api/todos/{id} - Retrieve a specific todo by ID.
	- PUT /api/todos/{id} - Update a specific todo by ID.
	- DELETE /api/todos/{id} - Delete a specific todo by ID.

    ##

### Troubleshooting

- __Port Conflicts:__ Ensure that ports __8080__ (backend) and __5173__ (frontend) are not in use by other applications on your system.
- __Docker Not Found:__ If Docker commands are not recognized, ensure Docker and Docker Compose are installed and properly configured on your machine.