const getStates = (req, res) => {
  return res.status(200).json([
    {
      name: "آذربايجان شرقی",
      center: "تبریز",
      latitude: "38.50",
      longitude: "46.180",
      id: 1,
    },
    {
      name: "آذربايجان غربی",
      center: "ارومیه",
      latitude: "37.320",
      longitude: "45.40",
      id: 2,
    },
    {
      name: "اردبيل",
      center: "اردبیل",
      latitude: "38.140",
      longitude: "48.170",
      id: 3,
    },
    {
      name: "اصفهان",
      center: "اصفهان",
      latitude: "32.390",
      longitude: "51.400",
      id: 4,
    },
    {
      name: "ايلام",
      center: "ايلام",
      latitude: "33.380",
      longitude: "46.250",
      id: 5,
    },
    {
      name: "بوشهر",
      center: "بوشهر",
      latitude: "28.590",
      longitude: "50.500",
      id: 6,
    },
    {
      name: "تهران",
      center: "تهران",
      latitude: "35.410",
      longitude: "51.240",
      id: 7,
    },
    {
      name: "چهارمحال بختیاری",
      center: "شهركرد",
      latitude: "32.190",
      longitude: "50.510",
      id: 8,
    },
    {
      name: "خراسان جنوبی",
      center: "بيرجند",
      latitude: "32.5216",
      longitude: "59.1315",
      id: 9,
    },
    {
      name: "خراسان رضوی",
      center: "مشهد",
      latitude: "36.170",
      longitude: "59.350",
      id: 10,
    },
    {
      name: "خراسان شمالی",
      center: "بجنورد",
      latitude: "37.2835",
      longitude: "57.1954",
      id: 11,
    },
    {
      name: "خوزستان",
      center: "اهواز",
      latitude: "31.190",
      longitude: "48.410",
      id: 12,
    },
    {
      name: "زنجان",
      center: "زنجان",
      latitude: "36.400",
      longitude: "48.290",
      id: 13,
    },
    {
      name: "سمنان",
      center: "سمنان",
      latitude: "35.340",
      longitude: "53.230",
      id: 14,
    },
    {
      name: "سيستان و بلوچستان",
      center: "زاهدان",
      latitude: "29.320",
      longitude: "60.540",
      id: 15,
    },
    {
      name: "فارس",
      center: "شيراز",
      latitude: "29.360",
      longitude: "52.310",
      id: 16,
    },
    {
      name: "قزوين",
      center: "قزوين",
      latitude: "36.167",
      longitude: "50.010",
      id: 17,
    },
    {
      name: "قم",
      center: "قم",
      latitude: "34.380",
      longitude: "50.530",
      id: 18,
    },
    {
      name: "البرز",
      center: "کرج",
      latitude: "35.8400",
      longitude: "50.9391",
      id: 19,
    },
    {
      name: "كردستان",
      center: "سنندج",
      latitude: "35.180",
      longitude: "47.10",
      id: 20,
    },
    {
      name: "کرمان",
      center: "کرمان",
      latitude: "30.160",
      longitude: "57.40",
      id: 21,
    },
    {
      name: "كرمانشاه",
      center: "كرمانشاه",
      latitude: "34.180",
      longitude: "47.30",
      id: 22,
    },
    {
      name: "كهكيلويه و بويراحمد",
      center: "ياسوج",
      latitude: "30.390",
      longitude: "51.350",
      id: 23,
    },
    {
      name: "گلستان",
      center: "گرگان",
      latitude: "36.500",
      longitude: "54.250",
      id: 24,
    },
    {
      name: "گيلان",
      center: "رشت",
      latitude: "37.160",
      longitude: "49.350",
      id: 25,
    },
    {
      name: "لرستان",
      center: "خرم آباد",
      latitude: "33.290",
      longitude: "48.210",
      id: 26,
    },
    {
      name: "مازندران",
      center: "ساري",
      latitude: "36.330",
      longitude: "53.30",
      id: 27,
    },
    {
      name: "مرکزی",
      center: "اراک",
      latitude: "34.50",
      longitude: "49.410",
      id: 28,
    },
    {
      name: "هرمزگان",
      center: "بندرعباس",
      latitude: "56.266",
      longitude: "27.18",
      id: 29,
    },
    {
      name: "همدان",
      center: "همدان",
      latitude: "34.470",
      longitude: "48.300",
      id: 30,
    },
    {
      name: "يزد",
      center: "يزد",
      latitude: "31.530",
      longitude: "54.210",
      id: 31,
    },
  ]);
};

