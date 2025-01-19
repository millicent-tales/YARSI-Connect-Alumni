import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Checkbox,
  FormGroup,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { postTracerStudy } from "../api/Api";

const provinsi = {
  "100000": "Prov. Jambi",
  "200000": "Prov. Sulawesi Tenggara",
  "210000": "Prov. Maluku",
  "320000": "Prov. Papua Barat",
  "330000": "Prov. Sulawesi Barat",
  "350000": "Luar Negeri",
  "300000": "Prov. Gorontalo",
  "180000": "Prov. Sulawesi Tengah",
  "190000": "Prov. Sulawesi Selatan",
  "270000": "Prov. Maluku Utara",
  "280000": "Prov. Banten",
  "170000": "Prov. Sulawesi Utara",
  "250000": "Prov. Papua",
  "260000": "Prov. Bengkulu",
  "240000": "Prov. Nusa Tenggara Timur",
  "110000": "Prov. Sumatera Selatan",
  "290000": "Prov. Kepulauan Bangka Belitung",
  "120000": "Prov. Lampung",
  "130000": "Prov. Kalimantan Barat",
  "340000": "Prov. Kalimantan Utara",
  "310000": "Prov. Kepulauan Riau",
  "160000": "Prov. Kalimantan Timur",
  "230000": "Prov. Nusa Tenggara Barat",
  "140000": "Prov. Kalimantan Tengah",
  "150000": "Prov. Kalimantan Selatan",
  "220000": "Prov. Bali",
  "10000": "Prov. D.K.I. Jakarta",
  "40000": "Prov. D.I. Yogyakarta",
  "60000": "Prov. Aceh",
  "20000": "Prov. Jawa Barat",
  "90000": "Prov. Riau",
  "30000": "Prov. Jawa Tengah",
  "50000": "Prov. Jawa Timur",
  "80000": "Prov. Sumatera Barat",
  "70000": "Prov. Sumatera Utara"
};


