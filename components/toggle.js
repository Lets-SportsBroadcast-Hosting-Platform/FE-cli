import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Animated, Easing, StyleShee } from 'react-native';

// Interface removed, object used directly
const Toggle = ({ onToggle, isOn }) => {
    const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));
    const [onOff, setOnOff] = useState(isOn)

    useEffect(() => {
        Animated.timing(animatedValue, {
            // toValue: isOn ? 1 : 0,
            toValue: isOn ? 1 : 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [onOff, animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 47],
    });


    const onPress = () => {
        // onToggle(onToggle,!isOn); // Assuming onToggle is a function passed from parent
        // console.log("onPress는 어디있지")
        // console.log(animatedValue)
        console.log("animatedValue",animatedValue)
        console.log("isOn",onOff)
        // console.log(typeof animatedValue)
        animatedValue.setValue(animatedValue._value == 0 ? 1 : 0)
        setOnOff(animatedValue._value == 0 ? 1 : 0)
    };

    return (
        <ToggleContainer onPress={onPress} color={animatedValue === 1 ? '#ddd':'#01162D'}>
        <ToggleWheel style={{ transform: [{ translateX }]}} />
        {/* { transform: [{ translateX }] } */}
        </ToggleContainer>
    );
};

export default Toggle;

const ToggleContainer = styled.TouchableOpacity`
    width: 88px;
    height: 41px;
    padding-left: 5px;
    border-radius: 25px;
    justify-content: center;
    background-color: ${({color})=>color}
`;

const ToggleWheel = styled(Animated.View)`
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 99px;
`;
