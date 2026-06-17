1. Як ти структурував frontend і backend?
Система розділена на API backend і frontend як клієнт що працює окремо. 
               
                Бекенд знаходиться у backend розділений на шари:
- бізнеслогіка сервіс Services/InvoiceService.php
- валідація Http/Requests/StoreInvoiceRequest.php
- контролер займається виключно прийняттям запиту диспетчеризацією його на сервіс і повернення відповіді
  (окрім \App\Http\Controllers\InvoiceController::show, який одразу віддає модель отриману шляхом Route Model Binding)
  
- Використаний стиль REST API для взаємодії з бекендом (api.php)

                       Фронтенд складається з сторінок
- список index.vue
- форма створення create.vue
- форма редагування /invoices/[id].vue

 Запити відправляються через мережу Docker за допомогою проксі
 Створено сервіс який відправляє запити frontend/app/composables/requestApi.ts
 Розрахунок gross аmount  винесено в утиліту (frontend/app/composables/grossCalc.ts) для повторного використання

2. Які компроміси ти зробив і чому? 3. Що б ти покращив у production-версії?

- валідація реалізована тільки для реалізовано для \App\Http\Controllers\InvoiceController::store
  для швидкості виконання, оскільки update аналогічна
- продублював шаблони в frontend/app/pages/create.vue та [id].vue також з метою швидкого виконання
- (для реального буде створений один шаблон)
- у продукт версії додав би ngnix

4. Які UX edge cases ти врахував?
- у продукті я би зробив щось типу toast повідомлень з результатами запитів а також якщо валідація не пройшла успішно
- додав би loader при відправці запиту щоб не було дабл кліків і тп.


                                     ЗАПУСК ПРОЄКТУ


git clone https://github.com/szpadizor/test-nuxt.git
cd test-nuxt
docker-compose up -d --build
docker-compose exec laravel php artisan migrate
перейти на http://localhost:3000



