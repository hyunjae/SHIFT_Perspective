# SHIFT - Perspective Tool
- Gabriel Lee

### Prerequisites
Have composer, PHP installed

### Tech Stack/Libraries I used:
* Front-End:
    * React
    * react-async (https://www.npmjs.com/package/react-async)
    * rebass (https://rebassjs.org/)
    * axios
    * lodash
* Back-End:
    * Laravel
    * SQLite

### Files that I worked on:
* For Front-End:
    * Files under resources/js are pretty much what I worked with
* Back-End:
    * app/Result.php is the model
    * database/ contains the table/migrations
    * routes/api.php contains the api routes
    * app/Http/Controllers/QuestionController.php contains the controller
    * app/Helper/MBTI.php contains any helper functions (like calculateMBTI)
### Instructions
Either: 
- `./setup.sh` 
or
- `composer install`
- `npm install`
- `mv .env.example .env`
- `php artisan key:generate`
- `touch database/database.sqlite`
- `php artisan migrate`
- `php artisan serve` (is what starts the app at http://localhost:8000/)