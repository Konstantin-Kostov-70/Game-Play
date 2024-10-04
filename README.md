# **Game Play Catalog Website**
![Uploading gameplay.png…]()

This project is a web application designed to manage games and comments, with functionalities for user authentication, game management, and comment management.

## **Features**
- **User Authentication**: Register, log in, and manage user profiles.
- **Game Management**: Add, edit, and delete games.
- **Comment Management**: Add and view comments on games.
- **Local Storage**: Frontend utilizes local storage to manage context.

## **Models**

### **Profile**
An extension of Django's `AbstractUser` to include additional user-related information.

- **image**: URL of the user’s profile image (optional).
- **rank**: User’s rank with choices like 'Gamer', 'Super Gamer', 'Top Gamer', 'Genius' (optional).
- **social_media**: URL of the user’s social media profile (optional).
- **story**: A brief story or biography of the user (optional).

### **Games**
Represents a game entry in the catalog.

- **title**: Title of the game.
- **category**: Category or genre of the game.
- **maxLevel**: Maximum level in the game.
- **imageUrl**: URL of the game’s image.
- **summary**: A brief summary or description of the game.
- **created_on**: Timestamp when the game was added to the catalog.
- **owner**: ForeignKey to the `Profile` model indicating the owner of the game.

### **Comment**
Represents a comment made by a user on a game.

- **comment**: Text content of the comment. Must be at least 10 characters long.
- **date_of_creation**: Timestamp when the comment was created.
- **game**: ForeignKey to the `Games` model indicating the game this comment is associated with.
- **user**: ForeignKey to the `Profile` model indicating the user who made the comment.

## **API Endpoints**

### **General URL Configuration**
- **Admin Panel**: `/admin/`
- **DRF Authentication**: `/api-auth/`
- **Game API**: Routes are included from `game_rest_server.game_api.urls`

### **API URLs**

#### **Games**

##### **List and Create Games**
- **Endpoint**: `/games/`
- **Method**: 
  - **GET**: List all games
  - **POST**: Create a new game

- **Request Body (POST)**:
    ```json
    {
        "title": "Game Title",
        "category": "Action",
        "maxLevel": 10,
        "imageUrl": "http://example.com/image.jpg",
        "summary": "A brief description of the game.",
        "owner": 1
    }
    ```

##### **Retrieve, Update, and Delete Game**
- **Endpoint**: `/games/<int:pk>/`
- **Method**: 
  - **GET**: Retrieve
  - **PUT**: Update
  - **DELETE**: Delete

- **Request Body (PUT)**:
    ```json
    {
        "title": "Updated Game Title",
        "category": "Adventure",
        "maxLevel": 15,
        "imageUrl": "http://example.com/new-image.jpg",
        "summary": "Updated description."
    }
    ```

#### **Users**

##### **Retrieve, Update, and Delete User Profile**
- **Endpoint**: `/user/<int:pk>/`
- **Method**: 
  - **GET**: Retrieve
  - **PUT**: Update
  - **DELETE**: Delete

- **Request Body (PUT)**:
    ```json
    {
        "username": "newusername",
        "email": "newemail@example.com",
        "image": "http://example.com/new-image.jpg",
        "rank": "Super Gamer",
        "social_media": "http://twitter.com/newprofile",
        "story": "Updated story."
    }
    ```

##### **Register User**
- **Endpoint**: `/users/register/`
- **Method**: **POST**

- **Request Body**:
    ```json
    {
        "username": "user123",
        "email": "user123@example.com",
        "password": "password123"
    }
    ```

#### **Authentication**

##### **Login**
- **Endpoint**: `/api/login/`
- **Method**: **POST**

- **Request Body**:
    ```json
    {
        "username": "user123",
        "password": "password123"
    }
    ```

- **Response**:
    ```json
    {
        "user_info": {
            "id": 1,
            "username": "user123",
            "email": "user123@example.com"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

##### **Logout**
- **Endpoint**: `/api/logout/`
- **Method**: **POST**

#### **Comments**

##### **List and Create Comments for a Game**
- **Endpoint**: `/comments/<int:pk>/`
- **Method**: 
  - **GET**: List all comments
  - **POST**: Create a new comment

- **Request Body (POST)**:
    ```json
    {
        "user": 1,
        "comment": "This is a comment."
    }
    ```

## **Installation and Setup**

### **Clone the Repository**
```sh
git clone <repository_url>
```
### **Navigate to the Project Directory**
```sh
cd project_directory
```
### **Install Dependencies**
```sh
pip install -r requirements.txt
```
### **Set Up the Database**
```sh
python manage.py migrate
```
### **Create a Superuser**
```sh
python manage.py createsuperuser
```
### **Run the Development Server**
```sh
python manage.py runserver
```
