'use client'

import { useState } from 'react'

// Типы данных
type Step = 'welcome' | 'greeting' | 'moodColor' | 'aura' | 'card' | 'crystalBall' | 
  'totemAnimal' | 'flower' | 'chineseZodiac' | 'destinyNumber' | 'star' | 
  'destinyGift' | 'compliment' | 'congratulation' | 'results'

interface Results {
  name: string
  moodColor: { name: string; meaning: string; emoji: string } | null
  aura: { name: string; meaning: string; emoji: string } | null
  card: { name: string; meaning: string; emoji: string } | null
  crystalBall: string | null
  totemAnimal: { name: string; meaning: string; emoji: string } | null
  flower: { name: string; meaning: string; emoji: string } | null
  chineseZodiac: { animal: string; prediction: string; emoji: string } | null
  destinyNumber: { number: number; meaning: string } | null
  star: { name: string; meaning: string; emoji: string } | null
  destinyGift: { name: string; meaning: string; emoji: string } | null
  compliment: string | null
}

// Данные для гаданий с красивыми эпитетами
const moodColors = [
  { name: 'Красный', emoji: '🔴', meaning: 'Пламенная энергия и необузданная страсть живут в твоём сердце! Сегодня ты способна свернуть горы и покорить любые вершины. Твоя решительность — как алый рассвет, возвещающий о триумфе!' },
  { name: 'Оранжевый', emoji: '🟠', meaning: 'Творческое вдохновение кружит тебя в танце идей! Муза шепчет тебе самые смелые мечты, а воображение рисует картины прекрасного будущего. Ты — источник тепла и света для всех вокруг!' },
  { name: 'Жёлтый', emoji: '🟡', meaning: 'Солнечная радость переполняет твою душу! Ты лучишься светом, как первое весеннее солнышко, согревая сердца всех, кто рядом. Твоя улыбка — драгоценный подарок миру!' },
  { name: 'Зелёный', emoji: '🟢', meaning: 'Гармония и нежный расцвет ждут тебя! Как молодая листва, ты тянешься к свету и росту. Идеальное время для прекрасных начинаний и душевного равновесия!' },
  { name: 'Голубой', emoji: '🔵', meaning: 'Безмятежное спокойствие окутывает тебя, как нежное облако! Твоя мудрость и уверенность — тихая гавань для близких. Решения приходят легко, как лёгкий бриз!' },
  { name: 'Синий', emoji: '🔷', meaning: 'Глубокая мудрость и незыблемая надёжность — твои верные спутники! Ты — драгоценный сапфир в короне судьбы, опора для тех, кто дорожит тобой!' },
  { name: 'Фиолетовый', emoji: '🟣', meaning: 'Мистическая интуиция и волшебство переполняют этот день! Твои чувства — тонкая вуаль, сквозь которую ты видишь тайны Вселенной. Доверься своему сердцу — оно знает путь!' },
  { name: 'Розовый', emoji: '🩷', meaning: 'Нежность и любовь окутывают тебя розовым облаком! Твоё сердце открыто для прекрасного, а забота согревает всех вокруг. Ты — воплощение женственности и чуда!' },
]

const auras = [
  { name: 'Огненная аура', emoji: '🔥', meaning: 'Ты сияешь ослепительным пламенем страсти! Люди неизбежно тянутся к твоему магнетическому свету, как мотыльки к костру мечты!' },
  { name: 'Водная аура', emoji: '💧', meaning: 'Таинственная глубина и вековая мудрость сокрыты в тебе! Ты видишь то, что скрыто от чужих глаз, как речная русалка хранишь секреты судьбы!' },
  { name: 'Воздушная аура', emoji: '💨', meaning: 'Лёгкая и свободная, ты паришь над суетой! Ветер перемен несёт тебя к прекрасным горизонтам — легкость и грация твои союзники!' },
  { name: 'Земная аура', emoji: '🌍', meaning: 'Ты — цветущий сад на твёрдой земле! Стабильность и цветущая сила сочетаются в тебе. Ты — надёжный фундамент для всех, кто тебя любит!' },
  { name: 'Космическая аура', emoji: '🌌', meaning: 'Ты связана незримой нитью со звёздами! Галактика шепчет тебе свои секреты, а мечты, рождённые в твоём сердце, обречены на исполнение!' },
  { name: 'Солнечная аура', emoji: '☀️', meaning: 'Ты — живое солнышко, озаряющее путь другим! Твой золотой оптимизм заразителен, а温暖 греет даже в самые пасмурные дни!' },
  { name: 'Лунная аура', emoji: '🌙', meaning: 'Таинственность и интуиция окутывают тебя лунным сиянием! Твои сны — это послания судьбы, а загадочность притягивает как магнит!' },
  { name: 'Радужная аура', emoji: '🌈', meaning: 'Многоцветие талантов расцветает в тебе! Ты — живая радуга, счастливый талисман и украшение любого коллектива!' },
]

