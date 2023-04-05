FROM node:18.14.0-alpine3.16

ARG WORK_DIR=/var/www/app

WORKDIR $WORK_DIR

COPY ./package.json ./pnpm-lock.yaml $WORK_DIR/

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY ./src/ $WORK_DIR/src/
COPY ./tsconfig.build.json ./tsconfig.json ./data-source.ts $WORK_DIR/

RUN pnpm run build

# ENTRYPOINT pnpm migration:run && pnpm seed && pnpm run start:dev

# run pnpm seed manually in app container
ENTRYPOINT pnpm migration:run && pnpm run start:dev 

EXPOSE 3000