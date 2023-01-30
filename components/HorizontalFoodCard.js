import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress}) => {
  return (

    <TouchableOpacity
        style={{
            flexDirection: 'row',
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray2,
            ...containerStyle
        }}
    >
        {/* Image */}

        <Image
            source={item.image}
            style={imageStyle}
        />

        {/* info */}

        <View
            style={{
                flex: 1
            }}
        >
            {/* Name */}
            <Text style={{...FONTS.h3, fontSize: 17, fontWeight: 'bold'}}>
                {item.name}
            </Text>

            {/* Description */}

            <Text style={{color: COLORS.darkGray2, ...FONTS.body4 }}>
                {item.description}
            </Text>

            {/* Price */}

            <Text style={{color: COLORS.black,  marginTop: SIZES.base, ...FONTS.h2 , fontWeight: 'bold'}}>
                {item.price} Dhs
            </Text>

            {/* calories */}

            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 5,
                    right: SIZES.radius
                }}
            >
                <Image
                    source={icons.calories}
                    style={{
                        width: 30,
                        height: 30
                    }}
                />

                <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>
                    {item.calories}
                </Text>

            </View>



        </View>



    </TouchableOpacity>

  )
}

export default HorizontalFoodCard