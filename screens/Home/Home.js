import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { HorizontalFoodCard } from '../../components';
import { FONTS, SIZES, COLORS, icons, dummyData } from '../../constants';
import { clockRunning } from 'react-native-reanimated';


const Home = () => {

    const [selectedCategoryId, setSelectedCategoryId] = React.useState(1)
    const [selectedMenuType, setselectedMenuType] = React.useState(1)
    const [menuList, setMenuList] = React.useState([])

    React.useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    //Handler

    function handleChangeCategory(categoryId, menuTypeId) {
        
        //Find menu based on the menuId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId)
    
        //set the menu based in the categoryId
        setMenuList(selectedMenu.list.filter(a=> a.categories.includes(categoryId)))
    
    }

    //Render

    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    backgroundColor: COLORS.lightGray2

                }}
            >
                {/* icon */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/* Text input */}

                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.h3
                    }}
                    placeholder='search foood ...'
                />

                {/* filter button */}
                
                <TouchableOpacity>

                    <Image
                        source={icons.filter}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.black
                        }}
                    />

                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* search */}
            
            {renderSearch()}

            {/* list */}

            <FlatList
                data={menuList}
                keyExtractor={(item => `${item.id}`)}
                showsVerticalScrollIndicator= {false}
                renderItem={({item, index})=>{
                    return(
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110,
                                
                            }}
                            item={item}
                            onPress={()=> console.log("hFOOd")}
                        />

                    )
                }}

            />

        </View>
    )
}

export default Home;