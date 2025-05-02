# MyFlix Client

The MyFlix Client is a React-based front-end application for the MyFlix movie database. It allows users to browse a collection of movies, view detailed information about each movie, manage their favorite movies, and update their profiles. This application interacts with the MyFlix API to fetch and manage movie data.

## Features

- **User Authentication**: Users can log in and sign up for an account.
- **Movie Browsing**: View a list of movies fetched from the MyFlix API.
- **Search Functionality**: Search for movies by title using a search bar.
- **Movie Details**: View detailed information about a movie, including its genre, director, and description.
- **Favorite Movies**: Add or remove movies from the user's list of favorites.
- **Profile Management**: Update user profile information.
- **Responsive Design**: Built with Bootstrap for a mobile-friendly experience.

## Technologies Used

- **Frontend**: React, React Router, React Bootstrap
- **Backend**: MyFlix API (hosted on Heroku)
- **Styling**: SCSS and Bootstrap
- **Build Tool**: Parcel

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
  git clone https://github.com/Mancini-Developer80/myflix-client.git
cd myflix-client

2. Install dependencies:
  npm install

3. Start the development server: npm start

4. Open the application in your browser: http://localhost:1234

## Deployment

This application is deployed on Netlify. To deploy it yourself:

1. Push the main branch to a GitHub repository.
2. Link the repository to Netlify.
3. Set the build command to: npm run build
4. Set the publish directory to: dist

## API Integration

The application interacts with the MyFlix API hosted at:

### Endpoints Used

- `GET /movies`: Fetch all movies.
- `DELETE /movies/:movieId`: Delete a movie.
- `POST /users/:username/movies/:movieId`: Add a movie to favorites.
- `DELETE /users/:username/movies/:movieId`: Remove a movie from favorites.

## Scripts

### Start Development Server: 
 - npm start

### Build for Production
 - npm run build

### Known Issue
 - Ensure the API endpoint is reachable and the token is valid for all requests.
 - If the DELETE request fails, check the server logs for more details.

### License 
  This project is licensed under the MIT License.

### Author
 Developed by Giuseppe Mancini as part of the CareerFoundry Full-Stack Web Development Program.







   
 


