FROM node:20.12.0-alpine3.19

WORKDIR /src

COPY package.json package-lock.json .npmrc ./

RUN npm ci

COPY . .

RUN npm run build

# Make image part
FROM nginx:1.25.4-alpine3.18-slim as modules

ARG NGINX_SOURCES=nginx-${NGINX_VERSION}

RUN set -ex \
    && apk update \
    && apk add g++ git make pcre2-dev \
    && mkdir /tmp/modules \
    && cd /tmp/modules \
    && wget https://nginx.org/download/${NGINX_SOURCES}.tar.gz \
    && tar -xzvf ${NGINX_SOURCES}.tar.gz \
    && git clone https://github.com/openresty/headers-more-nginx-module \
    && cd ${NGINX_SOURCES}/ \
    && ./configure --with-compat --add-dynamic-module=../headers-more-nginx-module --builddir=/tmp/modules \
    && make modules

FROM nginx:1.25.4-alpine3.18-slim

RUN apk --no-cache --verbose upgrade

COPY --from=modules /tmp/modules/ngx_http_headers_more_filter_module.so /etc/nginx/modules/

RUN echo "load_module modules/ngx_http_headers_more_filter_module.so;" > /tmp/nginx.conf \
	&& cat /etc/nginx/nginx.conf >> /tmp/nginx.conf \
    && mv /tmp/nginx.conf /etc/nginx/nginx.conf

ONBUILD RUN apk --no-cache --verbose upgrade

ARG SERVICE_PORT=8080
ENV SERVICE_PORT=${SERVICE_PORT}

RUN apk add --no-cache bash \
 && apk add gettext --no-cache \
 && mkdir -p /srv/www/versions

COPY --from=0 /src/dist/product-documentation/browser/ /srv/www/
COPY ./installation/ /srv/www/installation

WORKDIR /srv/www/installation

RUN chmod +x ./start.sh

CMD ./start.sh
