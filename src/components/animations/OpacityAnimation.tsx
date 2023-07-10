import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

type TProps = {
    duration?: number;
} & PropsWithChildren;

const defaults: TProps = {
    duration: 500
};

const OpacityAnimationComponent = (props: TProps) => {
    const { duration, children } = { ...defaults, ...props };

    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear
        }).start();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: animationValue
            }}
        >
            {children}
        </Animated.View>
    );
};

export default OpacityAnimationComponent;
