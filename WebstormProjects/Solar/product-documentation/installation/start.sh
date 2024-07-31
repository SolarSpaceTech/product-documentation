envsubst < /srv/www/installation/configs/default.conf > /etc/nginx/conf.d/default.conf '$SERVICE_PORT'

exec /usr/sbin/nginx -g "daemon off;"
