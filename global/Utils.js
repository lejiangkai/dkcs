import {Dimensions} from 'react-native'
import md5 from 'md5'

const uiWidthPx = 750;
export const px2dp = (px) => {
    return px * Dimensions.get('window').width / uiWidthPx;
};

export function signature (timestamp, str) {
    let app_id = '1001';
    let app_secret = 'DqYIlkXOsEHp8jJWvq61Ih0GjNh15PaK';
    return md5(app_id + app_secret + str + timestamp);
}

export function randomWord(min, max) {
    let str = '',
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let range = Math.round(Math.random() * (max - min)) + min;
    for (var i = 0; i < range; i++) {
        let pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