const kabupaten = {
  "10000": {
    "10100": "Kab Kepulauan Seribu",
    "16200": "Kota Jakarta Barat",
    "16000": "Kota Jakarta Pusat",
    "16300": "Kota Jakarta Selatan",
    "16400": "Kota Jakarta Timur",
    "16100": "Kota Jakarta Utara"
  },
  "100000": {
    "100100": "Kab. Batang Hari",
    "100200": "Kab. Bungo",
    "100500": "Kab. Kerinci",
    "100900": "Kab. Merangin",
    "100700": "Kab. Muaro Jambi",
    "100300": "Kab. Sarolangun",
    "100400": "Kab. Tanjung Jabung Barat",
    "100800": "Kab. Tanjung Jabung Timur",
    "100600": "Kab. Tebo",
    "106000": "Kota Jambi",
    "106100": "Kota Sungai penuh"
  },
  "110000": {
    "110700": "Kab. Banyuasin",
    "111100": "Kab. Empat Lawang",
    "110500": "Kab. Lahat",
    "110400": "Kab. Muara Enim",
    "110100": "Kab. Musi Banyuasin",
    "110600": "Kab. Musi Rawas",
    "111300": "Kab. Musi Rawas Utara",
    "111000": "Kab. Ogan Ilir",
    "110200": "Kab. Ogan Komering Ilir",
    "110300": "Kab. Ogan Komering Ulu",
    "110900": "Kab. Ogan Komering Ulu Selatan",
    "110800": "Kab. Ogan Komering Ulu Timur",
    "111200": "Kab. Penukal Abab Lematang Ilir",
    "116200": "Kota Lubuk Linggau",
    "116300": "Kota Pagar Alam",
    "116000": "Kota Palembang",
    "116100": "Kota Prabumulih"
  },
  "120000": {
    "120400": "Kab. Lampung Barat",
    "120100": "Kab. Lampung Selatan",
    "120200": "Kab. Lampung Tengah",
    "120700": "Kab. Lampung Timur",
    "120300": "Kab. Lampung Utara",
    "121100": "Kab. Mesuji",
    "120900": "Kab. Pesawaran",
    "121300": "Kab. Pesisir Barat",
    "121000": "Kab. Pringsewu",
    "120600": "Kab. Tanggamus",
    "120500": "Kab. Tulang Bawang",
    "121200": "Kab. Tulang Bawang Barat",
    "120800": "Kab. Way Kanan",
    "126000": "Kota Bandar Lampung",
    "126100": "Kota Metro"
  },
  "130000": {
    "130100": "Kab. Bengkayang",
    "130200": "Kab. Kapuas Hulu",
    "130300": "Kab. Kayong Utara",
    "130400": "Kab. Ketapang",
    "130500": "Kab. Kubu Raya",
    "130600": "Kab. Landak",
    "130700": "Kab. Melawi",
    "130800": "Kab. Mempawah",
    "130900": "Kab. Sambas",
    "131000": "Kab. Sanggau",
    "131100": "Kab. Sekadau",
    "131200": "Kab. Sintang",
    "136000": "Kota Pontianak",
    "136100": "Kota Singkawang"
  },
  "140000": {
    "140100": "Kab. Barito Selatan",
    "140200": "Kab. Barito Timur",
    "140300": "Kab. Barito Utara",
    "140400": "Kab. Gunung Mas",
    "140500": "Kab. Kapuas",
    "140600": "Kab. Katingan",
    "140700": "Kab. Kotawaringin Barat",
    "140800": "Kab. Kotawaringin Timur",
    "140900": "Kab. Lamandau",
    "141000": "Kab. Murung Raya",
    "141100": "Kab. Pulang Pisau",
    "141200": "Kab. Sukamara",
    "141300": "Kab. Seruyan",
    "146000": "Kota Palangka Raya"
  },
  "150000": {
    "150100": "Kab. Balangan",
    "150200": "Kab. Banjar",
    "150300": "Kab. Barito Kuala",
    "150400": "Kab. Hulu Sungai Selatan",
    "150500": "Kab. Hulu Sungai Tengah",
    "150600": "Kab. Hulu Sungai Utara",
    "150700": "Kab. Kotabaru",
    "150800": "Kab. Tabalong",
    "150900": "Kab. Tanah Bumbu",
    "151000": "Kab. Tanah Laut",
    "151100": "Kab. Tapin",
    "156000": "Kota Banjarbaru",
    "156100": "Kota Banjarmasin"
  },
  "160000": {
    "160100": "Kab. Berau",
    "160200": "Kab. Kutai Barat",
    "160300": "Kab. Kutai Kartanegara",
    "160400": "Kab. Kutai Timur",
    "160500": "Kab. Mahakam Ulu",
    "160600": "Kab. Paser",
    "160700": "Kab. Penajam Paser Utara",
    "166000": "Kota Balikpapan",
    "166100": "Kota Bontang",
    "166200": "Kota Samarinda"
  },
  "170000": {
    "170100": "Kab. Bolaang Mongondow",
    "170200": "Kab. Bolaang Mongondow Selatan",
    "170300": "Kab. Bolaang Mongondow Timur",
    "170400": "Kab. Bolaang Mongondow Utara",
    "170500": "Kab. Kepulauan Sangihe",
    "170600": "Kab. Kepulauan Sitaro",
    "170700": "Kab. Kepulauan Talaud",
    "170800": "Kab. Minahasa",
    "170900": "Kab. Minahasa Selatan",
    "171000": "Kab. Minahasa Tenggara",
    "171100": "Kab. Minahasa Utara",
    "176000": "Kota Bitung",
    "176100": "Kota Kotamobagu",
    "176200": "Kota Manado",
    "176300": "Kota Tomohon"
  },
  "180000": {
    "180100": "Kab. Banggai",
    "180200": "Kab. Banggai Kepulauan",
    "180300": "Kab. Banggai Laut",
    "180400": "Kab. Buol",
    "180500": "Kab. Donggala",
    "180600": "Kab. Morowali",
    "180700": "Kab. Morowali Utara",
    "180800": "Kab. Parigi Moutong",
    "180900": "Kab. Poso",
    "181000": "Kab. Sigi",
    "181100": "Kab. Tojo Una-Una",
    "181200": "Kab. Tolitoli",
    "186000": "Kota Palu"
  },
  "190000": {
    "190100": "Kab. Bantaeng",
    "190200": "Kab. Barru",
    "190300": "Kab. Bone",
    "190400": "Kab. Bulukumba",
    "190500": "Kab. Enrekang",
    "190600": "Kab. Gowa",
    "190700": "Kab. Jeneponto",
    "190800": "Kab. Kepulauan Selayar",
    "190900": "Kab. Luwu",
    "191000": "Kab. Luwu Timur",
    "191100": "Kab. Luwu Utara",
    "191200": "Kab. Maros",
    "191300": "Kab. Pangkajene dan Kepulauan",
    "191400": "Kab. Pinrang",
    "191500": "Kab. Sidenreng Rappang",
    "191600": "Kab. Sinjai",
    "191700": "Kab. Soppeng",
    "191800": "Kab. Takalar",
    "191900": "Kab. Tana Toraja",
    "192000": "Kab. Toraja Utara",
    "192100": "Kab. Wajo",
    "196000": "Kota Makassar",
    "196100": "Kota Palopo",
    "196200": "Kota Parepare"
  },
  "20000": {
  "20800": "Kab. Bandung",
  "22300": "Kab. Bandung Barat",
  "22200": "Kab. Bekasi",
  "20500": "Kab. Bogor",
  "21400": "Kab. Ciamis",
  "20700": "Kab. Cianjur",
  "21700": "Kab. Cirebon",
  "21100": "Kab. Garut",
  "21800": "Kab. Indramayu",
  "22100": "Kab. Karawang",
  "21500": "Kab. Kuningan",
  "21600": "Kab. Majalengka",
  "22500": "Kab. Pangandaran",
  "22000": "Kab. Purwakarta",
  "21900": "Kab. Subang",
  "20600": "Kab. Sukabumi",
  "21000": "Kab. Sumedang",
  "21200": "Kab. Tasikmalaya",
  "26000": "Kota Bandung",
  "26900": "Kota Banjar",
  "26500": "Kota Bekasi",
  "26100": "Kota Bogor",
  "26700": "Kota Cimahi",
  "26300": "Kota Cirebon",
  "26600": "Kota Depok",
  "26200": "Kota Sukabumi",
  "26800": "Kota Tasikmalaya"
},
"200000": {
  "200700": "Kab. Bombana",
  "200300": "Kab. Buton",
  "201400": "Kab. Buton Selatan",
  "201600": "Kab. Buton Tengah",
  "201000": "Kab. Buton Utara",
  "200400": "Kab. Kolaka",
  "201100": "Kab. Kolaka Timur",
  "200800": "Kab. Kolaka Utara",
  "200100": "Kab. Konawe",
  "201200": "Kab. Konawe Kepulauan",
  "200500": "Kab. Konawe Selatan",
  "200900": "Kab. Konawe Utara",
  "200200": "Kab. Muna",
  "201300": "Kab. Muna Barat",
  "200600": "Kab. Wakatobi",
  "206100": "Kota Baubau",
  "206000": "Kota Kendari"
},
"210000": {
  "210300": "Kab. Buru",
  "210900": "Kab. Buru Selatan",
  "210700": "Kab. Kepulauan Aru",
  "210400": "Kab. Kepulauan Tanimbar",
  "210800": "Kab. Maluku Barat Daya",
  "210100": "Kab. Maluku Tengah",
  "210200": "Kab. Maluku Tenggara",
  "210500": "Kab. Seram Bagian Barat",
  "210600": "Kab. Seram Bagian Timur",
  "216000": "Kota Ambon",
  "216100": "Kota Tual"
},
"220000": {
  "220400": "Kab. Badung",
  "220700": "Kab. Bangli",
  "220100": "Kab. Buleleng",
  "220500": "Kab. Gianyar",
  "220200": "Kab. Jembrana",
  "220800": "Kab. Karang Asem",
  "220600": "Kab. Klungkung",
  "220300": "Kab. Tabanan",
  "226000": "Kota Denpasar"
},
"230000": {
  "230600": "Kab. Bima",
  "230500": "Kab. Dompu",
  "230100": "Kab. Lombok Barat",
  "230200": "Kab. Lombok Tengah",
  "230300": "Kab. Lombok Timur",
  "230800": "Kab. Lombok Utara",
  "230400": "Kab. Sumbawa",
  "230700": "Kab. Sumbawa Barat",
  "236100": "Kota Bima",
  "236000": "Kota Mataram"
},
"240000": {
  "240600": "Kab. Alor",
  "240500": "Kab. Belu",
  "240900": "Kab. Ende",
  "240700": "Kab. Flores Timur",
  "240100": "Kab. Kupang",
  "241400": "Kab. Lembata",
  "242200": "Kab. Malaka",
  "241100": "Kab. Manggarai",
  "241600": "Kab. Manggarai Barat",
  "242000": "Kab. Manggarai Timur",
  "241700": "Kab. Nagakeo",
  "241000": "Kab. Ngada",
  "241500": "Kab. Rote-Ndao",
  "242100": "Kab. Sabu Raijua",
  "240800": "Kab. Sikka",
  "241300": "Kab. Sumba Barat",
  "241900": "Kab. Sumba Barat Daya",
  "241800": "Kab. Sumba Tengah",
  "241200": "Kab. Sumba Timur",
  "240300": "Kab. Timor Tengah Selatan",
  "240400": "Kab. Timor Tengah Utara",
  "246000": "Kota Kupang"
},
"250000": {
  "251500": "Kab. Asmat",
  "250200": "Kab. Biak Numfor",
  "251300": "Kab. Boven Digoel",
  "253500": "Kab. Deiyai",
  "253400": "Kab. Dogiyai",
  "253600": "Kab. Intan Jaya",
  "250100": "Kab. Jayapura",
  "250800": "Kab. Jaya Wijaya",
  "252000": "Kab. Keerom",
  "250300": "Kab. Kepulauan Yapen",
  "253000": "Kab. Lanny Jaya",
  "251400": "Kab. Mappi",
  "252800": "Kab. Memberamo Raya",
  "253100": "Kab. Membramo Tengah",
  "250700": "Kab. Merauke",
  "251200": "Kab. Mimika",
  "250900": "Kab. Nabire",
  "252900": "Kab. Nduga",
  "251000": "Kab. Paniai",
  "251700": "Kab. Pegunungan Bintang",
  "253300": "Kab. Puncak",
  "251100": "Kab. Puncak Jaya",
  "251900": "Kab. Sarmi",
  "252700": "Kab. Supiori",
  "251800": "Kab. Tolikara",
  "252600": "Kab. Waropen",
  "251600": "Kab. Yahukimo",
  "253200": "Kab. Yalimo",
  "256000": "Kota Jayapura"
},
"260000": {
  "260300": "Kab. Bengkulu Selatan",
  "260900": "Kab. Bengkulu Tengah",
  "260100": "Kab. Bengkulu Utara",
  "260700": "Kab. Kaur",
  "260500": "Kab. Kepahiang",
  "260600": "Kab. Lebong",
  "260400": "Kab. Muko-muko",
  "260200": "Kab. Rejang Lebong",
  "260800": "Kab. Seluma",
  "266000": "Kota Bengkulu"
},
"270000": {
    "270300": "Kab. Halmahera Barat",
    "270500": "Kab. Halmahera Selatan",
    "270200": "Kab. Halmahera Tengah",
    "270600": "Kab. Halmahera Timur",
    "270400": "Kab. Halmahera Utara",
    "270800": "Kab. Kepulauan Morotai",
    "270700": "Kab. Kepulauan Sula",
    "270100": "Kab. Pulau Taliabu",
    "276000": "Kota Ternate",
    "276100": "Kota Tidore Kepulauan"
  },
  "280000": {
    "280200": "Kab. Lebak",
    "280100": "Kab. Pandeglang",
    "280400": "Kab. Serang",
    "280300": "Kab. Tangerang",
    "286000": "Kota Cilegon",
    "286200": "Kota Serang",
    "286100": "Kota Tangerang",
    "286300": "Kota Tangerang Selatan"
  },
  "290000": {
    "290100": "Kab. Bangka",
    "290400": "Kab. Bangka Barat",
    "290500": "Kab. Bangka Selatan",
    "290300": "Kab. Bangka Tengah",
    "290200": "Kab. Belitung",
    "290600": "Kab. Belitung Timur",
    "296000": "Kota Pangkalpinang"
  },
  "30000": {
    "30400": "Kab. Banjarnegara",
    "30200": "Kab. Banyumas",
    "32500": "Kab. Batang",
    "31600": "Kab. Blora",
    "30900": "Kab. Boyolali",
    "32900": "Kab. Brebes",
    "30100": "Kab. Cilacap",
    "32100": "Kab. Demak",
    "31500": "Kab. Grobogan",
    "32000": "Kab. Jepara",
    "31300": "Kab. Karanganyar",
    "30500": "Kab. Kebumen",
    "32400": "Kab. Kendal",
    "31000": "Kab. Klaten",
    "31900": "Kab. Kudus",
    "30800": "Kab. Magelang",
    "31800": "Kab. Pati",
    "32600": "Kab. Pekalongan",
    "32700": "Kab. Pemalang",
    "30300": "Kab. Purbalingga",
    "30600": "Kab. Purworejo",
    "31700": "Kab. Rembang",
    "32200": "Kab. Semarang",
    "31400": "Kab. Sragen",
    "31100": "Kab. Sukoharjo",
    "32800": "Kab. Tegal",
    "32300": "Kab. Temanggung",
    "31200": "Kab. Wonogiri",
    "30700": "Kab. Wonosobo",
    "36000": "Kota Magelang",
    "36400": "Kota Pekalongan",
    "36200": "Kota Salatiga",
    "36300": "Kota Semarang",
    "36100": "Kota Surakarta",
    "36500": "Kota Tegal"
  },
  "300000": {
    "300100": "Kab. Boalemo",
    "300400": "Kab. Bone Bolango",
    "300200": "Kab. Gorontalo",
    "300500": "Kab. Gorontalo Utara",
    "300300": "Kab. Pohuwato",
    "306000": "Kota Gorontalo"
  },
  "310000": {
    "310100": "Kab. Bintan",
    "310200": "Kab. Karimun",
    "310500": "Kab. Kepulauan Anambas",
    "310400": "Kab. Lingga",
    "310300": "Kab. Natuna",
    "316000": "Kota Batam",
    "316100": "Kota Tanjungpinang"
  },
  "320000": {
    "320100": "Kab. Fak-Fak",
    "320200": "Kab. Kaimana",
    "320500": "Kab. Manokwari",
    "321200": "Kab. Manokwari Selatan",
    "321000": "Kab. Maybrat",
    "321100": "Kab. Pegunungan Arfak",
    "320800": "Kab. Raja Ampat",
    "320700": "Kab. Sorong",
    "320600": "Kab. Sorong Selatan",
    "320900": "Kab. Tambrauw",
    "320400": "Kab. Teluk Bintuni",
    "320300": "Kab. Teluk Wondama",
    "326000": "Kota Sorong"
  },
  "330000": {
    "330500": "Kab. Majene",
    "330400": "Kab. Mamasa",
    "330100": "Kab. Mamuju",
    "330600": "Kab. Mamuju Tengah",
    "330200": "Kab. Pasangkayu",
    "330300": "Kab. Polewali Mandar"
  },
  "340000": {
    "340200": "Kab. Bulungan",
    "340100": "Kab. Malinau",
    "340500": "Kab. Nunukan",
    "340300": "Kab. Tana Tidung",
    "346000": "Kota Tarakan"
  },
  "350000": {
    "350800": "Arab Saudi",
    "350100": "Belanda",
    "351500": "Brunei Darussalam",
    "351400": "Cina",
    "350600": "Filipina",
    "350200": "Japan",
    "350400": "Malaysia",
    "350300": "Mesir",
    "350500": "Myanmar",
    "350700": "Rusia",
    "351000": "Singapura",
    "351300": "Taiwan",
    "351200": "Thailand"
  },
  "40000": {
    "40100": "Kab. Bantul",
    "40300": "Kab. Gunung Kidul",
    "40400": "Kab. Kulon Progo",
    "40200": "Kab. Sleman",
    "46000": "Kota Yogyakarta"
  },
  "50000": {
    "52900": "Kab. Bangkalan",
    "52500": "Kab. Banyuwangi",
    "51500": "Kab. Blitar",
    "50500": "Kab. Bojonegoro",
    "52200": "Kab. Bondowoso",
    "50100": "Kab. Gresik",
    "52400": "Kab. Jember",
    "50400": "Kab. Jombang",
    "51300": "Kab. Kediri",
    "50700": "Kab. Lamongan",
    "52100": "Kab. Lumajang",
    "50800": "Kab. Madiun",
    "51000": "Kab. Magetan",
    "51800": "Kab. Malang",
    "50300": "Kab. Mojokerto",
    "51400": "Kab. Nganjuk",
    "50900": "Kab. Ngawi",
    "51200": "Kab. Pacitan",
    "52600": "Kab. Pamekasan",
    "51900": "Kab. Pasuruan",
    "51100": "Kab. Ponorogo",
    "52000": "Kab. Probolinggo",
    "52700": "Kab. Sampang",
    "50200": "Kab. Sidoarjo",
    "52300": "Kab. Situbondo",
    "52800": "Kab. Sumenep",
    "51700": "Kab. Trenggalek",
    "50600": "Kab. Tuban",
    "51600": "Kab. Tulungagung",
    "56800": "Kota Batu",
    "56500": "Kota Blitar",
    "56300": "Kota Kediri",
    "56200": "Kota Madiun",
    "56100": "Kota Malang",
    "56400": "Kota Mojokerto",
    "56600": "Kota Pasuruan",
    "56700": "Kota Probolinggo",
    "56000": "Kota Surabaya"
  },
  "60000": {
    "60600": "Kab. Aceh Barat",
    "61700": "Kab. Aceh Barat Daya",
    "60100": "Kab. Aceh Besar",
    "61600": "Kab. Aceh Jaya",
    "60700": "Kab. Aceh Selatan",
    "61300": "Kab. Aceh Singkil",
    "61400": "Kab. Aceh Tamiang",
    "60500": "Kab. Aceh Tengah",
    "60800": "Kab. Aceh Tenggara",
    "60400": "Kab. Aceh Timur",
    "60300": "Kab. Aceh Utara",
    "61900": "Kab. Bener Meriah",
    "61200": "Kab. Bireuen",
    "61800": "Kab. Gayo Lues",
    "61500": "Kab. Nagan Raya",
    "60200": "Kab. Pidie",
    "62000": "Kab. Pidie Jaya",
    "61100": "Kab. Simeulue",
    "66100": "Kota Banda Aceh",
    "66300": "Kota Langsa",
    "66200": "Kota Lhokseumawe",
    "66000": "Kota Sabang",
    "66400": "Kota Subulussalam"
  },
  "70000": {
    "70600": "Kab. Asahan",
    "72200": "Kab. Batubara",
    "70500": "Kab. Dairi",
    "70100": "Kab. Deli Serdang",
    "71900": "Kab. Humbang Hasudutan",
    "70300": "Kab. Karo",
    "70700": "Kab. Labuhan Batu",
    "72600": "Kab. Labuhan Batu Selatan",
    "72500": "Kab. Labuhan Batu Utara",
    "70200": "Kab. Langkat",
    "71500": "Kab. Mandailing Natal",
    "71100": "Kab. Nias",
    "72700": "Kab. Nias Barat",
    "71700": "Kab. Nias Selatan",
    "72800": "Kab. Nias Utara",
    "72400": "Kab. Padang Lawas",
    "72300": "Kab. Padang Lawas Utara",
    "71800": "Kab. Pakpak Bharat",
    "72000": "Kab. Samosir",
    "72100": "Kab. Serdang Bedagai",
    "70400": "Kab. Simalungun",
    "71000": "Kab. Tapanuli Selatan",
    "70900": "Kab. Tapanuli Tengah",
    "70800": "Kab. Tapanuli Utara",
    "71600": "Kab. Toba Samosir",
    "76100": "Kota Binjai",
    "76700": "Kota Gunungsitoli",
    "76000": "Kota Medan",
    "76600": "Kota Padang Sidimpuan",
    "76300": "Kota Pematangsiantar",
    "76500": "Kota Sibolga",
    "76400": "Kota Tanjung Balai",
    "76200": "Kota Tebing Tinggi"
  },
  "80000": {
    "80100": "Kab. Agam",
    "81200": "Kab. Dharmasraya",
    "81000": "Kab. Kepulauan Mentawai",
    "80300": "Kab. Lima Puluh Koto",
    "80500": "Kab. Padang Pariaman",
    "80200": "Kab. Pasaman",
    "81300": "Kab. Pasaman Barat",
    "80600": "Kab. Pesisir Selatan",
    "80800": "Kab. Sijunjung",
    "80400": "Kab. Solok",
    "81100": "Kab. Solok Selatan",
    "80700": "Kab. Tanah Datar",
    "86000": "Kota Bukittinggi",
    "86100": "Kota Padang",
    "86200": "Kota Padang Panjang",
    "86600": "Kota Pariaman",
    "86500": "Kota Payakumbuh",
    "86300": "Kota Sawah Lunto",
    "86400": "Kota Solok"
  },
  "90000": {
    "90200": "Kab. Bengkalis",
    "90500": "Kab. Indragiri Hilir",
    "90400": "Kab. Indragiri Hulu",
    "90100": "Kab. Kampar",
    "91500": "Kab. Kepulauan Meranti",
    "91400": "Kab. Kuantan Singingi",
    "90800": "Kab. Pelalawan",
    "91000": "Kab. Rokan Hilir",
    "90900": "Kab. Rokan Hulu",
    "91100": "Kab. Siak",
    "96200": "Kota Dumai",
    "96000": "Kota Pekanbaru"
  },
  "999999": {
    "999999": "Luar Negeri"
  }

  

  
};

