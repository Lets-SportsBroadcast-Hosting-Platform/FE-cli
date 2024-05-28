import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput, ScrollView, Animated  } from 'react-native';
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
        //클릭하면 다른 이미지로 대체
        const changeImage = async (index) => {
            const options = {
              selectionLimit: 1, // Allow only single image selection
              mediaType: 'photo', // Restrict to images only
              includeBase64: false, // Avoid including base64 data (optional)
            };
        
        try {
            const result = await launchImageLibrary(options);
        
            if (!result.didCancel) {
            const newUri = result.assets[0].uri; // Get the URI of the newly selected image
        
            // Replace the selected image with the new one
            const updatedSelectedImageUris = [...selectedImageUris];
            updatedSelectedImageUris.splice(selectedIndex, 1, newUri);
            setSelectedImageUris(updatedSelectedImageUris);
        
            // Close the modal and reset the selected index
            setIsModalVisible(false);
            setSelectedIndex(null);
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
        };

    const handleCancelModal = () => {
        setSelectedIndex(null); // 모달 닫을 때 인덱스 초기화
        setIsModalVisible(false);
        };
    // 연령대 progress-indicator
    const ProgressIndicator = ({ selectedAgeRange }) => {
        const ageRanges = [20, 30, 40, 50]; // Available age ranges
    
    // Map selectedAgeRange to circle dot representations
    const circleDots = ageRanges.map((ageRange) => {
        return {
        age: ageRange,
        isSelected: selectedAgeRange.includes(ageRange), // Check if ageRange is selected
        };
    });
    
    return (
        <View style={styles.progressBarContainer}>
        <View style={styles.circleDotContainer}>
            {circleDots.map((circleDot) => (
            <TouchableOpacity
                key={circleDot.age}
                style={[styles.circleDot, { backgroundColor: circleDot.isSelected ? '#2196F3' : '#ccc' }]}
                onPress={() => {
                // Handle selection logic
                if (selectedAgeRange.includes(circleDot.age)) {
                    // Unselect if already selected
                    setSelectedAgeRange(selectedAgeRange.filter((age) => age !== circleDot.age));
                } else {
                    // Select if not already selected
                    setSelectedAgeRange([...selectedAgeRange, circleDot.age]);
                }
                }}
            >
                <Text style={styles.circleDotText}>{circleDot.age}</Text>
            </TouchableOpacity>
            ))}
        </View>
        <Text style={styles.progressBarLabel}>연령대</Text>
            <ProgressIndicator selectedAgeRange={selectedAgeRange} />
        </View>
    );
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
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.InputTitle}>이미지</Text>
            <View style={styles.imageContainer}>
                <ScrollView horizontal = {true}>
                {selectedImageUris.map((uri, index) => (
                    <TouchableOpacity onLongPress={() => handleLongPress(index)} onPress={() => changeImage(index)} key={index}>
                    <Image
                        source={{ uri }}
                        style={styles.selectedImage}
                    />
                    </TouchableOpacity>
                ))}

                {selectedImageUris.length < MAX_IMAGES && (
                    <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderText}>사진 추가</Text>
                    </TouchableOpacity>
                )}
                </ScrollView>
            </View>
            
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
                {/* <ProgressIndicator progress={ageProgress} /> */}
            </View>

            <Text style={styles.InputTitle}>스크린 사이즈</Text>
            <View style = {styles.ScreenButtonContainer}>
                <Button style = {styles.ScreenButton} labelStyle={{ fontSize: 11 , color:'#000' }}> 60인치</Button>
                <Button style = {styles.ScreenButton} labelStyle={{ fontSize: 11 , color:'#000' }}> 80인치</Button>
                <Button style = {styles.ScreenButton} labelStyle={{ fontSize: 11 , color:'#000' }}> 100인치</Button>
                <Button style = {styles.ScreenButton} labelStyle={{ fontSize: 11 , color:'#000' }}> 120인치</Button>
                <Button style = {styles.ScreenButton} labelStyle={{ fontSize: 11 , color:'#000' }}> 150인치</Button>

            </View>


                <Button  mode="contained" onPress={()=> goToHostBusinessRegisNumber(storeAddress)} style={styles.FindAddressButton}>
                <Text style={styles.nextText}>다음</Text>
                </Button>
                </ScrollView>
        </View>
        
        </View>
    );
}

    const styles = 
    StyleSheet.create({
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
        // position:'relative',
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
    //모임정보 입력 아래 부분
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
        width:250,
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        alignSelf: 'center'
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
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#C5C5C7',
    elevation: 3,
    color: '#B7B7B7'
    },
    selectedImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    marginRight:20,

    paddingLeft: 14,
    borderWidth: 1,
    borderColor: '#C5C5C7',
    elevation: 3,
    color: '#B7B7B7'
    },
    selectedImagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow images to wrap to multiple lines
        width: '100%', // Set width to 100% of the container
        overflowX: 'scroll', // Enable horizontal scrolling
        overflowY: 'hidden', // Hide vertical overflow (optional)
        marginBottom: 20,
        // backgroundColor:'red'
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        // justifyContent: 'space-evenly', 
        width: '100%', 
    },
    modalContainer :{
        position: 'absolute',
        top: 0,
        left: 0,
        right:0,
        bottom:0,
        
        justifyContent:'center',
        alignContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 100,
    },
    modalButton :{
        borderRadius:6,
        marginTop:8,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    circleDotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    circleDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    },
    circleDotText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    },
    progressBarLabel: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
    },
    ScreenButton :{
        backgroundColor:'#eee',
        // width:40,
        width:'19%',
        borderRadius:7,
        fontSize:7
    },
    ScreenButtonContainer :{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly', 
        
    }
});
