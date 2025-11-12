# Notes App Backend

This project is the backend for a notes application, built with Django and Django REST Framework (DRF).

## Architecture and Endpoints

The backend exposes a RESTful API to manage users, categories, and notes.

-   **Framework**: Django
-   **API**: Django REST Framework (DRF)
-   **Authentication**: Token-based authentication.
-   **Database**: SQLite (default configuration).

### Main Endpoints

-   `POST /api/register/`: Register a new user.
-   `POST /api/login/`: Log in and retrieve an authentication token.
-   `GET, POST /api/categories/`: List and create categories.
-   `GET, PUT, PATCH, DELETE /api/categories/{id}/`: Retrieve, update, and delete a category.
-   `GET, POST /api/notes/`: List and create notes. Supports filtering by category with `?category_id={id}`.
-   `GET, PUT, PATCH, DELETE /api/notes/{id}/`: Retrieve, update, and delete a note.

## Local Environment Setup

Follow these steps to set up and run the backend locally.

### 1. Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Create and Apply Migrations

This will create the necessary migration files based on your models and then apply them to the database.

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Load Initial Data (Fixtures)

This will populate the database with sample categories and notes from the `api/fixtures/initial_data.json` file.

```bash
python manage.py loaddata api/fixtures/initial_data.json
```

### 5. Run the Server

```bash
python manage.py runserver
```

The API server will be available at `http://127.0.0.1:8000`.