const cards = [
  { name: 'Звезда', emoji: '⭐', meaning: 'Сегодня ты — путеводная звезда для всех коллег! Твои идеи сияют ярче небесных светил, озаряя путь к успеху. Ты — настоящая находка для любого дела!' },
  { name: 'Роза', emoji: '🌹', meaning: 'Неповторимая красота и изящная грация! Даже в тернистые моменты ты расцветаешь, как королева цветов. Твои шипы — защита, а лепестки — нежность!' },
  { name: 'Бабочка', emoji: '🦋', meaning: 'Прекрасные перемены уже на пороге! Как бабочка выходит из кокона, ты готова к чудесному преображению. Новые возможности ждут твоего танца!' },
  { name: 'Ключ', emoji: '🗝️', meaning: 'Древний ключ от дверей судьбы в твоих руках! Ответ придёт самым неожиданным и волшебным образом. Тайны раскрываются для тебя!' },
  { name: 'Корона', emoji: '👑', meaning: 'Ты — истинная королева своего дела! Власть, уважение и всеобщее признание — твоё законное право. Носи корону с гордостью!' },
  { name: 'Радуга', emoji: '🌈', meaning: 'После каждого дождя сияет радуга! Сложности растаяли, а впереди — семицветное счастье и удача на каждом шагу!' },
  { name: 'Птица', emoji: '🕊️', meaning: 'Свобода и лёгкость расправляют крылья за твоей спиной! Время парить над суетой и устремляться к мечтам. Ты — вестница мира и надежды!' },
  { name: 'Бриллиант', emoji: '💎', meaning: 'Твои таланты сияют ярче самых драгоценных камней! Ты — бриллиант чистой воды, редкий и бесценный. Позволь миру любоваться твоим блеском!' },
  { name: 'Сердце', emoji: '💜', meaning: 'Любовь нежно обнимает тебя своими крыльями! Открой сердце новым чудесам — они уже стучатся в твою дверь. Ты любима и ценима!' },
  { name: 'Подкова', emoji: '🧿', meaning: 'Удача преследует тебя по пятам! Рискуй смело и уверенно — фортуна улыбается именно тебе. Счастье уже в пути!' },
]

const crystalBallPredictions = [
  'Да, и это будет восхитительно прекрасно! Звёзды танцуют в твою честь — тебя ждёт ослепительный успех и признание!',
  'Космос с благоговением одобряет твои планы! Действуй без капли сомнения — Вселенная на твоей стороне!',
  'Потерпи ещё немного — всё скоро прояснится самым волшебным образом! Судьба готовит тебе сказочный подарок!',
  'Вселенная видит каждое твоё усилие — драгоценная награда уже близко! Твоё время сиять наступает!',
  'Доверься своей безупречной интуиции — она никогда не подводила тебя! Сердце знает верный путь!',
  'Весна подарит тебе именно то, о чём твоё сердце мечтает! Желания сбываются, когда веришь в чудо!',
  'Карты судьбы легли благоприятно — смело и уверенно шагай к своим мечтам! Удача — твоя спутница!',
  'Хрустальный шар сияет ослепительно ярко — это значит только самое прекрасное! Чудеса уже в пути!',
  'Планеты выстроились в твою пользу — сегодня твой звёздный день! Все дороги ведут к счастью!',
  'Судьба готовит тебе приятнейший сюрприз — будь внимательна к знакам! Чудо ближе, чем кажется!',
]

