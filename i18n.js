const translations = {
  zh: {
    subtitle: "吃商天花板·火龙果的",
    title: "「上海好吃地图」",
    tagline: "隐藏宝藏、本地最爱、难忘的一餐 — 全部来自一个真正住在这里的人。",
    filters: {
      all: "全部",
      jiangzhe: "江浙小海鲜 🐟",
      sichuan: "川菜 🌶️🌶️",
      hunan: "湘菜 🌶️🌶️🌶️",
      jiangxi: "江西菜 🌶️🌶️🌶️🌶️🌶️",
      yunguizhou: "云贵菜 🍄",
      japanese: "日料 🍣",
      domestic: "国内其他 🦆",
      international: "国外其他 🥩",
      bakery: "面包甜品 🥐",
      bar: "酒吧 🍸",
    },
    mustTryLabel: "必点",
    reservationLabel: "📅",
    dianpingBtn: "查看大众点评",
    byob: "🍷火龙果温馨提示：上海所有餐厅均可自带酒水和奶茶🧋",
    footer: "火啦火啦工作室出品·上海·阿姆斯特丹",
    expand: "展开",
    collapse: "收起",
    langBtn: "EN",
    tabInstr: '食用说明',
    tabAuthors: '关于作者',
    ratingExplainer: '一果<img src="rating-icon.png" alt="🐉" class="rating-explainer-icon">到三果<img src="rating-icon.png" alt="🐉" class="rating-explainer-icon"><img src="rating-icon.png" alt="🐉" class="rating-explainer-icon"><img src="rating-icon.png" alt="🐉" class="rating-explainer-icon">，均为火龙果回国必吃之选 · 果级越高，越是火龙果的心头最爱',
    author1: { name: '火龙果', title: '首席内容官', bio: '阿姆中餐天花板🌷·WSET二级Distinction🍷<br>厨师证持有者🧑‍🍳·八卦情报局领导班子👀' },
    author2: { name: '拉筋', title: 'Claude Code 发言人', bio: '🐄 壮而能吃 😋<br>🏃‍♀️半马144，全马353，Hyrox女单126💪' },
    restaurantCount: (n) => `${n}家餐厅，总有一家适合你`,
    tagLabels: { category: '🍽 菜系', occasion: '🎉 场合', atmosphere: '🏠 氛围', group: '👥 人数' },
    tagAll: '全部',
    tagMaps: {
      occasion: { '朋友聚餐': '朋友聚餐', '可以请客': '可以请客' },
      atmosphere: { '热闹': '热闹', '安静': '安静', '精致': '精致', '简单': '简单' },
      group: { '一人可行': '一人可行', '2–6人': '2–6人', '6人以上': '6人以上', '有包间': '有包间' },
    },
  },
  en: {
    subtitle: "Top Foodie · Pitaya's",
    title: "Shanghai Good Eats",
    tagline: "",
    filters: {
      all: "All",
      jiangzhe: "Jiangzhe Seafood 🐟",
      sichuan: "Sichuan 🌶️🌶️",
      hunan: "Hunan 🌶️🌶️🌶️",
      jiangxi: "Jiangxi 🌶️🌶️🌶️🌶️🌶️",
      yunguizhou: "Yunnan-Guizhou 🍄",
      japanese: "Japanese 🍣",
      domestic: "Other Chinese 🦆",
      international: "International 🥩",
      bakery: "Bakery & Desserts 🥐",
      bar: "Bar 🍸",
    },
    mustTryLabel: "Must Try",
    reservationLabel: "📅",
    dianpingBtn: "View on Dianping",
    byob: "🍷 Pitaya tip: All Shanghai restaurants allow BYO drinks & bubble tea 🧋",
    footer: "huolahuola studio · Shanghai · Amsterdam",
    expand: "Show more",
    collapse: "Show less",
    langBtn: "中文",
    tabInstr: 'How to Use',
    tabAuthors: 'About',
    ratingExplainer: 'One <img src="rating-icon.png" alt="🐉" class="rating-explainer-icon"> to three <img src="rating-icon.png" alt="🐉" class="rating-explainer-icon"><img src="rating-icon.png" alt="🐉" class="rating-explainer-icon"><img src="rating-icon.png" alt="🐉" class="rating-explainer-icon"> — all are Pitaya\'s must-eats back in Shanghai · the more fruits, the more she loves it',
    author1: { name: 'Pitaya', title: 'Chief Content Officer', bio: 'Top Chinese food authority in Amsterdam 🌷 · WSET Level 2 Distinction 🍷<br>Certified chef 🧑‍🍳 · Head of gossip intel 👀' },
    author2: { name: 'LaJin', title: 'Claude Code Spokesperson', bio: '🐄 Built to eat 😋<br>🏃‍♀️ Half 1:44, Full 3:53, Hyrox Women\'s Open 1:26 💪' },
    restaurantCount: (n) => `${n} restaurants, something for everyone`,
    tagLabels: { category: '🍽 Cuisine', occasion: '🎉 Occasion', atmosphere: '🏠 Vibe', group: '👥 Group size' },
    tagAll: 'All',
    tagMaps: {
      occasion: { '朋友聚餐': 'Friends dinner', '可以请客': 'Host-friendly' },
      atmosphere: { '热闹': 'Lively', '安静': 'Quiet', '精致': 'Refined', '简单': 'Casual' },
      group: { '一人可行': 'Solo ok', '2–6人': '2–6 ppl', '6人以上': '6+ ppl', '有包间': 'Private rooms' },
    },
  },
};

let currentLang = 'zh';

function t(key) {
  return translations[currentLang][key] || key;
}

function tFilter(key) {
  return translations[currentLang].filters[key] || key;
}
