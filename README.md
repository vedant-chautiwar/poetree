# POETREE

POETREE is a full-stack social platform for poets and readers to share poems, leave comments, like posts, discover other writers, and follow creative communities. It solves the problem of having a simple, focused space for literary expression instead of a generic social feed. It is designed for writers, readers, and small creative communities who want a lightweight social experience around poetry.

## Architecture at a Glance

- Frontend: React + Vite + React Router + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB with Mongoose
- APIs: RESTful endpoints for authentication, poems, comments, and user actions
- Authentication: JWT-based authentication with password hashing
- External services: MongoDB (local or Atlas fallback); no other third-party services are used in the current codebase

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Axios
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv
- CORS

## Key Features

- User signup and login
- Protected routes for authenticated users
- Create and view poems in a feed
- Like and unlike poems
- Add comments to poems
- Search users and follow or unfollow them
- View a profile page with the user’s poems and follower count

## Project Flow

1. A user opens the frontend and signs up or logs in.
2. The React app sends credentials to the backend API.
3. The backend validates the request, hashes the password, and issues a JWT if authentication succeeds.
4. The frontend stores the token and attaches it to later requests using an Axios interceptor.
5. When a user creates a poem, likes a poem, comments, or follows another user, the request goes to the relevant Express route.
6. The controller interacts with Mongoose models to read or write data in MongoDB.
7. The backend returns the updated data, and the frontend re-renders the UI accordingly.

## Authentication Flow

- Signup:
  - The frontend collects username, email, and password.
  - The backend hashes the password using bcryptjs.
  - The user document is saved to MongoDB.
  - A JWT is generated and returned to the client.

- Login:
  - The frontend sends email and password.
  - The backend finds the user by email.
  - The submitted password is compared with the stored hash using bcryptjs.
  - If valid, a JWT is issued.

- JWT/session flow:
  - The token is stored in localStorage on the client.
  - Axios attaches the token to the Authorization header for protected requests.
  - The backend verifies the token in the auth middleware before allowing access.

- Protected routes:
  - Creating poems, liking poems, adding comments, and following users require authentication.
  - Requests without a valid token receive a 401-style failure.

## Machine Learning / AI / Data Processing

- No machine learning, AI, computer vision, or advanced data-processing component is present in this repository.
- The project is primarily a CRUD-driven social application with authentication and relationship-based data models.

## Design Decisions and Architecture Choices

- The app follows a clear separation of concerns:
  - React handles the UI and client-side routing.
  - Express handles API logic and business rules.
  - MongoDB stores the application data.
- Mongoose models are used to represent core entities: User, Poem, and Comment.
- JWT was chosen for stateless authentication rather than server-managed sessions.
- Protected React routes are used so authenticated pages are not accessible without a token.
- CORS is explicitly configured to allow only known frontend origins.
- The backend uses a simple environment-based configuration for database and JWT secrets.

## Interview Talking Points

- Biggest technical challenges:
  - Coordinating frontend state with backend API responses while keeping auth-aware UI behavior consistent.
- Interesting implementation details:
  - Likes are toggled in-place using array operations on the poem document.
  - Comments are loaded dynamically per poem and displayed in the feed card.
  - Follow/unfollow actions update both users’ relationship arrays.
- Scalability considerations:
  - The current structure is suitable for a small to medium application, but it would benefit from pagination, indexing, and more efficient query patterns for larger datasets.
- Security considerations:
  - Passwords are hashed before storage and JWTs are verified server-side.
  - Token storage in localStorage is simple but not the most secure production approach.
- Performance optimizations:
  - The project keeps data fetching focused on the specific feature being used, such as comments and profile data, instead of loading everything at once.
- What I personally implemented:
  - The repository demonstrates a complete end-to-end implementation of authentication, poem publishing, comments, likes, follow/search functionality, and protected routing. If you contributed to only part of it, replace this bullet with your specific contribution during an interview.

## Possible Interview Questions

- Q: How does authentication work in this project?
  - A: Users sign up or log in through the React frontend. The backend hashes passwords, issues a JWT, and validates that token on protected routes.

- Q: Why use MongoDB for this app?
  - A: The data model is document-oriented and fits naturally with users, poems, comments, likes, and follower relationships.

- Q: What is the main architectural strength of this project?
  - A: It cleanly separates frontend, backend, and database responsibilities while keeping the app easy to understand and extend.

- Q: How would you improve this project for production?
  - A: I would strengthen security, add validation and error handling, implement pagination and indexing, and move token storage to a more secure mechanism.

- Q: What was the most important feature you implemented here?
  - A: The end-to-end social flow—from authentication to posting poems and interacting with other users—was the core value of the project.

## Getting Started

- Backend:
  - Install dependencies: npm install
  - Start the server: npm run dev
- Frontend:
  - Install dependencies: npm install
  - Start the app: npm run dev

> Note: The project expects a MongoDB instance to be available and uses environment variables for the database URI and JWT secret.
