# Instructions for how to start the server

FROM node:24

# Goes to the app directory 
WORKDIR /app

# Copies package.json and package-lock.json
COPY package*.json ./

# Install the dependencies 
RUN npm install 

# Copy the rest of the app into the container
COPY . .

# Set port environment variable 
ENV PORT=9000
# Expose the port so you can access from your local system
EXPOSE 9000

# Run the App
CMD ["npm", "start"]