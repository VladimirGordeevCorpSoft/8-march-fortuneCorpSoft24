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

// Данные для гаданий
const moodColors = [
  { name: 'Красный', emoji: '🔴', meaning: 'Энергия и страсть! Сегодня ты свернёшь горы. Твоя решительность на пике!' },
  { name: 'Оранжевый', emoji: '🟠', meaning: 'Творчество на максимуме! Идеи сами придут, вдохновение окружает тебя.' },
  { name: 'Жёлтый', emoji: '🟡', meaning: 'Солнечное настроение! Ты — источник позитива для всей команды.' },
  { name: 'Зелёный', emoji: '🟢', meaning: 'Гармония и рост. Идеальный день для развития и новых начинаний.' },
  { name: 'Голубой', emoji: '🔵', meaning: 'Спокойствие и уверенность. Твои решения будут точными и мудрыми.' },
  { name: 'Синий', emoji: '🔷', meaning: 'Глубина и надёжность. Ты — опора для коллег и друзей.' },
  { name: 'Фиолетовый', emoji: '🟣', meaning: 'Интуиция и магия дня. Доверяй своим чувствам — они не подведут!' },
  { name: 'Розовый', emoji: '🩷', meaning: 'Нежность и любовь. Окружающие почувствуют твоё тепло и заботу.' },
]

const auras = [
  { name: 'Огненная аура', emoji: '🔥', meaning: 'Ты сияешь энергией! Люди тянутся к твоему свету.' },
  { name: 'Водная аура', emoji: '💧', meaning: 'Глубина и мудрость. Ты видишь то, что скрыто от других.' },
  { name: 'Воздушная аура', emoji: '💨', meaning: 'Свобода и лёгкость. Перемены к лучшему уже в пути.' },
  { name: 'Земная аура', emoji: '🌍', meaning: 'Стабильность и сила. Ты — тот самый надёжный фундамент.' },
  { name: 'Космическая аура', emoji: '🌌', meaning: 'Ты связана со Вселенной. Мечты сбываются!' },
  { name: 'Солнечная аура', emoji: '☀️', meaning: 'Ты освещаешь путь другим. Твой оптимизм заразителен!' },
  { name: 'Лунная аура', emoji: '🌙', meaning: 'Таинственность и интуиция. Твои сны — подсказки судьбы.' },
  { name: 'Радужная аура', emoji: '🌈', meaning: 'Многообразие талантов! Ты — счастливый талисман команды.' },
]

const cards = [
  { name: 'Звезда', emoji: '⭐', meaning: 'Сегодня ты — свет для коллег. Твои идеи озарят всех вокруг!' },
  { name: 'Роза', emoji: '🌹', meaning: 'Красота и грация. Даже в сложные моменты ты прекрасна!' },
  { name: 'Бабочка', emoji: '🦋', meaning: 'Перемены к лучшему. Новые возможности уже на горизонте!' },
  { name: 'Ключ', emoji: '🗝️', meaning: 'Ответ найден! Решение придёт неожиданно и точно в срок.' },
  { name: 'Корона', emoji: '👑', meaning: 'Ты — королева своего дела. Власть, уважение и признание!' },
  { name: 'Радуга', emoji: '🌈', meaning: 'После дождя — солнце! Сложности позади, удача впереди.' },
  { name: 'Птица', emoji: '🕊️', meaning: 'Свобода и лёгкость. Почувствуй крылья за спиной!' },
  { name: 'Бриллиант', emoji: '💎', meaning: 'Твои таланты сияют ярче любого камня. Не прячь их!' },
  { name: 'Сердце', emoji: '💜', meaning: 'Любовь окружает тебя. Открой сердце новым возможностям!' },
  { name: 'Подкова', emoji: '🧿', meaning: 'Удача на твоей стороне. Рискуй смело — всё получится!' },
]

const crystalBallPredictions = [
  'Да, и это будет прекрасно! Звёзды говорят — тебя ждёт успех!',
  'Космос одобряет твои планы! Действуй без сомнений!',
  'Потерпи немного — всё скоро прояснится самым чудесным образом!',
  'Вселенная видит твои старания — награда близко!',
  'Доверься интуиции — она никогда не подводила тебя!',
  'Весна принесёт тебе то, о чём ты мечтаешь!',
  'Карта легла удачно — смело вперёд к своим целям!',
  'Хрустальный шар светится — это значит только хорошее!',
  'Планеты сошлись в твою пользу — сегодня твой день!',
  'Судьба готовит тебе приятный сюрприз — будь внимательна!',
]

