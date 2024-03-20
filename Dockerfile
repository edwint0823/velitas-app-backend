FROM node:18-alpine3.14 as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm ci  \
    && npm install --save-dev tsconfig-paths\
    && chown -R node:node /home/node \
    && npm run build \
    && npm prune --production

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