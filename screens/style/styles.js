// styles.js

import { StyleSheet } from 'react-native';

export const layouts = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  imageContainer: {
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export const styles = StyleSheet.create({
  // 이미지 관련
  banner: {
    position: 'absolute',
    top: 0, left: 0,
  },
  cover: {
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  // 텍스트 관련
  commonFont: {
    fontFamily:'BlackHanSans-Regular',
    fontSize: 25,
    color:'black',
  },

  // 너비
  w100: {
    width: '100%',
  }


})