# Используем минимальный образ nginx
FROM nginx:stable-alpine

# Удаляем стандартную заглушку nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем сборку React в директорию сервера
COPY build/ /usr/share/nginx/html

# Копируем свой nginx-конфиг (если нужно SPA-роутинг)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт, на котором работает nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
