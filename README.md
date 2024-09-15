---

# Event Management System

A full-stack event management system built with **Nest.js** for the backend and **React.js** for the frontend. This application supports CRUD operations for event management, user-specific event control, and advanced filtering and searching capabilities. 

[Vite + React + TS.webm](https://github.com/user-attachments/assets/89095e4d-d2f0-42b3-b6ad-0b76d785c36c)

### Techstack

- **Frontend:** React TS with Vite (since CRA is depcrecated)

- **Backend:** Nest with TS, PostgreSQL with TypeORM

## Features

### 1. Event Management (CRUD Operations)
- **Create, Read, Update, Delete** operations for events.
- Image upload with multipart/formdata

### 2. Event Listing
- **Pagination**: Efficient handling of large event datasets.
- **Sorting**: Sort events by criteria such as name or date.
- **Search**: Search events based on keywords.

### 3. Input Validation
- **Client-Side Validation**: Ensure correct input on the client-side.
- **Server-Side Validation**: Used class-validator with class-transform for input validation.

## What's left  ;_;

Due to the tight deadline, the following features were not fully implemented. However, given more time, I would love to efficiently complete these enhancements and improve the code quality:

### 1. User Association

- **Authentication Middleware**: Introduce an authentication middleware to capture and save logged-in user details in the request object.
- **Edit/Delete Authorization**: Implement logic to validate that only the user who created the event can edit or delete it by comparing the logged-in user’s details with the event’s `createdBy` field.

### 2. Image Preview Feature

- **Image Storage**: Store an array of image URLs in the event schema to support multiple images for each event.
- **Image Previews**: Display tiny image previews in the events list. On click, show the full-size images in a carousel popup for better user experience.

### 3. Additional Enhancement Features

- **Optimized Network Requests**: Implement `react-query` to efficiently manage network calls, caching data smartly, and reducing redundant state management and API requests.
- **Skeleton Loader**: Display a skeleton loader for progressive UI updates, improving perceived performance.
- **Reusable Form Components**: Refactor input fields into reusable form components and utilize `react-hook-form` for streamlined client-side validations.


## Setup Instructions

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system.
- **PostgreSQL**: Make sure the databaseis installed and running.

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd server
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**: Create a `.env` file in the root directory and configure it based on `.env.example`. For example:
    ```bash
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=root
    DB_PASSWORD=secret
    DB_DATABASE=events
    ```

5. **Run the Backend**:
    ```bash
    yarn start:dev
    ```

### Frontend Setup

1. **Navigate to frontend**:
    ```bash
    cd client
    ```

2. **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**: Create a `.env` file in the root directory and configure it based on `.env.example`. For example:
    ```bash
    VITE_API_CLIENT=http://localhost:3000/
    ```
3. **Run the Frontend**:
    ```bash
    yarn run dev
    ```

The frontend should be accessible at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Project Architecture

This project follows a modular architecture to keep code organized and reusable:
```bash
NEST-NEXT-APP/
│
├── frontend/                    # Frontend (React + Vite)
│   ├── public/                  # Public assets like images, icons, etc.
│   ├── src/
│   │   ├── assets/              # Static assets like images, fonts, etc.
│   │   ├── components/          # React components
│   │   │   ├── event/           # Event-related components
│   │   │   ├── user/            # User-related components
│   │   ├── config/              # constants
│   │   ├── App.tsx              # Main React App component
│   │   ├── App.css              # Global styles for App component
│   │   ├── index.css            # Global CSS styles
│   │   ├── main.tsx             # Main entry point for Vite
│   │   ├── vite-env.d.ts        # TypeScript declaration for Vite environment
│   ├── .env                     # Environment variables for the frontend
│   ├── .gitignore               # Files to ignore in Git
│
├── server/                      # Backend (Nest.js)
│   ├── src/
│   │   ├── event/               # Event module
│   │   │   ├── dto/             # Data Transfer Objects for validation
│   │   │   ├── entities/        # Database entities/models for the Event
│   │   │   ├── event.controller.ts      # Controller handling HTTP requests
│   │   │   ├── event.controller.spec.ts # Unit test for the Event controller
│   │   │   ├── event.module.ts          # Event module definition
│   │   │   ├── event.service.ts         # Service handling business logic
│   │   │   ├── event.service.spec.ts    # Unit test for the Event service
│   │   ├── app.controller.ts     # Main application controller
│   │   ├── app.module.ts         # Main application module
│   │   ├── app.service.ts        # Main application service
│   │   ├── main.ts               # Main entry point for the Nest.js app
│   ├── uploads/                  # Uploaded files (e.g., event images)
│   ├── .env                      # Environment variables for the backend

```