const totemAnimals = [
  { name: 'Бабочка', emoji: '🦋', meaning: 'Ты — мастер трансформации! Меняешься, расцветаешь и вдохновляешь других.' },
  { name: 'Орлица', emoji: '🦅', meaning: 'Ты видишь возможности там, где другие не замечают. Лети высоко!' },
  { name: 'Кошка', emoji: '🐱', meaning: 'Изящество и интуиция — твои главные союзники. Ты всегда приземляешься на лапы!' },
  { name: 'Лиса', emoji: '🦊', meaning: 'Хитрость и ум — твой путь к успеху. Ты находишь выход из любой ситуации!' },
  { name: 'Сова', emoji: '🦉', meaning: 'Мудрость и ночной образ жизни (те самые дедлайны!). Ты всё знаешь заранее.' },
  { name: 'Дельфин', emoji: '🐬', meaning: 'Игривость и интеллект в одном флаконе. Ты приносишь радость команде!' },
  { name: 'Единорог', emoji: '🦄', meaning: 'Редкость и магия — ты одна такая! Уникальность — твоя суперсила.' },
  { name: 'Попугай', emoji: '🦜', meaning: 'Общительность и яркий голос! Ты — душа любого собрания.' },
  { name: 'Пчела', emoji: '🐝', meaning: 'Трудолюбие и командный дух! Ты — настоящая королева продуктивности.' },
  { name: 'Лебедь', emoji: '🦢', meaning: 'Грация и преданность. Ты прекрасна внутри и снаружи!' },
]

const flowers = [
  { name: 'Роза', emoji: '🌹', meaning: 'Королева! Красота с характером. Шипы только добавляют тебе шарма.' },
  { name: 'Тюльпан', emoji: '🌷', meaning: 'Нежность и весна в одном лице. Ты — начало чего-то прекрасного!' },
  { name: 'Подсолнух', emoji: '🌻', meaning: 'Всегда к свету! Твой оптимизм заряжает всех вокруг позитивом.' },
  { name: 'Сакура', emoji: '🌸', meaning: 'Нежная, но стойкая. Красота в каждом твоём моменте.' },
  { name: 'Лотос', emoji: '🪷', meaning: 'Растёшь через трудности и расцветаешь. Настоящая сила духа!' },
  { name: 'Ромашка', emoji: '🌼', meaning: 'Простота и обаяние. Твоя искренность покоряет сердца.' },
  { name: 'Гибискус', emoji: '🌺', meaning: 'Экзотика и страсть. Ты — яркое пятно в серых буднях!' },
  { name: 'Пион', emoji: '💐', meaning: 'Пышность и роскошь. Ты любишь жизнь во всех её проявлениях!' },
  { name: 'Лаванда', emoji: '💜', meaning: 'Спокойствие и гармония. Твой аромат умиротворяет окружающих.' },
  { name: 'Орхидея', emoji: '🪻', meaning: 'Изысканность и утончённость. Ты — произведение искусства!' },
]

const chineseZodiacs = [
  { animal: 'Крыса', emoji: '🐀', prediction: 'Мудрая стратег! Твои планы сработают — готовься к победе!' },
  { animal: 'Бык', emoji: '🐂', prediction: 'Надёжная сила! Стабильность и рост. Ты — опора всей команды!' },
  { animal: 'Тигр', emoji: '🐅', prediction: 'Смелая лидер! Риски оправдаются — действуй решительно!' },
  { animal: 'Кролик', emoji: '🐇', prediction: 'Изящная дипломат! Гармония и уют — твой час пришёл!' },
  { animal: 'Дракон', emoji: '🐉', prediction: 'Харизматичная звезда! Ты в центре внимания — наслаждайся!' },
  { animal: 'Змея', emoji: '🐍', prediction: 'Интуитивная мудрица! Секреты раскроются — ты всё знаешь!' },
  { animal: 'Лошадь', emoji: '🐎', prediction: 'Свободная искательница! Новые горизонты ждут тебя!' },
  { animal: 'Коза', emoji: '🐐', prediction: 'Творческая душа! Искусство и красота наполнят этот год.' },
  { animal: 'Обезьяна', emoji: '🐵', prediction: 'Игривая умница! Креатив решит всё — шути и побеждай!' },
  { animal: 'Петух', emoji: '🐓', prediction: 'Яркая личность! Твоё время сиять уже наступило!' },
  { animal: 'Собака', emoji: '🐕', prediction: 'Верная подруга! Коллеги ценят тебя особенно сильно!' },
  { animal: 'Свинья', emoji: '🐖', prediction: 'Счастливица! Удача идёт за руку с тобой везде!' },
]

