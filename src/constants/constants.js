import {Dimensions, PixelRatio} from 'react-native';
// import Reactotron from 'reactotron-react-native';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_HEIGHT / 812;

const normalizeFont = size => {
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

const widthPercentageToDP = widthPercent => {
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

const widthFromPixel = (widthPx, w = 375) => {
  const newSize = widthPx * (SCREEN_WIDTH / w);

  return newSize;
};
const heightFromPixel = (heightPx, h = 812) => {
  const newSize = heightPx * (SCREEN_HEIGHT / h);

  return newSize;
};

export const images = {
  new_chat_fab: require('../assets/icons/add.png'),
};

// export const consolert = {
//   log: (message, ...args) => {
//     Reactotron.log(message, ...args);
//   },

//   warn: message => {
//     Reactotron.warn(message);
//   },

//   error: message => {
//     Reactotron.error(message);
//   },

//   display: ({name, preview, value, important = false}) => {
//     Reactotron.display({
//       name: name,
//       preview: preview,
//       value: value,
//       important: important,
//     });
//   },
// };

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const nameRegex = /^[a-zA-Z ]{2,30}$/;

export {
  widthFromPixel as wpx,
  heightFromPixel as hpx,
  normalizeFont as nf,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
};
