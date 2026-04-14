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
    restaurantCount: (n) => `${n}家餐厅，总有一家适合你`,
    tagLabels: { occasion: '🎉 场合', atmosphere: '🏠 氛围', group: '👥 人数' },
    tagMaps: {
      occasion: { '一人食': '一人食', '朋友聚餐': '朋友聚餐', '家庭聚餐': '家庭聚餐', '请客': '请客', '商务': '商务' },
      atmosphere: { '热闹': '热闹', '安静': '安静', '精致': '精致', '简朴': '简朴', '有包间': '有包间' },
      group: { '一人也行': '一人也行', '2–6人': '2–6人', '6人以上': '6人以上' },
    },
  },
  en: {
    subtitle: "Top Foodie · 火龙果's",
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
    byob: "🍷 火龙果 tip: All Shanghai restaurants allow BYO drinks & bubble tea 🧋",
    footer: "huolahuola studio · Shanghai · Amsterdam",
    expand: "Show more",
    collapse: "Show less",
    langBtn: "中文",
    restaurantCount: (n) => `${n} restaurants, something for everyone`,
    tagLabels: { occasion: '🎉 Occasion', atmosphere: '🏠 Vibe', group: '👥 Group size' },
    tagMaps: {
      occasion: { '一人食': 'Solo', '朋友聚餐': 'Friends dinner', '家庭聚餐': 'Family meal', '请客': 'Hosting', '商务': 'Business' },
      atmosphere: { '热闹': 'Lively', '安静': 'Quiet', '精致': 'Refined', '简朴': 'Casual', '有包间': 'Private rooms' },
      group: { '一人也行': 'Solo-friendly', '2–6人': '2–6 ppl', '6人以上': '6+ ppl' },
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