const destinyNumberMeanings: Record<number, string> = {
  1: 'Лидерство и новые начинания. Ты — пионер, за тобой идут другие!',
  2: 'Гармония и партнёрство. Ты создаёшь баланс в любой ситуации.',
  3: 'Творчество и самовыражение. Твои идеи вдохновляют окружающих!',
  4: 'Стабильность и надёжность. На тебя можно положиться всегда!',
  5: 'Свобода и перемены. Приключения ждут тебя за каждым углом!',
  6: 'Любовь и забота. Ты — сердце любого коллектива!',
  7: 'Мудрость и анализ. Ты видишь суть вещей, скрытую от других.',
  8: 'Успех и изобилие. Материальные блага сами приходят к тебе!',
  9: 'Гуманизм и вдохновение. Ты делаешь мир лучше каждый день!',
  11: 'Интуиция и вдохновение. Ты — проводник высших идей!',
  22: 'Мастер-строитель. Твои проекты меняют мир к лучшему!',
}

const stars = [
  { name: 'Полярная звезда', emoji: '⭐', meaning: 'Ты — путеводная звезда для коллег. Твой свет ведёт других!' },
  { name: 'Сириус', emoji: '🌟', meaning: 'Самая яркая! Ты сияешь даже в самые тёмные времена.' },
  { name: 'Венера', emoji: '💫', meaning: 'Планета любви и красоты. Ты притягиваешь к себе людей!' },
  { name: 'Орион', emoji: '✨', meaning: 'Созвездие силы. Твоя энергия неиссякаема!' },
  { name: 'Комета', emoji: '☄️', meaning: 'Яркое событие близко! Готовься к чудесным переменам.' },
  { name: 'Северное сияние', emoji: '🌌', meaning: 'Магия и чудо. Ты — невероятное явление в коллективе!' },
  { name: 'Луна', emoji: '🌙', meaning: 'Интуиция и загадка. Твои сны сбываются!' },
  { name: 'Солнце', emoji: '☀️', meaning: 'Источник жизни и тепла. Ты — центр своего мира!' },
]

const destinyGifts = [
  { name: 'Волшебная палочка', emoji: '🪄', meaning: 'Любое желание сбудется! Нужно только уверенно взмахнуть.' },
  { name: 'Корона успеха', emoji: '👑', meaning: 'Признание и слава! Ты заслуживаешь самого лучшего.' },
  { name: 'Золотой ключик', emoji: '🔑', meaning: 'Все двери откроются! Новые возможности уже ждут.' },
  { name: 'Цветок желания', emoji: '🌸', meaning: 'Загадай желание — оно обязательно сбудется этой весной!' },
  { name: 'Крылья мечты', emoji: '🦋', meaning: 'Время взлететь! Твои мечты готовы стать реальностью.' },
  { name: 'Сердце любви', emoji: '💜', meaning: 'Любовь окружает тебя со всех сторон. Почувствуй её!' },
  { name: 'Звёздная пыль', emoji: '✨', meaning: 'Магия в твоих руках. Твори чудеса каждый день!' },
  { name: 'Чаша изобилия', emoji: '🏆', meaning: 'Успех и процветание. Всё, к чему прилагаешь усилия, расцветёт!' },
  { name: 'Карта сокровищ', emoji: '🗺️', meaning: 'Приключения близко! Новые горизонты ждут исследования.' },
  { name: 'Лампа Алладина', emoji: '🪔', meaning: 'Три желания уже исполняются! Верь в магию жизни.' },
]

