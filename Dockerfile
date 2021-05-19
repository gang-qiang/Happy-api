FROM reg.haimaiche.net/library/node:14.13.1-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN mkdir -p logs && npm install --registry=https://registry.maihaoche.com
CMD ["sh", "start.sh"]