const getCities = (req, res) => {
  switch (req.query.state) {
    case "آذربايجان شرقی":
      res.status(200).json({
        name: "آذربايجان شرقی",
        center: "تبریز",
        latitude: "38.50",
        longitude: "46.180",
        cities: [
          {
            name: "تبريز",
            latitude: "38.50",
            longitude: "46.180",
            id: 1,
          },
          {
            name: "مراغه",
            latitude: "37.2335",
            longitude: "46.1439",
            id: 2,
          },
          {
            name: "ميانه",
            latitude: "37.230",
            longitude: "47.450",
            id: 3,
          },
          {
            name: "شبستر",
            latitude: "38.1048",
            longitude: "45.429",
            id: 4,
          },
          {
            name: "مرند",
            latitude: "38.260",
            longitude: "45.470",
            id: 5,
          },
          {
            name: "جلفا",
            latitude: "38.5622",
            longitude: "45.3732",
            id: 6,
          },
          {
            name: "سراب",
            latitude: "37.5629",
            longitude: "47.3210",
            id: 7,
          },
          {
            name: "هاديشهر",
            latitude: "38.510",
            longitude: "45.400",
            id: 8,
          },
          {
            name: "بناب",
            latitude: "38.260",
            longitude: "45.550",
            id: 9,
          },
          {
            name: "تسوج",
            latitude: "38.1854",
            longitude: "45.2136",
            id: 10,
          },
          {
            name: "اهر",
            latitude: "38.2839",
            longitude: "47.412",
            id: 11,
          },
          {
            name: "هريس",
            latitude: "38.1445",
            longitude: "47.659",
            id: 12,
          },
          {
            name: "هشترود",
            latitude: "37.2849",
            longitude: "47.257",
            id: 13,
          },
          {
            name: "ملكان",
            latitude: "37.839",
            longitude: "46.612",
            id: 14,
          },
          {
            name: "بستان آباد",
            latitude: "37.5044",
            longitude: "46.4951",
            id: 15,
          },
          {
            name: "ورزقان",
            latitude: "38.4048",
            longitude: "46.3931",
            id: 16,
          },
          {
            name: "اسكو",
            latitude: "37.5458",
            longitude: "46.724",
            id: 17,
          },
          {
            name: "ممقان",
            latitude: "37.5045",
            longitude: "45.5819",
            id: 18,
          },
          {
            name: "صوفیان",
            latitude: "45.98",
            longitude: "38.276",
            id: 19,
          },
          {
            name: "ایلخچی",
            latitude: "45.98",
            longitude: "37.939",
            id: 20,
          },
          {
            name: "خسروشهر",
            latitude: "46.051",
            longitude: "37.951",
            id: 21,
          },
          {
            name: "باسمنج",
            latitude: "46.492",
            longitude: "37.984",
            id: 22,
          },
          {
            name: "سهند",
            latitude: "37.5640",
            longitude: "46.74",
            id: 23,
          },
        ],
        id: 1,
      });
      break;
    case "آذربايجان غربی":
      res.status(200).json({
        name: "آذربايجان غربی",
        center: "ارومیه",
        latitude: "37.320",
        longitude: "45.40",
        cities: [
          {
            name: "اروميه",
            latitude: "37.320",
            longitude: "45.40",
            id: 1,
          },
          {
            name: "نقده",
            latitude: "36.5719",
            longitude: "45.2332",
            id: 2,
          },
          {
            name: "ماكو",
            latitude: "39.1734",
            longitude: "44.4040",
            id: 3,
          },
          {
            name: "تكاب",
            latitude: "36.2353",
            longitude: "47.76",
            id: 4,
          },
          {
            name: "خوي",
            latitude: "38.330",
            longitude: "44.570",
            id: 5,
          },
          {
            name: "مهاباد",
            latitude: "36.450",
            longitude: "45.430",
            id: 6,
          },
          {
            name: "سر دشت",
            latitude: "30.200",
            longitude: "50.130",
            id: 7,
          },
          {
            name: "چالدران",
            latitude: "39.358",
            longitude: "44.2312",
            id: 8,
          },
          {
            name: "بوكان",
            latitude: "36.3115",
            longitude: "46.1226",
            id: 9,
          },
          {
            name: "مياندوآب",
            latitude: "36.586",
            longitude: "46.612",
            id: 10,
          },
          {
            name: "سلماس",
            latitude: "38.120",
            longitude: "44.460",
            id: 11,
          },
          {
            name: "شاهين دژ",
            latitude: "36.400",
            longitude: "46.340",
            id: 12,
          },
          {
            name: "پيرانشهر",
            latitude: "36.4146",
            longitude: "45.831",
            id: 13,
          },
          {
            name: "اشنويه",
            latitude: "37.30",
            longitude: "45.70",
            id: 14,
          },
          {
            name: "پلدشت",
            latitude: "39.2026",
            longitude: "45.357",
            id: 15,
          },
        ],
        id: 2,
      });
      break;

    case "اردبيل":
      res.status(200).json({
        name: "اردبيل",
        center: "اردبیل",
        latitude: "38.140",
        longitude: "48.170",
        cities: [
          {
            name: "اردبيل",
            latitude: "38.140",
            longitude: "48.170",
            id: 1,
          },
          {
            name: "پارس آباد",
            latitude: "39.3827",
            longitude: "47.5423",
            id: 2,
          },
          {
            name: "خلخال",
            latitude: "37.3732",
            longitude: "48.3124",
            id: 3,
          },
          {
            name: "مشگين شهر",
            latitude: "38.240",
            longitude: "47.390",
            id: 4,
          },
          {
            name: "نمين",
            latitude: "38.250",
            longitude: "48.290",
            id: 5,
          },
          {
            name: "نير",
            latitude: "37.159",
            longitude: "47.5954",
            id: 6,
          },
          {
            name: "گرمي",
            latitude: "39.116",
            longitude: "48.449",
            id: 7,
          },
        ],
        id: 3,
      });
      break;
    case "اصفهان":
      res.status(200).json({
        name: "اصفهان",
        center: "اصفهان",
        latitude: "32.390",
        longitude: "51.400",
        cities: [
          {
            name: "اصفهان",
            latitude: "32.390",
            longitude: "51.400",
            id: 1,
          },
          {
            name: "فلاورجان",
            latitude: "32.3332",
            longitude: "51.3037",
            id: 2,
          },
          {
            name: "گلپايگان",
            latitude: "33.270",
            longitude: "50.170",
            id: 3,
          },
          {
            name: "دهاقان",
            latitude: "31.560",
            longitude: "51.390",
            id: 4,
          },
          {
            name: "نطنز",
            latitude: "33.4049",
            longitude: "51.5455",
            id: 5,
          },
          {
            name: "تيران",
            latitude: "32.420",
            longitude: "51.90",
            id: 6,
          },
          {
            name: "كاشان",
            latitude: "33.590",
            longitude: "51.350",
            id: 7,
          },
          {
            name: "اردستان",
            latitude: "33.2228",
            longitude: "52.2157",
            id: 8,
          },
          {
            name: "سميرم",
            latitude: "31.250",
            longitude: "51.340",
            id: 9,
          },
          {
            name: "درچه",
            latitude: "32.3647",
            longitude: "51.3311",
            id: 10,
          },
          {
            name: "کوهپایه",
            latitude: "32.436",
            longitude: "52.2618",
            id: 11,
          },
          {
            name: "مباركه",
            latitude: "29.540",
            longitude: "54.270",
            id: 12,
          },
          {
            name: "شهرضا",
            latitude: "31.5952",
            longitude: "51.5129",
            id: 13,
          },
          {
            name: "خميني شهر",
            latitude: "32.410",
            longitude: "51.320",
            id: 14,
          },
          {
            name: "نجف آباد",
            latitude: "32.380",
            longitude: "51.230",
            id: 15,
          },
          {
            name: "زرين شهر",
            latitude: "32.2346",
            longitude: "51.2248",
            id: 16,
          },
          {
            name: "آران و بيدگل",
            latitude: "34.338",
            longitude: "51.2847",
            id: 17,
          },
          {
            name: "باغ بهادران",
            latitude: "51.19",
            longitude: "32.376",
            id: 18,
          },
          {
            name: "خوانسار",
            latitude: "33.130",
            longitude: "50.190",
            id: 19,
          },
          {
            name: "علويجه",
            latitude: "33.321",
            longitude: "51.51",
            id: 20,
          },
          {
            name: "عسگران",
            latitude: "32.520",
            longitude: "50.510",
            id: 21,
          },
          {
            name: "حاجي آباد",
            latitude: "33.3622",
            longitude: "59.5957",
            id: 22,
          },
          {
            name: "تودشک",
            latitude: "32.4339",
            longitude: "52.388",
            id: 23,
          },
          {
            name: "ورزنه",
            latitude: "32.2458",
            longitude: "52.3813",
            id: 24,
          },
        ],
        id: 4,
      });
      break;
    case "ايلام":
      res.status(200).json({
        name: "ايلام",
        center: "ايلام",
        latitude: "33.380",
        longitude: "46.250",
        cities: [
          {
            name: "ايلام",
            latitude: "33.380",
            longitude: "46.250",
            id: 1,
          },
          {
            name: "مهران",
            latitude: "33.70",
            longitude: "46.100",
            id: 2,
          },
          {
            name: "دهلران",
            latitude: "32.410",
            longitude: "47.160",
            id: 3,
          },
          {
            name: "آبدانان",
            latitude: "32.5930",
            longitude: "47.2512",
            id: 4,
          },
          {
            name: "دره شهر",
            latitude: "33.823",
            longitude: "47.2233",
            id: 5,
          },
          {
            name: "ايوان",
            latitude: "33.502",
            longitude: "46.1833",
            id: 6,
          },
          {
            name: "سرابله",
            latitude: "33.4611",
            longitude: "46.3332",
            id: 7,
          },
        ],
        id: 5,
      });
      break;
    case "بوشهر":
      res.status(200).json({
        name: "بوشهر",
        center: "بوشهر",
        latitude: "28.590",
        longitude: "50.500",
        cities: [
          {
            name: "بوشهر",
            latitude: "28.590",
            longitude: "50.500",
            id: 1,
          },
          {
            name: "دير",
            latitude: "27.510",
            longitude: "51.590",
            id: 2,
          },
          {
            name: "كنگان",
            latitude: "27.500",
            longitude: "52.40",
            id: 3,
          },
          {
            name: "گناوه",
            latitude: "29.340",
            longitude: "50.310",
            id: 4,
          },
          {
            name: "خورموج",
            latitude: "51.38",
            longitude: "28.655",
            id: 5,
          },
          {
            name: "اهرم",
            latitude: "28.530",
            longitude: "51.160",
            id: 6,
          },
          {
            name: "برازجان",
            latitude: "29.160",
            longitude: "51.120",
            id: 7,
          },
          {
            name: "جم",
            latitude: "27.490",
            longitude: "52.200",
            id: 8,
          },
          {
            name: "کاکی",
            latitude: "28.200",
            longitude: "51.310",
            id: 9,
          },
          {
            name: "عسلویه",
            latitude: "27.2835",
            longitude: "52.3650",
            id: 10,
          },
        ],
        id: 6,
      });
      break;
    case "تهران":
      res.status(200).json({
        name: "تهران",
        center: "تهران",
        latitude: "35.410",
        longitude: "51.240",
        cities: [
          {
            name: "تهران",
            latitude: "35.410",
            longitude: "51.240",
            id: 1,
          },
          {
            name: "ورامين",
            latitude: "35.200",
            longitude: "51.380",
            id: 2,
          },
          {
            name: "فيروزكوه",
            latitude: "35.450",
            longitude: "52.460",
            id: 3,
          },
          {
            name: "ري",
            latitude: "35.358",
            longitude: "51.269",
            id: 4,
          },
          {
            name: "دماوند",
            latitude: "35.430",
            longitude: "52.40",
            id: 5,
          },
          {
            name: "اسلامشهر",
            latitude: "51.232",
            longitude: "35.552",
            id: 6,
          },
          {
            name: "رودهن",
            latitude: "35.4412",
            longitude: "51.5441",
            id: 7,
          },
          {
            name: "لواسان",
            latitude: "51.783",
            longitude: "35.825",
            id: 8,
          },
          {
            name: "بومهن",
            latitude: "35.4347",
            longitude: "51.5143",
            id: 9,
          },
          {
            name: "تجريش",
            latitude: "35.4816",
            longitude: "51.2532",
            id: 10,
          },
          {
            name: "فشم",
            latitude: "51.526",
            longitude: "35.931",
            id: 11,
          },
          {
            name: "كهريزك",
            latitude: "35.3103",
            longitude: "51.2135",
            id: 12,
          },
          {
            name: "پاكدشت",
            latitude: "35.2854",
            longitude: "51.4049",
            id: 13,
          },
          {
            name: "چهاردانگه",
            latitude: "51.309",
            longitude: "35.604",
            id: 14,
          },
          {
            name: "شريف آباد",
            latitude: "35.2539",
            longitude: "51.4707",
            id: 15,
          },
          {
            name: "قرچك",
            latitude: "35.2610",
            longitude: "51.3420",
            id: 16,
          },
          {
            name: "باقرشهر",
            latitude: "35.3157",
            longitude: "51.2409",
            id: 17,
          },
          {
            name: "شهريار",
            latitude: "35.3927",
            longitude: "51.335",
            id: 18,
          },
          {
            name: "رباط كريم",
            latitude: "35.2843",
            longitude: "51.449",
            id: 19,
          },
          {
            name: "قدس",
            latitude: "35.4317",
            longitude: "51.632",
            id: 20,
          },
          {
            name: "ملارد",
            latitude: "35.3927",
            longitude: "50.5835",
            id: 21,
          },
        ],
        id: 7,
      });
      break;
    case "چهارمحال بختیاری":
      res.status(200).json({
        name: "چهارمحال بختیاری",
        center: "شهركرد",
        latitude: "32.190",
        longitude: "50.510",
        cities: [
          {
            name: "شهركرد",
            latitude: "32.190",
            longitude: "50.510",
            id: 1,
          },
          {
            name: "فارسان",
            latitude: "32.1527",
            longitude: "50.3341",
            id: 2,
          },
          {
            name: "بروجن",
            latitude: "31.580",
            longitude: "51.170",
            id: 3,
          },
          {
            name: "چلگرد",
            latitude: "50.138",
            longitude: "32.462",
            id: 4,
          },
          {
            name: "اردل",
            latitude: "31.5958",
            longitude: "50.3935",
            id: 5,
          },
          {
            name: "لردگان",
            latitude: "31.310",
            longitude: "50.500",
            id: 6,
          },
        ],
        id: 8,
      });
      break;
    case "خراسان جنوبی":
      res.status(200).json({
        name: "خراسان جنوبی",
        center: "بيرجند",
        latitude: "32.5216",
        longitude: "59.1315",
        cities: [
          {
            name: "قائن",
            latitude: "33.430",
            longitude: "59.60",
            id: 1,
          },
          {
            name: "فردوس",
            latitude: "34.00",
            longitude: "58.90",
            id: 2,
          },
          {
            name: "بيرجند",
            latitude: "32.5216",
            longitude: "59.1315",
            id: 3,
          },
          {
            name: "نهبندان",
            latitude: "31.320",
            longitude: "60.20",
            id: 4,
          },
          {
            name: "سربيشه",
            latitude: "32.3432",
            longitude: "59.4755",
            id: 5,
          },
          {
            name: "طبس",
            latitude: "33.6033",
            longitude: "56.9324",
            id: 6,
          },
        ],
        id: 9,
      });
      break;
    case "خراسان رضوی":
      res.status(200).json({
        name: "خراسان رضوی",
        center: "مشهد",
        latitude: "36.170",
        longitude: "59.350",
        cities: [
          {
            name: "مشهد",
            latitude: "36.170",
            longitude: "59.350",
            id: 1,
          },
          {
            name: "نيشابور",
            latitude: "36.130",
            longitude: "58.490",
            id: 2,
          },
          {
            name: "سبزوار",
            latitude: "36.130",
            longitude: "57.400",
            id: 3,
          },
          {
            name: "كاشمر",
            latitude: "35.144",
            longitude: "58.2738",
            id: 4,
          },
          {
            name: "گناباد",
            latitude: "34.2141",
            longitude: "58.4157",
            id: 5,
          },
          {
            name: "طبس",
            latitude: "33.370",
            longitude: "56.540",
            id: 6,
          },
          {
            name: "تربت حيدريه",
            latitude: "35.1627",
            longitude: "59.139",
            id: 7,
          },
          {
            name: "خواف",
            latitude: "34.320",
            longitude: "60.50",
            id: 8,
          },
          {
            name: "تربت جام",
            latitude: "35.160",
            longitude: "60.360",
            id: 9,
          },
          {
            name: "تايباد",
            latitude: "34.440",
            longitude: "60.470",
            id: 10,
          },
          {
            name: "قوچان",
            latitude: "37.40",
            longitude: "58.320",
            id: 11,
          },
          {
            name: "سرخس",
            latitude: "36.320",
            longitude: "61.100",
            id: 12,
          },
          {
            name: "فريمان",
            latitude: "35.460",
            longitude: "59.490",
            id: 13,
          },
          {
            name: "چناران",
            latitude: "59.121",
            longitude: "36.642",
            id: 14,
          },
          {
            name: "درگز",
            latitude: "37.2640",
            longitude: "59.628",
            id: 15,
          },
          {
            name: "طرقبه",
            latitude: "36.1837",
            longitude: "59.2225",
            id: 16,
          },
        ],
        id: 10,
      });
      break;
    case "خراسان شمالی":
      res.status(200).json({
        name: "خراسان شمالی",
        center: "بجنورد",
        latitude: "37.2835",
        longitude: "57.1954",
        cities: [
          {
            name: "بجنورد",
            latitude: "37.2835",
            longitude: "57.1954",
            id: 1,
          },
          {
            name: "اسفراين",
            latitude: "37.436",
            longitude: "57.3035",
            id: 2,
          },
          {
            name: "جاجرم",
            latitude: "36.573",
            longitude: "56.2244",
            id: 3,
          },
          {
            name: "شيروان",
            latitude: "33.340",
            longitude: "46.520",
            id: 4,
          },
          {
            name: "آشخانه",
            latitude: "37.3352",
            longitude: "56.556",
            id: 5,
          },
        ],
        id: 11,
      });
      break;
    case "خوزستان":
      res.status(200).json({
        name: "خوزستان",
        center: "اهواز",
        latitude: "31.190",
        longitude: "48.410",
        cities: [
          {
            name: "اهواز",
            latitude: "31.190",
            longitude: "48.410",
            id: 1,
          },
          {
            name: "ايرانشهر",
            latitude: "27.150",
            longitude: "60.410",
            id: 2,
          },
          {
            name: "شوش",
            latitude: "32.120",
            longitude: "48.150",
            id: 3,
          },
          {
            name: "آبادان",
            latitude: "30.2024",
            longitude: "48.1814",
            id: 4,
          },
          {
            name: "خرمشهر",
            latitude: "30.2539",
            longitude: "48.118",
            id: 5,
          },
          {
            name: "مسجد سليمان",
            latitude: "31.590",
            longitude: "49.180",
            id: 6,
          },
          {
            name: "ايذه",
            latitude: "31.500",
            longitude: "49.520",
            id: 7,
          },
          {
            name: "شوشتر",
            latitude: "32.30",
            longitude: "48.510",
            id: 8,
          },
          {
            name: "انديمشك",
            latitude: "32.270",
            longitude: "48.200",
            id: 9,
          },
          {
            name: "سوسنگرد",
            latitude: "31.400",
            longitude: "48.60",
            id: 10,
          },
          {
            name: "هويزه",
            latitude: "31.2740",
            longitude: "48.428",
            id: 11,
          },
          {
            name: "دزفول",
            latitude: "32.2255",
            longitude: "48.2411",
            id: 12,
          },
          {
            name: "شادگان",
            latitude: "30.390",
            longitude: "48.400",
            id: 13,
          },
          {
            name: "بندر ماهشهر",
            latitude: "30.340",
            longitude: "49.100",
            id: 14,
          },
          {
            name: "بندر امام خميني",
            latitude: "30.250",
            longitude: "49.20",
            id: 15,
          },
          {
            name: "بهبهان",
            latitude: "30.360",
            longitude: "50.150",
            id: 16,
          },
          {
            name: "رامهرمز",
            latitude: "31.170",
            longitude: "49.360",
            id: 17,
          },
          {
            name: "باغ ملك",
            latitude: "31.310",
            longitude: "49.530",
            id: 18,
          },
          {
            name: "هنديجان",
            latitude: "30.140",
            longitude: "49.430",
            id: 19,
          },
          {
            name: "لالي",
            latitude: "32.1947",
            longitude: "49.538",
            id: 20,
          },
          {
            name: "رامشیر",
            latitude: "30.5335",
            longitude: "49.2425",
            id: 21,
          },
          {
            name: "حمیدیه",
            latitude: "31.290",
            longitude: "48.260",
            id: 22,
          },
          {
            name: "ملاثانی",
            latitude: "31.356",
            longitude: "48.5310",
            id: 23,
          },
          {
            name: "شادگان",
            latitude: "30.390",
            longitude: "48.400",
            id: 24,
          },
        ],
        id: 12,
      });
      break;
    case "زنجان":
      res.status(200).json({
        name: "زنجان",
        center: "زنجان",
        latitude: "36.400",
        longitude: "48.290",
        cities: [
          {
            name: "زنجان",
            latitude: "36.400",
            longitude: "48.290",
            id: 1,
          },
          {
            name: "ابهر",
            latitude: "36.80",
            longitude: "49.130",
            id: 2,
          },
          {
            name: "خدابنده",
            latitude: "36.00",
            longitude: "48.30",
            id: 3,
          },
          {
            name: "ماهنشان",
            latitude: "36.4440",
            longitude: "47.4022",
            id: 4,
          },
          {
            name: "خرمدره",
            latitude: "36.1240",
            longitude: "49.1147",
            id: 5,
          },
          {
            name: "آب بر",
            latitude: "36.550",
            longitude: "48.580",
            id: 6,
          },
          {
            name: "قيدار",
            latitude: "36.717",
            longitude: "48.3528",
            id: 7,
          },
        ],
        id: 13,
      });
      break;
    case "سمنان":
      res.status(200).json({
        name: "سمنان",
        center: "سمنان",
        latitude: "35.340",
        longitude: "53.230",
        cities: [
          {
            name: "سمنان",
            latitude: "35.340",
            longitude: "53.230",
            id: 1,
          },
          {
            name: "شاهرود",
            latitude: "36.250",
            longitude: "55.00",
            id: 2,
          },
          {
            name: "گرمسار",
            latitude: "35.150",
            longitude: "52.200",
            id: 3,
          },
          {
            name: "ايوانكي",
            latitude: "35.210",
            longitude: "52.40",
            id: 4,
          },
          {
            name: "دامغان",
            latitude: "36.90",
            longitude: "54.220",
            id: 5,
          },
          {
            name: "بسطام",
            latitude: "36.293",
            longitude: "54.5956",
            id: 6,
          },
        ],
        id: 14,
      });
      break;
    case "سيستان و بلوچستان":
      res.status(200).json({
        name: "سيستان و بلوچستان",
        center: "زاهدان",
        latitude: "29.320",
        longitude: "60.540",
        cities: [
          {
            name: "زاهدان",
            latitude: "29.320",
            longitude: "60.540",
            id: 1,
          },
          {
            name: "چابهار",
            latitude: "60.634",
            longitude: "25.296",
            id: 2,
          },
          {
            name: "خاش",
            latitude: "28.130",
            longitude: "61.130",
            id: 3,
          },
          {
            name: "سراوان",
            latitude: "27.2214",
            longitude: "62.203",
            id: 4,
          },
          {
            name: "زابل",
            latitude: "31.00",
            longitude: "61.320",
            id: 5,
          },
          {
            name: "سرباز",
            latitude: "26.400",
            longitude: "61.200",
            id: 6,
          },
          {
            name: "ايرانشهر",
            latitude: "27.150",
            longitude: "60.410",
            id: 7,
          },
          {
            name: "ميرجاوه",
            latitude: "29.10",
            longitude: "61.300",
            id: 8,
          },
        ],
        id: 15,
      });
      break;
    case "فارس":
      res.status(200).json({
        name: "فارس",
        center: "شيراز",
        latitude: "29.360",
        longitude: "52.310",
        cities: [
          {
            name: "شيراز",
            latitude: "29.360",
            longitude: "52.310",
            id: 1,
          },
          {
            name: "اقليد",
            latitude: "30.530",
            longitude: "52.410",
            id: 2,
          },
          {
            name: "داراب",
            latitude: "28.450",
            longitude: "54.330",
            id: 3,
          },
          {
            name: "فسا",
            latitude: "28.550",
            longitude: "53.390",
            id: 4,
          },
          {
            name: "مرودشت",
            latitude: "52.802",
            longitude: "29.874",
            id: 5,
          },
          {
            name: "آباده",
            latitude: "31.60",
            longitude: "52.400",
            id: 6,
          },
          {
            name: "كازرون",
            latitude: "29.350",
            longitude: "51.400",
            id: 7,
          },
          {
            name: "سپيدان",
            latitude: "30.1432",
            longitude: "51.5938",
            id: 8,
          },
          {
            name: "لار",
            latitude: "27.420",
            longitude: "54.190",
            id: 9,
          },
          {
            name: "فيروز آباد",
            latitude: "26.170",
            longitude: "61.250",
            id: 10,
          },
          {
            name: "جهرم",
            latitude: "28.290",
            longitude: "53.320",
            id: 11,
          },
          {
            name: "استهبان",
            latitude: "29.80",
            longitude: "54.20",
            id: 12,
          },
          {
            name: "لامرد",
            latitude: "27.300",
            longitude: "53.200",
            id: 13,
          },
          {
            name: "مهر",
            latitude: "27.330",
            longitude: "52.530",
            id: 14,
          },
          {
            name: "حاجي آباد",
            latitude: "33.3622",
            longitude: "59.5957",
            id: 15,
          },
          {
            name: "اردكان",
            latitude: "32.200",
            longitude: "53.590",
            id: 16,
          },
          {
            name: "صفاشهر",
            latitude: "30.3446",
            longitude: "53.84",
            id: 17,
          },
          {
            name: "ارسنجان",
            latitude: "29.550",
            longitude: "53.1743",
            id: 18,
          },
          {
            name: "سوريان",
            latitude: "30.2749",
            longitude: "53.2648",
            id: 19,
          },
          {
            name: "فراشبند",
            latitude: "28.530",
            longitude: "52.70",
            id: 20,
          },
          {
            name: "سروستان",
            latitude: "29.160",
            longitude: "53.130",
            id: 21,
          },
          {
            name: "زرقان",
            latitude: "29.4628",
            longitude: "52.4329",
            id: 22,
          },
          {
            name: "کوار",
            latitude: "29.1217",
            longitude: "52.4124",
            id: 23,
          },
          {
            name: "بوانات",
            latitude: "30.2915",
            longitude: "53.3534",
            id: 24,
          },
          {
            name: "خرامه",
            latitude: "53.321",
            longitude: "29.501",
            id: 25,
          },
          {
            name: "خنج",
            latitude: "27.530",
            longitude: "53.260",
            id: 26,
          },
        ],
        id: 16,
      });
      break;
    case "قزوين":
      res.status(200).json({
        name: "قزوين",
        center: "قزوين",
        latitude: "36.167",
        longitude: "50.010",
        cities: [
          {
            name: "قزوين",
            latitude: "36.167",
            longitude: "50.010",
            id: 1,
          },
          {
            name: "تاكستان",
            latitude: "36.20",
            longitude: "49.400",
            id: 2,
          },
          {
            name: "آبيك",
            latitude: "36.30",
            longitude: "50.310",
            id: 3,
          },
          {
            name: "بوئين زهرا",
            latitude: "35.466",
            longitude: "50.331",
            id: 4,
          },
        ],
        id: 17,
      });
      break;
    case "قم":
      res.status(200).json({
        name: "قم",
        center: "قم",
        latitude: "34.380",
        longitude: "50.530",
        cities: [
          {
            name: "قم",
            latitude: "34.380",
            longitude: "50.530",
            id: 1,
          },
          {
            name: "قنوات",
            latitude: "34.613",
            longitude: "51.025",
            id: 2,
          },
          {
            name: "جعفریه",
            latitude: "34.774",
            longitude: " 50.516",
            id: 3,
          },
          {
            name: "کهک",
            latitude: "34.392",
            longitude: "50.863",
            id: 4,
          },
          {
            name: "دستجرد",
            latitude: "34.549",
            longitude: "50.247",
            id: 5,
          },
          {
            name: "سلفچگان",
            latitude: "34.477",
            longitude: "50.458",
            id: 6,
          },
        ],
        id: 18,
      });
      break;
    case "البرز":
      res.status(200).json({
        name: "البرز",
        center: "کرج",
        latitude: "35.8400",
        longitude: "50.9391",
        cities: [
          {
            name: "کرج",
            latitude: "35.8400",
            longitude: "50.9391",
            id: 1,
          },
          {
            name: "طالقان",
            latitude: "36.100",
            longitude: "50.445",
            id: 2,
          },
          {
            name: "نظرآباد",
            latitude: "50.608",
            longitude: "35.956",
            id: 3,
          },
          {
            name: "اشتهارد",
            latitude: "35.430",
            longitude: "50.220",
            id: 4,
          },
          {
            name: "هشتگرد",
            latitude: "35.5742",
            longitude: "50.4048",
            id: 5,
          },
          {
            name: "كرج",
            latitude: "35.490",
            longitude: "50.580",
            id: 6,
          },
          {
            name: "ماهدشت",
            latitude: "50.813",
            longitude: "35.727",
            id: 7,
          },
        ],
        id: 19,
      });
      break;
    case "كردستان":
      res.status(200).json({
        name: "كردستان",
        center: "سنندج",
        latitude: "35.180",
        longitude: "47.10",
        cities: [
          {
            name: "سنندج",
            latitude: "35.180",
            longitude: "47.10",
            id: 1,
          },
          {
            name: "بانه",
            latitude: "35.590",
            longitude: "45.540",
            id: 2,
          },
          {
            name: "بيجار",
            latitude: "35.520",
            longitude: "47.390",
            id: 3,
          },
          {
            name: "سقز",
            latitude: "36.140",
            longitude: "46.150",
            id: 4,
          },
          {
            name: "قروه",
            latitude: "35.90",
            longitude: "47.480",
            id: 5,
          },
          {
            name: "مريوان",
            latitude: "35.310",
            longitude: "46.100",
            id: 6,
          },
          {
            name: "صلوات آباد",
            latitude: "35.160",
            longitude: "47.70",
            id: 7,
          },
          {
            name: "حسن آباد",
            latitude: "35.222",
            longitude: "51.1412",
            id: 8,
          },
        ],
        id: 20,
      });
      break;
    case "کرمان":
      res.status(200).json({
        name: "کرمان",
        center: "کرمان",
        latitude: "30.160",
        longitude: "57.40",
        cities: [
          {
            name: "کرمان",
            latitude: "30.160",
            longitude: "57.40",
            id: 1,
          },
          {
            name: "راور",
            latitude: "31.150",
            longitude: "56.510",
            id: 2,
          },
          {
            name: "انار",
            latitude: "30.550",
            longitude: "55.150",
            id: 3,
          },
          {
            name: "کوهبنان",
            latitude: "31.250",
            longitude: "56.170",
            id: 4,
          },
          {
            name: "رفسنجان",
            latitude: "30.250",
            longitude: "56.00",
            id: 5,
          },
          {
            name: "بافت",
            latitude: "29.120",
            longitude: "56.360",
            id: 6,
          },
          {
            name: "سيرجان",
            latitude: "29.270",
            longitude: "55.400",
            id: 7,
          },
          {
            name: "كهنوج",
            latitude: "27.5653",
            longitude: "57.4155",
            id: 8,
          },
          {
            name: "زرند",
            latitude: "30.500",
            longitude: "56.350",
            id: 9,
          },
          {
            name: "بم",
            latitude: "29.70",
            longitude: "58.200",
            id: 10,
          },
          {
            name: "جيرفت",
            latitude: "28.400",
            longitude: "57.440",
            id: 11,
          },
          {
            name: "بردسير",
            latitude: "29.5541",
            longitude: "56.3427",
            id: 12,
          },
        ],
        id: 21,
      });
      break;
    case "كرمانشاه":
      res.status(200).json({
        name: "كرمانشاه",
        center: "كرمانشاه",
        latitude: "34.180",
        longitude: "47.30",
        cities: [
          {
            name: "كرمانشاه",
            latitude: "34.180",
            longitude: "47.30",
            id: 1,
          },
          {
            name: "اسلام آباد غرب",
            latitude: "46.528",
            longitude: "34.111",
            id: 2,
          },
          {
            name: "كنگاور",
            latitude: "34.290",
            longitude: "47.550",
            id: 3,
          },
          {
            name: "سنقر",
            latitude: "34.470",
            longitude: "47.360",
            id: 4,
          },
          {
            name: "قصر شيرين",
            latitude: "34.310",
            longitude: "45.350",
            id: 5,
          },
          {
            name: "هرسين",
            latitude: "34.160",
            longitude: "47.350",
            id: 6,
          },
          {
            name: "صحنه",
            latitude: "34.290",
            longitude: "47.410",
            id: 7,
          },
          {
            name: "پاوه",
            latitude: "35.30",
            longitude: "46.220",
            id: 8,
          },
          {
            name: "جوانرود",
            latitude: "34.4823",
            longitude: "46.3023",
            id: 9,
          },
        ],
        id: 22,
      });
      break;
    case "كهكيلويه و بويراحمد":
      res.status(200).json({
        name: "كهكيلويه و بويراحمد",
        center: "ياسوج",
        latitude: "30.390",
        longitude: "51.350",
        cities: [
          {
            name: "ياسوج",
            latitude: "30.390",
            longitude: "51.350",
            id: 1,
          },
          {
            name: "گچساران",
            latitude: "30.2128",
            longitude: "50.4757",
            id: 2,
          },
          {
            name: "دوگنبدان",
            latitude: "50.792",
            longitude: "30.357",
            id: 3,
          },
          {
            name: "سي سخت",
            latitude: "30.520",
            longitude: "51.270",
            id: 4,
          },
          {
            name: "دهدشت",
            latitude: "30.4741",
            longitude: "50.3352",
            id: 5,
          },
        ],
        id: 23,
      });
      break;
    case "گلستان":
      res.status(200).json({
        name: "گلستان",
        center: "گرگان",
        latitude: "36.500",
        longitude: "54.250",
        cities: [
          {
            name: "گرگان",
            latitude: "36.500",
            longitude: "54.250",
            id: 1,
          },
          {
            name: "آق قلا",
            latitude: "37.10",
            longitude: "54.2757",
            id: 2,
          },
          {
            name: "گنبد كاووس",
            latitude: "37.150",
            longitude: "55.100",
            id: 3,
          },
          {
            name: "علي آباد كتول",
            latitude: "36.5429",
            longitude: "54.5148",
            id: 4,
          },
          {
            name: "كردكوی",
            latitude: "36.4748",
            longitude: "54.655",
            id: 5,
          },
          {
            name: "كلاله",
            latitude: "37.2251",
            longitude: "55.2930",
            id: 6,
          },
          {
            name: "آزاد شهر",
            latitude: "37.50",
            longitude: "55.100",
            id: 7,
          },
          {
            name: "راميان",
            latitude: "37.024",
            longitude: "55.835",
            id: 8,
          },
        ],
        id: 24,
      });
      break;
    case "گيلان":
      res.status(200).json({
        name: "گيلان",
        center: "رشت",
        latitude: "37.160",
        longitude: "49.350",
        cities: [
          {
            name: "رشت",
            latitude: "37.160",
            longitude: "49.350",
            id: 1,
          },
          {
            name: "منجيل",
            latitude: "36.440",
            longitude: "49.250",
            id: 2,
          },
          {
            name: "لنگرود",
            latitude: "37.120",
            longitude: "50.90",
            id: 3,
          },
          {
            name: "تالش",
            latitude: "37.484",
            longitude: "48.5428",
            id: 4,
          },
          {
            name: "آستارا",
            latitude: "38.2518",
            longitude: "48.5221",
            id: 5,
          },
          {
            name: "ماسوله",
            latitude: "48.99",
            longitude: "37.156",
            id: 6,
          },
          {
            name: "رودبار",
            latitude: "36.4920",
            longitude: "49.2533",
            id: 7,
          },
          {
            name: "فومن",
            latitude: "37.150",
            longitude: "49.190",
            id: 8,
          },
          {
            name: "صومعه سرا",
            latitude: "37.180",
            longitude: "49.180",
            id: 9,
          },
          {
            name: "هشتپر",
            latitude: "48.907",
            longitude: "37.797",
            id: 10,
          },
          {
            name: "ماسال",
            latitude: "37.2249",
            longitude: "49.633",
            id: 11,
          },
          {
            name: "شفت",
            latitude: "37.90",
            longitude: "49.240",
            id: 12,
          },
          {
            name: "املش",
            latitude: "37.520",
            longitude: "50.1114",
            id: 13,
          },
          {
            name: "لاهیجان",
            latitude: "37.130",
            longitude: "50.00",
            id: 14,
          },
        ],
        id: 25,
      });
      break;
    case "لرستان":
      res.status(200).json({
        name: "لرستان",
        center: "خرم آباد",
        latitude: "33.290",
        longitude: "48.210",
        cities: [
          {
            name: "خرم آباد",
            latitude: "33.290",
            longitude: "48.210",
            id: 1,
          },
          {
            name: "ماهشهر",
            latitude: "49.18",
            longitude: "30.546",
            id: 2,
          },
          {
            name: "دزفول",
            latitude: "32.2255",
            longitude: "48.2411",
            id: 3,
          },
          {
            name: "بروجرد",
            latitude: "33.550",
            longitude: "48.480",
            id: 4,
          },
          {
            name: "دورود",
            latitude: "33.2940",
            longitude: "49.425",
            id: 5,
          },
          {
            name: "اليگودرز",
            latitude: "33.230",
            longitude: "49.420",
            id: 6,
          },
          {
            name: "ازنا",
            latitude: "33.2713",
            longitude: "49.279",
            id: 7,
          },
          {
            name: "نور آباد",
            latitude: "47.972",
            longitude: "34.074",
            id: 8,
          },
          {
            name: "كوهدشت",
            latitude: "33.320",
            longitude: "47.360",
            id: 9,
          },
          {
            name: "الشتر",
            latitude: "33.522",
            longitude: "48.1546",
            id: 10,
          },
        ],
        id: 26,
      });
      break;
    case "مازندران":
      res.status(200).json({
        name: "مازندران",
        center: "ساري",
        latitude: "36.330",
        longitude: "53.30",
        cities: [
          {
            name: "ساري",
            latitude: "36.330",
            longitude: "53.30",
            id: 1,
          },
          {
            name: "آمل",
            latitude: "36.280",
            longitude: "52.220",
            id: 2,
          },
          {
            name: "بابل",
            latitude: "36.330",
            longitude: "52.410",
            id: 3,
          },
          {
            name: "بابلسر",
            latitude: "36.420",
            longitude: "52.390",
            id: 4,
          },
          {
            name: "بهشهر",
            latitude: "36.420",
            longitude: "53.330",
            id: 5,
          },
          {
            name: "تنكابن",
            latitude: "36.490",
            longitude: "50.530",
            id: 6,
          },
          {
            name: "جويبار",
            latitude: "36.380",
            longitude: "52.550",
            id: 7,
          },
          {
            name: "چالوس",
            latitude: "36.390",
            longitude: "51.250",
            id: 8,
          },
          {
            name: "رامسر",
            latitude: "37.5426",
            longitude: "50.3944",
            id: 9,
          },
          {
            name: "قائم شهر",
            latitude: "52.859",
            longitude: "36.466",
            id: 10,
          },
          {
            name: "نكا",
            latitude: "36.390",
            longitude: "53.180",
            id: 11,
          },
          {
            name: "نور",
            latitude: "36.3410",
            longitude: "52.049",
            id: 12,
          },
          {
            name: "بلده",
            latitude: "36.120",
            longitude: "51.490",
            id: 13,
          },
          {
            name: "نوشهر",
            latitude: "36.390",
            longitude: "51.300",
            id: 14,
          },
          {
            name: "محمود آباد",
            latitude: "52.278",
            longitude: "36.634",
            id: 15,
          },
        ],
        id: 27,
      });
      break;
    case "مرکزی":
      res.status(200).json({
        name: "مرکزی",
        center: "اراک",
        latitude: "34.50",
        longitude: "49.410",
        cities: [
          {
            name: "اراک",
            latitude: "34.50",
            longitude: "49.410",
            id: 1,
          },
          {
            name: "آشتيان",
            latitude: "34.320",
            longitude: "50.00",
            id: 2,
          },
          {
            name: "تفرش",
            latitude: "34.4139",
            longitude: "50.055",
            id: 3,
          },
          {
            name: "خمين",
            latitude: "33.380",
            longitude: "50.40",
            id: 4,
          },
          {
            name: "دليجان",
            latitude: "33.590",
            longitude: "50.410",
            id: 5,
          },
          {
            name: "ساوه",
            latitude: "35.117",
            longitude: "50.2124",
            id: 6,
          },
          {
            name: "محلات",
            latitude: "33.540",
            longitude: "50.280",
            id: 7,
          },
          {
            name: "شازند",
            latitude: "33.5616",
            longitude: "49.250",
            id: 8,
          },
        ],
        id: 28,
      });
      break;
    case "هرمزگان":
      res.status(200).json({
        name: "هرمزگان",
        center: "بندرعباس",
        latitude: "56.266",
        longitude: "27.18",
        cities: [
          {
            name: "بندرعباس",
            latitude: "56.266",
            longitude: "27.18",
            id: 1,
          },
          {
            name: "قشم",
            latitude: "26.580",
            longitude: "56.170",
            id: 2,
          },
          {
            name: "كيش",
            latitude: "26.320",
            longitude: "53.580",
            id: 3,
          },
          {
            name: "بندر لنگه",
            latitude: "26.340",
            longitude: "54.520",
            id: 4,
          },
          {
            name: "بستك",
            latitude: "27.160",
            longitude: "54.260",
            id: 5,
          },
          {
            name: "حاجي آباد",
            latitude: "33.3622",
            longitude: "59.5957",
            id: 6,
          },
          {
            name: "دهبارز",
            latitude: "27.2540",
            longitude: "57.126",
            id: 7,
          },
          {
            name: "ميناب",
            latitude: "27.70",
            longitude: "57.60",
            id: 8,
          },
          {
            name: "بندر جاسك",
            latitude: "25.3839",
            longitude: "57.4624",
            id: 9,
          },
          {
            name: "بندر خمیر",
            latitude: "26.570",
            longitude: "55.350",
            id: 10,
          },
          {
            name: "قشم",
            latitude: "26.580",
            longitude: "56.170",
            id: 11,
          },
        ],
        id: 29,
      });
      break;
    case "همدان":
      res.status(200).json({
        name: "همدان",
        center: "همدان",
        latitude: "34.470",
        longitude: "48.300",
        cities: [
          {
            name: "همدان",
            latitude: "34.470",
            longitude: "48.300",
            id: 1,
          },
          {
            name: "ملاير",
            latitude: "34.180",
            longitude: "48.490",
            id: 2,
          },
          {
            name: "نهاوند",
            latitude: "34.130",
            longitude: "48.210",
            id: 3,
          },
          {
            name: "رزن",
            latitude: "49.033",
            longitude: "35.39",
            id: 4,
          },
          {
            name: "اسدآباد",
            latitude: "48.123",
            longitude: "34.783",
            id: 5,
          },
          {
            name: "بهار",
            latitude: "34.5425",
            longitude: "48.2622",
            id: 6,
          },
        ],
        id: 30,
      });
      break;
    case "يزد":
      res.status(200).json({
        name: "يزد",
        center: "يزد",
        latitude: "31.530",
        longitude: "54.210",
        cities: [
          {
            name: "يزد",
            latitude: "31.530",
            longitude: "54.210",
            id: 1,
          },
          {
            name: "تفت",
            latitude: "31.450",
            longitude: "54.120",
            id: 2,
          },
          {
            name: "اردكان",
            latitude: "32.200",
            longitude: "53.590",
            id: 3,
          },
          {
            name: "ابركوه",
            latitude: "31.741",
            longitude: "53.1652",
            id: 4,
          },
          {
            name: "ميبد",
            latitude: "32.140",
            longitude: "54.10",
            id: 5,
          },
          {
            name: "طبس",
            latitude: "33.370",
            longitude: "56.540",
            id: 6,
          },
          {
            name: "بافق",
            latitude: "31.360",
            longitude: "55.240",
            id: 7,
          },
          {
            name: "مهريز",
            latitude: "31.359",
            longitude: "54.2520",
            id: 8,
          },
          {
            name: "اشكذر",
            latitude: "31.5938",
            longitude: "54.1220",
            id: 9,
          },
          {
            name: "هرات",
            latitude: "30.40",
            longitude: "54.220",
            id: 10,
          },
          {
            name: "خضرآباد",
            latitude: "53.953",
            longitude: "31.866",
            id: 11,
          },
          {
            name: "زارچ",
            latitude: "54.26",
            longitude: "31.979",
            id: 12,
          },
        ],
        id: 31,
      });
      break;
    default:
      res.status(409).json({
        message: "Send a valid state name with `state` parameter",
      });
      break;
  }
};

//>----------- module export

module.exports = { getStates, getCities };
