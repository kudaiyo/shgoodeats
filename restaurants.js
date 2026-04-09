const restaurants = [
  {
    name: "南蛮子（进贤路店）",
    category: "yunnan",
    neighborhood: "法租界 · 浦西核心区",
    address: "进贤路，徐汇区",
    description: "云南菜馆，藏在法租界的街边小店。环境简朴，烟火气十足，更适合朋友聚餐而非正式请客。没有包间，但有大圆桌，2到10个人都能坐得舒服。",
    mustTry: ["黑三剁", "木姜子牛肉", "菌子鸡汤", "炸排骨", "烤罗非鱼", "酥红豆", "辣子鸡", "牙签牛肉"],
    priceRange: "¥¥",
    perPerson: "人均 ¥100",
    reservation: "平时无需预定，周末饭点可在大众点评提前订位",
    groupSize: "2–10 人",
    occasion: "朋友聚餐",
    atmosphere: "简朴",
    emoji: "🌿"
  },
  {
    name: "Jesse Restaurant (吉士酒家)",
    category: "shanghainese",
    neighborhood: "Xuhui",
    address: "41 Tianping Rd, Xuhui District",
    description: "A Shanghai institution. The braised pork belly and drunken chicken are legendary. Always busy — arrive early or book ahead.",
    mustTry: ["Braised Pork Belly (红烧肉)", "Drunken Chicken (醉鸡)"],
    priceRange: "¥¥",
    emoji: "🥢"
  },
  {
    name: "Chun (春)",
    category: "shanghainese",
    neighborhood: "Jing'an",
    address: "124 Jinxian Rd, Jing'an District",
    description: "Tiny, no-frills, and absolutely delicious. Classic Shanghainese home cooking in a cramped but charming space. Cash only.",
    mustTry: ["Smoked Fish (熏鱼)", "Lion's Head Meatball (狮子头)"],
    priceRange: "¥",
    emoji: "🏮"
  },
  {
    name: "Lost Heaven (花马天堂)",
    category: "yunnan",
    neighborhood: "the Bund",
    address: "17 Yan'an East Rd, Huangpu District",
    description: "Yunnan cuisine with a stunning view of the Bund. The folk art décor is incredible and the food matches the atmosphere.",
    mustTry: ["Crossing-the-Bridge Noodles (过桥米线)", "Yunnan Mushroom Platter"],
    priceRange: "¥¥¥",
    emoji: "🏔️"
  },
  {
    name: "Haidilao (海底捞)",
    category: "hotpot",
    neighborhood: "Multiple locations",
    address: "Various across Shanghai",
    description: "The gold standard of hotpot chains in China. The service is famously over-the-top — free manicures while you wait, noodle dancing shows, and more.",
    mustTry: ["Spicy broth with beef slices", "Hand-pulled noodles"],
    priceRange: "¥¥",
    emoji: "🔥"
  },
  {
    name: "Din Tai Fung (鼎泰丰)",
    category: "dim-sum",
    neighborhood: "Xintiandi",
    address: "123 Xingye Rd, Huangpu District",
    description: "World-famous for xiaolongbao (soup dumplings). Watch the chefs fold dumplings through the glass kitchen. Each dumpling has exactly 18 folds.",
    mustTry: ["Pork Xiaolongbao (小笼包)", "Shrimp & Pork Wonton"],
    priceRange: "¥¥",
    emoji: "🥟"
  },
  {
    name: "Mr & Mrs Bund",
    category: "international",
    neighborhood: "the Bund",
    address: "18 Zhongshan East 1st Rd, 6F",
    description: "Paul Pairet's modern French bistro overlooking the Bund. Exceptional food, great wine list, and a lively atmosphere that goes late into the night.",
    mustTry: ["Lemon Tart", "Wagyu Beef Tartare"],
    priceRange: "¥¥¥¥",
    emoji: "🥂"
  },
  {
    name: "Spicy Joint (辣府)",
    category: "sichuan",
    neighborhood: "Jing'an",
    address: "1/F, 100 Changshu Rd, Jing'an District",
    description: "The real deal for Sichuan food. Mouth-numbing mala flavour done right. The mapo tofu here will change your life.",
    mustTry: ["Mapo Tofu (麻婆豆腐)", "Boiled Fish in Chilli (水煮鱼)"],
    priceRange: "¥¥",
    emoji: "🌶️"
  },
  {
    name: "Yang's Fry-Dumpling (小杨生煎)",
    category: "shanghainese",
    neighborhood: "Citywide",
    address: "Multiple locations — try the Huanghe Rd branch",
    description: "Shanghai street food at its finest. Pan-fried pork dumplings with a crispy bottom and a burst of soup inside. Queue up — it's worth it.",
    mustTry: ["Shengjianbao (生煎包)"],
    priceRange: "¥",
    emoji: "🫓"
  },
  {
    name: "Fu He Hui (福和慧)",
    category: "international",
    neighborhood: "Changning",
    address: "1037 Yuyuan Rd, Changning District",
    description: "Michelin-starred vegetarian fine dining. A Zen-inspired space serving exquisite plant-based dishes that will make you forget meat exists.",
    mustTry: ["Seasonal tasting menu"],
    priceRange: "¥¥¥¥",
    emoji: "🌸"
  },
  {
    name: "Nanxiang Steamed Bun Restaurant (南翔馒头店)",
    category: "dim-sum",
    neighborhood: "Yu Garden",
    address: "85 Yuyuan Rd, Yu Garden",
    description: "Over 100 years old and still the benchmark for xiaolongbao in Shanghai. Yes there's a queue. Yes it's worth it.",
    mustTry: ["Crab Roe Xiaolongbao (蟹黄小笼)"],
    priceRange: "¥¥",
    emoji: "🐚"
  }
];
