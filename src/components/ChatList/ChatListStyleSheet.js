import {StyleSheet} from 'react-native';

import {nf, hp, wp, hpx, wpx} from '../../constants/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  headerStyles: {
    height: hpx(60),
    width: wp(100),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },

  headerTextStyles: {
    fontSize: nf(24),
    marginLeft: wpx(20),
    fontWeight: 'bold',
    color: 'white',
  },

  fabButtonStyles: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: hpx(60),
    right: wpx(30),
    height: hpx(50),
    width: wpx(50),
    borderRadius: hpx(30),
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E35F24',
  },

  fabIconStyles: {
    height: hpx(25),
    width: wpx(25),
  },

  modalContainerStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  modalTextInputContainerStyles: {
    height: hpx(200),
    width: wpx(350),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 2,
    borderColor: '#E35F24',
    borderRadius: 15,
  },

  modalTextInputLabelStyles: {
    marginLeft: wpx(3),
    fontSize: nf(16),
  },

  modalTextInputStyles: {
    height: hpx(50),
    width: wpx(325),
    paddingHorizontal: wpx(10),
    marginTop: hpx(5),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: '#E35F24',
    borderRadius: 10,
  },

  modalButtonContainerStyles: {
    flexDirection: 'row',
    width: wpx(350),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  modalButtonStyles: {
    height: hpx(50),
    width: wpx(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E35F24',
    borderRadius: 5,
  },

  modalButtonTextStyles: {
    fontSize: nf(18),
    color: 'white',
  },

  chatFlatListStyles: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  chatCardContainerStyles: {
    height: hpx(60),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginVertical: hpx(5),
  },

  chatCardTextStyles: {
    fontSize: nf(24),
  },
});