const compliments = [
  'Ты — настоящее чудо! Твоё присутствие делает офис ярче, а работу — приятнее. Продолжай сиять! ✨',
  'Твоя энергия заразительна! Когда ты улыбаешься, все вокруг тоже начинают улыбаться. Не переставай! 😊',
  'Ты — тот человек, который превращает проблемы в возможности. Твоя сила впечатляет! 💪',
  'Твой талант — не просто навык, это искусство. Коллектив счастлив работать с тобой! 🎨',
  'Ты — сердце нашей команды. Без тебя всё было бы совсем по-другому. Спасибо, что ты есть! 💜',
  'Твоя доброта и забота согревают даже в самый холодный понедельник. Ты — лучик солнца! ☀️',
  'Ты умеешь находить красоту в простых вещах. Это редкий дар — цени его! 🌸',
  'Твоя уверенность вдохновляет. Ты показываешь нам, как нужно идти к своим целям! 🎯',
  'Ты — пример того, как можно быть профессионалом и оставаться собой. Восхищаемся тобой! 🌟',
  'Твой смех — лучшее лекарство от стресса. Спасибо, что делишься им с нами! 😄',
  'Ты — магнит для хороших идей. Твоя креативность не знает границ! 💡',
  'Твоя мудрость не по годам удивляет. Ты видишь то, что другие пропускают! 🦉',
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
            Узнай, что приготовила для тебя весна! ✨
            <br />12 волшебных предсказаний ждут тебя
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Как тебя зовут?</h2>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Цвет настроения</h2>
          <p className="text-gray-600 mb-6">Выбери цвет, который отражает твоё настроение сегодня</p>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Аура дня</h2>
          <p className="text-gray-600 mb-6">Какая аура окружает тебя сегодня?</p>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Карта дня</h2>
          <p className="text-gray-600 mb-6">Выбери карту, которая тянет тебя к себе</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {cards.map((card, index) => (
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
          <p className="text-gray-600 mb-6">Загадай мысленно вопрос и коснись шара...</p>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Тотемное животное весны</h2>
          <p className="text-gray-600 mb-6">Выбери животное, которое тебе ближе всего</p>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Цветок-двойник</h2>
          <p className="text-gray-600 mb-6">Выбери цветок, который тебе ближе по духу</p>
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
    const zodiacYears: Record<number, typeof chineseZodiacs[0]> = {
      1996: chineseZodiacs[0], 1997: chineseZodiacs[1], 1998: chineseZodiacs[2], 1999: chineseZodiacs[3],
      2000: chineseZodiacs[4], 2001: chineseZodiacs[5], 2002: chineseZodiacs[6], 2003: chineseZodiacs[7],
      2004: chineseZodiacs[8], 2005: chineseZodiacs[9], 2006: chineseZodiacs[10], 2007: chineseZodiacs[11],
      1984: chineseZodiacs[0], 1985: chineseZodiacs[1], 1986: chineseZodiacs[2], 1987: chineseZodiacs[3],
      1988: chineseZodiacs[4], 1989: chineseZodiacs[5], 1990: chineseZodiacs[6], 1991: chineseZodiacs[7],
      1992: chineseZodiacs[8], 1993: chineseZodiacs[9], 1994: chineseZodiacs[10], 1995: chineseZodiacs[11],
      2008: chineseZodiacs[0], 2009: chineseZodiacs[1], 2010: chineseZodiacs[2], 2011: chineseZodiacs[3],
      2012: chineseZodiacs[4], 2013: chineseZodiacs[5], 2014: chineseZodiacs[6], 2015: chineseZodiacs[7],
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
            {Array.from({ length: 40 }, (_, i) => 1975 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button
            onClick={() => {
              const zodiac = zodiacYears[selectedYear] || randomChoice(chineseZodiacs)
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Число судьбы</h2>
          <p className="text-gray-600 mb-6">Введи своё любимое число (от 1 до 999)</p>
          <input
            type="number"
            min="1"
            max="999"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            placeholder="Твоё число..."
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
            Раскрыть значение →
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Звезда дня</h2>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Подарок судьбы</h2>
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
          <p className="text-gray-600 mb-6">Вселенная хочет сказать тебе что-то особенное...</p>
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
              Дорогая <span className="font-bold text-pink-600">{results.name}</span>! 🌸
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              От всего мужского коллектива компании <span className="font-bold text-purple-600">КорпСофт24</span> 
              поздравляем тебя с 8 Марта!
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Ты — незаменимая часть нашей команды. Твоя профессиональность, доброта и 
              оптимизм делают каждый рабочий день особенным. Спасибо тебе за твой труд, 
              твою улыбку и твой вклад в наши общие успехи! 💜
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Желаем тебе весеннего вдохновения, карьерных побед, 
              личного счастья и бесконечного позитива! 
              Пусть каждый день приносит радость, а все мечты сбываются! ✨
            </p>
            <p className="text-xl font-semibold text-pink-600 mt-6">
              С любовью, мужчины КорпСофт24 💐
            </p>
          </div>
          <div className="flex gap-4 text-4xl justify-center mb-6">
            🌷 🌹 🌸 🌺 🌻 💐 🌷
          </div>
          <button
            onClick={() => handleNext('results')}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Открыть карту судьбы 🔮
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
              Карта судьбы
            </h1>
            <p className="text-xl text-gray-600">{results.name}, вот твои предсказания!</p>
          </div>

          <div className="space-y-4">
            {/* Цвет настроения */}
            {results.moodColor && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.moodColor.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Цвет настроения: {results.moodColor.name}</h3>
                  <p className="text-gray-600 text-sm">{results.moodColor.meaning}</p>
                </div>
              </div>
            )}

            {/* Аура дня */}
            {results.aura && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.aura.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{results.aura.name}</h3>
                  <p className="text-gray-600 text-sm">{results.aura.meaning}</p>
                </div>
              </div>
            )}

            {/* Карта дня */}
            {results.card && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.card.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Карта дня: {results.card.name}</h3>
                  <p className="text-gray-600 text-sm">{results.card.meaning}</p>
                </div>
              </div>
            )}

            {/* Хрустальный шар */}
            {results.crystalBall && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">🔮</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Хрустальный шар говорит:</h3>
                  <p className="text-gray-600 text-sm">{results.crystalBall}</p>
                </div>
              </div>
            )}

            {/* Тотемное животное */}
            {results.totemAnimal && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.totemAnimal.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Тотемное животное: {results.totemAnimal.name}</h3>
                  <p className="text-gray-600 text-sm">{results.totemAnimal.meaning}</p>
                </div>
              </div>
            )}

            {/* Цветок-двойник */}
            {results.flower && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.flower.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Цветок-двойник: {results.flower.name}</h3>
                  <p className="text-gray-600 text-sm">{results.flower.meaning}</p>
                </div>
              </div>
            )}

            {/* Китайский календарь */}
            {results.chineseZodiac && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.chineseZodiac.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Знак года: {results.chineseZodiac.animal}</h3>
                  <p className="text-gray-600 text-sm">{results.chineseZodiac.prediction}</p>
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
                  <h3 className="font-bold text-gray-800">Число судьбы: {results.destinyNumber.number}</h3>
                  <p className="text-gray-600 text-sm">{results.destinyNumber.meaning}</p>
                </div>
              </div>
            )}

            {/* Звезда дня */}
            {results.star && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.star.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Звезда дня: {results.star.name}</h3>
                  <p className="text-gray-600 text-sm">{results.star.meaning}</p>
                </div>
              </div>
            )}

            {/* Подарок судьбы */}
            {results.destinyGift && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg flex items-center gap-4 transform hover:scale-[1.02] transition-all duration-300">
                <span className="text-4xl">{results.destinyGift.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Подарок судьбы: {results.destinyGift.name}</h3>
                  <p className="text-gray-600 text-sm">{results.destinyGift.meaning}</p>
                </div>
              </div>
            )}

            {/* Комплимент */}
            {results.compliment && (
              <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">💜</span>
                  <h3 className="font-bold text-gray-800">Комплимент от Вселенной</h3>
                </div>
                <p className="text-gray-700 italic">"{results.compliment}"</p>
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
