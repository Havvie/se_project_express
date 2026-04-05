```md
# WTWR (What to Wear?): Back End
This project is the backend for the WTWR (What to Wear?) application. It provides a RESTful API that allows users to register, log in, and manage clothing items based on weather conditions.

This server is built with Node.js and Express, uses MongoDB for data storage, and includes authentication, validation, logging, and centralized error handling.

## Features
- User registration and authentication (JWT)
- Protected routes for authorized users
- CRUD operations for clothing items
- Like and unlike functionality
- Request validation using Celebrate/Joi
- Centralized error handling
- Request and error logging with Winston
- Deployed on a remote server with PM2 and Nginx
- Secured with SSL (HTTPS)

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Celebrate / Joi (validation)
- Winston (logging)
- PM2 (process manager)
- Nginx (reverse proxy)
- Google Cloud (deployment)


### Running the Project Locally
```bash
npm install
npm run dev
```
`npm run start` — to launch the server 

`npm run dev` — to launch the server with the hot reload feature

## Project Links

**Frontend (Live App):** 
https://wtwr.abrasantia.com.ar

**Backend API:** 
https://api.wtwr.abrasantia.com.ar

**Frontend Repository:** 
https://github.com/Havvie/se_project_react

**Backend Repository:** 
https://github.com/Havvie/se_project_express

## Project Pitch Video
https://www.loom.com/share/bf50ba99d3a641af85e1559761027199

### Testing
Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 15

