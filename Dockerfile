FROM node:12.16.3

WORKDIR /app

COPY package.json ./
#COPY .env.local ./

ENV PATH /app/node_modules/.bin:$PATH
ENV NEXT_PUBLIC_NO_LOGIN=true

RUN yarn install

COPY . ./

#EXPOSE 3000

CMD ["yarn", "dev"]
