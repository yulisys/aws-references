// cloudfront-redirect-on-viewer-country
// trust relationship : logger.cloudfront.amazonaws.com

'use strict';

/**
 * 국가별 접속 서버 코드 정의
 * 1. 유렵: 유럽 서버 (http://worldwideweb.example.com/eu)
 * 2. 미국: 미국 서버 (http://worldwideweb.example.com/na)
 * 3. 한국: 한국 서버 (http://worldwideweb.example.com/kr)
 * 4. 이외: 한국 서버 (http://worldwideweb.example.com/int)
 * 
 * - path 분기는 User-Agent의 언어코드를 봐야하기 때문에 ELB 에서 담당.
 * - 국가코드: https://www.iso.org/obp/ui/#search/code/
 */
const server_code_by_country_codes = {
    // 유럽 지역 국가
    "AT": "EU",  // "Austria"
    "BE": "EU",  // "Belgium"
    "DE": "EU",  // "Germany"
    "ES": "EU",  // "Spain"
    "FR": "EU",  // "France"
    "GB": "EU",  // "United Kingdom of Great Britain and Northern Ireland"
    "IT": "EU",  // "Italy"
    "NL": "EU",  // "Netherlands"
    "SE": "EU",  // "Sweden"
    "RE": "EU",  // "Réunion"

    // 미국 국가
    "US": "US",  // "United States"

    // 한국
    "KR": "KR",  // "Korea, Republic of"

    // 이외 나머지 국가는 한국 서버로 선택
    "AD": "KR",  // "Andorra"
    "AE": "KR",  // "United Arab Emirates"
    "AF": "KR",  // "Afghanistan"
    "AG": "KR",  // "Antigua and Barbuda"
    "AI": "KR",  // "Anguilla"
    "AL": "KR",  // "Albania"
    "AM": "KR",  // "Armenia"
    "AO": "KR",  // "Angola"
    "AQ": "KR",  // "Antarctica"
    "AR": "KR",  // "Argentina"
    "AS": "KR",  // "American Samoa"
    "AU": "KR",  // "Australia"
    "AW": "KR",  // "Aruba"
    "AX": "KR",  // "Åland Islands"
    "AZ": "KR",  // "Azerbaijan"
    "BA": "KR",  // "Bosnia and Herzegovina"
    "BB": "KR",  // "Barbados"
    "BD": "KR",  // "Bangladesh"
    "BF": "KR",  // "Burkina Faso"
    "BG": "KR",  // "Bulgaria"
    "BH": "KR",  // "Bahrain"
    "BI": "KR",  // "Burundi"
    "BJ": "KR",  // "Benin"
    "BL": "KR",  // "Saint Barthélemy"
    "BM": "KR",  // "Bermuda"
    "BN": "KR",  // "Brunei Darussalam"
    "BO": "KR",  // "Bolivia (Plurinational State of)"
    "BQ": "KR",  // "Bonaire, Sint Eustatius and Saba"
    "BR": "KR",  // "Brazil"
    "BS": "KR",  // "Bahamas"
    "BT": "KR",  // "Bhutan"
    "BV": "KR",  // "Bouvet Island"
    "BW": "KR",  // "Botswana"
    "BY": "KR",  // "Belarus"
    "BZ": "KR",  // "Belize"
    "CA": "KR",  // "Canada"
    "CC": "KR",  // "Cocos (Keeling) Islands"
    "CD": "KR",  // "Congo, Democratic Republic of the"
    "CF": "KR",  // "Central African Republic"
    "CG": "KR",  // "Congo"
    "CH": "KR",  // "Switzerland"
    "CI": "KR",  // "Côte d'Ivoire"
    "CK": "KR",  // "Cook Islands"
    "CL": "KR",  // "Chile"
    "CM": "KR",  // "Cameroon"
    "CN": "KR",  // "China"
    "CO": "KR",  // "Colombia"
    "CR": "KR",  // "Costa Rica"
    "CU": "KR",  // "Cuba"
    "CV": "KR",  // "Cabo Verde"
    "CW": "KR",  // "Curaçao"
    "CX": "KR",  // "Christmas Island"
    "CY": "KR",  // "Cyprus"
    "CZ": "KR",  // "Czechia"
    "DJ": "KR",  // "Djibouti"
    "DK": "KR",  // "Denmark"
    "DM": "KR",  // "Dominica"
    "DO": "KR",  // "Dominican Republic"
    "DZ": "KR",  // "Algeria"
    "EC": "KR",  // "Ecuador"
    "EE": "KR",  // "Estonia"
    "EG": "KR",  // "Egypt"
    "EH": "KR",  // "Western Sahara"
    "ER": "KR",  // "Eritrea"
    "ET": "KR",  // "Ethiopia"
    "FI": "KR",  // "Finland"
    "FJ": "KR",  // "Fiji"
    "FK": "KR",  // "Falkland Islands (Malvinas)"
    "FM": "KR",  // "Micronesia (Federated States of)"
    "FO": "KR",  // "Faroe Islands"
    "GA": "KR",  // "Gabon"
    "GD": "KR",  // "Grenada"
    "GE": "KR",  // "Georgia"
    "GF": "KR",  // "French Guiana"
    "GG": "KR",  // "Guernsey"
    "GH": "KR",  // "Ghana"
    "GI": "KR",  // "Gibraltar"
    "GL": "KR",  // "Greenland"
    "GM": "KR",  // "Gambia"
    "GN": "KR",  // "Guinea"
    "GP": "KR",  // "Guadeloupe"
    "GQ": "KR",  // "Equatorial Guinea"
    "GR": "KR",  // "Greece"
    "GS": "KR",  // "South Georgia and the South Sandwich Islands"
    "GT": "KR",  // "Guatemala"
    "GU": "KR",  // "Guam"
    "GW": "KR",  // "Guinea-Bissau"
    "GY": "KR",  // "Guyana"
    "HK": "KR",  // "Hong Kong"
    "HM": "KR",  // "Heard Island and McDonald Islands"
    "HN": "KR",  // "Honduras"
    "HR": "KR",  // "Croatia"
    "HT": "KR",  // "Haiti"
    "HU": "KR",  // "Hungary"
    "ID": "KR",  // "Indonesia"
    "IE": "KR",  // "Ireland"
    "IL": "KR",  // "Israel"
    "IM": "KR",  // "Isle of Man"
    "IN": "KR",  // "India"
    "IO": "KR",  // "British Indian Ocean Territory"
    "IQ": "KR",  // "Iraq"
    "IR": "KR",  // "Iran (Islamic Republic of)"
    "IS": "KR",  // "Iceland"
    "JE": "KR",  // "Jersey"
    "JM": "KR",  // "Jamaica"
    "JO": "KR",  // "Jordan"
    "JP": "KR",  // "Japan"
    "KE": "KR",  // "Kenya"
    "KG": "KR",  // "Kyrgyzstan"
    "KH": "KR",  // "Cambodia"
    "KI": "KR",  // "Kiribati"
    "KM": "KR",  // "Comoros"
    "KN": "KR",  // "Saint Kitts and Nevis"
    "KP": "KR",  // "Korea (Democratic People's Republic of)"
    "KW": "KR",  // "Kuwait"
    "KY": "KR",  // "Cayman Islands"
    "KZ": "KR",  // "Kazakhstan"
    "LA": "KR",  // "Lao People's Democratic Republic"
    "LB": "KR",  // "Lebanon"
    "LC": "KR",  // "Saint Lucia"
    "LI": "KR",  // "Liechtenstein"
    "LK": "KR",  // "Sri Lanka"
    "LR": "KR",  // "Liberia"
    "LS": "KR",  // "Lesotho"
    "LT": "KR",  // "Lithuania"
    "LU": "KR",  // "Luxembourg"
    "LV": "KR",  // "Latvia"
    "LY": "KR",  // "Libya"
    "MA": "KR",  // "Morocco"
    "MC": "KR",  // "Monaco"
    "MD": "KR",  // "Moldova, Republic of"
    "ME": "KR",  // "Montenegro"
    "MF": "KR",  // "Saint Martin (French part)"
    "MG": "KR",  // "Madagascar"
    "MH": "KR",  // "Marshall Islands"
    "MK": "KR",  // "North Macedonia"
    "ML": "KR",  // "Mali"
    "MM": "KR",  // "Myanmar"
    "MN": "KR",  // "Mongolia"
    "MO": "KR",  // "Macao"
    "MP": "KR",  // "Northern Mariana Islands"
    "MQ": "KR",  // "Martinique"
    "MR": "KR",  // "Mauritania"
    "MS": "KR",  // "Montserrat"
    "MT": "KR",  // "Malta"
    "MU": "KR",  // "Mauritius"
    "MV": "KR",  // "Maldives"
    "MW": "KR",  // "Malawi"
    "MX": "KR",  // "Mexico"
    "MY": "KR",  // "Malaysia"
    "MZ": "KR",  // "Mozambique"
    "NA": "KR",  // "Namibia"
    "NC": "KR",  // "New Caledonia"
    "NE": "KR",  // "Niger"
    "NF": "KR",  // "Norfolk Island"
    "NG": "KR",  // "Nigeria"
    "NI": "KR",  // "Nicaragua"
    "NO": "KR",  // "Norway"
    "NP": "KR",  // "Nepal"
    "NR": "KR",  // "Nauru"
    "NU": "KR",  // "Niue"
    "NZ": "KR",  // "New Zealand"
    "OM": "KR",  // "Oman"
    "PA": "KR",  // "Panama"
    "PE": "KR",  // "Peru"
    "PF": "KR",  // "French Polynesia"
    "PG": "KR",  // "Papua New Guinea"
    "PH": "KR",  // "Philippines"
    "PK": "KR",  // "Pakistan"
    "PL": "KR",  // "Poland"
    "PM": "KR",  // "Saint Pierre and Miquelon"
    "PN": "KR",  // "Pitcairn"
    "PR": "KR",  // "Puerto Rico"
    "PS": "KR",  // "Palestine, State of"
    "PT": "KR",  // "Portugal"
    "PW": "KR",  // "Palau"
    "PY": "KR",  // "Paraguay"
    "QA": "KR",  // "Qatar"
    "RO": "KR",  // "Romania"
    "RS": "KR",  // "Serbia"
    "RU": "KR",  // "Russian Federation"
    "RW": "KR",  // "Rwanda"
    "SA": "KR",  // "Saudi Arabia"
    "SB": "KR",  // "Solomon Islands"
    "SC": "KR",  // "Seychelles"
    "SD": "KR",  // "Sudan"
    "SG": "KR",  // "Singapore"
    "SH": "KR",  // "Saint Helena, Ascension and Tristan da Cunha"
    "SI": "KR",  // "Slovenia"
    "SJ": "KR",  // "Svalbard and Jan Mayen"
    "SK": "KR",  // "Slovakia"
    "SL": "KR",  // "Sierra Leone"
    "SM": "KR",  // "San Marino"
    "SN": "KR",  // "Senegal"
    "SO": "KR",  // "Somalia"
    "SR": "KR",  // "Suriname"
    "SS": "KR",  // "South Sudan"
    "ST": "KR",  // "Sao Tome and Principe"
    "SV": "KR",  // "El Salvador"
    "SX": "KR",  // "Sint Maarten (Dutch part)"
    "SY": "KR",  // "Syrian Arab Republic"
    "SZ": "KR",  // "Eswatini"
    "TC": "KR",  // "Turks and Caicos Islands"
    "TD": "KR",  // "Chad"
    "TF": "KR",  // "French Southern Territories"
    "TG": "KR",  // "Togo"
    "TH": "KR",  // "Thailand"
    "TJ": "KR",  // "Tajikistan"
    "TK": "KR",  // "Tokelau"
    "TL": "KR",  // "Timor-Leste"
    "TM": "KR",  // "Turkmenistan"
    "TN": "KR",  // "Tunisia"
    "TO": "KR",  // "Tonga"
    "TR": "KR",  // "Turkey"
    "TT": "KR",  // "Trinidad and Tobago"
    "TV": "KR",  // "Tuvalu"
    "TW": "KR",  // "Taiwan, Province of China"
    "TZ": "KR",  // "Tanzania, United Republic of"
    "UA": "KR",  // "Ukraine"
    "UG": "KR",  // "Uganda"
    "UM": "KR",  // "United States Minor Outlying Islands"
    "UY": "KR",  // "Uruguay"
    "UZ": "KR",  // "Uzbekistan"
    "VA": "KR",  // "Holy See"
    "VC": "KR",  // "Saint Vincent and the Grenadines"
    "VE": "KR",  // "Venezuela (Bolivarian Republic of)"
    "VG": "KR",  // "Virgin Islands (British)"
    "VI": "KR",  // "Virgin Islands (U.S.)"
    "VN": "KR",  // "Viet Nam"
    "VU": "KR",  // "Vanuatu"
    "WF": "KR",  // "Wallis and Futuna"
    "WS": "KR",  // "Samoa"
    "YE": "KR",  // "Yemen"
    "YT": "KR",  // "Mayotte"
    "ZA": "KR",  // "South Africa"
    "ZM": "KR",  // "Zambia"
    "ZW": "KR",  // "Zimbabwe"
}

