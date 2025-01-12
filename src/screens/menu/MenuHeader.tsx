import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slices/authSlice';
import {RootState} from '../../redux/store';
import {instance} from '../../Axiosinstance';

const MenuHeader: React.FC = ({navigation}: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const scheme = useColorScheme(); // Get the current color scheme (light or dark)
  const dispatch = useDispatch();
  const hideMenu = (): void => setVisible(false);
  const showMenu = (): void => setVisible(true);
  // const getEmployeeCode = useSelector((state: RootState) => state.auth.user);
  const gettoken = useSelector((state: RootState) => state.auth.user);
  //console.log('isLoggedIn /// ---', gettoken);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!gettoken) {
      return;
    }
    const getImage = () => {
      instance
        .get(`/Cutting/ProfileImage/${gettoken?.employeeCode}/0`)
        .then((res: any) => {
          setImageUrl(res.data.imgURL);
          //console.log('isLoggedIn -----------------', res.data.imgURL);
        })
        .catch((error: any) => {
          console.error('Error fetching image:', error);
        });
    };
    getImage();
  }, []);

  const diameter = width * 0.06;

  return (
    <View
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Menu
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
              }}>
              {imageUrl ? (
                <Image
                  style={{
                    width: diameter, // Equal width and height
                    height: diameter,
                    borderRadius: diameter / 2, // Half of the diameter ensures a perfect circle
                    resizeMode: 'cover',
                  }}
                  source={{uri: imageUrl}}
                />
              ) : (
                <Text>Loading image...</Text>
              )}
            </View>
          </TouchableOpacity>
        }
        onRequestClose={hideMenu}>
        <MenuItem onPress={hideMenu}>
          <Text style={{color: 'blue'}}>Menu item 1</Text>
        </MenuItem>
        <MenuItem onPress={hideMenu}>
          <Text style={{color: 'blue'}}>Menu item 2</Text>
        </MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            handleLogout();
          }}>
          <Text style={{color: 'red'}}>Logout</Text>
        </MenuItem>
      </Menu>
    </View>
  );
};

const {width, height} = Dimensions.get('window');
export default MenuHeader;