const totemAnimals = [
  { name: 'Бабочка', emoji: '🦋', meaning: 'Ты — божественный мастер трансформации! Как бабочка из куколки, ты преображаешься и расцветаешь, вдохновляя других своей красотой. Твоя судьба — быть прекрасной!' },
  { name: 'Орлица', emoji: '🦅', meaning: 'Орлиный взор позволяет тебе видеть возможности там, где другие не замечают! Твои крылья готовы к полёту — лети высоко к солнцу мечты!' },
  { name: 'Кошка', emoji: '🐱', meaning: 'Изящество, грация и мистическая интуиция — твои главные союзники! Ты всегда приземляешься на мягкие лапки, даже в самых сложных ситуациях!' },
  { name: 'Лиса', emoji: '🦊', meaning: 'Хитроумная мудрость и проницательный ум — твой путь к триумфу! Ты находишь выход из любого лабиринта судьбы!' },
  { name: 'Сова', emoji: '🦉', meaning: 'Древняя мудрость и ночной образ жизни — ты знаешь секреты, скрытые от других! Твои глаза видят сквозь тьму к свету истины!' },
  { name: 'Дельфин', emoji: '🐬', meaning: 'Игривая радость и глубокий интеллект сочетаются в тебе! Ты приносишь море счастья в любой коллектив!' },
  { name: 'Единорог', emoji: '🦄', meaning: 'Редкое волшебство и магия — ты единственная такая! Твоя уникальность — это твой драгоценный дар миру!' },
  { name: 'Попугай', emoji: '🦜', meaning: 'Яркая личность и мелодичный голос! Ты — душа любого собрания, приносящая радость и смех всем вокруг!' },
  { name: 'Пчела', emoji: '🐝', meaning: 'Неустанное трудолюбие и преданный командный дух! Ты — настоящая королева продуктивности, создающая сладкий мёд успеха!' },
  { name: 'Лебедь', emoji: '🦢', meaning: 'Королевская грация и верность — ты прекрасна и внутри, и снаружи! Твоя красота — отражение чистой души!' },
]

const flowers = [
  { name: 'Роза', emoji: '🌹', meaning: 'Непревзойдённая королева сада! Красота с благородным характером. Твои шипы — защита драгоценной души, а аромат — подарок миру!' },
  { name: 'Тюльпан', emoji: '🌷', meaning: 'Нежность и весна в одном хрупком бутоне! Ты — начало чего-то прекрасного, первый лучик надежды после зимы!' },
  { name: 'Подсолнух', emoji: '🌻', meaning: 'Вечно устремлённая к солнцу! Твой золотой оптимизм заряжает всех вокруг живительной энергией. Ты — маленькое солнышко на земле!' },
  { name: 'Сакура', emoji: '🌸', meaning: 'Нежнейшая, но невероятно стойкая! Красота в каждом твоём мгновении, как лепестки на весеннем ветру!' },
  { name: 'Лотос', emoji: '🪷', meaning: 'Священный цветок, растущий через глубины к свету! Ты преодолеваешь трудности и расцветаешь божественной красотой!' },
  { name: 'Ромашка', emoji: '🌼', meaning: 'Простота и искреннее обаяние! Твоя душевная чистота покоряет сердца. Ты — лучик солнца в поле!' },
  { name: 'Гибискус', emoji: '🌺', meaning: 'Экзотическая страсть и тропический огонь! Ты — яркое, незабываемое пятно в серых буднях!' },
  { name: 'Пион', emoji: '💐', meaning: 'Пышная роскошь и королевское величие! Ты любишь жизнь во всех её проявлениях и даришь всем своё изобилие!' },
  { name: 'Лаванда', emoji: '💜', meaning: 'Умиротворяющее спокойствие и гармония! Твой нежный аромат умиротворяет души окружающих. Ты — воплощение элегантности!' },
  { name: 'Орхидея', emoji: '🪻', meaning: 'Изысканность и утончённое совершенство! Ты — живое произведение искусства, редкий цветок в саду судьбы!' },
]

