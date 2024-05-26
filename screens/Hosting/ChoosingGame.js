import { StyleSheet, Text, View,Image,TouchableOpacity, Alert, FlatList } from 'react-native';
// import arrowToLeft from '../assets/images/location.png';
// import arrowRight from '../assets/images/arrow-right.png';


export default function HostPlaceList({navigation}) {
    const onClickItem = (item)=>{
        navigation.navigate('HostPlaceDetail', {...item})
    }

    // const ListItem = ({ 
    //     event_title, imageLink, event_place,
    //     event_date, event_day, event_time,
    //     count, total, id
    //     }) => (
    //     <TouchableOpacity onPress={()=>onClickItem({ 
    //         event_title, imageLink, event_place,
    //         event_date, event_day, event_time,
    //         count, total, id
    //         })} style={styles.placeItem}>
    //         <View style={styles.imageContainer}>
    //             <Image source={imageLink} style={styles.placeImage}/>
    //         </View>
    //         <Text style={styles.placeTitle}>{event_title}</Text>

    //         <View style={styles.placeDetail}>
    //             <Text>{event_place} | {event_date}({event_day}) | {event_time}</Text>

    //             <View style={{flexDirection: 'row'}}>

    //                 <Text>
    //                     {count} / {total}
                        
    //                 </Text>
    //                 <Image style={styles.userImage} source={UserImage}></Image>
    //             </View>
    //         </View>
    //     </TouchableOpacity>
    // );

    // const renderItem = ({ item }) => (
    //     <ListItem
    //         id={item.id}
    //         style={styles.itemScrollContainer}
    //         event_title={item.event_title}
    //         event_place={item.event_place}
    //         event_date={item.event_date}
    //         event_day={item.event_day}
    //         event_time={item.event_time}
    //         imageLink={item.imageLink}
    //         count={item.count}
    //         total={item.total}

    //     />
    // );
      
    return (
        <View style={self.container}>
            {/* <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollIndicatorInsets={{ right: 1 }}
            /> */}
            
            

        </View>
    );
}

const self = StyleSheet.create({
      
    
});
