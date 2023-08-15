import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

type TProps = {
    animationReference?: number;
    duration?: number;
} & PropsWithChildren;

const defaults: TProps = {
    duration: 500
};

const RotationAnimation = (props: TProps) => {
    const { animationReference, duration, children } = { ...defaults, ...props };

    const isFirstRender = useRef(true);
    const [animationValue] = useState(new Animated.Value(0));

    useEffect(() => {
        if (isFirstRender.current && animationReference !== undefined) {
            isFirstRender.current = false;
            return;
        }

        Animated.timing(animationValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease)
        }).start(() => {
            animationValue.setValue(0);
        });
    }, [animationReference]);

    return (
        <Animated.View
            style={{
                transform: [{
                    rotate: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }}
        >
            {children}
        </Animated.View>
    );
};

export default RotationAnimation;
