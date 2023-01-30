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
        setMenuList(selectedMenu.list.filter(a => a.categories.includes(categoryId)))

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

    function renderMenuTypes() {
        return (
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0

                        }}
                        onPress={() => {
                            setselectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3,
                                fontWeight: 'bold'
                            }}
                        >
                            {item.name}
                        </Text>

                    </TouchableOpacity>
                )}


            />

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
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>

                        {/* menutype */}

                        {renderMenuTypes()}


                    </View>
                }
                renderItem={({ item, index }) => {
                    return (
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
                            onPress={() => console.log("hFOOd")}
                        />

                    )
                }}

            />

        </View>
    )
}

export default Home;