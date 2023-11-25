# Use the official Node image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local source code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port on which the app will run (adjust as needed)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
