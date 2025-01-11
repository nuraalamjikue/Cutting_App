import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
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
  const RoleID = useSelector((state: RootState) => state.auth.user);
  console.log('isLoggedIn', RoleID?.userID);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const getImage = () => {
      instance
        .get(`/Cutting/ProfileImage/${RoleID?.employeeCode}/${RoleID?.userID}`)
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
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                    borderRadius: 25,
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

export default MenuHeader;