exports.handler = (event, context, callback) => {

    if( process.env.IS_DEBUG === "true" ) {
        console.debug("--- original event ---")
        console.debug(JSON.stringify(event));
        console.debug("--- //////////////// ---")
    }

    const request = event.Records[0].cf.request;

    var countryCode;
    if (request.headers['cloudfront-viewer-country']) {
        countryCode = request.headers['cloudfront-viewer-country'][0].value;
    }

    var serverCode = "KR";
    try {
        serverCode = server_code_by_country_codes[countryCode];
        if( process.env.IS_DEBUG === "true" ) {
            console.debug( "Server Code:" + serverCode);
        }
    // 알 수 없는 국가 코드는 한국 서버로...
    } catch (error) {
        serverCode = "KR"
        if( process.env.IS_DEBUG === "true" ) {
            console.error( "서버 코드 선택 오류 발생: 한국 서버로 지정");
        }
    }

    var domainName = 'nginx-kr-1189207799.ap-northeast-2.elb.amazonaws.com';
    switch(serverCode) {
        case 'KR':
            domainName = 'nginx-kr-1189207799.ap-northeast-2.elb.amazonaws.com';
            break;
        case 'EU':
            domainName = 'nginx-eu-852166695.eu-west-2.elb.amazonaws.com';
            break;
        case 'US':
            domainName = 'nginx-na-252430420.us-east-1.elb.amazonaws.com';
            break;
    }
    request.origin.custom.domainName = domainName;

    if( process.env.IS_DEBUG === "true" ) {
        console.debug("--- new request ---");
        console.debug(JSON.stringify(request));
        console.debug("--- /////////// ---");
    }
     
    callback(null, request);
};