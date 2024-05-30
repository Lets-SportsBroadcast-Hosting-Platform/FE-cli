// 이용약관동의
import React,{useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Linking, Switch} from 'react-native';
import arrowToLeft from '../assets/images/arrowToLeft.png';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Toggle from '../components/toggle.js';


export default function TermsOfService() {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const arrowbuttonPress = () => {
        navigation.navigate('ChooseUser');
        console.log("arrowbuttonPressed");
    };
    const handleCancelModal = () => {
        setIsModalVisible(false);
        };
    const handleOpenTermsModal = ()=> {
        setIsModalVisible(true);
    }
    const handleOpenPrivacyModal = () => {
        setIsModalVisible2(true);
    };
    const handleCancelPrivacyModal = () => {
        setIsModalVisible2(false);
    };
    return (
    <View style={styles.container}>

        <View style={styles.header}>
            <TouchableOpacity onPress={arrowbuttonPress} style={styles.touchable}>
            <Image source={arrowToLeft} style={styles.arrowIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>이용약관 동의</Text>
        </View>

        <View style={styles.linkContainer}>
        {/* <OpenURLButton url={serviceUseURL}>Service Use URL</OpenURLButton> */}
        <Text style={{fontWeight: 'bold', width: '100%', color: 'black',textDecorationLine: 'underline', textAlign:'center' }}
            onPress={handleOpenTermsModal}>
            서비스 이용약관
        </Text>
        <Text style={{fontWeight: 'bold', width: '100%', color: 'black',textDecorationLine: 'underline', paddingTop:35, textAlign:'center'}}
            onPress={handleOpenPrivacyModal}>
            개인정보 처리 동의
        </Text>
        </View>
        {isModalVisible && (
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                **앱 이용약관 동의서**

                        이용자는 본 앱을 사용함으로써 아래의 이용약관에 동의하는 것으로 간주됩니다. 본 이용약관을 주의 깊게 읽어주시기 바랍니다.

                        1. **약관의 효력 및 변경**
                            - 본 약관은 이용자가 본 앱을 다운로드하거나 설치하는 즉시 효력을 발생합니다.
                            - 회사는 필요 시 약관을 변경할 수 있으며, 변경된 약관은 앱 내에 공지된 후 효력이 발생합니다.
                        2. **서비스의 제공 및 변경**
                            - 회사는 본 앱을 통해 다양한 서비스를 제공합니다.
                            - 회사는 서비스의 내용, 형태 등을 변경할 수 있으며, 변경 사항은 사전 공지합니다.
                        3. **이용자의 의무**
                            - 이용자는 법령 및 본 약관을 준수해야 합니다.
                            - 이용자는 회사의 사전 승낙 없이 본 앱을 상업적으로 이용할 수 없습니다.
                            - 이용자는 본 앱을 통해 얻은 정보를 회사의 사전 동의 없이 제3자에게 제공하거나 공유할 수 없습니다.
                        4. **개인정보의 보호**
                            - 회사는 이용자의 개인정보를 보호하기 위해 노력하며, 관련 법령에 따라 개인정보를 처리합니다.
                            - 개인정보 수집 및 이용에 대한 자세한 내용은 개인정보처리방침을 참조하십시오.
                        5. **서비스의 중단**
                            - 회사는 다음과 같은 사유로 서비스 제공을 일시 중단할 수 있습니다:
                                1. 시스템 점검 또는 유지보수
                                2. 전기통신사업법에 따른 기간통신사업자가 전기통신 서비스를 중단한 경우
                                3. 기타 불가항력적 사유
                        6. **면책조항**
                            - 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.
                            - 회사는 천재지변, 전쟁, 기타 불가항력으로 인해 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
                        7. **준거법 및 관할법원**
                            - 본 약관은 대한민국 법률에 따라 규율되고 해석됩니다.
                            - 본 약관과 관련된 분쟁은 회사의 본사 소재지를 관할하는 법원의 전속 관할로 합니다.

                        이용자는 본 약관에 동의하며, 이에 따라 서비스를 이용할 것을 확인합니다.
                </Text>
                <View style={styles.modalButtonContainer}>
                <Button mode="outlined" onPress={handleCancelModal} style={styles.modalButton}>
                    닫기
                </Button>
                </View>
            </View>
            </View>
            )}

        {isModalVisible2 && (
                    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                        **개인정보 보호 동의서**

                        이용자는 본 앱을 사용함으로써 아래의 개인정보 보호 동의서에 동의하는 것으로 간주됩니다. 본 동의서를 주의 깊게 읽어주시기 바랍니다.

                        1. **개인정보의 수집 및 이용 목적**
                            - 본 앱은 다음과 같은 목적을 위해 이용자의 개인정보를 수집 및 이용합니다:
                                1. 서비스 제공 및 운영
                                2. 고객 지원 및 문의 대응
                                3. 마케팅 및 광고
                                4. 서비스 개선 및 연구 분석
                        2. **수집하는 개인정보의 항목**
                            - 본 앱은 다음과 같은 개인정보를 수집합니다:
                                1. 필수 정보: 이름, 나이, 성별, 지역
                                2. 선택 정보: 가게이름, 가게연락처, 가게주소, 가게이미지
                        3. **개인정보의 보유 및 이용 기간**
                            - 이용자의 개인정보는 수집 및 이용 목적이 달성될 때까지 보유 및 이용됩니다.
                            - 관련 법령에 따라 보존할 필요가 있는 경우, 해당 법령에서 정한 기간 동안 보관합니다.
                        4. **개인정보의 제3자 제공**
                            - 본 앱은 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
                            - 다만, 다음의 경우에는 예외로 합니다:
                                1. 이용자가 사전에 동의한 경우
                                2. 법령에 따라 요구되는 경우
                                3. 서비스 제공을 위해 필요한 경우(예: 배송 업체)
                        5. **개인정보의 보호 조치**
                            - 회사는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취합니다:
                                1. 개인정보의 암호화
                                2. 접근 통제 및 관리
                                3. 개인정보 보호 교육
                        6. **이용자의 권리**
                            - 이용자는 언제든지 자신의 개인정보를 열람, 수정, 삭제할 수 있습니다.
                            - 개인정보 열람과 수정은 앱 내에서, 삭제 요청은 고객 지원을 통해 가능합니다.
                            - 이용자는 개인정보 처리에 대한 동의를 철회할 수 있으며, 철회 시 서비스 이용이 제한될 수 있습니다.
                        7. **개인정보 보호 책임자**
                            - 개인정보 보호 책임자: 문채원
                            - 연락처: 010-8841-2594
                            - 이메일: chae.won2594@gmail.com

                        이용자는 본 동의서의 내용을 충분히 이해하였으며, 이에 동의합니다.
                        </Text>
                        <View style={styles.modalButtonContainer}>
                        <Button mode="outlined" onPress={handleCancelPrivacyModal} style={styles.modalButton}>
                            닫기
                        </Button>
                        </View>
                    </View>
                    </View>
                    )}
        <View style={styles.toogleContainer}>
            <Text style={{fontSize: 15, color: '#000', marginRight: 20,fontFamily:'BlackHanSans-Regular',fontWeight:'800'}}> 알림 </Text>
            
        </View>
        <Toggle
            isOn={isChecked}
            onToggle={(value)=>{}}
        ></Toggle>
        <Text style={styles.explainText}>호스팅이나 예약이 취소된 경우 알림 드립니다</Text>
        <Button mode="contained"  style={styles.typeButton}>
        동의
        </Button>
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
    linkContainer :{
        width: '100%',
        marginTop:50,
        alignContent:'center',
    },
    toogleContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100,
        alignItems: 'center',
        width: '100%',
    },
    explainText :{
        fontSize:15,
        color:'#666',
        lineHeight:17.54
    },
    typeButton: {
        width: '80%',
        height:41,
        borderRadius: 20,
        marginTop: 15,
        backgroundColor:'#01162D',
        fontFamily:'BlackHanSans-Regular',
        fontSize:15,
        marginTop:50
    },
    modalContent: {
        width:'94%',
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        alignSelf: 'center'
    },
    modalInput: {
    marginBottom: 10,
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
});
