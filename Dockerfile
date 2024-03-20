FROM node:18-alpine3.14 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN rm -rf node_modules

RUN npm cache clean --force \
    && npm install  \
    && chown -R node:node /home/node \
    && npm run build \

# ---

FROM node:18-alpine3.14

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/tsconfig.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/


CMD npm run migrate && node dist/src/main.js