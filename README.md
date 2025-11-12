# Notes App Backend

This project is the backend for a notes application, built with Django and Django REST Framework (DRF).

## Architecture and Endpoints

The backend exposes a RESTful API to manage users, categories, and notes.

- **Framework**: Django
- **API**: Django REST Framework (DRF)
- **Authentication**: Token-based authentication.
- **Database**: SQLite (default configuration).

### Main Endpoints

- `POST /api/register/`: Register a new user.
- `POST /api/login/`: Log in and retrieve an authentication token.
- `GET, POST /api/categories/`: List and create categories.
- `GET, PUT, PATCH, DELETE /api/categories/{id}/`: Retrieve, update, and delete a category.
- `GET, POST /api/notes/`: List and create notes. Supports filtering by category with `?category_id={id}`.
- `GET, PUT, PATCH, DELETE /api/notes/{id}/`: Retrieve, update, and delete a note.

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

## Development Process & AI Collaboration

This project was developed using a hybrid approach, blending personal expertise with a suite of AI models to achieve
rapid development. The core functionality of the application was completed in under 5 hours, demonstrating a highly
efficient, AI-augmented workflow.

### AI Models Used

The development process was accelerated by leveraging different AI models for specific tasks via the Windsurf platform:

- **Claude 4.5**: Primarily used for the frontend development. It excelled at translating Figma designs into functional
  React components directly from screenshots, enabling a "vibe coding" approach to quickly scaffold the UI.

- **Grok (Fast model)**: Used for quick idea validation and brainstorming, helping to make rapid decisions on
  implementation details.

- **Gemini 2.5 Pro**: Served as the main workhorse for implementing core requirements and backend functionality,
  ensuring the application logic was robust and complete.

### Workflow & Time Management

The development strategy was structured as follows:

1. **UI First**: The initial focus was on replicating the UI and building the React components to match the visual
   design.
2. **Backend Development**: Once the frontend structure was in place, work shifted to building the Django backend API.
3. **Integration**: The frontend and backend were then connected to bring the application to life.
4. **Polishing**: The final phase involved refining details, fixing bugs, and improving the overall user experience.
