#  Курс React.js Developer в Otus
***
## Группа 2020-20
### Студент:
Roman Vorobyev (Роман Воробьев) romakf99@yandex.ru

 `https://github.com/RomanVr/HW-2020-12-React.git`

### Домашние задания:
0. Настройка проекта Webpack, Babel, Jest, TypeScript
1. Консольный калькулятор
---
    Пользователю с консоли прелагается выбор режима обычной записи или ввода обратной польской нотации
    1) Обработка основных операторов
        - основные арифмитические операторы (-+/*) с правильным порядком выполнения.
        - Пример: 2 + 2 * 2 = 6
        - Строку выводить в консоль
    2) Обработка математических операторов
        - возведение в квадрат **
        - возведение в степень ^
        - факториал !
    3) Обработка скобок
        - пример: (2 + 2) * 2 = 8
    4) Обработка функций
        - тригонометрия - sin(x), cos(x), tan(x)
        - вычисление ряда Фиббоначи fib(number)
    5) Поддержка Reverse Polish notation
2. Установка и настройка React.
---
    1) Конфигурировать ReactJS-проект, конфигурации для JSX/TSX через babel используем preset-react
    2) развернуть storybook
    3) настроить jest
    4) устанавливаем и настраиваем storybook knobs для манипуляции данными
    5) родительский компонент должен принимать данные для отображения
    6) проектируем родительский компонент, который будет выводить лист дочерних компонентов
    7) правильно добавляем обработчик события click, выводящий номер квадратика
    8) покрываем обработчики тестами
    9) настройка loki и снепшот тесты!
3. Задание на определение типов Typescript
---
    1) Уровень 1
        - В функцию приходит массив состояний заказа и фильтруется. Нужно заменить FIXME на тип который вычисляется на освове OrderState.
        - Есть объединение (юнион) типов заказов в различных состояниях. Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state).
        - Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля. Нужно заменить FIXME на соответствующий тип.
    2) Уровень 2
        - Есть объединение (юнион) типов заказов в различных состояниях и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях, а возвращает только initial и inWork. Нужно заменить FIXME на правильный тип вычисленный на основе Order.
        - Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps. Нужно заменить FIXME на правильный тип.
        - В функцию приходит массив состояний заказа и фильтруется. Нужно заменить FIXME на тип который вычисляется на освове OrderState.
4. Задание написать "сложный" компонент с логикой с рядом дочерних презентационных компонентов, использующих методы жизненного цикла.
---
    1) Компонент AppLifeCycle содержит конструктор и дочерние компоненты и стейт по управлению компонента InputSize в котором задается значение отрисовки Field.
    2) Компонент AppLifeCycle описывает componentDidMount на получение картинки со стороннего сервиса при монтировании, но отображает при следующем обновлении себя. Так же получает новую картинку при каждом обновлении componentDidUpdate.
    3) Компонент AppLifeCycle описывает shouldComponentUpdate, который позволяет обновится в случае если изменяется размер Field и возникает ошибка при не правильном вводе размера (должно быть числом).
    4) Компонент InputTime описывает componentDidMount и componentWillUnmout для отображение времени с переодичностью.
    5) Компонент AppLifeCycle описывает componentDidCatch для перехвата ошибки в дочернем компоненте FormDataGame.

[Deploy on AWS Amplify](https://hw04-lifecycle.d7i4bhza825gv.amplifyapp.com)

[Chromatic](https://www.chromatic.com/build?appId=6123eb10d1e6cf003abe7735&number=7) ---
[Invite to Chromatic](https://www.chromatic.com/builds?appId=6123eb10d1e6cf003abe7735&inviteToken=60e9a76550ee4d54aa1871142d24c67d)

5. Задание разработка основы игры Game of Life используя формы и списки
    1. Основные правила:
        - Место действия этой игры — «вселенная» — это размеченная на клетки поверхность или плоскость — безграничная, ограниченная, или замкнутая (в пределе — бесконечная плоскость).
        - Каждая клетка на этой поверхности может находиться в двух состояниях: быть «живой» (заполненной) или быть «мёртвой» (пустой). Клетка имеет восемь соседей, окружающих её.
        - Распределение живых клеток в начале игры называется первым поколением. Каждое следующее поколение рассчитывается на основе предыдущего по таким правилам:
            1) в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
            2) если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить;
            3) в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»);
        - Игра прекращается,
            1) если на поле не останется ни одной «живой» клетки
            2) конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из более ранних шагов (складывается периодическая конфигурация)
            3) при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная конфигурация; предыдущее правило, вырожденное до одного шага назад)
        Эти простые правила приводят к огромному разнообразию форм, которые могут возникнуть в игре. Игрок не принимает прямого участия в игре, а лишь расставляет или генерирует начальную конфигурацию «живых» клеток, которые затем взаимодействуют согласно правилам уже без его участия (он является наблюдателем).
    2. Правила к реализации приложения
        - Поле является замкнутым по границам, клетки имеют соседей с другой стороны относительно края поля.
        - Должен задаваться размер поля и при изменении размера не должно сбрасываться состояние клеток.
        - Перед стартом должна быть возможность заполнить поле живыми клетками случайно
        - Так же перед стартом пользователь может сам отмечать живые клетки
        - Должна выполнтся анимация клеток при изменении их состояния: рождение, жизнь, смерть клетки.
        - Управление скоросьтю генерации клеток
        - Создать форму входа
