function reshapeArray(array) {
  return array.reduce((acc, obj) => {
    acc[obj.commonName] = { flag: obj.flag, countryCode: obj.countryCode };
    return acc;
  }, {});
}

// Example usage
const originalArray = [
  {
    "commonName": "Moldova",
    "flag": "🇲🇩",
    "countryCode": "MD"
  },
  {
    "commonName": "United States",
    "flag": "🇺🇸",
    "countryCode": "US"
  },
  {
    "commonName": "Mayotte",
    "flag": "🇾🇹",
    "countryCode": "YT"
  },
  {
    "commonName": "Nauru",
    "flag": "🇳🇷",
    "countryCode": "NR"
  },
  {
    "commonName": "Mozambique",
    "flag": "🇲🇿",
    "countryCode": "MZ"
  },
  {
    "commonName": "Brazil",
    "flag": "🇧🇷",
    "countryCode": "BR"
  },
  {
    "commonName": "Cape Verde",
    "flag": "🇨🇻",
    "countryCode": "CV"
  },
  {
    "commonName": "Equatorial Guinea",
    "flag": "🇬🇶",
    "countryCode": "GQ"
  },
  {
    "commonName": "Albania",
    "flag": "🇦🇱",
    "countryCode": "AL"
  },
  {
    "commonName": "United States Virgin Islands",
    "flag": "🇻🇮",
    "countryCode": "VI"
  },
  {
    "commonName": "Niue",
    "flag": "🇳🇺",
    "countryCode": "NU"
  },
  {
    "commonName": "Palau",
    "flag": "🇵🇼",
    "countryCode": "PW"
  },
  {
    "commonName": "Nigeria",
    "flag": "🇳🇬",
    "countryCode": "NG"
  },
  {
    "commonName": "British Virgin Islands",
    "flag": "🇻🇬",
    "countryCode": "VG"
  },
  {
    "commonName": "Gambia",
    "flag": "🇬🇲",
    "countryCode": "GM"
  },
  {
    "commonName": "Somalia",
    "flag": "🇸🇴",
    "countryCode": "SO"
  },
  {
    "commonName": "Yemen",
    "flag": "🇾🇪",
    "countryCode": "YE"
  },
  {
    "commonName": "Malaysia",
    "flag": "🇲🇾",
    "countryCode": "MY"
  },
  {
    "commonName": "Dominica",
    "flag": "🇩🇲",
    "countryCode": "DM"
  },
  {
    "commonName": "United Kingdom",
    "flag": "🇬🇧",
    "countryCode": "GB"
  },
  {
    "commonName": "Madagascar",
    "flag": "🇲🇬",
    "countryCode": "MG"
  },
  {
    "commonName": "Western Sahara",
    "flag": "🇪🇭",
    "countryCode": "EH"
  },
  {
    "commonName": "Cyprus",
    "flag": "🇨🇾",
    "countryCode": "CY"
  },
  {
    "commonName": "Antigua and Barbuda",
    "flag": "🇦🇬",
    "countryCode": "AG"
  },
  {
    "commonName": "Ireland",
    "flag": "🇮🇪",
    "countryCode": "IE"
  },
  {
    "commonName": "Paraguay",
    "flag": "🇵🇾",
    "countryCode": "PY"
  },
  {
    "commonName": "Sri Lanka",
    "flag": "🇱🇰",
    "countryCode": "LK"
  },
  {
    "commonName": "South Africa",
    "flag": "🇿🇦",
    "countryCode": "ZA"
  },
  {
    "commonName": "Kuwait",
    "flag": "🇰🇼",
    "countryCode": "KW"
  },
  {
    "commonName": "Algeria",
    "flag": "🇩🇿",
    "countryCode": "DZ"
  },
  {
    "commonName": "Croatia",
    "flag": "🇭🇷",
    "countryCode": "HR"
  },
  {
    "commonName": "Martinique",
    "flag": "🇲🇶",
    "countryCode": "MQ"
  },
  {
    "commonName": "Sierra Leone",
    "flag": "🇸🇱",
    "countryCode": "SL"
  },
  {
    "commonName": "Northern Mariana Islands",
    "flag": "🇲🇵",
    "countryCode": "MP"
  },
  {
    "commonName": "Rwanda",
    "flag": "🇷🇼",
    "countryCode": "RW"
  },
  {
    "commonName": "Syria",
    "flag": "🇸🇾",
    "countryCode": "SY"
  },
  {
    "commonName": "Saint Vincent and the Grenadines",
    "flag": "🇻🇨",
    "countryCode": "VC"
  },
  {
    "commonName": "Kosovo",
    "flag": "🇽🇰",
    "countryCode": "XK"
  },
  {
    "commonName": "Saint Lucia",
    "flag": "🇱🇨",
    "countryCode": "LC"
  },
  {
    "commonName": "Honduras",
    "flag": "🇭🇳",
    "countryCode": "HN"
  },
  {
    "commonName": "Jordan",
    "flag": "🇯🇴",
    "countryCode": "JO"
  },
  {
    "commonName": "Tuvalu",
    "flag": "🇹🇻",
    "countryCode": "TV"
  },
  {
    "commonName": "Nepal",
    "flag": "🇳🇵",
    "countryCode": "NP"
  },
  {
    "commonName": "Liberia",
    "flag": "🇱🇷",
    "countryCode": "LR"
  },
  {
    "commonName": "Heard Island and McDonald Islands",
    "flag": "🇭🇲",
    "countryCode": "HM"
  },
  {
    "commonName": "Austria",
    "flag": "🇦🇹",
    "countryCode": "AT"
  },
  {
    "commonName": "Guernsey",
    "flag": "🇬🇬",
    "countryCode": "GG"
  },
  {
    "commonName": "Central African Republic",
    "flag": "🇨🇫",
    "countryCode": "CF"
  },
  {
    "commonName": "Mauritania",
    "flag": "🇲🇷",
    "countryCode": "MR"
  },
  {
    "commonName": "Djibouti",
    "flag": "🇩🇯",
    "countryCode": "DJ"
  },
  {
    "commonName": "Fiji",
    "flag": "🇫🇯",
    "countryCode": "FJ"
  },
  {
    "commonName": "Norway",
    "flag": "🇳🇴",
    "countryCode": "NO"
  },
  {
    "commonName": "Latvia",
    "flag": "🇱🇻",
    "countryCode": "LV"
  },
  {
    "commonName": "Falkland Islands",
    "flag": "🇫🇰",
    "countryCode": "FK"
  },
  {
    "commonName": "Kazakhstan",
    "flag": "🇰🇿",
    "countryCode": "KZ"
  },
  {
    "commonName": "Åland Islands",
    "flag": "🇦🇽",
    "countryCode": "AX"
  },
  {
    "commonName": "Turkmenistan",
    "flag": "🇹🇲",
    "countryCode": "TM"
  },
  {
    "commonName": "Cocos (Keeling) Islands",
    "flag": "🇨🇨",
    "countryCode": "CC"
  },
  {
    "commonName": "Bulgaria",
    "flag": "🇧🇬",
    "countryCode": "BG"
  },
  {
    "commonName": "Tokelau",
    "flag": "🇹🇰",
    "countryCode": "TK"
  },
  {
    "commonName": "New Caledonia",
    "flag": "🇳🇨",
    "countryCode": "NC"
  },
  {
    "commonName": "Barbados",
    "flag": "🇧🇧",
    "countryCode": "BB"
  },
  {
    "commonName": "São Tomé and Príncipe",
    "flag": "🇸🇹",
    "countryCode": "ST"
  },
  {
    "commonName": "Antarctica",
    "flag": "🇦🇶",
    "countryCode": "AQ"
  },
  {
    "commonName": "Brunei",
    "flag": "🇧🇳",
    "countryCode": "BN"
  },
  {
    "commonName": "Bhutan",
    "flag": "🇧🇹",
    "countryCode": "BT"
  },
  {
    "commonName": "Cameroon",
    "flag": "🇨🇲",
    "countryCode": "CM"
  },
  {
    "commonName": "Argentina",
    "flag": "🇦🇷",
    "countryCode": "AR"
  },
  {
    "commonName": "Azerbaijan",
    "flag": "🇦🇿",
    "countryCode": "AZ"
  },
  {
    "commonName": "Mexico",
    "flag": "🇲🇽",
    "countryCode": "MX"
  },
  {
    "commonName": "Morocco",
    "flag": "🇲🇦",
    "countryCode": "MA"
  },
  {
    "commonName": "Guatemala",
    "flag": "🇬🇹",
    "countryCode": "GT"
  },
  {
    "commonName": "Kenya",
    "flag": "🇰🇪",
    "countryCode": "KE"
  },
  {
    "commonName": "Malta",
    "flag": "🇲🇹",
    "countryCode": "MT"
  },
  {
    "commonName": "Czechia",
    "flag": "🇨🇿",
    "countryCode": "CZ"
  },
  {
    "commonName": "Gibraltar",
    "flag": "🇬🇮",
    "countryCode": "GI"
  },
  {
    "commonName": "Aruba",
    "flag": "🇦🇼",
    "countryCode": "AW"
  },
  {
    "commonName": "Saint Barthélemy",
    "flag": "🇧🇱",
    "countryCode": "BL"
  },
  {
    "commonName": "Monaco",
    "flag": "🇲🇨",
    "countryCode": "MC"
  },
  {
    "commonName": "United Arab Emirates",
    "flag": "🇦🇪",
    "countryCode": "AE"
  },
  {
    "commonName": "South Sudan",
    "flag": "🇸🇸",
    "countryCode": "SS"
  },
  {
    "commonName": "Puerto Rico",
    "flag": "🇵🇷",
    "countryCode": "PR"
  },
  {
    "commonName": "El Salvador",
    "flag": "🇸🇻",
    "countryCode": "SV"
  },
  {
    "commonName": "France",
    "flag": "🇫🇷",
    "countryCode": "FR"
  },
  {
    "commonName": "Niger",
    "flag": "🇳🇪",
    "countryCode": "NE"
  },
  {
    "commonName": "Ivory Coast",
    "flag": "🇨🇮",
    "countryCode": "CI"
  },
  {
    "commonName": "South Georgia",
    "flag": "🇬🇸",
    "countryCode": "GS"
  },
  {
    "commonName": "Botswana",
    "flag": "🇧🇼",
    "countryCode": "BW"
  },
  {
    "commonName": "British Indian Ocean Territory",
    "flag": "🇮🇴",
    "countryCode": "IO"
  },
  {
    "commonName": "Uzbekistan",
    "flag": "🇺🇿",
    "countryCode": "UZ"
  },
  {
    "commonName": "Tunisia",
    "flag": "🇹🇳",
    "countryCode": "TN"
  },
  {
    "commonName": "Hong Kong",
    "flag": "🇭🇰",
    "countryCode": "HK"
  },
  {
    "commonName": "North Macedonia",
    "flag": "🇲🇰",
    "countryCode": "MK"
  },
  {
    "commonName": "Suriname",
    "flag": "🇸🇷",
    "countryCode": "SR"
  },
  {
    "commonName": "Belgium",
    "flag": "🇧🇪",
    "countryCode": "BE"
  },
  {
    "commonName": "American Samoa",
    "flag": "🇦🇸",
    "countryCode": "AS"
  },
  {
    "commonName": "Solomon Islands",
    "flag": "🇸🇧",
    "countryCode": "SB"
  },
  {
    "commonName": "Ukraine",
    "flag": "🇺🇦",
    "countryCode": "UA"
  },
  {
    "commonName": "Finland",
    "flag": "🇫🇮",
    "countryCode": "FI"
  },
  {
    "commonName": "Burkina Faso",
    "flag": "🇧🇫",
    "countryCode": "BF"
  },
  {
    "commonName": "Bosnia and Herzegovina",
    "flag": "🇧🇦",
    "countryCode": "BA"
  },
  {
    "commonName": "Iran",
    "flag": "🇮🇷",
    "countryCode": "IR"
  },
  {
    "commonName": "Cuba",
    "flag": "🇨🇺",
    "countryCode": "CU"
  },
  {
    "commonName": "Eritrea",
    "flag": "🇪🇷",
    "countryCode": "ER"
  },
  {
    "commonName": "Slovakia",
    "flag": "🇸🇰",
    "countryCode": "SK"
  },
  {
    "commonName": "Lithuania",
    "flag": "🇱🇹",
    "countryCode": "LT"
  },
  {
    "commonName": "Saint Martin",
    "flag": "🇲🇫",
    "countryCode": "MF"
  },
  {
    "commonName": "Pitcairn Islands",
    "flag": "🇵🇳",
    "countryCode": "PN"
  },
  {
    "commonName": "Guinea-Bissau",
    "flag": "🇬🇼",
    "countryCode": "GW"
  },
  {
    "commonName": "Montserrat",
    "flag": "🇲🇸",
    "countryCode": "MS"
  },
  {
    "commonName": "Turkey",
    "flag": "🇹🇷",
    "countryCode": "TR"
  },
  {
    "commonName": "Philippines",
    "flag": "🇵🇭",
    "countryCode": "PH"
  },
  {
    "commonName": "Vanuatu",
    "flag": "🇻🇺",
    "countryCode": "VU"
  },
  {
    "commonName": "Bolivia",
    "flag": "🇧🇴",
    "countryCode": "BO"
  },
  {
    "commonName": "Saint Kitts and Nevis",
    "flag": "🇰🇳",
    "countryCode": "KN"
  },
  {
    "commonName": "Romania",
    "flag": "🇷🇴",
    "countryCode": "RO"
  },
  {
    "commonName": "Cambodia",
    "flag": "🇰🇭",
    "countryCode": "KH"
  },
  {
    "commonName": "Zimbabwe",
    "flag": "🇿🇼",
    "countryCode": "ZW"
  },
  {
    "commonName": "Jersey",
    "flag": "🇯🇪",
    "countryCode": "JE"
  },
  {
    "commonName": "Kyrgyzstan",
    "flag": "🇰🇬",
    "countryCode": "KG"
  },
  {
    "commonName": "Caribbean Netherlands",
    "flag": "🇧🇶",
    "countryCode": "BQ"
  },
  {
    "commonName": "Guyana",
    "flag": "🇬🇾",
    "countryCode": "GY"
  },
  {
    "commonName": "United States Minor Outlying Islands",
    "flag": "🇺🇲",
    "countryCode": "UM"
  },
  {
    "commonName": "Armenia",
    "flag": "🇦🇲",
    "countryCode": "AM"
  },
  {
    "commonName": "Lebanon",
    "flag": "🇱🇧",
    "countryCode": "LB"
  },
  {
    "commonName": "Montenegro",
    "flag": "🇲🇪",
    "countryCode": "ME"
  },
  {
    "commonName": "Greenland",
    "flag": "🇬🇱",
    "countryCode": "GL"
  },
  {
    "commonName": "Papua New Guinea",
    "flag": "🇵🇬",
    "countryCode": "PG"
  },
  {
    "commonName": "Zambia",
    "flag": "🇿🇲",
    "countryCode": "ZM"
  },
  {
    "commonName": "Trinidad and Tobago",
    "flag": "🇹🇹",
    "countryCode": "TT"
  },
  {
    "commonName": "French Southern and Antarctic Lands",
    "flag": "🇹🇫",
    "countryCode": "TF"
  },
  {
    "commonName": "Peru",
    "flag": "🇵🇪",
    "countryCode": "PE"
  },
  {
    "commonName": "Sweden",
    "flag": "🇸🇪",
    "countryCode": "SE"
  },
  {
    "commonName": "Sudan",
    "flag": "🇸🇩",
    "countryCode": "SD"
  },
  {
    "commonName": "Saint Pierre and Miquelon",
    "flag": "🇵🇲",
    "countryCode": "PM"
  },
  {
    "commonName": "Oman",
    "flag": "🇴🇲",
    "countryCode": "OM"
  },
  {
    "commonName": "India",
    "flag": "🇮🇳",
    "countryCode": "IN"
  },
  {
    "commonName": "Taiwan",
    "flag": "🇹🇼",
    "countryCode": "TW"
  },
  {
    "commonName": "Mongolia",
    "flag": "🇲🇳",
    "countryCode": "MN"
  },
  {
    "commonName": "Senegal",
    "flag": "🇸🇳",
    "countryCode": "SN"
  },
  {
    "commonName": "Tanzania",
    "flag": "🇹🇿",
    "countryCode": "TZ"
  },
  {
    "commonName": "Canada",
    "flag": "🇨🇦",
    "countryCode": "CA"
  },
  {
    "commonName": "Costa Rica",
    "flag": "🇨🇷",
    "countryCode": "CR"
  },
  {
    "commonName": "China",
    "flag": "🇨🇳",
    "countryCode": "CN"
  },
  {
    "commonName": "Colombia",
    "flag": "🇨🇴",
    "countryCode": "CO"
  },
  {
    "commonName": "Myanmar",
    "flag": "🇲🇲",
    "countryCode": "MM"
  },
  {
    "commonName": "Russia",
    "flag": "🇷🇺",
    "countryCode": "RU"
  },
  {
    "commonName": "North Korea",
    "flag": "🇰🇵",
    "countryCode": "KP"
  },
  {
    "commonName": "Cayman Islands",
    "flag": "🇰🇾",
    "countryCode": "KY"
  },
  {
    "commonName": "Bouvet Island",
    "flag": "🇧🇻",
    "countryCode": "BV"
  },
  {
    "commonName": "Belarus",
    "flag": "🇧🇾",
    "countryCode": "BY"
  },
  {
    "commonName": "Portugal",
    "flag": "🇵🇹",
    "countryCode": "PT"
  },
  {
    "commonName": "Eswatini",
    "flag": "🇸🇿",
    "countryCode": "SZ"
  },
  {
    "commonName": "Poland",
    "flag": "🇵🇱",
    "countryCode": "PL"
  },
  {
    "commonName": "Switzerland",
    "flag": "🇨🇭",
    "countryCode": "CH"
  },
  {
    "commonName": "Republic of the Congo",
    "flag": "🇨🇬",
    "countryCode": "CG"
  },
  {
    "commonName": "Venezuela",
    "flag": "🇻🇪",
    "countryCode": "VE"
  },
  {
    "commonName": "Panama",
    "flag": "🇵🇦",
    "countryCode": "PA"
  },
  {
    "commonName": "Netherlands",
    "flag": "🇳🇱",
    "countryCode": "NL"
  },
  {
    "commonName": "Samoa",
    "flag": "🇼🇸",
    "countryCode": "WS"
  },
  {
    "commonName": "Denmark",
    "flag": "🇩🇰",
    "countryCode": "DK"
  },
  {
    "commonName": "Luxembourg",
    "flag": "🇱🇺",
    "countryCode": "LU"
  },
  {
    "commonName": "Faroe Islands",
    "flag": "🇫🇴",
    "countryCode": "FO"
  },
  {
    "commonName": "Slovenia",
    "flag": "🇸🇮",
    "countryCode": "SI"
  },
  {
    "commonName": "Togo",
    "flag": "🇹🇬",
    "countryCode": "TG"
  },
  {
    "commonName": "Thailand",
    "flag": "🇹🇭",
    "countryCode": "TH"
  },
  {
    "commonName": "Wallis and Futuna",
    "flag": "🇼🇫",
    "countryCode": "WF"
  },
  {
    "commonName": "Bahamas",
    "flag": "🇧🇸",
    "countryCode": "BS"
  },
  {
    "commonName": "Tonga",
    "flag": "🇹🇴",
    "countryCode": "TO"
  },
  {
    "commonName": "Greece",
    "flag": "🇬🇷",
    "countryCode": "GR"
  },
  {
    "commonName": "San Marino",
    "flag": "🇸🇲",
    "countryCode": "SM"
  },
  {
    "commonName": "Réunion",
    "flag": "🇷🇪",
    "countryCode": "RE"
  },
  {
    "commonName": "Vatican City",
    "flag": "🇻🇦",
    "countryCode": "VA"
  },
  {
    "commonName": "Burundi",
    "flag": "🇧🇮",
    "countryCode": "BI"
  },
  {
    "commonName": "Bahrain",
    "flag": "🇧🇭",
    "countryCode": "BH"
  },
  {
    "commonName": "Marshall Islands",
    "flag": "🇲🇭",
    "countryCode": "MH"
  },
  {
    "commonName": "Turks and Caicos Islands",
    "flag": "🇹🇨",
    "countryCode": "TC"
  },
  {
    "commonName": "Isle of Man",
    "flag": "🇮🇲",
    "countryCode": "IM"
  },
  {
    "commonName": "Haiti",
    "flag": "🇭🇹",
    "countryCode": "HT"
  },
  {
    "commonName": "Afghanistan",
    "flag": "🇦🇫",
    "countryCode": "AF"
  },
  {
    "commonName": "Israel",
    "flag": "🇮🇱",
    "countryCode": "IL"
  },
  {
    "commonName": "Libya",
    "flag": "🇱🇾",
    "countryCode": "LY"
  },
  {
    "commonName": "Uruguay",
    "flag": "🇺🇾",
    "countryCode": "UY"
  },
  {
    "commonName": "Norfolk Island",
    "flag": "🇳🇫",
    "countryCode": "NF"
  },
  {
    "commonName": "Nicaragua",
    "flag": "🇳🇮",
    "countryCode": "NI"
  },
  {
    "commonName": "Cook Islands",
    "flag": "🇨🇰",
    "countryCode": "CK"
  },
  {
    "commonName": "Laos",
    "flag": "🇱🇦",
    "countryCode": "LA"
  },
  {
    "commonName": "Christmas Island",
    "flag": "🇨🇽",
    "countryCode": "CX"
  },
  {
    "commonName": "Saint Helena, Ascension and Tristan da Cunha",
    "flag": "🇸🇭",
    "countryCode": "SH"
  },
  {
    "commonName": "Anguilla",
    "flag": "🇦🇮",
    "countryCode": "AI"
  },
  {
    "commonName": "Micronesia",
    "flag": "🇫🇲",
    "countryCode": "FM"
  },
  {
    "commonName": "Germany",
    "flag": "🇩🇪",
    "countryCode": "DE"
  },
  {
    "commonName": "Guam",
    "flag": "🇬🇺",
    "countryCode": "GU"
  },
  {
    "commonName": "Kiribati",
    "flag": "🇰🇮",
    "countryCode": "KI"
  },
  {
    "commonName": "Sint Maarten",
    "flag": "🇸🇽",
    "countryCode": "SX"
  },
  {
    "commonName": "Spain",
    "flag": "🇪🇸",
    "countryCode": "ES"
  },
  {
    "commonName": "Jamaica",
    "flag": "🇯🇲",
    "countryCode": "JM"
  },
  {
    "commonName": "Palestine",
    "flag": "🇵🇸",
    "countryCode": "PS"
  },
  {
    "commonName": "French Guiana",
    "flag": "🇬🇫",
    "countryCode": "GF"
  },
  {
    "commonName": "Andorra",
    "flag": "🇦🇩",
    "countryCode": "AD"
  },
  {
    "commonName": "Chile",
    "flag": "🇨🇱",
    "countryCode": "CL"
  },
  {
    "commonName": "Lesotho",
    "flag": "🇱🇸",
    "countryCode": "LS"
  },
  {
    "commonName": "Australia",
    "flag": "🇦🇺",
    "countryCode": "AU"
  },
  {
    "commonName": "Grenada",
    "flag": "🇬🇩",
    "countryCode": "GD"
  },
  {
    "commonName": "Ghana",
    "flag": "🇬🇭",
    "countryCode": "GH"
  },
  {
    "commonName": "Seychelles",
    "flag": "🇸🇨",
    "countryCode": "SC"
  },
  {
    "commonName": "Angola",
    "flag": "🇦🇴",
    "countryCode": "AO"
  },
  {
    "commonName": "Bermuda",
    "flag": "🇧🇲",
    "countryCode": "BM"
  },
  {
    "commonName": "Pakistan",
    "flag": "🇵🇰",
    "countryCode": "PK"
  },
  {
    "commonName": "Mali",
    "flag": "🇲🇱",
    "countryCode": "ML"
  },
  {
    "commonName": "Saudi Arabia",
    "flag": "🇸🇦",
    "countryCode": "SA"
  },
  {
    "commonName": "Curaçao",
    "flag": "🇨🇼",
    "countryCode": "CW"
  },
  {
    "commonName": "South Korea",
    "flag": "🇰🇷",
    "countryCode": "KR"
  },
  {
    "commonName": "Ethiopia",
    "flag": "🇪🇹",
    "countryCode": "ET"
  },
  {
    "commonName": "Guadeloupe",
    "flag": "🇬🇵",
    "countryCode": "GP"
  },
  {
    "commonName": "Bangladesh",
    "flag": "🇧🇩",
    "countryCode": "BD"
  },
  {
    "commonName": "New Zealand",
    "flag": "🇳🇿",
    "countryCode": "NZ"
  },
  {
    "commonName": "Comoros",
    "flag": "🇰🇲",
    "countryCode": "KM"
  },
  {
    "commonName": "Belize",
    "flag": "🇧🇿",
    "countryCode": "BZ"
  },
  {
    "commonName": "Uganda",
    "flag": "🇺🇬",
    "countryCode": "UG"
  },
  {
    "commonName": "Singapore",
    "flag": "🇸🇬",
    "countryCode": "SG"
  },
  {
    "commonName": "Liechtenstein",
    "flag": "🇱🇮",
    "countryCode": "LI"
  },
  {
    "commonName": "Hungary",
    "flag": "🇭🇺",
    "countryCode": "HU"
  },
  {
    "commonName": "Iceland",
    "flag": "🇮🇸",
    "countryCode": "IS"
  },
  {
    "commonName": "Tajikistan",
    "flag": "🇹🇯",
    "countryCode": "TJ"
  },
  {
    "commonName": "Namibia",
    "flag": "🇳🇦",
    "countryCode": "NA"
  },
  {
    "commonName": "Timor-Leste",
    "flag": "🇹🇱",
    "countryCode": "TL"
  },
  {
    "commonName": "Egypt",
    "flag": "🇪🇬",
    "countryCode": "EG"
  },
  {
    "commonName": "Serbia",
    "flag": "🇷🇸",
    "countryCode": "RS"
  },
  {
    "commonName": "Mauritius",
    "flag": "🇲🇺",
    "countryCode": "MU"
  },
  {
    "commonName": "Macau",
    "flag": "🇲🇴",
    "countryCode": "MO"
  },
  {
    "commonName": "French Polynesia",
    "flag": "🇵🇫",
    "countryCode": "PF"
  },
  {
    "commonName": "Maldives",
    "flag": "🇲🇻",
    "countryCode": "MV"
  },
  {
    "commonName": "Indonesia",
    "flag": "🇮🇩",
    "countryCode": "ID"
  },
  {
    "commonName": "DR Congo",
    "flag": "🇨🇩",
    "countryCode": "CD"
  },
  {
    "commonName": "Estonia",
    "flag": "🇪🇪",
    "countryCode": "EE"
  },
  {
    "commonName": "Vietnam",
    "flag": "🇻🇳",
    "countryCode": "VN"
  },
  {
    "commonName": "Italy",
    "flag": "🇮🇹",
    "countryCode": "IT"
  },
  {
    "commonName": "Guinea",
    "flag": "🇬🇳",
    "countryCode": "GN"
  },
  {
    "commonName": "Chad",
    "flag": "🇹🇩",
    "countryCode": "TD"
  },
  {
    "commonName": "Ecuador",
    "flag": "🇪🇨",
    "countryCode": "EC"
  },
  {
    "commonName": "Georgia",
    "flag": "🇬🇪",
    "countryCode": "GE"
  },
  {
    "commonName": "Malawi",
    "flag": "🇲🇼",
    "countryCode": "MW"
  },
  {
    "commonName": "Iraq",
    "flag": "🇮🇶",
    "countryCode": "IQ"
  },
  {
    "commonName": "Svalbard and Jan Mayen",
    "flag": "🇸🇯",
    "countryCode": "SJ"
  },
  {
    "commonName": "Benin",
    "flag": "🇧🇯",
    "countryCode": "BJ"
  },
  {
    "commonName": "Japan",
    "flag": "🇯🇵",
    "countryCode": "JP"
  },
  {
    "commonName": "Dominican Republic",
    "flag": "🇩🇴",
    "countryCode": "DO"
  },
  {
    "commonName": "Qatar",
    "flag": "🇶🇦",
    "countryCode": "QA"
  },
  {
    "commonName": "Gabon",
    "flag": "🇬🇦",
    "countryCode": "GA"
  }
];

const reshapedArray = reshapeArray(originalArray);

console.log(reshapedArray); // Output: { "Moldova": { "flag": "🇲🇩", "countryCode": "MD" } }


const fileName = 'xx.json';
const jsonData = JSON.stringify(reshapedArray, null, 2);  // Pretty-print JSON for readability


const fs = require('fs');
fs.writeFile(fileName, jsonData, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log(`Country information written to file: ${fileName}`);
  }
});