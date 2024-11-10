# Dockerfile for the React Frontend

# Use Node.js for the build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files and build the project
COPY . .
RUN npm run build

# Use a lightweight web server to serve the build files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the frontend port
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]