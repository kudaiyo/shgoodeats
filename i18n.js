const translations = {
  zh: {
    subtitle: "吃商天花板 · 火龙果",
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
    footer: "火龙果出品 · 上海",
    expand: "展开",
    collapse: "收起",
    langBtn: "EN",
  },
  en: {
    subtitle: "Top Foodie · 火龙果",
    title: "Shanghai Food Map",
    tagline: "Hidden gems, local favourites, and unforgettable meals — handpicked from someone who actually lives here.",
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
    footer: "By 火龙果 · Shanghai",
    expand: "Show more",
    collapse: "Show less",
    langBtn: "中文",
  },
};

let currentLang = 'zh';

function t(key) {
  return translations[currentLang][key] || key;
}

function tFilter(key) {
  return translations[currentLang].filters[key] || key;
}
