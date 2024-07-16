# Use the official Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy wait-for-it.sh to the working directory
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Command to run the application
CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "start"]

