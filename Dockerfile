# Start from an official Node.js image
FROM node:lts-jod 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package & lock files 
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code, use .dockerignore to exclude files
COPY . .

# Expose the app port
EXPOSE 3000

# Commands to run when the container starts
CMD ["pnpm", "run", "start"]