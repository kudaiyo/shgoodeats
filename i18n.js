const translations = {
  zh: {
    subtitle: "火龙果亲测推荐",
    title: "上海最好吃的餐厅",
    tagline: "隐藏宝藏、本地最爱、难忘的一餐 — 全部来自一个真正住在这里的人。",
    filters: {
      all: "全部",
      shanghainese: "上海菜",
      sichuan: "四川菜",
      hotpot: "火锅",
      yunnan: "云南菜",
      international: "国际",
      "dim-sum": "点心",
    },
    mustTryLabel: "必点",
    reservationLabel: "📅",
    dianpingBtn: "查看大众点评",
    footer: "火龙果出品 · 上海",
    expand: "展开",
    collapse: "收起",
    langBtn: "EN",
  },
  en: {
    subtitle: "Personally curated by 火龙果",
    title: "The Best Restaurants in Shanghai",
    tagline: "Hidden gems, local favourites, and unforgettable meals — handpicked from someone who actually lives here.",
    filters: {
      all: "All",
      shanghainese: "Shanghainese",
      sichuan: "Sichuan",
      hotpot: "Hotpot",
      yunnan: "Yunnan",
      international: "International",
      "dim-sum": "Dim Sum",
    },
    mustTryLabel: "Must Try",
    reservationLabel: "📅",
    dianpingBtn: "View on Dianping",
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
