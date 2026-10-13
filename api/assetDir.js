// Vercel Serverless Function: Official BikeAtRent Fleet Asset Directory & Video Redirector
// Handles /assetDir/<slug>, /assetDir/<plate>, /v/<plate>, and renders interactive /assetDir catalog

const ASSET_CATALOG = [
  {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  }
];

const ASSET_LOOKUP = {
  "PulsarN250-WB66AS0989-Black-1400-pv": {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  "pulsarn250-wb66as0989-black-1400-pv": {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  "PulsarN250-WB66AS0989-Black-1400-pv.mp4": {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  "pulsarn250-wb66as0989-black-1400-pv.mp4": {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  "WB66AS0989": {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  "wb66as0989": {
    "plate": "WB66AS0989",
    "slug": "PulsarN250-WB66AS0989-Black-1400-pv",
    "filename": "PulsarN250-WB66AS0989-Black-1400-pv.mp4",
    "category": "Bajaj Pulsar N250",
    "color": "Black",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1BYyShrY8h_Vb2Xk9fC3EX5q3GDkA4BUv/view?usp=sharing"
  },
  "PulsarNS160-WB73N4468-Blue-1250-pv": {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  "pulsarns160-wb73n4468-blue-1250-pv": {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  "PulsarNS160-WB73N4468-Blue-1250-pv.mp4": {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  "pulsarns160-wb73n4468-blue-1250-pv.mp4": {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  "WB73N4468": {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  "wb73n4468": {
    "plate": "WB73N4468",
    "slug": "PulsarNS160-WB73N4468-Blue-1250-pv",
    "filename": "PulsarNS160-WB73N4468-Blue-1250-pv.mp4",
    "category": "Bajaj Pulsar NS160",
    "color": "Blue",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1cJumqZ_n_VYDXRGs7rWjZe4NBrhxSj9C/view?usp=sharing"
  },
  "Xoom160-WB69E2267-Black-1250-pv": {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  "xoom160-wb69e2267-black-1250-pv": {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  "Xoom160-WB69E2267-Black-1250-pv.mp4": {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  "xoom160-wb69e2267-black-1250-pv.mp4": {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  "WB69E2267": {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  "wb69e2267": {
    "plate": "WB69E2267",
    "slug": "Xoom160-WB69E2267-Black-1250-pv",
    "filename": "Xoom160-WB69E2267-Black-1250-pv.mp4",
    "category": "Hero Xoom 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1b1NLupKYPDHBQXoDhau3jEWcObSGEt0a/view?usp=sharing"
  },
  "Xpulse200-WB24BG1136-Blue-1400-Commercial": {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  "xpulse200-wb24bg1136-blue-1400-commercial": {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4": {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  "xpulse200-wb24bg1136-blue-1400-commercial.mp4": {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  "WB24BG1136": {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  "wb24bg1136": {
    "plate": "WB24BG1136",
    "slug": "Xpulse200-WB24BG1136-Blue-1400-Commercial",
    "filename": "Xpulse200-WB24BG1136-Blue-1400-Commercial.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Blue",
    "rate": "\u20b91,400/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1CpDLubO8cFkY6WjxxOL0zMCfUt4fa7dk/view?usp=sharing"
  },
  "Xpulse200-WB72AB9617-Red-1400-pv": {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  "xpulse200-wb72ab9617-red-1400-pv": {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  "Xpulse200-WB72AB9617-Red-1400-pv.mp4": {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  "xpulse200-wb72ab9617-red-1400-pv.mp4": {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  "WB72AB9617": {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  "wb72ab9617": {
    "plate": "WB72AB9617",
    "slug": "Xpulse200-WB72AB9617-Red-1400-pv",
    "filename": "Xpulse200-WB72AB9617-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15it78TjpQPIZdwoFc8wNpgJyg2GTY4G0/view?usp=sharing"
  },
  "Xpulse200-WB74BQ0489-Red-1400-pv": {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  "xpulse200-wb74bq0489-red-1400-pv": {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  "Xpulse200-WB74BQ0489-Red-1400-pv.mp4": {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  "xpulse200-wb74bq0489-red-1400-pv.mp4": {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  "WB74BQ0489": {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  "wb74bq0489": {
    "plate": "WB74BQ0489",
    "slug": "Xpulse200-WB74BQ0489-Red-1400-pv",
    "filename": "Xpulse200-WB74BQ0489-Red-1400-pv.mp4",
    "category": "Hero Xpulse 200 4V",
    "color": "Red",
    "rate": "\u20b91,400/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HZih8iLU6iwN2LIDbV2jgjkEj7RFNSpk/view?usp=sharing"
  },
  "Activa125-WB74AL2367-Blue-600-pv": {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  "activa125-wb74al2367-blue-600-pv": {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  "Activa125-WB74AL2367-Blue-600-pv.mp4": {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  "activa125-wb74al2367-blue-600-pv.mp4": {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  "WB74AL2367": {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  "wb74al2367": {
    "plate": "WB74AL2367",
    "slug": "Activa125-WB74AL2367-Blue-600-pv",
    "filename": "Activa125-WB74AL2367-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DzRpm69UOiyYXjbI1wPETSmOOexfnbC/view?usp=sharing"
  },
  "Activa125-WB74AM3343-Blue-600-pv": {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  "activa125-wb74am3343-blue-600-pv": {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  "Activa125-WB74AM3343-Blue-600-pv.mp4": {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  "activa125-wb74am3343-blue-600-pv.mp4": {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  "WB74AM3343": {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  "wb74am3343": {
    "plate": "WB74AM3343",
    "slug": "Activa125-WB74AM3343-Blue-600-pv",
    "filename": "Activa125-WB74AM3343-Blue-600-pv.mp4",
    "category": "Honda Activa 125",
    "color": "Blue",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c2gVMV7nDtWNWN8cH8nN7WqoXkdX3QRI/view?usp=sharing"
  },
  "Grazia125-WB74AS5626-Grey-700-pv": {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  "grazia125-wb74as5626-grey-700-pv": {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  "Grazia125-WB74AS5626-Grey-700-pv.mp4": {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  "grazia125-wb74as5626-grey-700-pv.mp4": {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  "WB74AS5626": {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  "wb74as5626": {
    "plate": "WB74AS5626",
    "slug": "Grazia125-WB74AS5626-Grey-700-pv",
    "filename": "Grazia125-WB74AS5626-Grey-700-pv.mp4",
    "category": "Honda Grazia 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1em93pKxsq5eAbSAZ4ZjN0qnvkbQtIg1e/view?usp=sharing"
  },
  "Classic350-WB74BU4169-Red-1600-pv": {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  "classic350-wb74bu4169-red-1600-pv": {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  "Classic350-WB74BU4169-Red-1600-pv.mp4": {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  "classic350-wb74bu4169-red-1600-pv.mp4": {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  "WB74BU4169": {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  "wb74bu4169": {
    "plate": "WB74BU4169",
    "slug": "Classic350-WB74BU4169-Red-1600-pv",
    "filename": "Classic350-WB74BU4169-Red-1600-pv.mp4",
    "category": "Royal Enfield Classic 350",
    "color": "Red",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1SF5KZEVmPqHs4bjLPk0_uwlUs7XblHCs/view?usp=sharing"
  },
  "Himalayan411-WB72AD0519-Blue-1700-pv": {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  "himalayan411-wb72ad0519-blue-1700-pv": {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  "Himalayan411-WB72AD0519-Blue-1700-pv.mp4": {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  "himalayan411-wb72ad0519-blue-1700-pv.mp4": {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  "WB72AD0519": {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  "wb72ad0519": {
    "plate": "WB72AD0519",
    "slug": "Himalayan411-WB72AD0519-Blue-1700-pv",
    "filename": "Himalayan411-WB72AD0519-Blue-1700-pv.mp4",
    "category": "Royal Enfield Himalayan 411",
    "color": "Blue",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1kyhT7Y2cYVFBG4fEqtTFWXB7xijssVMi/view?usp=sharing"
  },
  "Hunter350-WB73P9169-Grey-1600-pv": {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  "hunter350-wb73p9169-grey-1600-pv": {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  "Hunter350-WB73P9169-Grey-1600-pv.mp4": {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  "hunter350-wb73p9169-grey-1600-pv.mp4": {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  "WB73P9169": {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  "wb73p9169": {
    "plate": "WB73P9169",
    "slug": "Hunter350-WB73P9169-Grey-1600-pv",
    "filename": "Hunter350-WB73P9169-Grey-1600-pv.mp4",
    "category": "Royal Enfield Hunter 350",
    "color": "Grey",
    "rate": "\u20b91,600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1OfldTaUo5wgFBjxOZSj2RFQC7PrRseFS/view?usp=sharing"
  },
  "REInterceptor650-WB74BD5559-White-2000-pv": {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  "reinterceptor650-wb74bd5559-white-2000-pv": {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  "REInterceptor650-WB74BD5559-White-2000-pv.mp4": {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  "reinterceptor650-wb74bd5559-white-2000-pv.mp4": {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  "WB74BD5559": {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  "wb74bd5559": {
    "plate": "WB74BD5559",
    "slug": "REInterceptor650-WB74BD5559-White-2000-pv",
    "filename": "REInterceptor650-WB74BD5559-White-2000-pv.mp4",
    "category": "Royal Enfield Interceptor 650",
    "color": "White",
    "rate": "\u20b92,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XYGKTOeX97bf6aSc2Pwk9GOJE1CtvM7I/view?usp=sharing"
  },
  "Scram411-WB74BM9995-Yellow-1700-pv": {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  "scram411-wb74bm9995-yellow-1700-pv": {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  "Scram411-WB74BM9995-Yellow-1700-pv.mp4": {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  "scram411-wb74bm9995-yellow-1700-pv.mp4": {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  "WB74BM9995": {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  "wb74bm9995": {
    "plate": "WB74BM9995",
    "slug": "Scram411-WB74BM9995-Yellow-1700-pv",
    "filename": "Scram411-WB74BM9995-Yellow-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Yellow",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RD-dBUS7cuqJCC62-hAiM9sFU5_zk4md/view?usp=sharing"
  },
  "Scram411-WB74BQ9208-Silver-1700-pv": {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  "scram411-wb74bq9208-silver-1700-pv": {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  "Scram411-WB74BQ9208-Silver-1700-pv.mp4": {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  "scram411-wb74bq9208-silver-1700-pv.mp4": {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  "WB74BQ9208": {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  "wb74bq9208": {
    "plate": "WB74BQ9208",
    "slug": "Scram411-WB74BQ9208-Silver-1700-pv",
    "filename": "Scram411-WB74BQ9208-Silver-1700-pv.mp4",
    "category": "Royal Enfield Scram 411",
    "color": "Silver",
    "rate": "\u20b91,700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1149DXQGHgEgAvHIynt6DZcrSuIcz171z/view?usp=sharing"
  },
  "Access125-WB74BE7418-Blue-700-pv": {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  "access125-wb74be7418-blue-700-pv": {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  "Access125-WB74BE7418-Blue-700-pv.mp4": {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  "access125-wb74be7418-blue-700-pv.mp4": {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  "WB74BE7418": {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  "wb74be7418": {
    "plate": "WB74BE7418",
    "slug": "Access125-WB74BE7418-Blue-700-pv",
    "filename": "Access125-WB74BE7418-Blue-700-pv.mp4",
    "category": "Suzuki Access 125",
    "color": "Blue",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1lR9pZ5dU7WsdyTvs4y2FQRkXkRjQuDqA/view?usp=sharing"
  },
  "Avenis125-WB74BL8997-Grey-700-pv": {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  "avenis125-wb74bl8997-grey-700-pv": {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  "Avenis125-WB74BL8997-Grey-700-pv.mp4": {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  "avenis125-wb74bl8997-grey-700-pv.mp4": {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  "WB74BL8997": {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  "wb74bl8997": {
    "plate": "WB74BL8997",
    "slug": "Avenis125-WB74BL8997-Grey-700-pv",
    "filename": "Avenis125-WB74BL8997-Grey-700-pv.mp4",
    "category": "Suzuki Avenis 125",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_NP2GR-RlCjScIbTkGebQ5Xwgw-L-fMh/view?usp=sharing"
  },
  "ApacheRTR160-WB74BH9354-Black-1250-Commercial": {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  "apachertr160-wb74bh9354-black-1250-commercial": {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4": {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  "apachertr160-wb74bh9354-black-1250-commercial.mp4": {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  "WB74BH9354": {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  "wb74bh9354": {
    "plate": "WB74BH9354",
    "slug": "ApacheRTR160-WB74BH9354-Black-1250-Commercial",
    "filename": "ApacheRTR160-WB74BH9354-Black-1250-Commercial.mp4",
    "category": "TVS Apache RTR 160",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17bNftCWV0fFYzxk5eNiePPCKhAlRC_ys/view?usp=sharing"
  },
  "ApacheRTR200-WB74AW3695-Black-1250-pv": {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  "apachertr200-wb74aw3695-black-1250-pv": {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4": {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  "apachertr200-wb74aw3695-black-1250-pv.mp4": {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  "WB74AW3695": {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  "wb74aw3695": {
    "plate": "WB74AW3695",
    "slug": "ApacheRTR200-WB74AW3695-Black-1250-pv",
    "filename": "ApacheRTR200-WB74AW3695-Black-1250-pv.mp4",
    "category": "TVS Apache RTR 200 4V",
    "color": "Black",
    "rate": "\u20b91,250/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1_dFLxajB6gb6zUBW4RCTafyOGuitO30Z/view?usp=sharing"
  },
  "Jupiter110-WB74AH3949-Grey-600-pv": {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  "jupiter110-wb74ah3949-grey-600-pv": {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  "Jupiter110-WB74AH3949-Grey-600-pv.mp4": {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  "jupiter110-wb74ah3949-grey-600-pv.mp4": {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  "WB74AH3949": {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  "wb74ah3949": {
    "plate": "WB74AH3949",
    "slug": "Jupiter110-WB74AH3949-Grey-600-pv",
    "filename": "Jupiter110-WB74AH3949-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/15DxRrsmGeOlBXyIf1PvdIqJIXDG4J1Az/view?usp=sharing"
  },
  "Jupiter110-WB74AL1058-Grey-600-pv": {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  "jupiter110-wb74al1058-grey-600-pv": {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  "Jupiter110-WB74AL1058-Grey-600-pv.mp4": {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  "jupiter110-wb74al1058-grey-600-pv.mp4": {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  "WB74AL1058": {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  "wb74al1058": {
    "plate": "WB74AL1058",
    "slug": "Jupiter110-WB74AL1058-Grey-600-pv",
    "filename": "Jupiter110-WB74AL1058-Grey-600-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9600/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1WJOaCxSA_9dhNm8hugGwwmdo5tXi_zzb/view?usp=sharing"
  },
  "Jupiter110-WB74BK7063-Grey-700-pv": {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  "jupiter110-wb74bk7063-grey-700-pv": {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  "Jupiter110-WB74BK7063-Grey-700-pv.mp4": {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  "jupiter110-wb74bk7063-grey-700-pv.mp4": {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  "WB74BK7063": {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  "wb74bk7063": {
    "plate": "WB74BK7063",
    "slug": "Jupiter110-WB74BK7063-Grey-700-pv",
    "filename": "Jupiter110-WB74BK7063-Grey-700-pv.mp4",
    "category": "TVS Jupiter 110",
    "color": "Grey",
    "rate": "\u20b9700/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1HPr8pxyGRsB8IFihTwTaQFPp_iR1V3Qw/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4206-Blue-1000-pv": {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  "ntorq125-new-wb73n4206-blue-1000-pv": {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4": {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  "ntorq125-new-wb73n4206-blue-1000-pv.mp4": {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  "WB73N4206": {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  "wb73n4206": {
    "plate": "WB73N4206",
    "slug": "Ntorq125-New-WB73N4206-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4206-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1pA_IebJupqvOqpNHN_w9npX7MRU4dQjq/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4258-Purple-1000-pv": {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  "ntorq125-new-wb73n4258-purple-1000-pv": {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4": {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  "ntorq125-new-wb73n4258-purple-1000-pv.mp4": {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  "WB73N4258": {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  "wb73n4258": {
    "plate": "WB73N4258",
    "slug": "Ntorq125-New-WB73N4258-Purple-1000-pv",
    "filename": "Ntorq125-New-WB73N4258-Purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18QFZg7Nhe4mtuifDDSUThe75tCP9HJul/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4402-Blue-1000-pv": {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  "ntorq125-new-wb73n4402-blue-1000-pv": {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4": {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  "ntorq125-new-wb73n4402-blue-1000-pv.mp4": {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  "WB73N4402": {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  "wb73n4402": {
    "plate": "WB73N4402",
    "slug": "Ntorq125-New-WB73N4402-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4402-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1bcGEqxDu55Pns6kQ4W7sL8Z_hR-cjZ84/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4414-Grey-1000-pv": {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  "ntorq125-new-wb73n4414-grey-1000-pv": {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4": {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  "ntorq125-new-wb73n4414-grey-1000-pv.mp4": {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  "WB73N4414": {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  "wb73n4414": {
    "plate": "WB73N4414",
    "slug": "Ntorq125-New-WB73N4414-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4414-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Fi2kYZX_pLJvCBbA-NMDDgVG_PFgBz7U/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4423-Grey-1000-pv": {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  "ntorq125-new-wb73n4423-grey-1000-pv": {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4": {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  "ntorq125-new-wb73n4423-grey-1000-pv.mp4": {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  "WB73N4423": {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  "wb73n4423": {
    "plate": "WB73N4423",
    "slug": "Ntorq125-New-WB73N4423-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N4423-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1sgKa8KcWjbE8qNkTVURzdK2juepV1eGn/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4582-Blue-1000-pv": {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  "ntorq125-new-wb73n4582-blue-1000-pv": {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4": {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  "ntorq125-new-wb73n4582-blue-1000-pv.mp4": {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  "WB73N4582": {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  "wb73n4582": {
    "plate": "WB73N4582",
    "slug": "Ntorq125-New-WB73N4582-Blue-1000-pv",
    "filename": "Ntorq125-New-WB73N4582-Blue-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Blue",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1e9_QSSwgWNX1uPLDpvI1Oo4AqT3G4DUR/view?usp=sharing"
  },
  "Ntorq125-New-WB73N5291-Grey-1000-pv": {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  "ntorq125-new-wb73n5291-grey-1000-pv": {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4": {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  "ntorq125-new-wb73n5291-grey-1000-pv.mp4": {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  "WB73N5291": {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  "wb73n5291": {
    "plate": "WB73N5291",
    "slug": "Ntorq125-New-WB73N5291-Grey-1000-pv",
    "filename": "Ntorq125-New-WB73N5291-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1FuCBmu4x9Qus25AbwpUsna4rJY5sh1D1/view?usp=sharing"
  },
  "Ntorq125-New-WB73N6285-purple-1000-pv": {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  "ntorq125-new-wb73n6285-purple-1000-pv": {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  "Ntorq125-New-WB73N6285-purple-1000-pv.mp4": {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  "ntorq125-new-wb73n6285-purple-1000-pv.mp4": {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  "WB73N6285": {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  "wb73n6285": {
    "plate": "WB73N6285",
    "slug": "Ntorq125-New-WB73N6285-purple-1000-pv",
    "filename": "Ntorq125-New-WB73N6285-purple-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "purple",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1adLsmhyyJ4P5rkKXw4SYsrXCTmWUIDap/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73T9504-Grey-1000-pv": {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  "ntorq125-newgen-wb73t9504-grey-1000-pv": {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4": {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  "ntorq125-newgen-wb73t9504-grey-1000-pv.mp4": {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  "WB73T9504": {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  "wb73t9504": {
    "plate": "WB73T9504",
    "slug": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9504-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hhVGgcAOVzznKAyzrLUsW3DfdMpG1xFQ/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv": {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  "ntorq125-newgen-wb73t9517-racered-1000-pv": {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4": {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  "ntorq125-newgen-wb73t9517-racered-1000-pv.mp4": {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  "WB73T9517": {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  "wb73t9517": {
    "plate": "WB73T9517",
    "slug": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9517-RaceRed-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "RaceRed",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/18MlJwScjXmMUrwMOcXHOHRpYf6Kupf9n/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73T9894-Grey-1000-pv": {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  "ntorq125-newgen-wb73t9894-grey-1000-pv": {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4": {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  "ntorq125-newgen-wb73t9894-grey-1000-pv.mp4": {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  "WB73T9894": {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  "wb73t9894": {
    "plate": "WB73T9894",
    "slug": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73T9894-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/10zRN8_AHP6IlXR62ia_55NflUDgF8Pwa/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73U0304-Grey-1000-pv": {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  "ntorq125-newgen-wb73u0304-grey-1000-pv": {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4": {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  "ntorq125-newgen-wb73u0304-grey-1000-pv.mp4": {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  "WB73U0304": {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  "wb73u0304": {
    "plate": "WB73U0304",
    "slug": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv",
    "filename": "Ntorq125-NewGen-WB73U0304-Grey-1000-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 New Gen",
    "color": "Grey",
    "rate": "\u20b91,000/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1NlOk_L9mUYdc2sNY8s-peoPnOwANlyPC/view?usp=sharing"
  },
  "Ntorq125XPXT-WB72AD4778-Red-900-pv": {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  "ntorq125xpxt-wb72ad4778-red-900-pv": {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4": {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  "ntorq125xpxt-wb72ad4778-red-900-pv.mp4": {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  "WB72AD4778": {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  "wb72ad4778": {
    "plate": "WB72AD4778",
    "slug": "Ntorq125XPXT-WB72AD4778-Red-900-pv",
    "filename": "Ntorq125XPXT-WB72AD4778-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1ugyvkLpy-btWYLHp45jjMVLpEx-mBHBR/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BN3586-Grey-900-pv": {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bn3586-grey-900-pv": {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4": {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bn3586-grey-900-pv.mp4": {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  "WB74BN3586": {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  "wb74bn3586": {
    "plate": "WB74BN3586",
    "slug": "Ntorq125XPXT-WB74BN3586-Grey-900-pv",
    "filename": "Ntorq125XPXT-WB74BN3586-Grey-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XKBVLnDN6-T3-BEwcYgiq7V1CRTTg2hz/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial": {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bn6908-grey-900-commercial": {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4": {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bn6908-grey-900-commercial.mp4": {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  "WB74BN6908": {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  "wb74bn6908": {
    "plate": "WB74BN6908",
    "slug": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BN6908-Grey-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Grey",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/17nITzf7bu2-iXN-Xp1ZP-vRM_i1DUUvR/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BS9582-Red-900-pv": {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bs9582-red-900-pv": {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4": {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bs9582-red-900-pv.mp4": {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  "WB74BS9582": {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  "wb74bs9582": {
    "plate": "WB74BS9582",
    "slug": "Ntorq125XPXT-WB74BS9582-Red-900-pv",
    "filename": "Ntorq125XPXT-WB74BS9582-Red-900-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Lb_vT2fe738MbBdrARCSV2spcNFwc6tx/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BU7353-Red-900-Commercial": {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bu7353-red-900-commercial": {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4": {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  "ntorq125xpxt-wb74bu7353-red-900-commercial.mp4": {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  "WB74BU7353": {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  "wb74bu7353": {
    "plate": "WB74BU7353",
    "slug": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial",
    "filename": "Ntorq125XPXT-WB74BU7353-Red-900-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Race XP / XT",
    "color": "Red",
    "rate": "\u20b9900/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1FVWDqVWXrZCoU-2xji19wU-tAJN-SLdd/view?usp=sharing"
  },
  "Ntorq125-regular-WB74BM9658-Blue-800-pv": {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  "ntorq125-regular-wb74bm9658-blue-800-pv": {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4": {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  "ntorq125-regular-wb74bm9658-blue-800-pv.mp4": {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  "WB74BM9658": {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  "wb74bm9658": {
    "plate": "WB74BM9658",
    "slug": "Ntorq125-regular-WB74BM9658-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BM9658-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1jUcZSp3Bta8DdL9E9_VDXddKx6OCkbjj/view?usp=sharing"
  },
  "Ntorq125-regular-WB74BP7691-Blue-800-pv": {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  "ntorq125-regular-wb74bp7691-blue-800-pv": {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4": {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  "ntorq125-regular-wb74bp7691-blue-800-pv.mp4": {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  "WB74BP7691": {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  "wb74bp7691": {
    "plate": "WB74BP7691",
    "slug": "Ntorq125-regular-WB74BP7691-Blue-800-pv",
    "filename": "Ntorq125-regular-WB74BP7691-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/12Uc5tpR06rEojMcoP_eAcPf5M1yjCSI2/view?usp=sharing"
  },
  "Ntorq125-regular-WB84J4070-Blue-800-pv": {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  "ntorq125-regular-wb84j4070-blue-800-pv": {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4": {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  "ntorq125-regular-wb84j4070-blue-800-pv.mp4": {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  "WB84J4070": {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  "wb84j4070": {
    "plate": "WB84J4070",
    "slug": "Ntorq125-regular-WB84J4070-Blue-800-pv",
    "filename": "Ntorq125-regular-WB84J4070-Blue-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Blue",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1Hh_0PStA6C2VcXQPw3-AqhJ9Hcwk87LP/view?usp=sharing"
  },
  "Ntorq125Regular-BS4-WB74AX7679-White-800-pv": {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  "ntorq125regular-bs4-wb74ax7679-white-800-pv": {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4": {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  "ntorq125regular-bs4-wb74ax7679-white-800-pv.mp4": {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  "WB74AX7679": {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  "wb74ax7679": {
    "plate": "WB74AX7679",
    "slug": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74AX7679-White-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "White",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1c7IPRnQLRGp-gF_M3UTP8sm68vcRJ9tP/view?usp=sharing"
  },
  "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv": {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  "ntorq125regular-bs4-wb74bb5945-yellow-800-pv": {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4": {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  "ntorq125regular-bs4-wb74bb5945-yellow-800-pv.mp4": {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  "WB74BB5945": {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  "wb74bb5945": {
    "plate": "WB74BB5945",
    "slug": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv",
    "filename": "Ntorq125Regular-BS4-WB74BB5945-Yellow-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "Yellow",
    "rate": "\u20b9800/day (On heavy negotiation: \u20b9700/day for >2 days booking)",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1RfwMKW16EVl-lYjhWdN9LhvmBwaeItw1/view?usp=sharing"
  },
  "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial": {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  "ntorq125-regular-wb74bs2077-purpleavengers-800-commercial": {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4": {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  "ntorq125-regular-wb74bs2077-purpleavengers-800-commercial.mp4": {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  "WB74BS2077": {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  "wb74bs2077": {
    "plate": "WB74BS2077",
    "slug": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial",
    "filename": "Ntorq125-regular-WB74BS2077-PurpleAvengers-800-Commercial.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "PurpleAvengers",
    "rate": "\u20b9800/day",
    "plate_type": "Commercial",
    "url": "https://drive.google.com/file/d/1u-DFGLlffoHVkKm8nz4ycj8h_xGl18xB/view?usp=sharing"
  },
  "Ntorq125regular-avenger-WB70S4813-purple-800-pv": {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  "ntorq125regular-avenger-wb70s4813-purple-800-pv": {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4": {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  "ntorq125regular-avenger-wb70s4813-purple-800-pv.mp4": {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  "WB70S4813": {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  "wb70s4813": {
    "plate": "WB70S4813",
    "slug": "Ntorq125regular-avenger-WB70S4813-purple-800-pv",
    "filename": "Ntorq125regular-avenger-WB70S4813-purple-800-pv.mp4",
    "category": "TVS Ntorq 125 \u2014 Regular (\u20b9800/day)",
    "color": "purple",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1hASxoAuzhe0QtjHhisLJCQg_DdoFsxnX/view?usp=sharing"
  },
  "Radeon110-WB72AB3271-Red-800-pv": {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  },
  "radeon110-wb72ab3271-red-800-pv": {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  },
  "Radeon110-WB72AB3271-Red-800-pv.mp4": {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  },
  "radeon110-wb72ab3271-red-800-pv.mp4": {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  },
  "WB72AB3271": {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  },
  "wb72ab3271": {
    "plate": "WB72AB3271",
    "slug": "Radeon110-WB72AB3271-Red-800-pv",
    "filename": "Radeon110-WB72AB3271-Red-800-pv.mp4",
    "category": "TVS Radeon 110",
    "color": "Red",
    "rate": "\u20b9800/day",
    "plate_type": "Under conversion process",
    "url": "https://drive.google.com/file/d/1XgTf7b0jRlOYZB9zrJoJyIeOpP-lNpx-/view?usp=sharing"
  }
};

function renderCatalogHtml() {
  const itemsJson = JSON.stringify(ASSET_CATALOG);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BikeAtRent — Fleet Asset Directory</title>
  <link rel="icon" type="image/png" href="/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --card-border: #1f2937;
      --card-hover: #1e293b;
      --primary: #38bdf8;
      --primary-glow: rgba(56, 189, 248, 0.15);
      --accent: #10b981;
      --text: #f3f4f6;
      --text-muted: #94a3b8;
      --badge-com: #d97706;
      --badge-pv: #0284c7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 24px 16px 60px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 32px;
      padding-top: 12px;
    }
    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--primary-glow);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    p.subtitle {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 600px;
      margin: 0 auto 24px;
    }
    .search-box {
      position: relative;
      max-width: 580px;
      margin: 0 auto 32px;
    }
    .search-box input {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 14px 20px 14px 46px;
      color: #fff;
      font-size: 15px;
      font-family: inherit;
      outline: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    }
    .search-box input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
    }
    .search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 18px;
    }
    .stats-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: var(--text-muted);
      padding: 0 4px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 18px;
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card:hover {
      transform: translateY(-2px);
      border-color: #374151;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .bike-name {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      line-height: 1.3;
    }
    .bike-plate {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      font-weight: 600;
      background: #030712;
      border: 1px solid #374151;
      padding: 3px 8px;
      border-radius: 6px;
      color: #fbbf24;
      display: inline-block;
      margin-top: 4px;
    }
    .badge {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .badge-pv { background: rgba(2, 132, 199, 0.15); color: #38bdf8; border: 1px solid rgba(2, 132, 199, 0.3); }
    .badge-com { background: rgba(217, 119, 6, 0.15); color: #fbbf24; border: 1px solid rgba(217, 119, 6, 0.3); }
    .card-meta {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      font-size: 13px;
      color: var(--text-muted);
    }
    .meta-tag {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .meta-tag strong {
      color: #e2e8f0;
    }
    .actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .btn {
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      border: none;
      transition: all 0.15s ease;
    }
    .btn-primary {
      background: var(--primary);
      color: #0b0f19;
    }
    .btn-primary:hover {
      background: #7dd3fc;
    }
    .btn-secondary {
      background: #1e293b;
      color: #cbd5e1;
      border: 1px solid #334155;
    }
    .btn-secondary:hover {
      background: #334155;
      color: #fff;
    }
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #10b981;
      color: #064e3b;
      padding: 10px 20px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 14px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      transition: transform 0.25s ease;
      z-index: 1000;
      pointer-events: none;
    }
    .toast.show {
      transform: translateX(-50%) translateY(0);
    }
    @media (max-width: 640px) {
      h1 { font-size: 24px; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand-badge">⚡ BikeAtRent Fleet Portal</div>
      <h1>Official Fleet Asset Directory</h1>
      <p class="subtitle">Direct video showcase links for customers and automated WhatsApp agent integration. All links resolve to verified HD vehicle walkarounds.</p>
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="searchInput" placeholder="Search by bike model, plate (e.g. WB66AS0989), color, rate..." autofocus>
      </div>
    </header>

    <div class="stats-bar">
      <span>Showing <strong id="shownCount">47</strong> of 47 verified fleet videos</span>
      <span style="font-size: 12px; color: #64748b;">Domain: bikeatrent.com/assetDir/</span>
    </div>

    <div class="grid" id="fleetGrid"></div>
  </div>

  <div id="toast" class="toast">Link copied to clipboard!</div>

  <script>
    const items = ${itemsJson};
    const grid = document.getElementById('fleetGrid');
    const searchInput = document.getElementById('searchInput');
    const shownCount = document.getElementById('shownCount');
    const toast = document.getElementById('toast');

    function render(list) {
      shownCount.textContent = list.length;
      grid.innerHTML = list.map(function(item) {
        var isCom = item.plate_type === 'Commercial';
        var badgeClass = isCom ? 'badge-com' : 'badge-pv';
        var badgeText = isCom ? 'Commercial' : 'Under Conversion';
        return '<div class="card">' +
          '<div>' +
            '<div class="card-top">' +
              '<div>' +
                '<div class="bike-name">' + item.category + '</div>' +
                '<div class="bike-plate">' + item.plate + '</div>' +
              '</div>' +
              '<span class="badge ' + badgeClass + '">' + badgeText + '</span>' +
            '</div>' +
            '<div class="card-meta">' +
              '<div class="meta-tag">🎨 <strong>' + item.color + '</strong></div>' +
              '<div class="meta-tag">💰 <strong>' + item.rate + '</strong></div>' +
            '</div>' +
          '</div>' +
          '<div class="actions">' +
            '<a href="/assetDir/' + encodeURIComponent(item.slug) + '" target="_blank" rel="noopener" class="btn btn-primary">' +
              '🎬 Watch Video' +
            '</a>' +
            '<button type="button" data-slug="' + item.slug + '" class="btn btn-secondary btn-copy">' +
              '📋 Copy Link' +
            '</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    function copyLink(slug) {
      const url = 'https://bikeatrent.com/assetDir/' + slug;
      navigator.clipboard.writeText(url).then(function() {
        toast.textContent = 'Copied: ' + url;
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 2500);
      });
    }

    grid.addEventListener('click', function(e) {
      var btn = e.target.closest('.btn-copy');
      if (btn) {
        copyLink(btn.getAttribute('data-slug'));
      }
    });

    searchInput.addEventListener('input', function(e) {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return render(items);
      const filtered = items.filter(function(it) {
        return it.category.toLowerCase().includes(q) ||
          it.plate.toLowerCase().includes(q) ||
          it.color.toLowerCase().includes(q) ||
          it.rate.toLowerCase().includes(q) ||
          it.slug.toLowerCase().includes(q);
      });
      render(filtered);
    });

    render(items);
  </script>
</body>
</html>`;
}

export default async function handler(req, res) {
  // 1. Enable CORS and universal caching
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Parse requested slug from query or path
  let slug = req.query?.slug || '';
  if (!slug && req.url) {
    const parsed = new URL(req.url, 'http://localhost');
    const path = parsed.pathname;
    const match = path.match(/^\/(?:api\/)?(?:assetDir|v)\/(.+)$/i);
    if (match) {
      slug = decodeURIComponent(match[1]);
    }
  }

  // If no slug requested, return the visual Asset Directory Catalog
  if (!slug || slug.trim() === '' || slug.trim() === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    return res.status(200).send(renderCatalogHtml());
  }

  // 3. Normalize slug for robust lookup
  const rawSlug = String(slug).trim().replace(/^\/+|\/+$/g, '');
  const cleanSlug = rawSlug.replace(/\.mp4$/i, '');
  const normSlug = cleanSlug.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  // Try lookups in order:
  let target = ASSET_LOOKUP[cleanSlug] || 
               ASSET_LOOKUP[rawSlug] || 
               ASSET_LOOKUP[cleanSlug.toLowerCase()] || 
               ASSET_LOOKUP[normSlug];

  // Try plate regex match if not found
  if (!target) {
    const plateMatch = cleanSlug.match(/WB[0-9]{2}[A-Za-z]{1,2}[0-9]{4}/i);
    if (plateMatch) {
      target = ASSET_LOOKUP[plateMatch[0].toUpperCase()];
    }
  }

  // 4. Redirect or return 404
  if (target && target.url) {
    res.setHeader('Location', target.url);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.setHeader('X-Asset-Plate', target.plate);
    res.setHeader('X-Asset-Slug', target.slug);
    return res.status(302).end();
  }

  // 404 fallback with catalog link
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(404).send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Asset Not Found — BikeAtRent</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #090d16; color: #fff; text-align: center; padding: 60px 20px; }
    h1 { color: #f87171; font-size: 28px; }
    p { color: #94a3b8; font-size: 16px; margin: 16px 0 24px; }
    a { display: inline-block; background: #38bdf8; color: #000; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Vehicle Video Asset Not Found</h1>
  <p>Could not locate showcase video for "<strong>${cleanSlug}</strong>".</p>
  <a href="/assetDir">Browse All 47 Fleet Videos in Asset Directory</a>
</body>
</html>`);
}
