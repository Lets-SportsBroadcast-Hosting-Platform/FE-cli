// styles.js

import { StyleSheet } from 'react-native';

export const layouts = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  horizontal: {
    flexDirection: 'row',
  },

  spaceBetween: {
    justifyContent: 'space-between'
  },

  relative: {
    position: 'relative'
  },

  imageContainer: {
    overflow: 'hidden',
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
    color:'black',
  },
  // 너비
  w100: {
    width: '100%',
  },

  //마진
  mb20: {
    marginBottom: 20,
  },

  mb40 : {
    marginBottom: 40
  },

  mb60 : {
    marginBottom: 60
  },

  mb80: {
    marginBottom: 80
  },

  ml10: {
    marginLeft: 10,
  },

  // 패딩
  p5: {
    padding: 5,
  },

  pr15: {
    paddingLeft: 15,
  },
  pl15: {
    paddingRight: 15,
  }


})