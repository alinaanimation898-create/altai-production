/**
 * Altai Production — База данных кейсов
 * 
 * Включает HD-постеры (стоп-кадры) из видеороликов.
 */

const casesData = [
  {
    id: "ostrovok",
    title: "«Островок»",
    category: "ТВ / OLV реклама",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/be9wsEZ9fVKcDw6VxLGnGP",
    description: "Флагманский рекламный ролик с кинематографичной генерацией фотореалистичных локаций и динамичным монтажом",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/b1bdc684-9404-4d1d-83bd-c70537d82841/poster_lg/019cfba6-6209-7a0c-8bd0-7c33fdbc05f6.jpg"
  },
  {
    id: "abrau-durso",
    title: "«Абрау-Дюрсо»",
    category: "ТВ-ролик",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/hu24p1A8CA3uFphXFdJSLH",
    description: "Эстетичный премиальный ролик с кинематографичным светом, фактурными кадрами и атмосферой терруара",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/f0941276-8fbf-49aa-a944-e90e702ed2fd/poster_lg/ea8fa0fd-98df-4ee6-9b81-7f163635e13b.jpg"
  },
  {
    id: "sber-roscosmos",
    title: "Сбер и Роскосмос",
    category: "Спецпроект & Графика",
    year: "2026",
    embedUrl: "https://rutube.ru/play/embed/b5c1e22ce952495d721ae544450429e7",
    description: "Масштабная визуализация космических миссий и технологического симбиоза с глубокой детализацией нейросетевых эффектов",
    posterUrl: "https://pic.rtbcdn.ru/video/2026-04-13/3e/70/3e70aa70e7c72f14049b112627fb1825.jpg?size=l"
  },
  {
    id: "teremok",
    title: "«Теремок»",
    category: "Промо к Масленице 2026",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/pJj1zke9wEN5cJHu9tRNma",
    description: "Яркая праздничная промо-кампания: сказочный арт-дирекшн, фуд-стилизм и традиционные мотивы в AI-переосмыслении",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/20909c7a-4d92-4f26-a873-8c8e14933070/poster_lg/019cfb9e-fd01-769f-bf7f-aaa9381a2f08.jpg"
  },
  {
    id: "global-forum",
    title: "9-й Глобальный форум культурной дипломатии",
    category: "Имиджевый фильм",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/nUzdF79iRyyn6bnqguWiz1",
    description: "Монументальное визуальное полотно о диалоге мировых культур, архитектуре и глобальном наследии",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/bea4ab57-5caf-4920-985e-01715b5f4ac6/poster_lg/6e173c6c-8540-4a24-b174-0e6ba5013ed4.jpg"
  },
  {
    id: "it-axis",
    title: "IT-Ось 2026",
    category: "Технологический манифест",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/8ABWEfRpr5EzrBbfB1MEf3",
    description: "Футуристичный визионерский ролик для флагманской IT-конференции: киберпанк-эстетика, нейроинтерфейсы и квантовые образы",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/b7a4ac33-0a76-420b-bea7-d6658dee140e/poster_lg/7247b4e7-7b3c-4dee-a115-a9c9dd557f15.jpg"
  },
  {
    id: "gem-team",
    title: "Gem-team",
    category: "Видео-приложение",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/qnHJ8sXLXxiCL98JT6CLzm",
    description: "Продуктовое AI-видео нового поколения для инновационного сервиса с упором на UX и эмоциональный сторителлинг",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/dea74c22-6556-40b6-9f52-ba468fd8e313/poster_lg/a5eb9e50-24cb-4cac-927d-9e9e7c4f21da.jpg"
  },
  {
    id: "eurochem",
    title: "«Еврохим»",
    category: "Промышленный ролик",
    year: "2026",
    embedUrl: "https://kinescope.io/embed/kiXcxwRzU2BpnTDicWMEvT",
    description: "Индустриальная мощь и инновационные решения: масштабные 3D/AI визуализации производственных циклов и экосистем",
    posterUrl: "https://edge-ams-1.kinescopecdn.net/0a152b00-5a3b-4bde-9fea-a91fcfae8194/posters/6d6cbad4-6b0d-43c6-b11b-d3b137682627/poster_lg/20277e06-2294-4a10-acf3-618355ab6850.jpg"
  }
];

if (typeof window !== 'undefined') {
  window.casesData = casesData;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { casesData };
}
