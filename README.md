# Личный кабинет продавца маркетплейса

### SPA состоит из:
- Страницы объявления
- Страницы всех объявлений
- Страницы заказов
- Панели навигации


### Проект разработан со следующим стеком технологий:
- React.js
- TypeScript
- Redux Toolkit
- CSS Module
- React Skeleton
- ESLint

## Перед запуском проекта:
- Установить зависимости ```npm install```
- Запустить сервер ```npm run server```
- Запустить проект ```npm run dev```

## Реализованные функциональные требования:
### На странице всех объявлений:
1. Отображается список всех объявлений продавца
2. Реализована пагинация показа объявлений
3. Реализован выбор количества объявлений для показа на странице (по умолчанию должно быть 10)
4. Реализован поиск по названию объявления
5. Можно перейти на страницу объявления (по клику на карточку)
6. В карточке объявления есть следующая информация о нем:
   - Картинка
   - Название;
   - Стоимость;
   - Количество просмотров;
   - Количество лайков;
7. Есть возможность создавать новые объявления (Модальное окно с input):
   - Картинка (текстовое поле для ввода URL);
   - Название (текстовое поле);
   - Описание (текстовое поле)
   - Стоимость (числовое поле);

### На странице объявления:
1. Есть возможность просмотра объявления
2. В редактировании объявления есть возможность:
   - Менять картинку
   - Менять название
   - Менять цену
   - Менять описание

### На странице заказов:
1. Отображается список заказов с фильтрами по статусу
2. Возможно сделать сортировку по сумме заказа
3. На карточке заказа изображена следующая информация
   - Количество товаров
   - Возможность завершения заказа
   - Стоимость заказа
   - Дата создания заказа
   - Статус (текстом)
   - Номер заказа
   - Кнопка “Показать все товары”, показывающая все товары в данном заказе (модальное окно)
4. При клике на товар в заказе есть возможность перейти в объявление продавца по этому товару

### Панель навигации:
1. Вкладка “Объявления” - реализован переход на страницу объявлений
2. Вкладка “Заказы” - реализован переход на страницу заказов
