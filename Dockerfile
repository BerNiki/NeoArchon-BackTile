FROM node:20-alpine

WORKDIR /app

# Install global Nest CLI
RUN npm install -g @nestjs/cli

# Copy project files
COPY package*.json ./
RUN npm install

COPY . .

# Bind to all interfaces
EXPOSE 3000
CMD ["npm", "run", "start:dev"]