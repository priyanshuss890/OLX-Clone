# OLX-Clone
# OLX Clone - Documentation
## Project Overview
### Purpose
This project is a full-stack clone of the popular online marketplace, OLX. It allows users to list items for sale and browse items for purchase.
### Key Features
*   **Item Listing:** Users can list items for sale with details like name, price, and image.
*   **Item Browsing:** Users can browse available items.
*   **User Authentication:** Users can register and log in to the platform.
*   **Buying Items:** Users can "buy" listed items, marking them as sold and associating them with their account.
*   **User Profiles:** Users can view items they have listed and bought.
### Supported Platforms/Requirements
*   Node.js
*   npm
*   MongoDB
*   Modern web browser
## Getting Started
### Installation/Setup Instructions
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
    
2.  **Navigate to the project directory:**
    ```bash
    cd olx-clone
    ```
3.  **Install server-side dependencies:**
    ```bash
    cd server
    npm install
    ```
4.  **Install client-side dependencies:**
    ```bash
    cd ../client
    npm install
    ```
5.  **Configure environment variables:**
    *   Create a `.env` file in the `server` directory.
    *   Add the following environment variable, replacing `<your_mongodb_connection_string>` with your MongoDB connection string:
                MONGO_CONNECTION_URL=<your_mongodb_connection_string>
        PORT=5000
        ```
6.  **Run the application:**
    ```bash
    npm run dev
    ```
    This command will start both the client and server in development mode.
### Dependencies/Prerequisites
*   **Node.js:**  A JavaScript runtime environment.
*   **npm:**  Node Package Manager, used for managing project dependencies.
*   **MongoDB:**  A NoSQL database used to store application data.
*   **bcryptjs:** Used for password hashing.
*   **body-parser:**  Used for parsing request bodies.
*   **concurrently:**  Used for running multiple npm scripts concurrently.
*   **cors:**  Used for enabling Cross-Origin Resource Sharing.
*   **dotenv:**  Used for loading environment variables from a `.env` file.
*   **express:**  A web application framework for Node.js.
*   **mongoose:**  An Object Data Modeling (ODM) library for MongoDB and Node.js.
*   **mongoose-type-url:** Mongoose type for URL validation.
*   **path:**  A Node.js module for working with file paths.
*   **react-router-dom:** For client-side routing.
*   **react-icons:** For including icons.
## Code Structure
### Folder and File Organization
olx-clone/
├── client/             # React frontend application
│   └── src/
│       └── components/
│           └── Footer/
│               └── Footer.jsx      # Footer component
├── server/             # Node.js backend application
│   └── index.js          # Main server file
├── .gitignore          # Specifies intentionally untracked files that Git should ignore
├── package.json        # Lists project dependencies and scripts
└── README.md           # Project documentation
### Key Components
*   **`client/src/components/Footer/Footer.jsx`:**  React component for the website footer, including links to social media and contact information.
*   **`server/index.js`:**  The main server file. It handles API endpoints, database connections, and user authentication.
*   **`.gitignore`:** Specifies intentionally untracked files that Git should ignore.
*   **`package.json`:** Lists project dependencies and scripts.
*   **`README.md`:** Project documentation.
## API Documentation
### Endpoints
*   **`GET /api`:**
    *   **Purpose:** Retrieves all unsold items from the database.
    *   **Input:** None
    *   **Output:** JSON array of item objects.
    *   **Example Response:**
        ```json
        [
            {
                "_id": "647d1234567890abcdef1234",
                "name": "Table",
                "price": 8000,
                "isSold": false,
                "imageUrl": null,
                "__v": 0
            },
            {
                "_id": "647d567890abcdef123456789",
                "name": "Computer",
                "price": 50000,
                "isSold": false,
                "imageUrl": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29tcHV0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                "__v": 0
            }
        ]
        ```
*   **`POST /new-item`:**
    *   **Purpose:** Creates a new item and associates it with a user.
    *   **Input:** JSON object containing item details and user ID.
    *   **Example Request:**
        ```json
        [
            {
                "itemName": "Chair",
                "itemPrice": 2000,
                "itemImgUrl": "https://example.com/chair.jpg",
                "userName": "testuser",
                "userId": "647d901234567890abcdef9012"
            }
        ]
        ```
    *   **Output:** None (Success indicated by server-side console log).
*   **`POST /buy-item`:**
    *   **Purpose:** Marks an item as sold and associates it with the buyer.
    *   **Input:** JSON object containing item ID and user ID.
    *   **Example Request:**
        ```json
        [
            {
                "itemId": "647d1234567890abcdef1234",
                "userId": "647d901234567890abcdef9012"
            }
        ]
        ```
    *   **Output:** None (Success indicated by server-side console log).
*   **`POST /login`:**
    *   **Purpose:** Authenticates a user.
    *   **Input:** JSON object containing username and password.
    *   **Example Request:**
        ```json
        [
            {
                "username": "testuser",
                "password": "password123"
            }
        ]
        ```
    *   **Output:** JSON representation of the user object if authentication is successful, or `"poop"` if authentication fails.
    *   **Example Success Response:**
        ```json
        {
            "_id": "647d901234567890abcdef9012",
            "username": "testuser",
            "password": "$2a$10$hashed_password",
            "boughtItems": [],
            "listedItems": [],
            "__v": 0
        }
        ```
    *   **Example Failure Response:**
        ```json
        "poop"
        ```
*   **`POST /register`:**
    *   **Purpose:** Registers a new user.
    *   **Input:** JSON object containing username and password.
    *   **Example Request:**
        ```json
        [
            {
                "username": "newuser",
                "password": "password123"
            }
        ]
        ```
    *   **Output:** JSON string containing the username if registration is successful.
    *   **Example Success Response:**
        ```json
        "newuser"
        ```
### Example API Requests (using `curl`)
*   **Get all unsold items:**
    ```bash
    curl http://localhost:5000/api
    ```
*   **Create a new item:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '[{"itemName": "Chair", "itemPrice": 2000, "itemImgUrl": "https://example.com/chair.jpg", "userName": "testuser", "userId": "647d901234567890abcdef9012"}]' http://localhost:5000/new-item
    ```
*   **Login:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '[{"username": "testuser", "password": "password123"}]' http://localhost:5000/login
    ```

