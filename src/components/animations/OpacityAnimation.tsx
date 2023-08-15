import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated, Easing, ViewProps } from 'react-native';

type TProps = {
    duration?: number;
    animate?: boolean;
} & PropsWithChildren & ViewProps;

const defaults: TProps = {
    duration: 200,
    animate: true
};

const OpacityAnimationComponent = (props: TProps) => {
    const { duration, animate, style, children } = { ...defaults, ...props };

    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.timing(animationValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.linear
        });

        if (animate) {
            animation.start();
        }
    }, [animate]);

    return (
        <Animated.View
            style={[{ opacity: animationValue }, style]}
        >
            {children}
        </Animated.View>
    );
};

export default OpacityAnimationComponent;
