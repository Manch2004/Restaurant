// Static restaurant menu data
const menuData = [
  {
    key: "appetizers",
    category: "Նախուտեստներ",
    items: [
      { name: { hy: "Հացով լոբիով", en: "Lobio with Bread", ru: "Лобио с хлебом" }, description: { hy: "Ավանդական հայկական լոբով նախուտեստ՝ կաղամբով և համեմունքներով", en: "Traditional Armenian bean appetizer with cabbage and spices.", ru: "Традиционная армянская закуска из фасоли с капустой и специями." }, price: "1800 ֏", icon: "🍞" },
      { name: { hy: "Ջեվահիր", en: "Jevahir", ru: "Джевахир" }, description: { hy: "Սեխի, պանրի և ընկույզի փափուկ խտուտիկ", en: "A soft blend of melon, cheese, and walnuts.", ru: "Нежная смесь дыни, сыра и грецкого ореха." }, price: "2200 ֏", icon: "🧀" },
      { name: { hy: "Խորոված սունկ", en: "Grilled Mushrooms", ru: "Грибы на гриле" }, description: { hy: "Խորոված սունկ սխտորով և թարմ խոտաբույսերով", en: "Grilled mushrooms with garlic and fresh herbs.", ru: "Грибы на гриле с чесноком и свежей зеленью." }, price: "2400 ֏", icon: "🍄" },
      { name: { hy: "Բադրջանով խավիար", en: "Eggplant Caviar", ru: "Баклажанная икра" }, description: { hy: "Փռված սմբուկով խավիար, մատուցվում է թարմ հացով", en: "Spread eggplant caviar, served with fresh bread.", ru: "Икра из баклажанов, подаётся со свежим хлебом." }, price: "1900 ֏", icon: "🍆" },
      { name: { hy: "Պանրի տախտակ", en: "Cheese Board", ru: "Сырная тарелка" }, description: { hy: "Հայկական պանիրների խառնուրդ, մեղրով և ընկույզով", en: "A mix of Armenian cheeses with honey and walnuts.", ru: "Ассорти армянских сыров с мёдом и грецким орехом." }, price: "3200 ֏", icon: "🧀" }
    ]
  },
  {
    key: "mains",
    category: "Հիմնական ուտեստներ",
    items: [
      { name: { hy: "Խորոված ողկույզ", en: "Grilled Kebab", ru: "Шашлык" }, description: { hy: "Խորոված գառան միս սոխով և թարմ բանջարեղենով", en: "Grilled lamb with onions and fresh vegetables.", ru: "Шашлык из баранины с луком и свежими овощами." }, price: "5500 ֏", icon: "🍖" },
      { name: { hy: "Դոլմա", en: "Dolma", ru: "Долма" }, description: { hy: "Խաղողի տերևով փաթաթված աղացած միս և բրինձ, մածունով", en: "Ground meat and rice wrapped in grape leaves, served with yogurt.", ru: "Мясной фарш с рисом, завёрнутый в виноградные листья, подаётся с мацуном." }, price: "3800 ֏", icon: "🥙" },
      { name: { hy: "Խաշլամա", en: "Khashlama", ru: "Хашлама" }, description: { hy: "Դանդաղ եփած տավարի միս բանջարեղենով", en: "Slow-cooked beef with vegetables.", ru: "Медленно тушёная говядина с овощами." }, price: "4600 ֏", icon: "🥘" },
      { name: { hy: "Իշլի քյուֆթա", en: "Ishli Kufta", ru: "Ишли кюфта" }, description: { hy: "Ֆարշով լցոնված բլղուրի կոլոլակ, ընկույզով և միսով", en: "Bulgur dumpling stuffed with meat and walnuts.", ru: "Булгуровые шарики, фаршированные мясом и грецким орехом." }, price: "3400 ֏", icon: "🥘" },
      { name: { hy: "Խորոված իշխան", en: "Grilled Ishkhan Trout", ru: "Форель ишхан на гриле" }, description: { hy: "Խորոված սևանի իշխան՝ կիտրոնով և խոտաբույսերով", en: "Grilled Lake Sevan trout with lemon and herbs.", ru: "Форель ишхан с озера Севан на гриле с лимоном и зеленью." }, price: "6200 ֏", icon: "🐟" },
      { name: { hy: "Ղափամա", en: "Ghapama", ru: "Гапама" }, description: { hy: "Դդում լցոնված բրնձով, չամիչով և չորացրած մրգերով", en: "Pumpkin stuffed with rice, raisins, and dried fruits.", ru: "Тыква, фаршированная рисом, изюмом и сухофруктами." }, price: "3600 ֏", icon: "🎃" }
    ]
  },
  {
    key: "salads",
    category: "Աղցաններ",
    items: [
      { name: { hy: "Հայկական աղցան", en: "Armenian Salad", ru: "Армянский салат" }, description: { hy: "Լոլիկ, վարունգ, սոխ և թարմ խոտաբույսեր", en: "Tomatoes, cucumbers, onions, and fresh herbs.", ru: "Помидоры, огурцы, лук и свежая зелень." }, price: "1600 ֏", icon: "🥗" },
      { name: { hy: "Ցախակեռուկով աղցան", en: "Purslane Salad", ru: "Салат с портулаком" }, description: { hy: "Թարմ բանջարեղեն ընկույզի սոուսով", en: "Fresh vegetables with walnut sauce.", ru: "Свежие овощи с ореховым соусом." }, price: "1800 ֏", icon: "🥗" },
      { name: { hy: "Հունական աղցան", en: "Greek Salad", ru: "Греческий салат" }, description: { hy: "Ֆետա պանիր, ձիթապտուղ, լոլիկ և վարունգ", en: "Feta cheese, olives, tomatoes, and cucumbers.", ru: "Сыр фета, оливки, помидоры и огурцы." }, price: "2100 ֏", icon: "🥗" },
      { name: { hy: "Ամառային աղցան", en: "Summer Salad", ru: "Летний салат" }, description: { hy: "Խառը կանաչի, ավոկադո և կիտրոնի սոուս", en: "Mixed greens, avocado, and lemon dressing.", ru: "Микс зелени, авокадо и лимонная заправка." }, price: "2300 ֏", icon: "🥑" }
    ]
  },
  {
    key: "desserts",
    category: "Աղանդերներ",
    items: [
      { name: { hy: "Գաթա", en: "Gata", ru: "Гата" }, description: { hy: "Ավանդական հայկական քաղցր խմոր՝ շաքարավազով", en: "Traditional Armenian sweet pastry with a sugar filling.", ru: "Традиционная армянская сладкая выпечка с сахарной начинкой." }, price: "1500 ֏", icon: "🍰" },
      { name: { hy: "Փախլավա", en: "Baklava", ru: "Пахлава" }, description: { hy: "Ընկույզով և մեղրով շերտավոր աղանդեր", en: "Layered pastry with walnuts and honey.", ru: "Слоёный десерт с грецким орехом и мёдом." }, price: "1700 ֏", icon: "🍯" },
      { name: { hy: "Սուջուխ", en: "Sujukh", ru: "Суджух" }, description: { hy: "Ընկույզով ցախարար՝ խաղողի հյութով", en: "Walnut candy made with grape juice.", ru: "Ореховая сладость на виноградном соке." }, price: "1400 ֏", icon: "🌰" },
      { name: { hy: "Շոկոլադե տորթ", en: "Chocolate Cake", ru: "Шоколадный торт" }, description: { hy: "Փափուկ շոկոլադե տորթ վանիլային կրեմով", en: "Soft chocolate cake with vanilla cream.", ru: "Нежный шоколадный торт с ванильным кремом." }, price: "2000 ֏", icon: "🍰" }
    ]
  },
  {
    key: "drinks",
    category: "Ըմպելիքներ",
    subcategories: [
      {
        key: "nonAlcoholic",
        name: "Ոչ ալկոհոլային",
        items: [
          { name: { hy: "Թանով", en: "Tan", ru: "Тан" }, description: { hy: "Ավանդական մածունով ըմպելիք", en: "Traditional yogurt drink.", ru: "Традиционный напиток из мацуна." }, price: "800 ֏", icon: "🥛" },
          { name: { hy: "Թարմ քամած հյութ", en: "Freshly Squeezed Juice", ru: "Свежевыжатый сок" }, description: { hy: "Սեզոնային մրգերից՝ ըստ ընտրության", en: "Made from seasonal fruits of your choice.", ru: "Из сезонных фруктов на выбор." }, price: "1200 ֏", icon: "🥤" },
          { name: { hy: "Հանքային ջուր", en: "Mineral Water", ru: "Минеральная вода" }, description: { hy: "Գազավորված կամ առանց գազի", en: "Sparkling or still.", ru: "Газированная или без газа." }, price: "600 ֏", icon: "💧" }
        ]
      },
      {
        key: "alcoholic",
        name: "Ալկոհոլային",
        items: [
          { name: { hy: "Հայկական կոնյակ", en: "Armenian Brandy", ru: "Армянский коньяк" }, description: { hy: "Տեղական արտադրության հնեցված կոնյակ", en: "Locally produced aged brandy.", ru: "Выдержанный коньяк местного производства." }, price: "2500 ֏", icon: "🥃" },
          { name: { hy: "Կարմիր գինի", en: "Red Wine", ru: "Красное вино" }, description: { hy: "Հայկական խաղողից պատրաստված չոր կարմիր գինի", en: "Dry red wine made from Armenian grapes.", ru: "Сухое красное вино из армянского винограда." }, price: "1800 ֏", icon: "🍷" },
          { name: { hy: "Գարեջուր", en: "Beer", ru: "Пиво" }, description: { hy: "Տեղական գարեջրագործության դասական տեսակ", en: "A classic style from a local brewery.", ru: "Классический сорт местной пивоварни." }, price: "1000 ֏", icon: "🍺" }
        ]
      }
    ]
  }
];
