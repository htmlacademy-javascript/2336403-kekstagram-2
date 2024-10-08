import { idGen, rndmIntgrGen } from './utils.js';

const MSGS_SET = ['', 'Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES_SET = ['Марианна', 'Степан', 'Руслан', 'Мирослава', 'Софья', 'Кирилл', 'Михаил', 'Мария', 'Камилла', 'Варвара'];

const DSCRP_SET = ['1. **Туманный рассвет**: Уютное озеро, окружённое густым туманом, и первые лучи солнца, пробивающиеся сквозь деревья.','2. **Городская симфония**: Вечерний город с огнями, отражающимися в лужах после дождя, создаёт волшебное настроение.', '3. **Лесная сказка**: Замечательное дерево с причудливыми ветвями, на которых сидят яркие птицы.', '4. **Наедине с природой**: Молодая женщина стоит на вершине холма, любуясь бескрайними полями цветов под голубым небом.', '5. **Зимняя идиллия**: Снежные вершины гор, на которых пылает закат, наполняя небо яркими оттенками оранжевого и пурпурного.', '6. **Свет в окне**: Теплый свет, льющийся из старинного окна, создаёт атмосферу домашнего уюта и покоя.', '7. **Улочка старого города**: Узкие мощёные улочки, обрамленные старинными домами, покрытыми зелёными лозами.', '8. **Пляжный вечер**: Пара, гуляющая по побережью, где солнце медленно заходит за горизонт, оставляя за собой золотистые блики на воде.', '9. **Танец дождя**: Малыш, прыгающий в лужах во дворе, окружённый каплями дождя, искрящимися в свете.', '10. **Гармония с природой**: Мужчина медитирует на камне у водопада, среди зелени и звуков природы.', '11. **Заброшенный дом**: Мистическое старое здание, покрытое лианами, с разбитыми окнами, излучает атмосферу загадки.', '12. **Арктическая красота**: Пейзаж с айсбергами и полярной яркостью, отражающимися в спокойных водах.', '13. **Светлый миг**: Семья, собирающаяся вокруг костра, с улыбками и смехом, патриотично уставленная звёздами.', '14. **Морская буря**: Громадные волны разбиваются о скалы, а в небе гремят молнии, создавая мощный и драматичный пейзаж.', '15. **Весенний простынь**: Цветущие сакуры, обвивающие мостик в парке, наполняют всё вокруг романтикой.', '16. **Печальный взгляд**: Портрет женщины с грустными глазами, отражающими её глубокие переживания и мечты.', '17. **Летний вечер**: Друзья, играющие в бадминтон на зеленом травяном поле, окружённые летними цветами.', '18. **Зеркало реки**: Спокойная река, отражающая облака и зелёные деревья, создавая впечатление безмятежности.', '19. **Кофейная пауза**: Теплый кофе на столе в небольшом кафе, за окном проходят прохожие.', '20. **Светящиеся огоньки**: Ночной лес, где искрящиеся светлячки создают волшебное ощущение сказки.', '21. **Искусство улиц**: Яркие граффити на стенах заброшенного здания, придающие энергию окружающей атмосфере.' , '22. **Старый велосипед**: Заброшенный велосипед, стоящий рядом с цветущим забором, олицетворяющий простоту и уют.', '23. **Утренние роса**: Листья покрыты каплями росы, светящимися на утреннем солнце, создавая чувство свежести.', '24. **Старый альбом**: Руки, просматривающие старые фотографии, каждая из которых хранит особые воспоминания.','25. **По дороге к свете**: Женщина идет по узкой тропинке, освещенной мягким светом, окружённой высокими деревьями.'];


const MIN_LIKES = 15; //Минимальное количество лайков
const MAX_LIKES = 200; //Максимальное количество лайков

const MIN_COMMENTS_NUM = 1; //Минимальное количество комментариев
const MAX_COMMENTS_NUM = 29; //Максимальное количество комментариев

const NAMES_QUANTITY = NAMES_SET.length; //Количество имен

const MIN_AVA_NUMBER = 1; //Ноачальный номер аватарки
const MAX_AVA_NUMBER = 6; //конечный номер аватарки

const MIN_MSG_NUMBER = 1; //Начальный номер сообщения в массиве
const MAX_MSG_NUMBER = 6; //Конечный номер сообщения в массиве

const PHOTO_DSCR_QUANTITY = DSCRP_SET.length - 1; //Количество готовых подписей к фотографиям

const PHOTO_QUANTITY = 25; //Количество фотографий с описанием

export {MIN_LIKES, MAX_LIKES, MIN_COMMENTS_NUM, MAX_COMMENTS_NUM, NAMES_QUANTITY, MIN_AVA_NUMBER, MAX_AVA_NUMBER, MIN_MSG_NUMBER, MAX_MSG_NUMBER, PHOTO_DSCR_QUANTITY, PHOTO_QUANTITY};

function createComment() {
  const avatarGen = () => `img/avatar-${rndmIntgrGen(MIN_AVA_NUMBER, MAX_AVA_NUMBER)}.svg`;
  return {
    id: idGen(),
    avatar: avatarGen(),
    message: `${MSGS_SET[rndmIntgrGen(MIN_MSG_NUMBER, MAX_MSG_NUMBER)]} ${MSGS_SET[rndmIntgrGen(0,1) * rndmIntgrGen(MIN_MSG_NUMBER, MAX_MSG_NUMBER)]}`,
    name: NAMES_SET[rndmIntgrGen(0, NAMES_QUANTITY - 1)]
  };
}

//функция создания объекта "описание фотографии"
function createPhotoDscrp(num) {
  const commentsSet = [];
  if (rndmIntgrGen(0,10) > 0) {
    for (let i = 0; i <= rndmIntgrGen(MIN_COMMENTS_NUM, MAX_COMMENTS_NUM); i++) {
      commentsSet.push(createComment());
    }
  }
  return {
    id: num,
    url: `photos/${num}.jpg`,
    dscrp: DSCRP_SET[rndmIntgrGen(0, PHOTO_DSCR_QUANTITY)],
    likes: rndmIntgrGen(MIN_LIKES, MAX_LIKES),
    comments: commentsSet
  };
}

//функция создания массива фотографий с описанием
function createArrayPhotoItems(photoQuantity) {
  const photoDscrp = [];
  for (let i = 1; i <= photoQuantity; i++) {
    photoDscrp.push(createPhotoDscrp(i));
  }
  return photoDscrp;
}

export { createArrayPhotoItems };
