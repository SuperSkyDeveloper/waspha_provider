import util from '../util';

const COUNTRY_LIST = [
  {
    countryCode: 'AD',
    name: {
      en: 'Andorra',
      ar: 'أندورا',
    },
    icon: require('../assets/images/Country/ad.png'),
  },
  {
    countryCode: 'AE',
    icon: require('../assets/images/Country/ae.png'),
    name: {
      en: 'United Arab Emirates',
      ar: 'الامارات العربية المتحدة',
    },
  },
  {
    countryCode: 'AF',
    icon: require('../assets/images/Country/af.png'),
    name: {
      en: 'Afghanistan',
      ar: 'أفغانستان',
    },
  },
  {
    countryCode: 'AG',
    icon: require('../assets/images/Country/ag.png'),
    name: {
      en: 'Antigua and Barbuda',
      ar: 'أنتيجوا وبربودا',
    },
  },
  {
    countryCode: 'AI',
    icon: require('../assets/images/Country/ai.png'),
    name: {
      en: 'Anguilla',
      ar: 'أنجويلا',
    },
  },
  {
    countryCode: 'AL',
    icon: require('../assets/images/Country/al.png'),
    name: {
      en: 'Albania',
      ar: 'ألبانيا',
    },
  },
  {
    countryCode: 'AM',
    icon: require('../assets/images/Country/am.png'),
    name: {
      en: 'Armenia',
      ar: 'أرمينيا',
    },
  },

  {
    countryCode: 'AO',
    icon: require('../assets/images/Country/ao.png'),
    name: {
      en: 'Angola',
      ar: 'أنجولا',
    },
  },
  {
    countryCode: 'AQ',
    icon: require('../assets/images/Country/aq.png'),
    name: {
      en: 'Antarctica',
      ar: 'القطب الجنوبي',
    },
  },
  {
    countryCode: 'AR',
    icon: require('../assets/images/Country/ar.png'),
    name: {
      en: 'Argentina',
      ar: 'الأرجنتين',
    },
  },
  {
    countryCode: 'AS',
    icon: require('../assets/images/Country/as.png'),
    name: {
      en: 'American Samoa',
      ar: 'ساموا الأمريكية',
    },
  },
  {
    countryCode: 'AT',
    icon: require('../assets/images/Country/at.png'),
    name: {
      en: 'Austria',
      ar: 'النمسا',
    },
  },
  {
    countryCode: 'AU',
    icon: require('../assets/images/Country/au.png'),
    name: {
      en: 'Australia',
      ar: 'أستراليا',
    },
  },
  {
    countryCode: 'AW',
    icon: require('../assets/images/Country/aw.png'),
    name: {
      en: 'Aruba',
      ar: 'آروبا',
    },
  },
  {
    countryCode: 'AX',
    icon: require('../assets/images/Country/ax.png'),
    name: {
      en: 'Åland Islands',
      ar: 'جزر أولان',
    },
  },
  {
    countryCode: 'AZ',
    icon: require('../assets/images/Country/az.png'),
    name: {
      en: 'Azerbaijan',
      ar: 'أذربيجان',
    },
  },
  {
    countryCode: 'BA',
    icon: require('../assets/images/Country/ba.png'),
    name: {
      en: 'Bosnia and Herzegovina',
      ar: 'البوسنة والهرسك',
    },
  },
  {
    countryCode: 'BB',
    icon: require('../assets/images/Country/bb.png'),
    name: {
      en: 'Barbados',
      ar: 'بربادوس',
    },
  },
  {
    countryCode: 'BD',
    icon: require('../assets/images/Country/bd.png'),
    name: {
      en: 'Bangladesh',
      ar: 'بنجلاديش',
    },
  },
  {
    countryCode: 'BE',
    icon: require('../assets/images/Country/be.png'),
    name: {
      en: 'Belgium',
      ar: 'بلجيكا',
    },
  },
  {
    countryCode: 'BF',
    icon: require('../assets/images/Country/bf.png'),
    name: {
      en: 'Burkina Faso',
      ar: 'بوركينا فاسو',
    },
  },
  {
    countryCode: 'BG',
    icon: require('../assets/images/Country/bg.png'),
    name: {
      en: 'Bulgaria',
      ar: 'بلغاريا',
    },
  },
  {
    countryCode: 'BH',
    icon: require('../assets/images/Country/bh.png'),
    name: {
      en: 'Bahrain',
      ar: 'البحرين',
    },
  },
  {
    countryCode: 'BI',
    icon: require('../assets/images/Country/bi.png'),
    name: {
      en: 'Burundi',
      ar: 'بوروندي',
    },
  },
  {
    countryCode: 'BJ',
    icon: require('../assets/images/Country/bj.png'),
    name: {
      en: 'Benin',
      ar: 'بنين',
    },
  },
  {
    countryCode: 'BL',
    icon: require('../assets/images/Country/bl.png'),
    name: {
      en: 'Saint Barthélemy',
      ar: 'سان بارتيلمي',
    },
  },
  {
    countryCode: 'BM',
    icon: require('../assets/images/Country/bm.png'),
    name: {
      en: 'Bermuda',
      ar: 'برمودا',
    },
  },
  {
    countryCode: 'BN',
    icon: require('../assets/images/Country/bn.png'),
    name: {
      en: 'Brunei Darussalam',
      ar: 'بروناي',
    },
  },
  {
    countryCode: 'BO',
    icon: require('../assets/images/Country/bo.png'),
    name: {
      en: 'Bolivia, Plurinational State of',
      ar: 'بوليفيا',
    },
  },
  {
    countryCode: 'BQ',
    icon: require('../assets/images/Country/bq.png'),
    name: {
      en: 'Caribbean Netherlands',
      ar: 'بونير',
    },
  },
  {
    countryCode: 'BR',
    icon: require('../assets/images/Country/br.png'),
    name: {
      en: 'Brazil',
      ar: 'البرازيل',
    },
  },
  {
    countryCode: 'BS',
    icon: require('../assets/images/Country/bs.png'),
    name: {
      en: 'Bahamas',
      ar: 'الباهاما',
    },
  },
  {
    countryCode: 'BT',
    icon: require('../assets/images/Country/bt.png'),
    name: {
      en: 'Bhutan',
      ar: 'بوتان',
    },
  },
  {
    countryCode: 'BV',
    icon: require('../assets/images/Country/bv.png'),
    name: {
      en: 'Bouvet Island',
      ar: 'جزيرة بوفيه',
    },
  },
  {
    countryCode: 'BW',
    icon: require('../assets/images/Country/bw.png'),
    name: {
      en: 'Botswana',
      ar: 'بتسوانا',
    },
  },
  {
    countryCode: 'BY',
    icon: require('../assets/images/Country/by.png'),
    name: {
      en: 'Belarus',
      ar: 'روسيا البيضاء',
    },
  },
  {
    countryCode: 'BZ',
    icon: require('../assets/images/Country/bz.png'),
    name: {
      en: 'Belize',
      ar: 'بليز',
    },
  },
  {
    countryCode: 'CA',
    icon: require('../assets/images/Country/ca.png'),
    name: {
      en: 'Canada',
      ar: 'كندا',
    },
  },
  {
    countryCode: 'CC',
    icon: require('../assets/images/Country/cc.png'),
    name: {
      en: 'Cocos (Keeling) Islands',
      ar: 'جزر كوكوس',
    },
  },
  {
    countryCode: 'CD',
    icon: require('../assets/images/Country/cd.png'),
    name: {
      en: 'Congo, the Democratic Republic of the',
      ar: 'جمهورية الكونغو الديمقراطية',
    },
  },
  {
    countryCode: 'CF',
    icon: require('../assets/images/Country/cf.png'),
    name: {
      en: 'Central African Republic',
      ar: 'جمهورية افريقيا الوسطى',
    },
  },
  {
    countryCode: 'CG',
    icon: require('../assets/images/Country/cg.png'),
    name: {
      en: 'Congo',
      ar: 'الكونغو - برازافيل',
    },
  },
  {
    countryCode: 'CH',
    icon: require('../assets/images/Country/ch.png'),
    name: {
      en: 'Switzerland',
      ar: 'سويسرا',
    },
  },
  {
    countryCode: 'CI',
    icon: require('../assets/images/Country/ci.png'),
    name: {
      en: "Côte d'Ivoire",
      ar: 'ساحل العاج',
    },
  },
  {
    countryCode: 'CK',
    icon: require('../assets/images/Country/ck.png'),
    name: {
      en: 'Cook Islands',
      ar: 'جزر كوك',
    },
  },
  {
    countryCode: 'CL',
    icon: require('../assets/images/Country/cl.png'),
    name: {
      en: 'Chile',
      ar: 'شيلي',
    },
  },
  {
    countryCode: 'CM',
    icon: require('../assets/images/Country/cm.png'),
    name: {
      en: 'Cameroon',
      ar: 'الكاميرون',
    },
  },
  {
    countryCode: 'CN',
    icon: require('../assets/images/Country/cn.png'),
    name: {
      en: 'China',
      ar: 'الصين',
    },
  },
  {
    countryCode: 'CO',
    icon: require('../assets/images/Country/co.png'),
    name: {
      en: 'Colombia',
      ar: 'كولومبيا',
    },
  },
  {
    countryCode: 'CR',
    icon: require('../assets/images/Country/cr.png'),
    name: {
      en: 'Costa Rica',
      ar: 'كوستاريكا',
    },
  },
  {
    countryCode: 'CU',
    icon: require('../assets/images/Country/cu.png'),
    name: {
      en: 'Cuba',
      ar: 'كوبا',
    },
  },
  {
    countryCode: 'CV',
    icon: require('../assets/images/Country/cv.png'),
    name: {
      en: 'Cape Verde',
      ar: 'الرأس الأخضر',
    },
  },
  {
    countryCode: 'CW',
    icon: require('../assets/images/Country/cw.png'),
    name: {
      en: 'Curaçao',
      ar: 'كوراساو',
    },
  },
  {
    countryCode: 'CX',
    icon: require('../assets/images/Country/cx.png'),
    name: {
      en: 'Christmas Island',
      ar: 'جزيرة الكريسماس',
    },
  },
  {
    countryCode: 'CY',
    icon: require('../assets/images/Country/cy.png'),
    name: {
      en: 'Cyprus',
      ar: 'قبرص',
    },
  },
  {
    countryCode: 'CZ',
    icon: require('../assets/images/Country/cz.png'),
    name: {
      en: 'Czech Republic',
      ar: 'جمهورية التشيك',
    },
  },
  {
    countryCode: 'DE',
    icon: require('../assets/images/Country/de.png'),
    name: {
      en: 'Germany',
      ar: 'ألمانيا',
    },
  },
  {
    countryCode: 'DJ',
    icon: require('../assets/images/Country/dj.png'),
    name: {
      en: 'Djibouti',
      ar: 'جيبوتي',
    },
  },
  {
    countryCode: 'DK',
    icon: require('../assets/images/Country/dk.png'),
    name: {
      en: 'Denmark',
      ar: 'الدانمرك',
    },
  },
  {
    countryCode: 'DM',
    icon: require('../assets/images/Country/dm.png'),
    name: {
      en: 'Dominica',
      ar: 'دومينيكا',
    },
  },
  {
    countryCode: 'DO',
    icon: require('../assets/images/Country/do.png'),
    name: {
      en: 'Dominican Republic',
      ar: 'جمهورية الدومينيك',
    },
  },
  {
    countryCode: 'DZ',
    icon: require('../assets/images/Country/dz.png'),
    name: {
      en: 'Algeria',
      ar: 'الجزائر',
    },
  },
  {
    countryCode: 'EC',
    icon: require('../assets/images/Country/ec.png'),
    name: {
      en: 'Ecuador',
      ar: 'الاكوادور',
    },
  },
  {
    countryCode: 'EE',
    icon: require('../assets/images/Country/ee.png'),
    name: {
      en: 'Estonia',
      ar: 'استونيا',
    },
  },
  {
    countryCode: 'EG',
    icon: require('../assets/images/Country/eg.png'),
    name: {
      en: 'Egypt',
      ar: 'مصر',
    },
  },
  {
    countryCode: 'EH',
    icon: require('../assets/images/Country/eh.png'),
    name: {
      en: 'Western Sahara',
      ar: 'الصحراء الغربية',
    },
  },
  {
    countryCode: 'ER',
    icon: require('../assets/images/Country/er.png'),
    name: {
      en: 'Eritrea',
      ar: 'اريتريا',
    },
  },
  {
    countryCode: 'ES',
    icon: require('../assets/images/Country/es.png'),
    name: {
      en: 'Spain',
      ar: 'أسبانيا',
    },
  },
  {
    countryCode: 'ET',
    icon: require('../assets/images/Country/et.png'),
    name: {
      en: 'Ethiopia',
      ar: 'اثيوبيا',
    },
  },
  {
    countryCode: 'FI',
    icon: require('../assets/images/Country/fi.png'),
    name: {
      en: 'Finland',
      ar: 'فنلندا',
    },
  },
  {
    countryCode: 'FJ',
    icon: require('../assets/images/Country/fj.png'),
    name: {
      en: 'Fiji',
      ar: 'فيجي',
    },
  },
  {
    countryCode: 'FK',
    icon: require('../assets/images/Country/fk.png'),
    name: {
      en: 'Falkland Islands (Malvinas)',
      ar: 'جزر فوكلاند',
    },
  },
  {
    countryCode: 'FM',
    icon: require('../assets/images/Country/fm.png'),
    name: {
      en: 'Micronesia, Federated States of',
      ar: 'ميكرونيزيا',
    },
  },
  {
    countryCode: 'FO',
    icon: require('../assets/images/Country/fo.png'),
    name: {
      en: 'Faroe Islands',
      ar: 'جزر فارو',
    },
  },
  {
    countryCode: 'FR',
    icon: require('../assets/images/Country/fr.png'),
    name: {
      en: 'France',
      ar: 'فرنسا',
    },
  },
  {
    countryCode: 'GA',
    icon: require('../assets/images/Country/ga.png'),
    name: {
      en: 'Gabon',
      ar: 'الجابون',
    },
  },
  {
    countryCode: 'GB',
    icon: require('../assets/images/Country/gb.png'),
    name: {
      en: 'United Kingdom',
      ar: 'المملكة المتحدة',
    },
  },
  {
    countryCode: 'GD',
    icon: require('../assets/images/Country/gd.png'),
    name: {
      en: 'Grenada',
      ar: 'جرينادا',
    },
  },
  {
    countryCode: 'GE',
    icon: require('../assets/images/Country/ge.png'),
    name: {
      en: 'Georgia',
      ar: 'جورجيا',
    },
  },
  {
    countryCode: 'GF',
    icon: require('../assets/images/Country/gf.png'),
    name: {
      en: 'French Guiana',
      ar: 'غويانا',
    },
  },
  {
    countryCode: 'GG',
    icon: require('../assets/images/Country/gg.png'),
    name: {
      en: 'Guernsey',
      ar: 'غيرنزي',
    },
  },
  {
    countryCode: 'GH',
    icon: require('../assets/images/Country/gh.png'),
    name: {
      en: 'Ghana',
      ar: 'غانا',
    },
  },
  {
    countryCode: 'GI',
    icon: require('../assets/images/Country/gi.png'),
    name: {
      en: 'Gibraltar',
      ar: 'جبل طارق',
    },
  },
  {
    countryCode: 'GL',
    icon: require('../assets/images/Country/gl.png'),
    name: {
      en: 'Greenland',
      ar: 'جرينلاند',
    },
  },
  {
    countryCode: 'GM',
    icon: require('../assets/images/Country/gm.png'),
    name: {
      en: 'Gambia',
      ar: 'غامبيا',
    },
  },
  {
    countryCode: 'GN',
    icon: require('../assets/images/Country/gn.png'),
    name: {
      en: 'Guinea',
      ar: 'غينيا',
    },
  },
  {
    countryCode: 'GP',
    icon: require('../assets/images/Country/gp.png'),
    name: {
      en: 'Guadeloupe',
      ar: 'جوادلوب',
    },
  },
  {
    countryCode: 'GQ',
    icon: require('../assets/images/Country/gq.png'),
    name: {
      en: 'Equatorial Guinea',
      ar: 'غينيا الاستوائية',
    },
  },
  {
    countryCode: 'GR',
    icon: require('../assets/images/Country/gr.png'),
    name: {
      en: 'Greece',
      ar: 'اليونان',
    },
  },
  {
    countryCode: 'GS',
    icon: require('../assets/images/Country/gs.png'),
    name: {
      en: 'South Georgia and the South Sandwich Islands',
      ar: 'جورجيا الجنوبية وجزر ساندويتش الجنوبية',
    },
  },
  {
    countryCode: 'GT',
    icon: require('../assets/images/Country/gt.png'),
    name: {
      en: 'Guatemala',
      ar: 'جواتيمالا',
    },
  },
  {
    countryCode: 'GU',
    icon: require('../assets/images/Country/gu.png'),
    name: {
      en: 'Guam',
      ar: 'جوام',
    },
  },
  {
    countryCode: 'GW',
    icon: require('../assets/images/Country/gw.png'),
    name: {
      en: 'Guinea-Bissau',
      ar: 'غينيا بيساو',
    },
  },
  {
    countryCode: 'GY',
    icon: require('../assets/images/Country/gy.png'),
    name: {
      en: 'Guyana',
      ar: 'غيانا',
    },
  },
  {
    countryCode: 'HK',
    icon: require('../assets/images/Country/hk.png'),
    name: {
      en: 'Hong Kong',
      ar: 'هونج كونج الصينية',
    },
  },
  {
    countryCode: 'HM',
    icon: require('../assets/images/Country/hm.png'),
    name: {
      en: 'Heard Island and McDonald Islands',
      ar: 'جزيرة هيرد وماكدونالد',
    },
  },
  {
    countryCode: 'HN',
    icon: require('../assets/images/Country/hn.png'),
    name: {
      en: 'Honduras',
      ar: 'هندوراس',
    },
  },
  {
    countryCode: 'HR',
    icon: require('../assets/images/Country/hr.png'),
    name: {
      en: 'Croatia',
      ar: 'كرواتيا',
    },
  },
  {
    countryCode: 'HT',
    icon: require('../assets/images/Country/ht.png'),
    name: {
      en: 'Haiti',
      ar: 'هايتي',
    },
  },
  {
    countryCode: 'HU',
    icon: require('../assets/images/Country/hu.png'),
    name: {
      en: 'Hungary',
      ar: 'المجر',
    },
  },
  {
    countryCode: 'ID',
    icon: require('../assets/images/Country/id.png'),
    name: {
      en: 'Indonesia',
      ar: 'اندونيسيا',
    },
  },
  {
    countryCode: 'IE',
    icon: require('../assets/images/Country/ie.png'),
    name: {
      en: 'Ireland',
      ar: 'أيرلندا',
    },
  },
  {
    countryCode: 'IL',
    icon: require('../assets/images/Country/il.png'),
    name: {
      en: 'Israel',
      ar: 'اسرائيل',
    },
  },
  {
    countryCode: 'IM',
    icon: require('../assets/images/Country/im.png'),
    name: {
      en: 'Isle of Man',
      ar: 'جزيرة مان',
    },
  },
  {
    countryCode: 'IN',
    icon: require('../assets/images/Country/in.png'),
    name: {
      en: 'India',
      ar: 'الهند',
    },
  },
  {
    countryCode: 'IO',
    icon: require('../assets/images/Country/io.png'),
    name: {
      en: 'British Indian Ocean Territory',
      ar: 'المحيط الهندي البريطاني',
    },
  },
  {
    countryCode: 'IQ',
    icon: require('../assets/images/Country/iq.png'),
    name: {
      en: 'Iraq',
      ar: 'العراق',
    },
  },
  {
    countryCode: 'IR',
    icon: require('../assets/images/Country/ir.png'),
    name: {
      en: 'Iran, Islamic Republic of',
      ar: 'ايران',
    },
  },
  {
    countryCode: 'IS',
    icon: require('../assets/images/Country/is.png'),
    name: {
      en: 'Iceland',
      ar: 'أيسلندا',
    },
  },
  {
    countryCode: 'IT',
    icon: require('../assets/images/Country/it.png'),
    name: {
      en: 'Italy',
      ar: 'ايطاليا',
    },
  },
  {
    countryCode: 'JE',
    icon: require('../assets/images/Country/je.png'),
    name: {
      en: 'Jersey',
      ar: 'جيرسي',
    },
  },
  {
    countryCode: 'JM',
    icon: require('../assets/images/Country/jm.png'),
    name: {
      en: 'Jamaica',
      ar: 'جامايكا',
    },
  },
  {
    countryCode: 'JO',
    icon: require('../assets/images/Country/jo.png'),
    name: {
      en: 'Jordan',
      ar: 'الأردن',
    },
  },
  {
    countryCode: 'JP',
    icon: require('../assets/images/Country/jp.png'),
    name: {
      en: 'Japan',
      ar: 'اليابان',
    },
  },
  {
    countryCode: 'KE',
    icon: require('../assets/images/Country/ke.png'),
    name: {
      en: 'Kenya',
      ar: 'كينيا',
    },
  },
  {
    countryCode: 'KG',
    icon: require('../assets/images/Country/kg.png'),
    name: {
      en: 'Kyrgyzstan',
      ar: 'قرغيزستان',
    },
  },
  {
    countryCode: 'KH',
    icon: require('../assets/images/Country/kh.png'),
    name: {
      en: 'Cambodia',
      ar: 'كمبوديا',
    },
  },
  {
    countryCode: 'KI',
    icon: require('../assets/images/Country/ki.png'),
    name: {
      en: 'Kiribati',
      ar: 'كيريباتي',
    },
  },
  {
    countryCode: 'KM',
    icon: require('../assets/images/Country/km.png'),
    name: {
      en: 'Comoros',
      ar: 'جزر القمر',
    },
  },
  {
    countryCode: 'KN',
    icon: require('../assets/images/Country/kn.png'),
    name: {
      en: 'Saint Kitts and Nevis',
      ar: 'سانت كيتس ونيفيس',
    },
  },
  {
    countryCode: 'KP',
    icon: require('../assets/images/Country/kp.png'),
    name: {
      en: "Korea, Democratic People's Republic of",
      ar: 'كوريا الشمالية',
    },
  },
  {
    countryCode: 'KR',
    icon: require('../assets/images/Country/kr.png'),
    name: {
      en: 'Korea, Republic of',
      ar: 'كوريا الجنوبية',
    },
  },
  {
    countryCode: 'KW',
    icon: require('../assets/images/Country/kw.png'),
    name: {
      en: 'Kuwait',
      ar: 'الكويت',
    },
  },
  {
    countryCode: 'KY',
    icon: require('../assets/images/Country/ky.png'),
    name: {
      en: 'Cayman Islands',
      ar: 'جزر الكايمن',
    },
  },
  {
    countryCode: 'KZ',
    icon: require('../assets/images/Country/kz.png'),
    name: {
      en: 'Kazakhstan',
      ar: 'كازاخستان',
    },
  },
  {
    countryCode: 'LA',
    icon: require('../assets/images/Country/la.png'),
    name: {
      en: "Lao People's Democratic Republic",
      ar: 'لاوس',
    },
  },
  {
    countryCode: 'LB',
    icon: require('../assets/images/Country/lb.png'),
    name: {
      en: 'Lebanon',
      ar: 'لبنان',
    },
  },
  {
    countryCode: 'LC',
    icon: require('../assets/images/Country/lc.png'),
    name: {
      en: 'Saint Lucia',
      ar: 'سانت لوسيا',
    },
  },
  {
    countryCode: 'LI',
    icon: require('../assets/images/Country/li.png'),
    name: {
      en: 'Liechtenstein',
      ar: 'ليختنشتاين',
    },
  },
  {
    countryCode: 'LK',
    icon: require('../assets/images/Country/lk.png'),
    name: {
      en: 'Sri Lanka',
      ar: 'سريلانكا',
    },
  },
  {
    countryCode: 'LR',
    icon: require('../assets/images/Country/lr.png'),
    name: {
      en: 'Liberia',
      ar: 'ليبيريا',
    },
  },
  {
    countryCode: 'LS',
    icon: require('../assets/images/Country/ls.png'),
    name: {
      en: 'Lesotho',
      ar: 'ليسوتو',
    },
  },
  {
    countryCode: 'LT',
    icon: require('../assets/images/Country/lt.png'),
    name: {
      en: 'Lithuania',
      ar: 'ليتوانيا',
    },
  },
  {
    countryCode: 'LU',
    icon: require('../assets/images/Country/lu.png'),
    name: {
      en: 'Luxembourg',
      ar: 'لوكسمبورج',
    },
  },
  {
    countryCode: 'LV',
    icon: require('../assets/images/Country/lv.png'),
    name: {
      en: 'Latvia',
      ar: 'لاتفيا',
    },
  },
  {
    countryCode: 'LY',
    icon: require('../assets/images/Country/ly.png'),
    name: {
      en: 'Libya',
      ar: 'ليبيا',
    },
  },
  {
    countryCode: 'MA',
    icon: require('../assets/images/Country/ma.png'),
    name: {
      en: 'Morocco',
      ar: 'المغرب',
    },
  },
  {
    countryCode: 'MC',
    icon: require('../assets/images/Country/mc.png'),
    name: {
      en: 'Monaco',
      ar: 'موناكو',
    },
  },
  {
    countryCode: 'MD',
    icon: require('../assets/images/Country/md.png'),
    name: {
      en: 'Moldova, Republic of',
      ar: 'مولدافيا',
    },
  },
  {
    countryCode: 'ME',
    icon: require('../assets/images/Country/me.png'),
    name: {
      en: 'Montenegro',
      ar: 'الجبل الأسود',
    },
  },
  {
    countryCode: 'MF',
    icon: require('../assets/images/Country/mf.png'),
    name: {
      en: 'Saint Martin',
      ar: 'سانت مارتين',
    },
  },
  {
    countryCode: 'MG',
    icon: require('../assets/images/Country/mg.png'),
    name: {
      en: 'Madagascar',
      ar: 'مدغشقر',
    },
  },
  {
    countryCode: 'MH',
    icon: require('../assets/images/Country/mh.png'),
    name: {
      en: 'Marshall Islands',
      ar: 'جزر المارشال',
    },
  },
  {
    countryCode: 'MK',
    icon: require('../assets/images/Country/mk.png'),
    name: {
      en: 'Macedonia, the former Yugoslav Republic of',
      ar: 'مقدونيا',
    },
  },
  {
    countryCode: 'ML',
    icon: require('../assets/images/Country/ml.png'),
    name: {
      en: 'Mali',
      ar: 'مالي',
    },
  },
  {
    countryCode: 'MM',
    icon: require('../assets/images/Country/mm.png'),
    name: {
      en: 'Myanmar',
      ar: 'ميانمار',
    },
  },
  {
    countryCode: 'MN',
    icon: require('../assets/images/Country/mn.png'),
    name: {
      en: 'Mongolia',
      ar: 'منغوليا',
    },
  },
  {
    countryCode: 'MO',
    icon: require('../assets/images/Country/mo.png'),
    name: {
      en: 'Macao',
      ar: 'ماكاو الصينية',
    },
  },
  {
    countryCode: 'MP',
    icon: require('../assets/images/Country/mp.png'),
    name: {
      en: 'Northern Mariana Islands',
      ar: 'جزر ماريانا الشمالية',
    },
  },
  {
    countryCode: 'MQ',
    icon: require('../assets/images/Country/mq.png'),
    name: {
      en: 'Martinique',
      ar: 'مارتينيك',
    },
  },
  {
    countryCode: 'MR',
    icon: require('../assets/images/Country/mr.png'),
    name: {
      en: 'Mauritania',
      ar: 'موريتانيا',
    },
  },
  {
    countryCode: 'MS',
    icon: require('../assets/images/Country/ms.png'),
    name: {
      en: 'Montserrat',
      ar: 'مونتسرات',
    },
  },
  {
    countryCode: 'MT',
    icon: require('../assets/images/Country/mt.png'),
    name: {
      en: 'Malta',
      ar: 'مالطا',
    },
  },
  {
    countryCode: 'MU',
    icon: require('../assets/images/Country/mu.png'),
    name: {
      en: 'Mauritius',
      ar: 'موريشيوس',
    },
  },
  {
    countryCode: 'MV',
    icon: require('../assets/images/Country/mv.png'),
    name: {
      en: 'Maldives',
      ar: 'جزر الملديف',
    },
  },
  {
    countryCode: 'MW',
    icon: require('../assets/images/Country/mw.png'),
    name: {
      en: 'Malawi',
      ar: 'ملاوي',
    },
  },
  {
    countryCode: 'MX',
    icon: require('../assets/images/Country/mx.png'),
    name: {
      en: 'Mexico',
      ar: 'المكسيك',
    },
  },
  {
    countryCode: 'MY',
    icon: require('../assets/images/Country/my.png'),
    name: {
      en: 'Malaysia',
      ar: 'ماليزيا',
    },
  },
  {
    countryCode: 'MZ',
    icon: require('../assets/images/Country/mz.png'),
    name: {
      en: 'Mozambique',
      ar: 'موزمبيق',
    },
  },
  {
    countryCode: 'NA',
    icon: require('../assets/images/Country/na.png'),
    name: {
      en: 'Namibia',
      ar: 'ناميبيا',
    },
  },
  {
    countryCode: 'NC',
    icon: require('../assets/images/Country/nc.png'),
    name: {
      en: 'New Caledonia',
      ar: 'كاليدونيا الجديدة',
    },
  },
  {
    countryCode: 'NE',
    icon: require('../assets/images/Country/ne.png'),
    name: {
      en: 'Niger',
      ar: 'النيجر',
    },
  },
  {
    countryCode: 'NF',
    icon: require('../assets/images/Country/nf.png'),
    name: {
      en: 'Norfolk Island',
      ar: 'جزيرة نورفوك',
    },
  },
  {
    countryCode: 'NG',
    icon: require('../assets/images/Country/ng.png'),
    name: {
      en: 'Nigeria',
      ar: 'نيجيريا',
    },
  },
  {
    countryCode: 'NI',
    icon: require('../assets/images/Country/ni.png'),
    name: {
      en: 'Nicaragua',
      ar: 'نيكاراجوا',
    },
  },
  {
    countryCode: 'NL',
    icon: require('../assets/images/Country/nl.png'),
    name: {
      en: 'Netherlands',
      ar: 'هولندا',
    },
  },
  {
    countryCode: 'NO',
    icon: require('../assets/images/Country/no.png'),
    name: {
      en: 'Norway',
      ar: 'النرويج',
    },
  },
  {
    countryCode: 'NP',
    icon: require('../assets/images/Country/np.png'),
    name: {
      en: 'Nepal',
      ar: 'نيبال',
    },
  },
  {
    countryCode: 'NR',
    icon: require('../assets/images/Country/nr.png'),
    name: {
      en: 'Nauru',
      ar: 'نورو',
    },
  },
  {
    countryCode: 'NU',
    icon: require('../assets/images/Country/nu.png'),
    name: {
      en: 'Niue',
      ar: 'نيوي',
    },
  },
  {
    countryCode: 'NZ',
    icon: require('../assets/images/Country/nz.png'),
    name: {
      en: 'New Zealand',
      ar: 'نيوزيلاندا',
    },
  },
  {
    countryCode: 'OM',
    icon: require('../assets/images/Country/om.png'),
    name: {
      en: 'Oman',
      ar: 'عمان',
    },
  },
  {
    countryCode: 'PA',
    icon: require('../assets/images/Country/pa.png'),
    name: {
      en: 'Panama',
      ar: 'بنما',
    },
  },
  {
    countryCode: 'PE',
    icon: require('../assets/images/Country/pe.png'),
    name: {
      en: 'Peru',
      ar: 'بيرو',
    },
  },
  {
    countryCode: 'PF',
    icon: require('../assets/images/Country/pf.png'),
    name: {
      en: 'French Polynesia',
      ar: 'بولينيزيا الفرنسية',
    },
  },
  {
    countryCode: 'PG',
    icon: require('../assets/images/Country/pg.png'),
    name: {
      en: 'Papua New Guinea',
      ar: 'بابوا غينيا الجديدة',
    },
  },
  {
    countryCode: 'PH',
    icon: require('../assets/images/Country/ph.png'),
    name: {
      en: 'Philippines',
      ar: 'الفيلبين',
    },
  },
  {
    countryCode: 'PK',
    icon: require('../assets/images/Country/pk.png'),
    name: {
      en: 'Pakistan',
      ar: 'باكستان',
    },
  },
  {
    countryCode: 'PL',
    icon: require('../assets/images/Country/pl.png'),
    name: {
      en: 'Poland',
      ar: 'بولندا',
    },
  },
  {
    countryCode: 'PM',
    icon: require('../assets/images/Country/pm.png'),
    name: {
      en: 'Saint Pierre and Miquelon',
      ar: 'سانت بيير وميكولون',
    },
  },
  {
    countryCode: 'PN',
    icon: require('../assets/images/Country/pn.png'),
    name: {
      en: 'Pitcairn',
      ar: 'بتكايرن',
    },
  },
  {
    countryCode: 'PR',
    icon: require('../assets/images/Country/pr.png'),
    name: {
      en: 'Puerto Rico',
      ar: 'بورتوريكو',
    },
  },
  {
    countryCode: 'PS',
    icon: require('../assets/images/Country/ps.png'),
    name: {
      en: 'Palestine',
      ar: 'فلسطين',
    },
  },
  {
    countryCode: 'PT',
    icon: require('../assets/images/Country/pt.png'),
    name: {
      en: 'Portugal',
      ar: 'البرتغال',
    },
  },
  {
    countryCode: 'PW',
    icon: require('../assets/images/Country/pw.png'),
    name: {
      en: 'Palau',
      ar: 'بالاو',
    },
  },
  {
    countryCode: 'PY',
    icon: require('../assets/images/Country/py.png'),
    name: {
      en: 'Paraguay',
      ar: 'باراجواي',
    },
  },
  {
    countryCode: 'QA',
    icon: require('../assets/images/Country/qa.png'),
    name: {
      en: 'Qatar',
      ar: 'قطر',
    },
  },
  {
    countryCode: 'RE',
    icon: require('../assets/images/Country/re.png'),
    name: {
      en: 'Réunion',
      ar: 'روينيون',
    },
  },
  {
    countryCode: 'RO',
    icon: require('../assets/images/Country/ro.png'),
    name: {
      en: 'Romania',
      ar: 'رومانيا',
    },
  },
  {
    countryCode: 'RS',
    icon: require('../assets/images/Country/rs.png'),
    name: {
      en: 'Serbia',
      ar: 'صربيا',
    },
  },
  {
    countryCode: 'RU',
    icon: require('../assets/images/Country/ru.png'),
    name: {
      en: 'Russian Federation',
      ar: 'روسيا',
    },
  },
  {
    countryCode: 'RW',
    icon: require('../assets/images/Country/rw.png'),
    name: {
      en: 'Rwanda',
      ar: 'رواندا',
    },
  },
  {
    countryCode: 'SA',
    icon: require('../assets/images/Country/sa.png'),
    name: {
      en: 'Saudi Arabia',
      ar: 'المملكة العربية السعودية',
    },
  },
  {
    countryCode: 'SB',
    icon: require('../assets/images/Country/sb.png'),
    name: {
      en: 'Solomon Islands',
      ar: 'جزر سليمان',
    },
  },
  {
    countryCode: 'SC',
    icon: require('../assets/images/Country/sc.png'),
    name: {
      en: 'Seychelles',
      ar: 'سيشل',
    },
  },
  {
    countryCode: 'SD',
    icon: require('../assets/images/Country/sd.png'),
    name: {
      en: 'Sudan',
      ar: 'السودان',
    },
  },
  {
    countryCode: 'SE',
    icon: require('../assets/images/Country/se.png'),
    name: {
      en: 'Sweden',
      ar: 'السويد',
    },
  },
  {
    countryCode: 'SG',
    icon: require('../assets/images/Country/sg.png'),
    name: {
      en: 'Singapore',
      ar: 'سنغافورة',
    },
  },
  {
    countryCode: 'SH',
    icon: require('../assets/images/Country/sh.png'),
    name: {
      en: 'Saint Helena, Ascension and Tristan da Cunha',
      ar: 'سانت هيلنا',
    },
  },
  {
    countryCode: 'SI',
    icon: require('../assets/images/Country/si.png'),
    name: {
      en: 'Slovenia',
      ar: 'سلوفينيا',
    },
  },
  {
    countryCode: 'SJ',
    icon: require('../assets/images/Country/sj.png'),
    name: {
      en: 'Svalbard and Jan Mayen Islands',
      ar: 'سفالبارد وجان مايان',
    },
  },
  {
    countryCode: 'SK',
    icon: require('../assets/images/Country/sk.png'),
    name: {
      en: 'Slovakia',
      ar: 'سلوفاكيا',
    },
  },
  {
    countryCode: 'SL',
    icon: require('../assets/images/Country/sl.png'),
    name: {
      en: 'Sierra Leone',
      ar: 'سيراليون',
    },
  },
  {
    countryCode: 'SM',
    icon: require('../assets/images/Country/sm.png'),
    name: {
      en: 'San Marino',
      ar: 'سان مارينو',
    },
  },
  {
    countryCode: 'SN',
    icon: require('../assets/images/Country/sn.png'),
    name: {
      en: 'Senegal',
      ar: 'السنغال',
    },
  },
  {
    countryCode: 'SO',
    icon: require('../assets/images/Country/so.png'),
    name: {
      en: 'Somalia',
      ar: 'الصومال',
    },
  },
  {
    countryCode: 'SR',
    icon: require('../assets/images/Country/sr.png'),
    name: {
      en: 'Suriname',
      ar: 'سورينام',
    },
  },
  {
    countryCode: 'SS',
    icon: require('../assets/images/Country/ss.png'),
    name: {
      en: 'South Sudan',
      ar: 'جنوب السودان',
    },
  },
  {
    countryCode: 'ST',
    icon: require('../assets/images/Country/st.png'),
    name: {
      en: 'Sao Tome and Principe',
      ar: 'ساو تومي وبرينسيبي',
    },
  },
  {
    countryCode: 'SV',
    icon: require('../assets/images/Country/sv.png'),
    name: {
      en: 'El Salvador',
      ar: 'السلفادور',
    },
  },
  {
    countryCode: 'SX',
    icon: require('../assets/images/Country/sx.png'),
    name: {
      en: 'Sint Maarten (Dutch part)',
      ar: 'سينت مارتن',
    },
  },
  {
    countryCode: 'SY',
    icon: require('../assets/images/Country/sy.png'),
    name: {
      en: 'Syrian Arab Republic',
      ar: 'سوريا',
    },
  },
  {
    countryCode: 'SZ',
    icon: require('../assets/images/Country/sz.png'),
    name: {
      en: 'Swaziland',
      ar: 'سوازيلاند',
    },
  },
  {
    countryCode: 'TC',
    icon: require('../assets/images/Country/tc.png'),
    name: {
      en: 'Turks and Caicos Islands',
      ar: 'جزر الترك وجايكوس',
    },
  },
  {
    countryCode: 'TD',
    icon: require('../assets/images/Country/td.png'),
    name: {
      en: 'Chad',
      ar: 'تشاد',
    },
  },
  {
    countryCode: 'TF',
    icon: require('../assets/images/Country/tf.png'),
    name: {
      en: 'French Southern Territories',
      ar: 'المقاطعات الجنوبية الفرنسية',
    },
  },
  {
    countryCode: 'TG',
    icon: require('../assets/images/Country/tg.png'),
    name: {
      en: 'Togo',
      ar: 'توجو',
    },
  },
  {
    countryCode: 'TH',
    icon: require('../assets/images/Country/th.png'),
    name: {
      en: 'Thailand',
      ar: 'تايلند',
    },
  },
  {
    countryCode: 'TJ',
    icon: require('../assets/images/Country/tj.png'),
    name: {
      en: 'Tajikistan',
      ar: 'طاجكستان',
    },
  },
  {
    countryCode: 'TK',
    icon: require('../assets/images/Country/tk.png'),
    name: {
      en: 'Tokelau',
      ar: 'توكيلو',
    },
  },
  {
    countryCode: 'TL',
    icon: require('../assets/images/Country/tl.png'),
    name: {
      en: 'Timor-Leste',
      ar: 'تيمور الشرقية',
    },
  },
  {
    countryCode: 'TM',
    icon: require('../assets/images/Country/tm.png'),
    name: {
      en: 'Turkmenistan',
      ar: 'تركمانستان',
    },
  },
  {
    countryCode: 'TN',
    icon: require('../assets/images/Country/tn.png'),
    name: {
      en: 'Tunisia',
      ar: 'تونس',
    },
  },
  {
    countryCode: 'TO',
    icon: require('../assets/images/Country/to.png'),
    name: {
      en: 'Tonga',
      ar: 'تونجا',
    },
  },
  {
    countryCode: 'TR',
    icon: require('../assets/images/Country/tr.png'),
    name: {
      en: 'Turkey',
      ar: 'تركيا',
    },
  },
  {
    countryCode: 'TT',
    icon: require('../assets/images/Country/tt.png'),
    name: {
      en: 'Trinidad and Tobago',
      ar: 'ترينيداد وتوباغو',
    },
  },
  {
    countryCode: 'TV',
    icon: require('../assets/images/Country/tv.png'),
    name: {
      en: 'Tuvalu',
      ar: 'توفالو',
    },
  },
  {
    countryCode: 'TW',
    icon: require('../assets/images/Country/tw.png'),
    name: {
      en: 'Taiwan',
      ar: 'تايوان',
    },
  },
  {
    countryCode: 'TZ',
    icon: require('../assets/images/Country/tz.png'),
    name: {
      en: 'Tanzania, United Republic of',
      ar: 'تانزانيا',
    },
  },
  {
    countryCode: 'UA',
    icon: require('../assets/images/Country/ua.png'),
    name: {
      en: 'Ukraine',
      ar: 'أوكرانيا',
    },
  },
  {
    countryCode: 'UG',
    icon: require('../assets/images/Country/ug.png'),
    name: {
      en: 'Uganda',
      ar: 'أوغندا',
    },
  },
  {
    countryCode: 'UM',
    icon: require('../assets/images/Country/um.png'),
    name: {
      en: 'US Minor Outlying Islands',
      ar: 'جزر الولايات المتحدة البعيدة الصغيرة',
    },
  },
  {
    countryCode: 'US',
    icon: require('../assets/images/Country/us.png'),
    name: {
      en: 'United States',
      ar: 'الولايات المتحدة الأمريكية',
    },
  },
  {
    countryCode: 'UY',
    icon: require('../assets/images/Country/uy.png'),
    name: {
      en: 'Uruguay',
      ar: 'أورجواي',
    },
  },
  {
    countryCode: 'UZ',
    icon: require('../assets/images/Country/uz.png'),
    name: {
      en: 'Uzbekistan',
      ar: 'أوزبكستان',
    },
  },
  {
    countryCode: 'VA',
    icon: require('../assets/images/Country/va.png'),
    name: {
      en: 'Holy See (Vatican City State)',
      ar: 'الفاتيكان',
    },
  },
  {
    countryCode: 'VC',
    icon: require('../assets/images/Country/vc.png'),
    name: {
      en: 'Saint Vincent and the Grenadines',
      ar: 'سانت فنسنت وغرنادين',
    },
  },
  {
    countryCode: 'VE',
    icon: require('../assets/images/Country/ve.png'),
    name: {
      en: 'Venezuela, Bolivarian Republic of',
      ar: 'فنزويلا',
    },
  },
  {
    countryCode: 'VG',
    icon: require('../assets/images/Country/vg.png'),
    name: {
      en: 'Virgin Islands, British',
      ar: 'جزر فرجين البريطانية',
    },
  },
  {
    countryCode: 'VI',
    icon: require('../assets/images/Country/vi.png'),
    name: {
      en: 'Virgin Islands, U.S.',
      ar: 'جزر فرجين الأمريكية',
    },
  },
  {
    countryCode: 'VN',
    icon: require('../assets/images/Country/vn.png'),
    name: {
      en: 'Viet Nam',
      ar: 'فيتنام',
    },
  },
  {
    countryCode: 'VU',
    icon: require('../assets/images/Country/vu.png'),
    name: {
      en: 'Vanuatu',
      ar: 'فانواتو',
    },
  },
  {
    countryCode: 'WF',
    icon: require('../assets/images/Country/wf.png'),
    name: {
      en: 'Wallis and Futuna Islands',
      ar: 'جزر والس وفوتونا',
    },
  },
  {
    countryCode: 'WS',
    icon: require('../assets/images/Country/ws.png'),
    name: {
      en: 'Samoa',
      ar: 'ساموا',
    },
  },
  {
    countryCode: 'XK',
    icon: require('../assets/images/Country/xk.png'),
    name: {
      en: 'Kosovo',
      ar: 'كوسوفو',
    },
  },
  {
    countryCode: 'YE',
    icon: require('../assets/images/Country/ye.png'),
    name: {
      en: 'Yemen',
      ar: 'اليمن',
    },
  },
  {
    countryCode: 'YT',
    icon: require('../assets/images/Country/yt.png'),
    name: {
      en: 'Mayotte',
      ar: 'مايوت',
    },
  },
  {
    countryCode: 'ZA',
    icon: require('../assets/images/Country/za.png'),
    name: {
      en: 'South Africa',
      ar: 'جمهورية جنوب افريقيا',
    },
  },
  {
    countryCode: 'ZM',
    icon: require('../assets/images/Country/zm.png'),
    name: {
      en: 'Zambia',
      ar: 'زامبيا',
    },
  },
  {
    countryCode: 'ZW',
    icon: require('../assets/images/Country/zw.png'),
    name: {
      en: 'Zimbabwe',
      ar: 'زيمبابوي',
    },
  },

  //

  {
    countryCode: 'AN',
    icon: require('../assets/images/Country/an.png'),
    name: {en: 'Netherlands Antilles', ar: 'Netherlands Antilles'},
  },

  {
    countryCode: 'EU',
    icon: require('../assets/images/Country/eu.png'),
    name: {en: 'Europe', ar: 'Europe'},
  },
  {
    countryCode: 'GB-ENG',
    icon: require('../assets/images/Country/gb-eng.png'),
    name: {en: 'England', ar: 'England'},
  },
  {
    countryCode: 'GB-NIR',
    icon: require('../assets/images/Country/gb-nir.png'),
    name: {en: 'Northern Ireland', ar: 'Northern Ireland'},
  },
  {
    countryCode: 'GB-SCT',
    icon: require('../assets/images/Country/gb-sct.png'),
    name: {en: 'Scotland', ar: 'Scotland'},
  },
  {
    countryCode: 'GB-WLS',
    icon: require('../assets/images/Country/gb-wls.png'),
    name: {en: 'Wales', ar: 'GB-WLS'},
  },
];

export default COUNTRY_LIST;