const chineseZodiacs = [
  { animal: 'Крыса', emoji: '🐀', prediction: 'Мудрая стратегия — твой дар! Твои планы воплотятся самым блистательным образом — готовься к заслуженной победе!' },
  { animal: 'Бык', emoji: '🐂', prediction: 'Надёжная сила и несокрушимая стойкость! Стабильный рост и процветание. Ты — драгоценная опора всей команды!' },
  { animal: 'Тигр', emoji: '🐅', prediction: 'Смелая амазонка и прирождённая лидер! Риски оправдаются с лихвой — действуй решительно и побеждай!' },
  { animal: 'Кролик', emoji: '🐇', prediction: 'Изящная дипломатка с ангельским терпением! Гармония и уют — твой звёздный час настал!' },
  { animal: 'Дракон', emoji: '🐉', prediction: 'Харизматичная звезда небес! Ты в центре всеобщего внимания — наслаждайся своим сиянием!' },
  { animal: 'Змея', emoji: '🐍', prediction: 'Интуитивная мудрица и хранительница тайн! Сокровенные секреты раскроются — ты ведаешь истину!' },
  { animal: 'Лошадь', emoji: '🐎', prediction: 'Свободная искательница приключений! Новые захватывающие горизонты ждут твоего стремительного галопа!' },
  { animal: 'Коза', emoji: '🐐', prediction: 'Творческая душа с золотым сердцем! Искусство и красота наполнят этот год божественным вдохновением!' },
  { animal: 'Обезьяна', emoji: '🐵', prediction: 'Игривая умница с искрящимся умом! Креатив решит любые задачи — шути, твори и побеждай!' },
  { animal: 'Петух', emoji: '🐓', prediction: 'Яркая личность с королевским блеском! Твоё время блистать уже наступило — мир у твоих ног!' },
  { animal: 'Собака', emoji: '🐕', prediction: 'Преданная подруга с золотым сердцем! Коллеги дорожат тобой больше, чем ты думаешь!' },
  { animal: 'Свинья', emoji: '🐖', prediction: 'Счастливица по праву рождения! Удача идёт за руку с тобой везде, принося дары судьбы!' },
]

const destinyNumberMeanings: Record<number, string> = {
  1: 'Лидерство и смелые начинания! Ты — пионер, за которым другие следуют с восторгом. Твой путь — прокладывать новые дороги!',
  2: 'Гармония и божественное партнёрство! Ты создаёшь идеальный баланс в любой ситуации. Твой дар — объединять сердца!',
  3: 'Творчество и самовыражение! Твои идеи вдохновляют и окрыляют окружающих. Ты — муза для многих!',
  4: 'Стабильность и незыблемая надёжность! На тебя можно положиться как на скалу. Ты — фундамент успеха!',
  5: 'Свобода и захватывающие перемены! Приключения ждут тебя за каждым углом. Твоя жизнь — увлекательное путешествие!',
  6: 'Любовь и бескорыстная забота! Ты — сердце и душа любого коллектива. Твой свет согревает всех!',
  7: 'Мудрость и глубокий анализ! Ты видишь суть вещей, скрытую от поверхностных взглядов. Твой разум — дар небес!',
  8: 'Успех и цветущее изобилие! Материальные блага сами притягиваются к тебе. Ты — магнит для процветания!',
  9: 'Гуманизм и возвышенное вдохновение! Ты делаешь мир прекраснее каждым днём. Ты — посланник света!',
  11: 'Мистическая интуиция и божественное вдохновение! Ты — проводник высших идей и космической мудрости!',
  22: 'Мастер-строитель судеб! Твои проекты меняют мир к лучшему. Ты — архитектор собственного величия!',
}

const stars = [
  { name: 'Полярная звезда', emoji: '⭐', meaning: 'Ты — путеводная звезда для всех коллег! Твой свет ведёт заблудших к цели, указывая верный путь даже в самую тёмную ночь!' },
  { name: 'Сириус', emoji: '🌟', meaning: 'Самая яркая звезда ночного неба! Ты сияешь ослепительно даже в самые тёмные времена, даря надежду всем вокруг!' },
  { name: 'Венера', emoji: '💫', meaning: 'Планета любви, красоты и очарования! Ты притягиваешь к себе сердца людей, как магнит притягивает железо!' },
  { name: 'Орион', emoji: '✨', meaning: 'Могущественное созвездие силы и света! Твоя энергия неиссякаема, как вечные звёзды на небосводе!' },
  { name: 'Комета', emoji: '☄️', meaning: 'Яркое событие стремительно приближается! Готовься к чудесным и неожиданным переменам к лучшему!' },
  { name: 'Северное сияние', emoji: '🌌', meaning: 'Магия и чудо природы! Ты — невероятное, завораживающее явление в коллективе, редкий дар судьбы!' },
  { name: 'Луна', emoji: '🌙', meaning: 'Интуиция и загадочная тайна! Твои сны — вещие послания, а сердце хранит секреты Вселенной!' },
  { name: 'Солнце', emoji: '☀️', meaning: 'Источник жизни, тепла и света! Ты — центр своего мира, вокруг которого вращается счастье!' },
]

