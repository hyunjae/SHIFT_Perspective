#!/bin/bash
composer install
npm install
mv .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan serve