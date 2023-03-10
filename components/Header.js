import { View, Text } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../constants';

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}

        >
            {/* Left */}

            {leftComponent}

            {/* Title */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                    
                }}
            >
                <Text style={{ ...FONTS.h3, color: COLORS.black , fontWeight: 'bold'}}>
                    {title}
                </Text>

            </View>

            {/* Right */}

            {rightComponent}



        </View>
    )
}

export default Header