FROM node:18-alpine as development
# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat
# Create app folder
WORKDIR /home/node/app

# Set to dev environment
ENV NODE_ENV dev

# Create non-root user for Docker
RUN deluser --remove-home node \
  && addgroup --system --gid 1001 node \
  && adduser --system --uid 1001 node

# Copy source code into app folder
COPY --chown=node:node . .

# Install dependencies
RUN yarn add bcrypt --build-from-source
RUN yarn --pure-lockfile

#
# 🏡 Production Build
#
FROM node:18-alpine as build

WORKDIR /home/node/app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

# Re-create non-root user for Docker
RUN deluser --remove-home node \
  && addgroup --system --gid 1001 node \
  && adduser --system --uid 1001 node

# In order to run `yarn build` we need access to the Nest CLI.
# Nest CLI is a dev dependency.
COPY --chown=node:node --from=development /home/node/app/node_modules ./node_modules
# Copy source code
COPY --chown=node:node . .

# Generate the production build. The build script runs "nest build" to compile the application.
RUN yarn build

# Install only the production dependencies and clean cache to optimize image size.
RUN yarn --pure-lockfile --production && yarn cache clean

# Set Docker as a non-root user
USER node

#
# 🚀 Production Server
#
FROM node:18-alpine as prod

# WORKDIR /home/node/app
# RUN apk add --no-cache libc6-compat

# # Set to production environment
# ENV NODE_ENV production

COPY --chown=node:node --from=build /home/node/app/dist ./dist
COPY --chown=node:node --from=build /home/node/app/node_modules ./node_modules

# Set Docker as a non-root user
USER node

CMD ["node", "dist/src/main"]
