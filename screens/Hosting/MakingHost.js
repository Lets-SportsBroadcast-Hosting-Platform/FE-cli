import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput } from 'react-native';
import arrowToLeft from '../../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
export default function MakingHost() {
    const navigation = useNavigation();
    
    const [state, setState] = React.useState('');
    const arrowbuttonPress = () => {
        navigation.navigate('HostAuthentication');
        console.log("arrowbuttonPressed");
    };

    const setCapacity = () => {
        console.log('정원값 입력')
    }
    // 이미지
    const [selectedImageUris, setSelectedImageUris] = useState([]);
    const [hasImage, setHasImage] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const MAX_IMAGES = 5;
    const pickImage = async () => {
    const options = {
        selectionLimit: MAX_IMAGES - selectedImageUris.length, // Allow only single image selection
        mediaType: 'photo', // Restrict to images only
        includeBase64: false, // Avoid including base64 data (optional)
    };

    try {
        const result = await launchImageLibrary(options);

        if (!result.didCancel) {

        const newUris = result.assets.map((asset) => asset.uri);
        setSelectedImageUris([...selectedImageUris, ...newUris]);
        setHasImage(true); // Update image selection state
        }
    } catch (error) {
        console.error('Error selecting image:', error);
    }
    };
    //이미지 삭제
    const handleLongPress = (index) => {
        setSelectedIndex(index); // 선택된 이미지 인덱스 저장
        setIsModalVisible(true);
    };

    const handleDeleteImage = () => {
        if (selectedIndex !== null && selectedIndex < selectedImageUris.length) {
            const newSelectedImageUris = [...selectedImageUris];
            newSelectedImageUris.splice(selectedIndex, 1);
            setSelectedImageUris(newSelectedImageUris);
            setIsModalVisible(false);
            setSelectedIndex(null); // 삭제 완료 후 인덱스 초기화
        }
        };

    const handleCancelModal = () => {
        setSelectedIndex(null); // 모달 닫을 때 인덱스 초기화
        setIsModalVisible(false);
        };
    
    return (
        <View style={styles.container}>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>모임 정보 입력</Text>
            
        </View>
        <View style={styles.contentContainer}>

            <Text style={styles.InputTitle}>이미지</Text>
            {selectedImageUris.length < MAX_IMAGES && ( // Show "사진 추가" only if less than max
            <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>사진 추가</Text>
            </TouchableOpacity>
            )}
            {selectedImageUris.length > 0 && (
            <View style={styles.selectedImagesContainer}>
                {selectedImageUris.map((uri, index) => (
                <Image
                    key={index} // 고유 키 제공
                    source={{ uri }}
                    style={styles.selectedImage}
                    onLongPress={() => handleLongPress(index)} // 각 이미지에 롱 프레스 이벤트 추가
                />
                ))}
            </View>
            )}
            {isModalVisible && (
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>이미지를 삭제하시겠습니까?</Text>
                <View style={styles.modalButtonContainer}>
                <Button mode="outlined" onPress={handleDeleteImage} style={styles.modalButton}>
                    삭제
                </Button>
                <Button mode="outlined" onPress={handleCancelModal} style={styles.modalButton}>
                    취소
                </Button>
                </View>
            </View>
            </View>
            )}


            <Text style={styles.InputTitle}>모임 이름</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    placeholder='KBO 야구리그 - 롯데 vs 삼성'
                    // value={phone}
                    // onChangePhone={onChangePhone}
                    style={styles.storeInputText}
                    mode='outlined'
                />
            </View>


            <Text style={styles.InputTitle}>모임 소개</Text>

                <View style={styles.textInputContainer} >
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={(text) => setState(text)}
                    value={state}
                    style={styles.textArea}
                    keyboardType="default"
                />
                </View>

            <View style={styles.capacityContainer}>
            <Text style={styles.InputTitleInOneLine}>정원</Text>
            <TextInput
            placeholder='숫자' // Placeholder text
            keyboardType='numeric' // Set keyboard type to numeric for numbers
            // value={capacity} // Set value from state
            onChangeText={(text) => setCapacity(text)} // Update state on change
            style={styles.peopleText}
            mode='outlined'
            />
            </View>

            <View style={styles.capacityContainer}>
            <Text style={styles.InputTitleInOneLine}>연령대</Text>
            <TextInput
            placeholder='숫자' // Placeholder text
            keyboardType='numeric' // Set keyboard type to numeric for numbers
            // value={capacity} // Set value from state
            onChangeText={(text) => setCapacity(text)} // Update state on change
            style={styles.peopleText}
            mode='outlined'
            />
            </View>


            <Text style={styles.InputTitle}>스크린 사이즈</Text>


                <Button  mode="contained" onPress={()=> goToHostBusinessRegisNumber(storeAddress)} style={styles.FindAddressButton}>
                <Text style={styles.nextText}>다음</Text>
                </Button>
        
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        // paddingVertical: 30,
        // paddingHorizontal: 10
        backgroundColor:'#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%',
        position: 'relative',
    },
    textArea: {
        width: '100%',
        // backgroundColor: 'transparent', // Set to transparent
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingLeft: 14,
        borderWidth: 1,
        borderColor: '#C5C5C7',
        elevation: 3,
        color: '#B7B7B7'
    },
    capacityContainer: {
        flexDirection: 'row', // Arrange elements horizontally
        alignItems: 'center', // Align text and input vertically
        justifyContent:'center',
        position:'relative',
        height:60
    },
    peopleText:{
        width:'50%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color:'black',
        fontFamily:'BlackHanSans-Regular',
        fontWeight:'200'
    },
    touchable: {
        alignItems: 'center',
        position: 'absolute',
        top: '50%', left: 0,
        transform: [{translateY: 13.1}, {translateX: 20}]
    },
    arrowIcon: {
        width: 20,
        height: 20,
        // 이미지와 텍스트 사이의 간격 조정
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor:'red'
    },
    textInputContainer: {
        width: '100%',
        // height:41.24,
        // justifyContent: 'center',
        borderRadius: 10,
        borderBottomWidth: 0,
        // backgroundColor:'red',
        flexDirection: 'row',
        marginBottom:25
    },
    storeInputText :{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius:10,
        paddingLeft:14,
        borderWidth: 1, // Border width
        borderColor: '#C5C5C7', // Border color
        elevation: 3, 
        color:'#B7B7B7'
    },
    InputTitle :{
        color:'black',
        fontFamily:'NotoSansKR-Medium',
        fontSize:16,
        // backgroundColor:'#ddd'
    },
    InputTitleInOneLine:{
        position:'absolute',
        top:0,
        left:0,
        color:'black',
        fontFamily:'NotoSansKR-Medium',
        fontSize:16,
        lineHeight: 60,
    },
    storeAddressInputText :{
        backgroundColor:'#eee',
        borderRadius:10,
        paddingLeft:14,
        width:'100%',
        color:'#B7B7B7'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalInput: {
    marginBottom: 10,
    },
    FindAddressButton :{
        height:50,
        backgroundColor:'#B7B7B7',
        marginTop:40
    },
    nextText :{
        color:'#fff',
        fontFamily:'NotoSansKR-Medium',
        alignItems:'center',
        fontSize:15,
        lineHeight:25.5
    },
    // 이미지
    imagePlaceholder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    },
    selectedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    marginRight:20,
    },
    selectedImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow images to wrap to multiple lines
        width: '100%', // Set width to 100% of the container
        overflowX: 'scroll', // Enable horizontal scrolling
        overflowY: 'hidden', // Hide vertical overflow (optional)
        marginBottom: 20,
    },
    });
