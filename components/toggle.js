import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing, StyleShee } from 'react-native';

// Interface removed, object used directly
const Toggle = ({ onToggle, isOn }) => {
    const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            // toValue: isOn ? 1 : 0,
            toValue: isOn ? 1 : 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [isOn, animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 17],
    });


    const onPress = () => {
        // onToggle(onToggle,!isOn); // Assuming onToggle is a function passed from parent
        // console.log("onPress는 어디있지")
        // console.log(animatedValue)
        console.log(animatedValue)
        
        console.log(typeof animatedValue)
        animatedValue.setValue(animatedValue._value === 0 ? 1 : 0)
    };

    return (
        <ToggleContainer onPress={onPress} color={isOn? 'black':'red'}>
        <ToggleWheel style={{ transform: [{ translateX }]}} />
        {/* { transform: [{ translateX }] } */}
        </ToggleContainer>
    );
};

export default Toggle;

const ToggleContainer = styled.TouchableOpacity`
    width: 36px;
    height: 20px;
    border-radius: 10px;
    justify-content: center;
    background-color: ${({color})=>color}
`;

const ToggleWheel = styled(Animated.View)`
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 99px;
`;