const destinyGifts = [
  { name: 'Волшебная палочка', emoji: '🪄', meaning: 'Любое заветное желание сбудется! Нужно только уверенно взмахнуть палочкой судьбы и поверить в чудо!' },
  { name: 'Корона успеха', emoji: '👑', meaning: 'Всеобщее признание и заслуженная слава! Ты достоин самой роскошной королевской короны. Носи её гордо!' },
  { name: 'Золотой ключик', emoji: '🔑', meaning: 'Все двери судьбы откроются перед тобой! Новые захватывающие возможности уже ждут за порогом!' },
  { name: 'Цветок желания', emoji: '🌸', meaning: 'Загадай самое заветное желание — оно обязательно сбудется этой волшебной весной!' },
  { name: 'Крылья мечты', emoji: '🦋', meaning: 'Время возвыситься и взлететь! Твои мечты готовы обрести крылья и стать ослепительной реальностью!' },
  { name: 'Сердце любви', emoji: '💜', meaning: 'Любовь окружает тебя со всех сторон, как тёплое одеяло! Почувствуй её объятия и поделись с другими!' },
  { name: 'Звёздная пыль', emoji: '✨', meaning: 'Космическая магия в твоих руках! Твори маленькие чудеса каждый день и освещай путь другим!' },
  { name: 'Чаша изобилия', emoji: '🏆', meaning: 'Триумфальный успех и цветущее процветание! Всё, к чему прилагаешь душу, обречено расцвести!' },
  { name: 'Карта сокровищ', emoji: '🗺️', meaning: 'Увлекательные приключения уже близко! Новые горизонты ждут твоего исследования и покорения!' },
  { name: 'Лампа Алладина', emoji: '🪔', meaning: 'Три заветных желания уже исполняются! Верь в магию жизни и наблюдай за чудесами!' },
]

