FROM php:8.4-fpm

RUN docker-php-ext-install mysqli pdo pdo_mysql

WORKDIR /var/www

# Just use one composer install method (this one is enough, drop the curl one below)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y git unzip

# Copy everything first, including artisan
COPY . .

RUN composer install --no-dev --optimize-autoloader

CMD ["php-fpm"]
