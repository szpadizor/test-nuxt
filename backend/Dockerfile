
FROM php:8.4-fpm

#RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mysqli pdo pdo_mysql

WORKDIR /var/www
COPY composer.json composer.lock ./
RUN apt-get update && apt-get install -y git unzip \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

RUN composer install --no-dev --optimize-autoloader
COPY . .

CMD ["php-fpm"]
