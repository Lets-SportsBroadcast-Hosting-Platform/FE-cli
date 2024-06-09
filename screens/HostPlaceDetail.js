import { StyleSheet, Text, View, ScrollView, Image,TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';

// auth
import { useAuth } from '../contexts/AuthContext.js';

// api
import ApiUtil from '../api/ApiUtil';
import ApiConfig from '../api/ApiConfig';

// style
import {layouts, styles} from './style/styles.js'

//images
import marker from '../assets/images/free-icon-font-marker.png'
import megaphone from '../assets/images/free-icon-font-megaphone.png'
import users from '../assets/images/free-icon-font-users.png'
import camera from '../assets/images/free-icon-font-video-camera-alt.png'

function HostPlaceDetail(){
    // const navigation = useNavigation();
    const [clientWidth, setClientWidth] = useState(0)
    const [clientHeight, setClientHeight] = useState(0)
    const [storeInfo, setStoreInfo] = useState({})
    const [partyInfo, setPartyInfo] = useState({})
    const [imageBlobList, setImageBlobList] = useState([])


    const {getStoreInfo} = useAuth();
    
    const route = useRoute();
    const hosting_id = route.params.hosting_id;
    const isNew = route.params.isNew ?? false;

    //MakingHost에서 받아오는 값 (미리보기 페이지)
    const hosting_name = route.params.hosting_name;
    const introduce = route.params.hostIntroduction;
    const max_personnel = route.params.maxPeople;
    const age_group_min = route.params.low;
    const age_group_max = route.params.high;
    const selectedImageUris = route.params.selectedImageUris;
    const screen_size = route.params.screenSize;
    
    const uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            // return the blob
            resolve(xhr.response)
        }
        xhr.onerror = function () {
            reject(new Error('uriToBlob failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
    
        xhr.send(null)})}

    // const imageLink = route.params.selectedImageUris[0];
    useEffect(()=>{
        getStoreInfo().then((info)=>{
            setStoreInfo(info)
        })

        // 현재 창의 너비와 높이 가져오기
        const clientWidth = Dimensions.get('window').width;
        const clientHeight = Dimensions.get('window').height;

        setClientWidth(clientWidth)
        setClientHeight(clientHeight)

        

        // console.log(hosting_name, introduce, max_personnel, age_group_min, age_group_max, screen_size, selectedImageUris[0])
        if(!isNew){
            ApiUtil.get(`${ApiConfig.SERVER_URL}/party/${hosting_id}`).then(res=>{
                const party = JSON.parse(JSON.stringify(res))

                const dayArray = ['월', '화', '수', '목', '금', '토', '일']
                const hostingDateInfo = new Date(party.hosting_date)
                const hostMonth = hostingDateInfo.getMonth() + 1
                const hostDate = hostingDateInfo.getDate()
                const hostDay = hostingDateInfo.getDay()
                const hostHHMI = `${hostingDateInfo.getHours()}:${hostingDateInfo.getMinutes()}`
                const hostDayNm = dayArray[hostDay]
                
                party.imageLink = {uri: `${party.store_image_url}0`}
                party.hostDateNm = `${hostMonth}.${hostDate}`
                party.hostHHMI = hostHHMI
                party.hostDayNm = hostDayNm
                setPartyInfo({
                    ...party
                })
            })
        } else {
            const dayArray = ['월', '화', '수', '목', '금', '토', '일']
            const hostingDateInfo = new Date()
            const hostMonth = hostingDateInfo.getMonth() + 1
            const hostDate = hostingDateInfo.getDate()
            const hostDay = hostingDateInfo.getDay()
            const hostHHMI = `${hostingDateInfo.getHours()}:${hostingDateInfo.getMinutes()}`
            const hostDayNm = dayArray[hostDay]

            setPartyInfo({
                hostMonth, hostDate, hostDay, hostHHMI, hostDayNm, hostDateNm : `${hostMonth}.${hostDate}`, 
            })
            
            Promise.all((selectedImageUris.map(uri => uriToBlob(uri)))).then((responsetList)=>{
                setImageBlobList(responsetList)
            })
            
        }
        
    }, [])

    

    const postHosting = ()=>{
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            hosting_name: route.params.hosting_name,
            //business_no: storeInfo.business_no,
            business_no:    3372300444,
            introduce: route.params.hostIntroduction,
            max_personnel: route.params.maxPeople,
            age_group_min: route.params.low,
            age_group_max: route.params.high,
            hosting_date: new Date(), // 임시
            screen_size: route.params.screenSize
        }))
        

        for(let i=0; i<imageBlobList.length; i++){
            const blob = imageBlobList[i].data;
            formData.append('photos', blob)
        }

        ApiUtil.post(`${ApiConfig.SERVER_URL}/party`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>console.log(res))
         .catch(e=>console.log(JSON.stringify(e)))
    }

    const applyHosting = ()=>{

    }

    return (
        <ScrollView
            scrollEnabled={true}
            style={[layouts.container, styles.mb20]}
        >   
            <View style={[styles.w100, {height: 267}, styles.mb80]}>
                <View style={[layouts.imageContainer, styles.w100, self.banner, styles.banner]}>
                    {/* {!!partyInfo.imageLink ? <Image source={partyInfo.imageLink} style={[styles.w100, {height: 400}]}/> : <Image source={imageLink} style={[styles.w100, {height: 400}]}/>} */}
                    {isNew ? (
                        selectedImageUris && selectedImageUris.length > 0 ? (
                        <Image
                            source={{ uri: selectedImageUris[0] }}
                            style={[styles.w100, { height: 400 }]} // Adjust height as needed
                        />
                        ) : (
                        <Text>이미지 없음</Text>
                        )
                    ) : (
                        !!partyInfo.imageLink ? (
                        <Image source={partyInfo.imageLink} style={[styles.w100, { height: 400 }]} /> // Adjust height as needed
                        ) : (
                        <Text>이미지 없음</Text>
                        )
                    )}
                </View>
                <Text>{!!partyInfo.imageLink ? partyInfo.imageLink.uri : ''}</Text>
                <View style={[self.bannerTitle, {left: clientWidth / 2, top: 214, transform: [{translateX: -167.5}]}]}>
                    {/* <Text style={[styles.commonFont,{fontSize: 25}]}>{partyInfo.hosting_name ?? ''}</Text>
                    <Text> </Text> */}
                    
                    <Text style={[styles.commonFont, {fontSize: 25}]}>{route.params.hosting_name}</Text>
                    
                </View>

            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, layouts.horizontal, layouts.spaceBetween]}>
                <Text style={[self.textInfo, {color: '#000'}]}>{partyInfo.hosting_name ?? storeInfo?.store_name ?? '가게명'}</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb60, layouts.horizontal, layouts.spaceBetween]}>
                <Text style={[self.textInfo, {color: '#000'}]}>{partyInfo.hostDateNm ?? ''}({partyInfo.hostDayNm ?? ''}) | {partyInfo.hostHHMI ?? ''}</Text>
                <Text style={[self.textInfo, {fontSize: 21}]}>{partyInfo.store_number ?? storeInfo?.store_number ?? '가게번호'}</Text>
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20]}>
                <Text style={[self.textInfo, {color: '#000'}]}>{partyInfo.introduce ?? introduce}</Text>
            </View>

            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={users} />
                {isNew ?
                (
                    <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>모집인원 :  {isNew ? partyInfo.max_personnel ?? '0' : partyInfo.current_personnel ?? '0'} / {route.params.maxPeople ?? '0'}</Text>
                    ):(
                    <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>모집인원 : {partyInfo.current_personnel ?? '0'} / {partyInfo.max_personnel ?? '0'}</Text>
                )}
                
                {/* <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>모집인원 :  {isNew ? partyInfo.max_personnel ?? '0' : partyInfo.current_personnel ?? '0'} / {route.params.maxPeople ?? '0'}</Text> */}
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={megaphone} />
                {isNew ?
                (
                    <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>연령대 : {route.params.low ?? ''}~{route.params.high ?? ''}대</Text>
                    ):(
                        <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>연령대 : {partyInfo.age_group_min ?? ''}~{partyInfo.age_group_max ?? ''}세</Text>
                    
                )}
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={camera} />
                {isNew ?
                (
                    <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>{route.params.screenSize ?? ''}인치</Text>
                    ):(
                        <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>160인치</Text>
                        
                    
                )}
            </View>
            <View style={[styles.p5, styles.pl15, styles.pr15, styles.mb20, layouts.horizontal]}>
                <Image source={marker} />
                <Text style={[styles.pl15, self.textDetailInfo, styles.ml10]}>{storeInfo?.store_address ?? '가게주소'}</Text>
            </View>
            <TouchableOpacity style={[styles.pl15, styles.pr15, styles.mb20]} onPress={isNew ? postHosting : applyHosting}>
                {isNew ? <Text style={[styles.p5, self.hostButton]}>호스팅하기</Text> : <Text style={[styles.p5, self.hostButton]}>신청하기</Text> }
            </TouchableOpacity>
        </ScrollView>
    )
}

const self = StyleSheet.create({
    banner: {
        height: 267,
        position: 'relative',
    },
    bannerTitle : {
        position: 'absolute',
        width: 335,
        height: 106,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
    },
    textInfo: {
        fontSize: 19,
        fontWeight: 600,
    },
    textDetailInfo: {
        fontSize: 17,
        color: '#000',
    },
    hostButton: {
        backgroundColor: '#01162D',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 20,
        paddingBottom: 12,
        paddingTop: 12,
        fontSize: 18
    }

    
})

export default HostPlaceDetail;