const compliments = [
  'Ты — настоящее божественное чудо! Твоё неземное присутствие делает офис ярче, а работу — приятнее. Продолжай сиять, звёздочка! ✨',
  'Твоя энергия невероятно заразительна! Когда ты озаряешь мир улыбкой, все вокруг тоже начинают улыбаться. Не переставай светить! 😊',
  'Ты — тот самый человек, который превращает проблемы в захватывающие возможности. Твоя сила восхищает и вдохновляет! 💪',
  'Твой талант — не просто навык, это настоящее высокое искусство. Весь коллектив счастлив работать с такой выдающейся личностью! 🎨',
  'Ты — драгоценное сердце нашей команды. Без тебя всё было бы совсем по-другому. Спасибо, что ты есть, чудо-человек! 💜',
  'Твоя доброта и забота согревают даже в самый холодный понедельник. Ты — живой лучик солнца в нашем коллективе! ☀️',
  'Ты умеешь находить неповторимую красоту в простых вещах. Это редчайший дар — цени его и дари миру! 🌸',
  'Твоя уверенность вдохновляет и окрыляет. Ты показываешь нам всем, как нужно смело идти к своим целям! 🎯',
  'Ты — образец того, как можно быть настоящим профессионалом и оставаться собой. Мы восхищаемся тобой безмерно! 🌟',
  'Твой мелодичный смех — лучшее лекарство от любого стресса. Спасибо, что делишься этим сокровищем с нами! 😄',
  'Ты — мощный магнит для гениальных идей. Твоя безграничная креативность не знает пределов! 💡',
  'Твоя мудрость не по годам удивляет и восхищает. Ты видишь то, что другие пропускают мимо взгляда! 🦉',
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [results, setResults] = useState<Results>({
    name: '',
    moodColor: null,
    aura: null,
    card: null,
    crystalBall: null,
    totemAnimal: null,
    flower: null,
    chineseZodiac: null,
    destinyNumber: null,
    star: null,
    destinyGift: null,
    compliment: null,
  })
  const [selectedYear, setSelectedYear] = useState(1990)
  const [numberInput, setNumberInput] = useState('')

  const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

  const calculateDestinyNumber = (num: number): number => {
    let sum = 0
    while (num > 0) {
      sum += num % 10
      num = Math.floor(num / 10)
    }
    if (sum > 22) return calculateDestinyNumber(sum)
    return sum === 0 ? 1 : sum
  }

  const handleNext = (step: Step) => {
    setCurrentStep(step)
  }

  // Страница приветствия
  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="text-8xl mb-6 animate-bounce">🌸</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Гадание на 8 Марта
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Узнай, что приготовила для тебя волшебная весна! ✨
            <br />12 мистических предсказаний ждут тебя
          </p>
          <button
            onClick={() => handleNext('greeting')}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Начать гадание 🔮
          </button>
        </div>
      </div>
    )
  }

  // Страница ввода имени
  if (currentStep === 'greeting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-6">💜</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Как тебя зовут, прекрасная?</h2>
          <input
            type="text"
            value={results.name}
            onChange={(e) => setResults({ ...results, name: e.target.value })}
            placeholder="Введи своё имя..."
            className="w-full px-6 py-4 rounded-full text-center text-xl border-2 border-pink-300 focus:border-purple-500 focus:outline-none shadow-lg mb-6"
          />
          <button
            onClick={() => results.name.trim() && handleNext('moodColor')}
            disabled={!results.name.trim()}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Продолжить →
          </button>
        </div>
      </div>
    )
  }

  // Этап 1: Цвет настроения
  if (currentStep === 'moodColor') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Цвет твоего настроения</h2>
          <p className="text-gray-600 mb-6">Выбери цвет, который отражает твою душу сегодня</p>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {moodColors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setResults({ ...results, moodColor: color })
                  handleNext('aura')
                }}
                className="p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <span className="text-4xl mb-2">{color.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 2: Аура дня
  if (currentStep === 'aura') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твоя аура дня</h2>
          <p className="text-gray-600 mb-6">Какая мистическая аура окружает тебя сегодня?</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {auras.map((aura) => (
              <button
                key={aura.name}
                onClick={() => {
                  setResults({ ...results, aura: aura })
                  handleNext('card')
                }}
                className="p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-4"
              >
                <span className="text-4xl">{aura.emoji}</span>
                <span className="text-left font-medium text-gray-700">{aura.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 3: Карта дня
  if (currentStep === 'card') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🃏</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твоя карта дня</h2>
          <p className="text-gray-600 mb-6">Выбери карту, которая манит тебя своей тайной</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {cards.map((card) => (
              <button
                key={card.name}
                onClick={() => {
                  setResults({ ...results, card: card })
                  handleNext('crystalBall')
                }}
                className="p-3 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center aspect-square justify-center"
              >
                <span className="text-3xl">{card.emoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 4: Хрустальный шар
  if (currentStep === 'crystalBall') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="text-8xl mb-6 animate-pulse">🔮</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Хрустальный шар</h2>
          <p className="text-gray-600 mb-6">Загадай мысленно заветный вопрос и коснись магического шара...</p>
          <button
            onClick={() => {
              setResults({ ...results, crystalBall: randomChoice(crystalBallPredictions) })
              handleNext('totemAnimal')
            }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Коснуться шара ✨
          </button>
        </div>
      </div>
    )
  }

  // Этап 5: Тотемное животное
  if (currentStep === 'totemAnimal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🦊</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твоё тотемное животное весны</h2>
          <p className="text-gray-600 mb-6">Выбери существо, которое резонирует с твоей душой</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {totemAnimals.map((animal) => (
              <button
                key={animal.name}
                onClick={() => {
                  setResults({ ...results, totemAnimal: animal })
                  handleNext('flower')
                }}
                className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <span className="text-3xl mb-1">{animal.emoji}</span>
                <span className="text-xs text-gray-600">{animal.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 6: Цветок-двойник
  if (currentStep === 'flower') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🌷</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твой цветок-двойник</h2>
          <p className="text-gray-600 mb-6">Выбери цветок, который отражает твою душу</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {flowers.map((flower) => (
              <button
                key={flower.name}
                onClick={() => {
                  setResults({ ...results, flower: flower })
                  handleNext('chineseZodiac')
                }}
                className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <span className="text-3xl mb-1">{flower.emoji}</span>
                <span className="text-xs text-gray-600">{flower.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 7: Китайский календарь
  if (currentStep === 'chineseZodiac') {
    // Функция определения знака по году
    const getZodiacByYear = (year: number) => {
      const zodiacIndex = (year - 1900) % 12
      return chineseZodiacs[zodiacIndex]
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-4">🐉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Китайский календарь удачи</h2>
          <p className="text-gray-600 mb-6">Выбери год своего рождения</p>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full px-6 py-4 rounded-full text-center text-xl border-2 border-pink-300 focus:border-purple-500 focus:outline-none shadow-lg mb-6 bg-white"
          >
            {Array.from({ length: 75 }, (_, i) => 1950 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const zodiac = getZodiacByYear(selectedYear)
              setResults({ ...results, chineseZodiac: zodiac })
              handleNext('destinyNumber')
            }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Узнать предсказание →
          </button>
        </div>
      </div>
    )
  }

  // Этап 8: Число судьбы
  if (currentStep === 'destinyNumber') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-4">🔢</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твоё число судьбы</h2>
          <p className="text-gray-600 mb-6">Введи своё любимое число (от 1 до 999)</p>
          <input
            type="number"
            min="1"
            max="999"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="Твоё магическое число..."
            className="w-full px-6 py-4 rounded-full text-center text-xl border-2 border-pink-300 focus:border-purple-500 focus:outline-none shadow-lg mb-6"
          />
          <button
            onClick={() => {
              const num = parseInt(numberInput) || 1
              const destinyNum = calculateDestinyNumber(num)
              setResults({ ...results, destinyNumber: { number: destinyNum, meaning: destinyNumberMeanings[destinyNum] || destinyNumberMeanings[1] } })
              handleNext('star')
            }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Раскрыть тайну →
          </button>
        </div>
      </div>
    )
  }

  // Этап 9: Звезда дня
  if (currentStep === 'star') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">⭐</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твоя звезда дня</h2>
          <p className="text-gray-600 mb-6">Выбери небесное светило, которое притягивает тебя</p>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stars.map((star) => (
              <button
                key={star.name}
                onClick={() => {
                  setResults({ ...results, star: star })
                  handleNext('destinyGift')
                }}
                className="p-4 rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <span className="text-4xl mb-2">{star.emoji}</span>
                <span className="text-xs text-gray-600 text-center">{star.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 10: Подарок судьбы
  if (currentStep === 'destinyGift') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-4">🎁</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Твой подарок судьбы</h2>
          <p className="text-gray-600 mb-6">Выбери подарок, который тебе хочется получить</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {destinyGifts.map((gift) => (
              <button
                key={gift.name}
                onClick={() => {
                  setResults({ ...results, destinyGift: gift })
                  handleNext('compliment')
                }}
                className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
              >
                <span className="text-3xl mb-1">{gift.emoji}</span>
                <span className="text-xs text-gray-600 text-center">{gift.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Этап 11: Комплимент от Вселенной
  if (currentStep === 'compliment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="text-8xl mb-6">✨</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Комплимент от Вселенной</h2>
          <p className="text-gray-600 mb-6">Вселенная хочет шепнуть тебе что-то особенное...</p>
          <button
            onClick={() => {
              setResults({ ...results, compliment: randomChoice(compliments) })
              handleNext('congratulation')
            }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Услышать послание 💫
          </button>
        </div>
      </div>
    )
  }

  // Страница поздравления от мужчин
  if (currentStep === 'congratulation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6 animate-bounce">💐</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Поздравление от мужчин КорпСофт24
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Дорогая, прекрасная <span className="font-bold text-pink-600">{results.name}</span>! 🌸
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              От всего мужского коллектива компании <span className="font-bold text-purple-600">КорпСофт24</span> 
              поздравляем тебя с чудесным праздником 8 Марта!
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Ты — незаменимая частичка нашей команды, её душа и сердце. Твоя профессиональность, 
              доброта и оптимизм делают каждый рабочий день особенным и светлым. 
              Спасибо тебе за твой талантливый труд, твою очаровательную улыбку 
              и твой бесценный вклад в наши общие успехи! 💜
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Желаем тебе весеннего вдохновения, головокружительных карьерных побед, 
              безграничного личного счастья и бесконечного позитива! 
              Пусть каждый день приносит радость, а все заветные мечты сбываются! ✨
            </p>
            <p className="text-xl font-semibold text-pink-600 mt-6">
              С любовью и восхищением, мужчины КорпСофт24 💐
            </p>
          </div>
          <div className="flex gap-4 text-4xl justify-center mb-6">
            🌷 🌹 🌸 🌺 🌻 💐 🌷
          </div>
          <button
            onClick={() => handleNext('results')}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Открыть мою карту судьбы 🔮
          </button>
        </div>
      </div>
    )
  }

  // Итоговая страница с результатами
  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔮</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Твоя карта судьбы
            </h1>
            <p className="text-xl text-gray-600">{results.name}, вот твои волшебные предсказания!</p>
          </div>

          <div className="space-y-4">
            {/* Цвет настроения */}
            {results.moodColor && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.moodColor.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">✨ Твой мистический цвет: {results.moodColor.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.moodColor.meaning}</p>
                </div>
              </div>
            )}

            {/* Аура дня */}
            {results.aura && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.aura.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🌟 Твоя божественная аура</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.aura.name} — {results.aura.meaning}</p>
                </div>
              </div>
            )}

            {/* Карта дня */}
            {results.card && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.card.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🃏 Твоя карта судьбы: {results.card.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.card.meaning}</p>
                </div>
              </div>
            )}

            {/* Хрустальный шар */}
            {results.crystalBall && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">🔮</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">💫 Откровение хрустального шара</h3>
                  <p className="text-gray-600 text-sm mt-1 italic">"{results.crystalBall}"</p>
                </div>
              </div>
            )}

            {/* Тотемное животное */}
            {results.totemAnimal && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.totemAnimal.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🦊 Твой дух-покровитель: {results.totemAnimal.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.totemAnimal.meaning}</p>
                </div>
              </div>
            )}

            {/* Цветок-двойник */}
            {results.flower && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.flower.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🌸 Твой цветок души: {results.flower.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.flower.meaning}</p>
                </div>
              </div>
            )}

            {/* Китайский календарь */}
            {results.chineseZodiac && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.chineseZodiac.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🐉 Твой восточный покровитель: {results.chineseZodiac.animal}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.chineseZodiac.prediction}</p>
                </div>
              </div>
            )}

            {/* Число судьбы */}
            {results.destinyNumber && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {results.destinyNumber.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🔢 Твоё сакральное число: {results.destinyNumber.number}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.destinyNumber.meaning}</p>
                </div>
              </div>
            )}

            {/* Звезда дня */}
            {results.star && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.star.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">⭐ Твоя путеводная звезда: {results.star.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.star.meaning}</p>
                </div>
              </div>
            )}

            {/* Подарок судьбы */}
            {results.destinyGift && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.destinyGift.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">🎁 Твой волшебный дар: {results.destinyGift.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{results.destinyGift.meaning}</p>
                </div>
              </div>
            )}

            {/* Комплимент */}
            {results.compliment && (
              <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">💜</span>
                  <h3 className="font-bold text-gray-800">✨ Послание Вселенной специально для тебя</h3>
                </div>
                <p className="text-gray-700 italic text-lg">"{results.compliment}"</p>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <div className="flex gap-2 text-3xl justify-center mb-4">
              🌷 🌹 🌸 🌺 🌻 💐
            </div>
            <button
              onClick={() => {
                setResults({
                  name: '',
                  moodColor: null,
                  aura: null,
                  card: null,
                  crystalBall: null,
                  totemAnimal: null,
                  flower: null,
                  chineseZodiac: null,
                  destinyNumber: null,
                  star: null,
                  destinyGift: null,
                  compliment: null,
                })
                setNumberInput('')
                handleNext('welcome')
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Пройти заново 🔄
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