function TracerStudyBekerja({ getStatusPekerjaanData, profileData }) {
  const [formData, setFormData] = useState({
    jenisPerusahaan: "",
    jenisPerusahaanLainnya: "",
    sumberDana: "",
    sumberDanaLainnya: "",
    aktifMencariPekerjaan: "",
    aktifMencariPekerjaanLainnya: "",
    statusPekerjaan: "",
    jumlahBulanMendapatKerja: "",
    gajiPerBulan: "",
    namaTempatKerja: "",
    waktuMencariPekerjaan: "",
    bulanMulaiMencariKerjaSebelumLulus: "",
    bulanMulaiMencariKerjaSetelahLulus: "",
    caraMencariKerja: {},
    caraMencariKerjaLainnya: "",
    kesesuaianKerja: {},
    kesesuaianKerjaLainnya: "",
    caraMencariKerjaLainnyaChecked: false,
    kesesuaianKerjaLainnyaChecked: false,
    hubunganStudiPekerjaan: "",
    kesesuaianPendidikan: "",
    jumlahPerusahaanDilamar: "",
    jumlahPerusahaanRespon: "",
    jumlahPerusahaanUndangWawancara: "",

    // Kompetensi pada saat lulus
    "etika-saat-lulus-group": "", //f1761
    "keahlian-saat-lulus-group": "", //f1763
    "bahasa-inggris-saat-lulus-group": "", //f1765
    "teknologi-saat-lulus-group": "", //f1767
    "komunikasi-saat-lulus-group": "", //f1769
    "kerja-sama-saat-lulus-group": "", //1771
    "pengembangan-saat-lulus-group": "", //f1773

    // Kompetensi yang diperlukan dalam pekerjaan
    "etika-saat-lulus-group-diperlukan": "", //f1762
    "keahlian-saat-lulus-group-diperlukan": "", //f1764
    "bahasa-inggris-saat-lulus-group-diperlukan": "", //f1766
    "teknologi-saat-lulus-group-diperlukan": "", //f1768
    "komunikasi-saat-lulus-group-diperlukan": "", //f1770
    "kerja-sama-saat-lulus-group-diperlukan": "", //f1772
    "pengembangan-saat-lulus-group-diperlukan": "", //f1774
  });

  const competencyLevels = [
    { value: "1", label: "Sangat Rendah" },
    { value: "2", label: "Rendah" },
    { value: "3", label: "Standar" },
    { value: "4", label: "Tinggi" },
    { value: "5", label: "Sangat Tinggi" },
  ];

  const competencyFields = [
    {
      label: "Etika",
      name: "etika-saat-lulus-group",
      id: "etika-saat-lulus-label",
    },
    {
      label: "Keahlian berdasarkan bidang ilmu",
      name: "keahlian-saat-lulus-group",
      id: "keahlian-saat-lulus-label",
    },
    {
      label: "Bahasa Inggris",
      name: "bahasa-inggris-saat-lulus-group",
      id: "bahasa-inggris-saat-lulus-label",
    },
    {
      label: "Penggunaan Teknologi Informasi",
      name: "teknologi-saat-lulus-group",
      id: "teknologi-saat-lulus-label",
    },
    {
      label: "Komunikasi",
      name: "komunikasi-saat-lulus-group",
      id: "komunikasi-saat-lulus-label",
    },
    {
      label: "Kerja Sama Tim",
      name: "kerja-sama-saat-lulus-group",
      id: "kerja-sama-saat-lulus-label",
    },
    {
      label: "Pengembangan",
      name: "pengembangan-saat-lulus-group",
      id: "pengembangan-saat-lulus-label",
    },
  ];

  const CompetencyRadioGroup = ({ label, name, id }) => (
    <Row className="ms-4 mt-4">
      {/* Kolom label dengan lebar tetap */}
      <Col
        xs={5}
        className="d-flex align-items-center"
        style={{ paddingRight: "10px" }}
      >
        {label}
      </Col>
      {/* Kolom radio group dengan lebar sisa */}
      <Col xs={7} className="d-flex align-items-center">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby={id}
            name={name}
            value={formData[name] || ""}
            onChange={handleRadioChange(name)}
          >
            {competencyLevels.map((level) => (
              <FormControlLabel
                key={level.value}
                value={level.value}
                control={<Radio />}
                label={level.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Col>
    </Row>
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRadioChange = (groupName) => (event) => {
    const { value } = event.target;

    setFormData((prevState) => {
      const updatedState = {
        ...prevState,
        [groupName]: value,
      };

      if (groupName === "waktuMencariPekerjaan") {
        if (value === "1") {
          updatedState.bulanMulaiMencariKerjaSetelahLulus = "";
        } else if (value === "2") {
          updatedState.bulanMulaiMencariKerjaSebelumLulus = "";
        } else if (value === "3") {
          updatedState.bulanMulaiMencariKerjaSebelumLulus = "";
          updatedState.bulanMulaiMencariKerjaSetelahLulus = "";
        }
      }

      if (groupName === "jenisPerusahaan" && value !== "5") {
        updatedState.jenisPerusahaanLainnya = "";
      }

      if (groupName === "sumberDana" && value !== "7") {
        updatedState.sumberDanaLainnya = "";
      }

      if (groupName === "aktifMencariPekerjaan" && value !== "5") {
        updatedState.aktifMencariPekerjaanLainnya = "";
      }

      return updatedState;
    });
  };

  const handleTextChange = (event, field) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleCheckboxChangeCaraMencariPekerjaan = (e, label) => {
    const isChecked = e.target.checked;

    setFormData((prev) => {
      const updatedState = {
        ...prev,
        caraMencariKerja: {
          ...prev.caraMencariKerja,
          [label]: isChecked ? 1 : 0,
        },
      };

      // Jika "Lainnya" dipilih, aktifkan TextField; jika tidak, reset
      if (label === "Lainnya") {
        updatedState.caraMencariKerjaLainnyaChecked = isChecked;
        if (!isChecked) {
          updatedState.caraMencariKerjaLainnya = "";
        }
      }

      return updatedState;
    });
  };

  // Fungsi untuk menangani perubahan pada text field "Lainnya"
  const handleCaraMencariKerjaLainnyaChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      caraMencariKerjaLainnya: e.target.value,
    }));
  };

  // Fungsi untuk menangani perubahan pada checkbox "Kesesuaian Kerja"
  const handleCheckboxChangeKesesuaianKerja = (e, label) => {
    const isChecked = e.target.checked;

    setFormData((prev) => {
      const updatedState = {
        ...prev,
        kesesuaianKerja: {
          ...prev.kesesuaianKerja,
          [label]: isChecked ? 1 : 0,
        },
      };

      // Jika "Lainnya" dipilih, aktifkan TextField; jika tidak, reset
      if (label === "Lainnya") {
        updatedState.kesesuaianKerjaLainnyaChecked = isChecked;
        if (!isChecked) {
          updatedState.kesesuaianKerjaLainnya = "";
        }
      }

      return updatedState;
    });
  };

  // Fungsi untuk menangani perubahan pada text field "Lainnya"
  const handleKesesuaianKerjaLainnyaChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      kesesuaianKerjaLainnya: value,
    }));
  };

  const isJenisPerusahaanLainnya = formData.jenisPerusahaan === "5";
  const isSumberDanaLainnya = formData.sumberDana === "7";
  const isAktifMencariPekerjaanLainnya = formData.aktifMencariPekerjaan === "5";

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };

  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleProvinceChange = (event) => {
    const selected = event.target.value;
    setSelectedProvince(selected);
    setCities(kabupaten[selected] || {});
    setSelectedCity(""); // Reset kota/kabupaten jika provinsi berubah
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const [tingkatTempatKerja, setTingkatTempatKerja] = useState("");

  const handleTingkatTempatKerjaChange = (event) => {
    setTingkatTempatKerja(event.target.value);
  };

  const [metodePembelajaran, setMetodePembelajaran] = useState({
    f21: "", // Perkuliahan
    f22: "", // Demonstrasi
    f23: "", // Partisipasi dalam proyek riset
    f24: "", // Magang
    f25: "", // Praktikum
    f26: "", // Kerja Lapangan
    f27: "", // Diskusi
  });

  const handleMetodePembelajaranChange = (key) => (event) => {
    const { value } = event.target;
    setMetodePembelajaran((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const caraMencariKerjaMap = {
    "Melalui iklan di koran/majalah, brosur": "f401",
    "Melamar ke perusahaan tanpa mengetahui lowongan yang ada": "f402",
    "Pergi ke bursa/pameran kerja": "f403",
    "Mencari lewat internet/iklan online/milis": "f404",
    "Dihubungi oleh perusahaan": "f405",
    "Menghubungi Kemenakertrans": "f406",
    "Menghubungi agen tenaga kerja komersial/swasta": "f407",
    "Memeroleh informasi dari pusat/kantor pengembangan karier fakultas/universitas":
      "f408",
    "Menghubungi kantor kemahasiswaan/hubungan alumni": "f409",
    "Membangung jejaring (network) sejak masih kuliah": "f410",
    "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)": "f411",
    "Membangun bisnis sendiri": "f412",
    "Melalui penempatan kerja atau magang": "f413",
    "Bekerja di tempat yang sama dengan tempat kerja semasa kuliah": "f414",
    Lainnya: "f415", // Default untuk "Lainnya"
  };

  const kesesuaianKerjaMap = {
    "Pertanyaan tidak sesuai; pekerjaan saya sekarang sudah sesuai dengan pendidikan saya.":
      "f1601",
    "Saya belum mendapatkan pekerjaan yang lebih sesuai.": "f1602",
    "Di pekerjaan ini saya memeroleh prospek karier yang baik.": "f1603",
    "Saya lebih suka bekerja di area pekerjaan yang tidak ada hubungannya dengan pendidikan saya":
      "f1604",
    "Saya dipromosikan ke posisi yang kurang berhubungan dengan pendidikan saya dibanding posisi sebelumnya.":
      "f1605",
    "Saya dapat memeroleh pendapatan yang lebih tinggi di pekerjaan ini.":
      "f1606",
    "Pekerjaan saya saat ini lebih aman/terjamin/secure": "f1607",
    "Pekerjaan saya saat ini lebih menarik.": "f1608",
    "Pekerjaan saya saat ini lebih memungkinkan saya mengambil pekerjaan tambahan/jadwal yang fleksibel, dll.":
      "f1609",
    "Pekerjaan saya saat ini lokasinya lebih dekat dari rumah saya.": "f1610",
    "Pekerjaan saya saat ini dapat lebih menjamin kebutuhan keluarga saya.":
      "f1611",
    "Pada awal meniti karier ini, saya harus menerima pekerjaan yang tidak berhubungan dengan pendidikan saya.":
      "f1612",
    Lainnya: "f1613", // untuk Lainnya
  };

  const handleSubmit = async () => {
    try {
      // Validasi untuk wajib diisi
      if (!formData.jumlahBulanMendapatKerja) {
        setSnackbarMessage("Jumlah bulan mendapat kerja wajib diisi!");
        setOpenSnackbar(true);
        return;
      }

      if (!formData.hubunganStudiPekerjaan) {
        setSnackbarMessage("Hubungan studi dengan pekerjaan wajib diisi!");
        setOpenSnackbar(true);
        return;
      }

      if (!formData.kesesuaianPendidikan) {
        setSnackbarMessage("Kesesuaian pendidikan wajib diisi!");
        setOpenSnackbar(true);
        return;
      }

      const competencyMapping = {
        // Kompetensi pada saat lulus
        "etika-saat-lulus-group": "f1761",
        "keahlian-saat-lulus-group": "f1763",
        "bahasa-inggris-saat-lulus-group": "f1765",
        "teknologi-saat-lulus-group": "f1767",
        "komunikasi-saat-lulus-group": "f1769",
        "kerja-sama-saat-lulus-group": "f1771",
        "pengembangan-saat-lulus-group": "f1773",

        // Kompetensi yang diperlukan
        "etika-saat-lulus-group-diperlukan": "f1762",
        "keahlian-saat-lulus-group-diperlukan": "f1764",
        "bahasa-inggris-saat-lulus-group-diperlukan": "f1766",
        "teknologi-saat-lulus-group-diperlukan": "f1768",
        "komunikasi-saat-lulus-group-diperlukan": "f1770",
        "kerja-sama-saat-lulus-group-diperlukan": "f1772",
        "pengembangan-saat-lulus-group-diperlukan": "f1774",
      };

      // Data yang akan dikirim ke backend
      const dataToSend = {
        nimhsmsmh: profileData?.studentIdentificationNumber || "",
        tahun_lulus: profileData?.yearGraduated || "",
        nmmhsmsmh: profileData?.fullName || "",
        kdptimsmh: profileData?.universityCode || "",
        kdpstmsmh: profileData?.programCode || "",
        nik: profileData?.nationalIdentificationNumber || "",
        telpomsmh: formData.telephone || profileData?.telephone || "",
        emailmsmh: (formData.email || profileData?.email || "").trim(),
        npwp: formData.npwp || "",
        f8: parseInt(getStatusPekerjaanData(), 10),
        f502: parseInt(formData.jumlahBulanMendapatKerja, 10),
        f505: parseInt(formData.gajiPerBulan, 10),
        f5a1: selectedProvince || "",
        f5a2: selectedCity || "",
        f1101: parseInt(formData.jenisPerusahaan, 10),
        f1102: formData.jenisPerusahaanLainnya || null,
        f5b: formData.namaTempatKerja || "",
        f5d: parseInt(tingkatTempatKerja, 10) || 0,
        f1201: parseInt(formData.sumberDana, 10),
        f1202: formData.sumberDanaLainnya || null,
        f301: parseInt(formData.waktuMencariPekerjaan, 10),
        f302: parseInt(formData.bulanMulaiMencariKerjaSebelumLulus, 10) || null,
        f303: parseInt(formData.bulanMulaiMencariKerjaSetelahLulus, 10) || null,
        f14: parseInt(formData.hubunganStudiPekerjaan, 10) || null,
        f15: parseInt(formData.kesesuaianPendidikan, 10) || null,
        f21: parseInt(metodePembelajaran.f21, 10) || 0,
        f22: parseInt(metodePembelajaran.f22, 10) || 0,
        f23: parseInt(metodePembelajaran.f23, 10) || 0,
        f24: parseInt(metodePembelajaran.f24, 10) || 0,
        f25: parseInt(metodePembelajaran.f25, 10) || 0,
        f26: parseInt(metodePembelajaran.f26, 10) || 0,
        f27: parseInt(metodePembelajaran.f27, 10) || 0,
        ...Object.entries(competencyMapping).reduce((acc, [field, code]) => {
          acc[code] = parseInt(formData[field], 10) || 0;
          return acc;
        }, {}),
        ...Object.keys(caraMencariKerjaMap).reduce((acc, label) => {
          acc[caraMencariKerjaMap[label]] = formData.caraMencariKerja[label]
            ? 1
            : 0;
          return acc;
        }, {}),
        f415: formData.caraMencariKerjaLainnyaChecked ? 1 : 0,
        f416: formData.caraMencariKerjaLainnya || null,
        f6: parseInt(formData.jumlahPerusahaanDilamar, 10) || 0,
        f7: parseInt(formData.jumlahPerusahaanRespon, 10) || 0,
        f7a: parseInt(formData.jumlahPerusahaanUndangWawancara, 10) || 0,
        f1001: parseInt(formData.aktifMencariPekerjaan, 10) || 0,
        f1002: formData.aktifMencariPekerjaanLainnya || null,
        ...Object.keys(kesesuaianKerjaMap).reduce((acc, label) => {
          acc[kesesuaianKerjaMap[label]] = formData.kesesuaianKerja[label]
            ? 1
            : 0;
          return acc;
        }, {}),
        f1613: formData.kesesuaianKerjaLainnyaChecked ? 1 : 0,
        f1614: formData.kesesuaianKerjaLainnya || null,
      };

      await postTracerStudy(dataToSend);
      setSnackbarMessage("Data berhasil dikirim!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(
        "Error sending data to backend:",
        error.response?.data || error
      );
      setSnackbarMessage(
        error.response?.data?.message || "Gagal mengirim data. Coba lagi."
      );
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container className="mt-3">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage.includes("berhasil") ? "success" : "warning"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Row>
        <Form.Group>
          {/*f502*/}
          <p>
            2. Dalam berapa bulan Anda mendapatkan pekerjaan pertama?{" "}
            <span style={{ color: "red" }}>*</span>
          </p>
          <TextField
            className="ms-3"
            variant="outlined"
            id="jumlah-bulan-mendapat-kerja"
            label="Masukkan jumlah bulan"
            type="number"
            value={formData.jumlahBulanMendapatKerja}
            onChange={(event) =>
              handleTextChange(event, "jumlahBulanMendapatKerja")
            }
            sx={{
              width: "500px",
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-4 mt-4">
        <Form.Group>
          {/*f505*/}
          <p>3. Berapa rata-rata pendapatan Anda per bulan? (take home pay?)</p>

          <TextField
            className="ms-3"
            variant="outlined"
            id="rata-rata-pendapatan-per-bulan"
            label="Masukkan rata-rata pendapatan per bulan!"
            type="number"
            value={formData.gajiPerBulan}
            onChange={(event) => handleTextChange(event, "gajiPerBulan")}
            sx={{
              width: "500px",
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-4 d-flex align-items-center">
        <p>4. Dimana lokasi tempat Anda bekerja?</p>

        <div className="d-flex justify-content-between w-100">
          <Row className="w-100">
            {/* Select Provinsi */}
            <Col xs={6} className="pe-3">
              <FormControl fullWidth>
                <InputLabel id="select-provinsi-label">Provinsi</InputLabel>
                <Select
                  labelId="select-provinsi-label"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  label="Provinsi"
                >
                  {Object.entries(provinsi).map(([code, name]) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>

            {/* Select Kabupaten/Kota */}
            <Col xs={6}>
              <FormControl fullWidth disabled={!selectedProvince}>
                <InputLabel id="select-kabupaten-label">
                  Kabupaten/Kota
                </InputLabel>
                <Select
                  labelId="select-kabupaten-label"
                  value={selectedCity}
                  onChange={handleCityChange}
                  label="Kabupaten/Kota"
                >
                  {Object.entries(cities).map(([code, name]) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>
          </Row>
        </div>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          {/*f1101*/}
          <p>
            5. Apa jenis perusahaan/instansi/institusi tempat Anda bekerja
            sekarang?
          </p>
          <FormControl className="ms-3">
            <RadioGroup
              aria-labelledby="jenis-perusahaan-label"
              value={formData.jenisPerusahaan}
              onChange={handleRadioChange("jenisPerusahaan")}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Instansi Pemerintah"
              />
              <FormControlLabel
                value="6"
                control={<Radio />}
                label="BUMN/BUMD"
              />
              <FormControlLabel
                value="7"
                control={<Radio />}
                label="Institusi/Organisasi Multilateral"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Organisasi non-profit/Lembaga Swadaya Masyarakat"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Perusahaan Swasta"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Wiraswasta/perusahaan sendiri"
              />
              <FormControlLabel value="5" control={<Radio />} label="Lainnya" />
            </RadioGroup>

            {/*f1102*/}
            <TextField
              className="mt-3"
              id="jenis-perusahaan-lainnya"
              label="Masukkan jenis perusahaan Anda!"
              variant="outlined"
              disabled={!isJenisPerusahaanLainnya}
              value={formData.jenisPerusahaanLainnya || ""}
              onChange={(e) => handleTextChange(e, "jenisPerusahaanLainnya")}
              sx={{
                width: "500px",
              }}
            />
          </FormControl>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group>
          {/*f5b*/}
          <p>6. Apa nama perusahaan/kantor tempat Anda bekerja?</p>
          <TextField
            className="ms-3"
            variant="outlined"
            id="nama-tempat-kerja"
            label="Masukkan nama tempat kerja Anda!"
            value={formData.namaTempatKerja}
            onChange={(event) => handleTextChange(event, "namaTempatKerja")}
            sx={{
              width: "500px",
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group>
          {/*f5d*/}
          <p>7. Apa tingkat tempat kerja Anda?</p>
          <FormControl sx={{ m: 1, width: 500 }} className="ms-3">
            <InputLabel id="tingkat-tempat-kerja-label">
              Pilih tingkat tempat kerja Anda!
            </InputLabel>
            <Select
              labelId="tingkat-tempat-kerja-label"
              id="tingkat-tempat-kerja-select"
              value={tingkatTempatKerja}
              label="Tingkat Tempat Kerja"
              onChange={handleTingkatTempatKerjaChange}
              input={<OutlinedInput label="Pilih tingkat tempat kerja Anda!" />}
              MenuProps={MenuProps}
            >
              <MenuItem value={1}>
                Lokal/Wilayah/Wiraswasta tidak berbadan hukum
              </MenuItem>
              <MenuItem value={2}>Nasional/Wiraswasta berbadan hukum</MenuItem>
              <MenuItem value={3}>Multinasional/Internasional</MenuItem>
            </Select>
          </FormControl>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        {/*f14*/}
        <Form.Group>
          <p>
            8. Seberapa erat hubungan bidang studi dengan pekerjaan Anda?{" "}
            <span style={{ color: "red" }}>*</span>
          </p>
          <FormControl className="ms-3">
            <RadioGroup
              value={formData.hubunganStudiPekerjaan}
              onChange={handleRadioChange("hubunganStudiPekerjaan")}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Sangat Erat"
              />
              <FormControlLabel value="2" control={<Radio />} label="Erat" />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Cukup Erat"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Kurang Erat"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="Tidak Sama Sekali"
              />
            </RadioGroup>
          </FormControl>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group>
          {/*f15*/}
          <p>
            9. Tingkat pendidikan apa yang paling tepat/sesuai untuk pekerjaan
            Anda saat ini? <span style={{ color: "red" }}>*</span>
          </p>
          <FormControl className="ms-3">
            <RadioGroup
              value={formData.kesesuaianPendidikan}
              onChange={handleRadioChange("kesesuaianPendidikan")}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Setingkat Lebih Tinggi"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Tingkat yang Sama"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Setingkat Lebih Rendah"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Tidak Perlu Pendidikan Tinggi"
              />
            </RadioGroup>
          </FormControl>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group>
          {/*f1201*/}
          <p>
            10. Sebutkan sumber dana dalam pembiayaan kuliah!
            <span style={{ color: "red" }}>*</span> (bukan ketika Studi Lanjut)
          </p>
          <FormControl className="ms-3">
            <RadioGroup
              aria-labelledby="sumber-dana-kuliah-label"
              value={formData.sumberDana}
              onChange={handleRadioChange("sumberDana")}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Biaya Sendiri/Keluarga"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Beasiswa ADIK"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Beasiswa BIDIKMISI"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Beasiswa PPA"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="Beasiswa AFIRMASI"
              />
              <FormControlLabel
                value="6"
                control={<Radio />}
                label="Beasiswa Perusahaan/Swasta"
              />
              <FormControlLabel value="7" control={<Radio />} label="Lainnya" />
            </RadioGroup>

            {/*f1202*/}
            <TextField
              className="mt-3"
              id="beasiswa-lainnya"
              label="Masukkan beasiswa Anda!"
              variant="outlined"
              disabled={!isSumberDanaLainnya}
              value={formData.sumberDanaLainnya || ""}
              onChange={(e) => handleTextChange(e, "sumberDanaLainnya")}
              sx={{
                width: "500px",
              }}
            />
          </FormControl>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <p>
          11. Isilah Pertanyaan Kompetensi di Bawah Ini!{" "}
          <span style={{ color: "red" }}>*</span>
        </p>
        <p className="ms-4">
          A. Pada saat lulus, pada tingkat mana kompetensi di bawah ini Anda
          kuasai?
        </p>
        {competencyFields.map((field) => (
          <CompetencyRadioGroup
            key={field.name}
            label={field.label}
            name={field.name}
            id={field.id}
          />
        ))}

        <p className="ms-4 mt-4">
          B. Pada saat ini, pada tingkat mana kompetensi di bawah ini diperlukan
          dalam pekerjaan?
        </p>
        {competencyFields.map((field) => (
          <CompetencyRadioGroup
            key={`${field.name}-diperlukan`}
            label={field.label}
            name={`${field.name}-diperlukan`} // Nama berubah untuk kompetensi yang diperlukan
            id={`${field.id}-diperlukan`}
          />
        ))}
      </Row>

      <Row className="mb-4 mt-4">
        <p>
          12. Menurut Anda seberapa besar penekanan pada metode pembelajaran di
          bawah ini dilaksanakan di program studi Anda?
        </p>

        <Row className="ms-3 mb-3 mt-3">
          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-perkuliahan-label">Perkuliahan</FormLabel>
              <RadioGroup
                aria-labelledby="metode-perkuliahan-label"
                name="metode-perkuliahan-group"
                onChange={handleMetodePembelajaranChange("f21")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-demonstrasi-label">Demonstrasi</FormLabel>
              <RadioGroup
                aria-labelledby="metode-demonstrasi-label"
                name="metode-demonstrasi-group"
                onChange={handleMetodePembelajaranChange("f22")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-partisipasi-riset-label">
                Partisipasi dalam proyek riset
              </FormLabel>
              <RadioGroup
                aria-labelledby="metode-partisipasi-riset-label"
                name="metode-partisipasi-riset-group"
                onChange={handleMetodePembelajaranChange("f23")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        <Row className="ms-3 mb-3 mt-3">
          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-magang-label">Magang</FormLabel>
              <RadioGroup
                aria-labelledby="metode-magang-label"
                name="metode-magang-group"
                onChange={handleMetodePembelajaranChange("f24")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-praktikum-label">Praktikum</FormLabel>
              <RadioGroup
                aria-labelledby="metode-praktikum-label"
                name="metode-praktikum-group"
                onChange={handleMetodePembelajaranChange("f25")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>

          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-kerja-lapangan-label">
                Kerja Lapangan
              </FormLabel>
              <RadioGroup
                aria-labelledby="metode-kerja-lapangan-label"
                name="metode-kerja-lapangan-group"
                onChange={handleMetodePembelajaranChange("f26")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>

        <Row className="ms-3 mb-3 mt-3">
          <Col xs={4}>
            <FormControl>
              <FormLabel id="metode-diskusi-label">Diskusi</FormLabel>
              <RadioGroup
                aria-labelledby="metode-diskusi-label"
                name="metode-diskusi-group"
                onChange={handleMetodePembelajaranChange("f27")}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Sangat Besar"
                />
                <FormControlLabel value="2" control={<Radio />} label="Besar" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Cukup Besar"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Kurang Besar"
                />
                <FormControlLabel
                  value="5"
                  control={<Radio />}
                  label="Tidak Sama Sekali"
                />
              </RadioGroup>
            </FormControl>
          </Col>
        </Row>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          <p>
            13. Kapan Anda mulai mencari pekerjaan? (Mohon pekerjaan sambilan
            tidak dimasukkan)
          </p>
          <FormControl className="ms-4">
            {/*f301 */}
            <RadioGroup
              aria-labelledby="waktu-mencari-pekerjaan-label"
              value={formData.waktuMencariPekerjaan}
              onChange={handleRadioChange("waktuMencariPekerjaan")}
              name="waktu-mencari-pekerjaan-group"
            >
              <FormControlLabel
                className="mt-4"
                value="1"
                control={<Radio />}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Kira-kira</span>
                    {/*f302 */}
                    <TextField
                      id="sebelum-lulus"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={formData.bulanMulaiMencariKerjaSebelumLulus}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          bulanMulaiMencariKerjaSebelumLulus:
                            event.target.value,
                        })
                      }
                      sx={{ margin: "0 8px", width: "80px" }}
                      disabled={formData.waktuMencariPekerjaan !== "1"}
                    />
                    <span>bulan sebelum lulus</span>
                  </div>
                }
              />

              {/*f301 */}
              <FormControlLabel
                className="mt-4"
                value="2"
                control={<Radio />}
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span>Kira-kira</span>
                    {/*f303 */}
                    <TextField
                      id="sesudah-lulus"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={formData.bulanMulaiMencariKerjaSetelahLulus}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          bulanMulaiMencariKerjaSetelahLulus:
                            event.target.value,
                        })
                      }
                      sx={{ margin: "0 8px", width: "80px" }}
                      disabled={formData.waktuMencariPekerjaan !== "2"}
                    />
                    <span>bulan sesudah lulus</span>
                  </div>
                }
              />

              {/*f301 */}
              <FormControlLabel
                className="mt-4"
                value="3"
                control={<Radio />}
                label="Saya tidak mencari kerja"
              />
            </RadioGroup>
          </FormControl>
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <p>
          14. Bagaimana Anda mencari pekerjaan tersebut? Jawaban bisa lebih dari
          satu
        </p>
        <FormGroup className="ms-4">
          {Object.keys(caraMencariKerjaMap).map((label, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChangeCaraMencariPekerjaan(e, label)
                  }
                  checked={!!formData.caraMencariKerja[label]}
                />
              }
              label={label}
            />
          ))}

          {/* TextField untuk "Lainnya" */}
          <TextField
            className="mt-3"
            id="cara-mencari-kerja-lainnya"
            label="Masukkan jawaban Anda!"
            variant="outlined"
            disabled={!formData.caraMencariKerjaLainnyaChecked}
            value={formData.caraMencariKerjaLainnya}
            onChange={handleCaraMencariKerjaLainnyaChange}
            sx={{ width: "500px" }}
          />
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <FormGroup>
          {/* f6 */}
          <p>
            15. Berapa perusahaan/instansi/institusi yang sudah Anda lamar?
            (lewat surat atau email) sebelum Anda memroleh pekerjaan pertama?
          </p>
          <Row className="ms-3 align-items-center">
            <Col className="col-auto">
              <TextField
                id="jumlahPerusahaanDilamar" // ID sesuai dengan key di state
                label="Masukkan jawaban Anda!"
                variant="outlined"
                type="number"
                value={formData.jumlahPerusahaanDilamar} // Nilai dari state
                onChange={(e) => handleTextChange(e, "jumlahPerusahaanDilamar")} // Panggil fungsi untuk menangani perubahan
                sx={{
                  width: "500px",
                }}
              />
            </Col>
            <Col className="text-start d-flex align-items-center">
              perusahaan/instansi/institusi
            </Col>
          </Row>
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <FormGroup>
          {/* f7 */}
          <p>
            16. Berapa perusahaan/instansi/institusi yang merespon lamaran Anda?
          </p>
          <Row className="ms-3 align-items-center">
            <Col className="col-auto">
              <TextField
                id="jumlahPerusahaanRespon" // ID sesuai dengan key di state
                label="Masukkan jawaban Anda!"
                variant="outlined"
                type="number"
                value={formData.jumlahPerusahaanRespon} // Nilai dari state
                onChange={(e) => handleTextChange(e, "jumlahPerusahaanRespon")} // Panggil fungsi untuk menangani perubahan
                sx={{
                  width: "500px",
                }}
              />
            </Col>
            <Col className="text-start d-flex align-items-center">
              perusahaan/instansi/institusi
            </Col>
          </Row>
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <FormGroup>
          {/* f7a */}
          <p>
            17. Berapa perusahaan/instansi/intitusi yang mengundang Anda untuk
            wawancara?
          </p>
          <Row className="ms-3 align-items-center">
            <Col className="col-auto">
              <TextField
                id="jumlahPerusahaanUndangWawancara" // ID sesuai dengan key di state
                label="Masukkan jawaban Anda!"
                variant="outlined"
                type="number"
                value={formData.jumlahPerusahaanUndangWawancara} // Nilai dari state
                onChange={(e) =>
                  handleTextChange(e, "jumlahPerusahaanUndangWawancara")
                } // Panggil fungsi untuk menangani perubahan
                sx={{
                  width: "500px",
                }}
              />
            </Col>
            <Col className="text-start d-flex align-items-center">
              perusahaan/instansi/institusi
            </Col>
          </Row>
        </FormGroup>
      </Row>

      <Row className="mb-4">
        <Form.Group>
          {/*f1001*/}
          <p>
            18. Apakah Anda aktif mencari pekerjaan dalam 4 minggu terakhir?
          </p>
          <FormControl className="ms-4">
            <RadioGroup
              aria-labelledby="aktif-mencari-pekerjaan-label"
              defaultValue=""
              name="aktif-mencari-pekerjaan-group"
              onChange={handleRadioChange("aktifMencariPekerjaan")}
            >
              <FormControlLabel value="1" control={<Radio />} label="Tidak" />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Tidak, tapi saya sedang menunggu hasil lamaran kerja"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="Ya, saya akan mulai bekerja dalam 2 minggu ke depan"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Ya, tapi saya belum pasti akan bekerja dalam 2 minggu ke depan"
              />
              <FormControlLabel value="5" control={<Radio />} label="Lainnya" />
            </RadioGroup>

            {/*f1002*/}
            <TextField
              className="mt-3"
              id="pencarian-kerja-lainnya"
              label="Masukkan jawaban Anda!"
              variant="outlined"
              disabled={!isAktifMencariPekerjaanLainnya}
              value={formData.aktifMencariPekerjaanLainnya || ""}
              onChange={(e) =>
                handleTextChange(e, "aktifMencariPekerjaanLainnya")
              }
              sx={{
                width: "500px",
              }}
            />
          </FormControl>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <p>
          19. Jika menurut Anda pekerjaan Anda saat ini tidak sesuai dengan
          pendidikan Anda, mengapa Anda mengambilnya? Jawaban bisa lebih dari
          satu
        </p>
        <FormGroup className="ms-4">
          {Object.keys(kesesuaianKerjaMap).map((label, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChangeKesesuaianKerja(e, label)
                  }
                  checked={!!formData.kesesuaianKerja[label]}
                />
              }
              label={label}
            />
          ))}

          {/* TextField untuk "Lainnya" */}
          <TextField
            className="mt-3"
            id="kesesuaian-kerja-lainnya"
            label="Masukkan jawaban Anda!"
            variant="outlined"
            disabled={!formData.kesesuaianKerjaLainnyaChecked}
            value={formData.kesesuaianKerjaLainnya}
            onChange={handleKesesuaianKerjaLainnyaChange}
            sx={{ width: "500px" }}
          />
        </FormGroup>
      </Row>

      <Button
        variant="success"
        className="ms-auto d-block mt-4 mb-4"
        onClick={handleSubmit}
      >
        Kirim
      </Button>
    </Container>
  );
}

export default TracerStudyBekerja;