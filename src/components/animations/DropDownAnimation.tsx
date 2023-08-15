import { PropsWithChildren, useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';

type TProps = {
    duration?: number;
} & PropsWithChildren;

const defaults: TProps = {
    duration: 250
};

const DropDownAnimationComponent = (props: TProps) => {
    const { duration, children } = { ...defaults, ...props };

    const [animationValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start();
    }, []);

    return (
        <Animated.View
            style={{
                transform: [{
                    translateY: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 0]
                    })
                }]
            }}
        >
            {children}
        </Animated.View>
    );
};

export default DropDownAnimationComponent;
