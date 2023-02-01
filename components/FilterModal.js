import { View, TouchableWithoutFeedback, ScrollView,  Modal, Text, Animated } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons } from '../constants'


const FilterModal = ({isVisible, onClose}) => {

    const [showFilterModel, setShowFilterModal] = React.useState(isVisible)

    const modalAnimateValue = React.useRef(new Animated.Value(0)).current

    const modalY = modalAnimateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 680]

    })

    React.useEffect(()=> {
        if(showFilterModel) {
            Animated.timing(modalAnimateValue, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(modalAnimateValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start(()=> onClose())

        }
    },[showFilterModel])



  return (
    <Modal
        animationType='fade'
        transparent={true}
        visible={isVisible}   
    >
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.transparentBlack7
            }}
        >
            {/* Transparent background */}

            <TouchableWithoutFeedback
                onPress={()=>setShowFilterModal(false)}
            >

                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}
                />
            </TouchableWithoutFeedback>

            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    top : modalY ,
                    width: "100%",
                    height: '100%',
                    padding: SIZES.padding,
                    borderTopRightRadius: SIZES.padding,
                    borderTopLeftRadius: SIZES.padding,
                    backgroundColor: COLORS.white

                }}
            >

            </Animated.View>
            
        </View>

    </Modal>

  )
}

export default FilterModal