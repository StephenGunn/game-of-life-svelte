# Use Node 18 Alpine for smaller image size
FROM node:18-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies for building native modules and curl for health checks
RUN apk add --no-cache python3 make g++ curl

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY ./package.json ./pnpm-lock.yaml ./

# Install all dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY . .

# Build the application
RUN pnpm run build

# Expose port (default SvelteKit port)
EXPOSE 3000

# Set environment variables for runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Start the application using node adapter
CMD ["node", "build"]