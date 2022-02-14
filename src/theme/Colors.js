const isDarkMode = false;

const white = '#FFFFFF';
const black = '#000';
const resolutionBlue = '#002286';
const transparent = 'rgba(0, 0, 0, 0)';
const black2 = '#ffffff40';
const background = {
  primary: isDarkMode ? black : white,
  secondary: isDarkMode ? black : '#f2f2f2',
  tertiary: isDarkMode ? black : black,
  quaternary: isDarkMode ? black : '#402A80',
  accent: isDarkMode ? black : '#1D2126',
  hexa: isDarkMode ? black : '#062143',
  hepta: isDarkMode ? black : '#FF0045',
  seca: isDarkMode ? black : '#acacac',
  unRead: isDarkMode ? black : '#e6e8fa',
  reca: isDarkMode ? black : '#ffffff',
  zeca: isDarkMode ? black : '#FF0045',
  lang: isDarkMode ? black : '#8F128F',
};

const text = {
  primary: isDarkMode ? white : black,
  secondary: isDarkMode ? black : white,
  tertiary: isDarkMode ? black : '#0FEF52',
  malachite: isDarkMode ? black : '#12E619',
  quaternary: isDarkMode ? black : '#A4A6AA',
  accent: isDarkMode ? black : resolutionBlue,
  hexa: isDarkMode ? black : '#787878',
  error: isDarkMode ? black : '#FF0045',
  deca: isDarkMode ? black : '#acacac',
  penta: isDarkMode ? black : '#504e4e',
  hepta: isDarkMode ? black : '#4CD964',
  seca: isDarkMode ? black : '#222455',
  peca: isDarkMode ? black : '#6e7faa',
  heca: isDarkMode ? black : '#3E3F68',
  reca: isDarkMode ? black : '#225cc1',
};

const image = {
  primary: isDarkMode ? black : white,
  secondary: isDarkMode ? white : black,
  tertiary: isDarkMode ? black : '#0FEF52',
  quaternary: isDarkMode ? black : '#A4A6AA',
  accent: isDarkMode ? black : resolutionBlue,
};

const gradient = {
  primary: isDarkMode ? [black, black] : [resolutionBlue, '#f8446f'],
  secondary: isDarkMode ? [black, black] : [white, white],
  tertiary: isDarkMode ? [white, white] : [black, black],
  quaternary: isDarkMode ? [white, white] : ['#ff8c48', '#ff5673'],
};

const error = {
  primary: isDarkMode ? '#f94242' : '#f94242',
};

const button = {
  primary: isDarkMode ? black : resolutionBlue,
  secondary: isDarkMode ? black : '#686565',
  tertiary: isDarkMode ? black : '#A4A6AA',
  quaternary: isDarkMode ? black : '#1D2126',
  accent: isDarkMode ? black : '#4FBE79',
  hexa: isDarkMode ? black : white,
  hepta: isDarkMode ? black : '#9E4CD8',
  octa: isDarkMode ? black : '#4f5ba3',
  reca: isDarkMode ? black : '#8685855e',
  zeca: isDarkMode ? black : '#FF0045',
  lang: isDarkMode ? black : '#8F128F',
};

const deliveryMode = {
  online: isDarkMode ? [black, black] : ['#31A4F7', '#2444E2'],
  offline: isDarkMode ? [black, black] : ['#FFA590', '#FF7656'],
  waspha: isDarkMode ? [black, black] : ['#C67DFA', '#913CCD'],
  change: isDarkMode ? [black, black] : ['#ff7656', '#ff7656'],
};

// const navbar = {
//   primary: resolutionBlue,
//   secondary: '#7B327A',
// };

const contactOptionsColor = {
  enable: isDarkMode ? black : '#663399',
  disable: isDarkMode ? black : '#cec8de',
};

const navbar = {
  background: background.quaternary,
  text: text.tertiary,
};
const border = {
  primary: isDarkMode ? white : black,
  secondary: isDarkMode ? black : white,
  tertiary: isDarkMode ? black : '#9E4CD8',
  quaternary: isDarkMode ? black : '#686565',
  accent: isDarkMode ? black : '#707070',
  peta: isDarkMode ? black : '#f7f9fc',
  error: isDarkMode ? black : '#FF0045',
  margin: isDarkMode ? black : '#e4e4e4',
};

const label = {
  primary: isDarkMode ? black : '#FF0045',
};

const social = {
  gmail: isDarkMode ? black : '#DD4B39',
  fb: isDarkMode ? black : '#3B5999',
};

const switchButton = {
  primary: isDarkMode ? white : black,
};

const badge = {
  primary: isDarkMode ? black : '#848DFF',
};

const loader = {
  primary: isDarkMode ? resolutionBlue : resolutionBlue,
  secondary: isDarkMode ? white : white,
  tertiary: isDarkMode ? black : black,
};

const overlay = {
  primary: isDarkMode ? '#48474761' : '#48474761',
};

const icon = {
  giftIcon: isDarkMode ? '#7B327A' : '#7B327A',
};

export default {
  overlay,
  switchButton,
  white,
  black,
  background,
  text,
  navbar,
  button,
  label,
  deliveryMode,
  gradient,
  social,
  error,
  border,
  image,
  border,
  transparent,
  contactOptionsColor,
  badge,
  loader,
  resolutionBlue,
  icon,
};
