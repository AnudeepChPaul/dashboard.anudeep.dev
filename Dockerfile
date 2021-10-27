FROM node:12.16.3

WORKDIR /app

COPY package.json ./
#COPY .env.local ./

ENV PATH /app/node_modules/.bin:$PATH
ENV NEXT_PUBLIC_BASE_URL=http://20.193.144.34:5000

RUN yarn install
RUN yarn build

COPY . ./

#EXPOSE 3000

CMD ["yarn", "start"]
