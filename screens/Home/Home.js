import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { HorizontalFoodCard, VerticalFoodCard } from '../../components';
import { FONTS, SIZES, COLORS, icons, dummyData } from '../../constants';

const Section = ({ title, onPress, children }) => {
    return (
        <View>
        {/* // Header */}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h3 }} >
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
                        Show all
                    </Text>

                </TouchableOpacity>

            </View>

            {/* content */}

            {children}

        </View>

    )
}



const Home = () => {

    const [selectedCategoryId, setSelectedCategoryId] = React.useState(1)
    const [selectedMenuType, setselectedMenuType] = React.useState(1)
    const [menuList, setMenuList] = React.useState([])
    const [recommends, setRecommends] = React.useState([])
    const [popular, setPopular] = React.useState([])

    React.useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    //Handler

    function handleChangeCategory(categoryId, menuTypeId) {

        //Recommended Menu
        let selectedRecommende = dummyData.menu.find(a => a.name == "Recommended")

        //set the recommended menu based the categoryId
        setRecommends(selectedRecommende.list.filter(a => a.categories.includes(categoryId))) 

        //Find menu based on the menuId
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId)

        //set the menu based in the categoryId
        setMenuList(selectedMenu.list.filter(a => a.categories.includes(categoryId)))

        //Retrieve the popular menu
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular")
    
        //set the Popular menu based on the menutypId
        setPopular(selectedPopular.list.filter(a => a.categories.includes(categoryId)))
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

    function renderRecommendedSection () {
        return (
            <Section
            title="Recommended"
            onPress={()=> console.log('renderRec')}
            >
                <FlatList
                    data={recommends}
                    keyExtractor={item =>  `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index})=> (
                        <HorizontalFoodCard
                        containerStyle={{
                            height: 180,
                            width: SIZES.width * 0.85,
                            marginLeft: index == 0 ? SIZES.padding : 18,
                            marginRight: index == recommends.length - 1 ? SIZES.padding : 0 ,
                            paddingRight: SIZES.radius,
                            alignItems: 'center'

                        }}

                        imageStyle={{
                            marginTop: 35,
                            height: 150,
                            width: 150
                        }}
                        
                        item={item} 
                        onPress={()=> console.log("hFoodCard")}
                           
                        />
                    )}

                >

                </FlatList>

            </Section>
        )

    }
    
    function renderPopulateSection() {

        return (
            <Section
            title= "Popular Near You"
            onPress={()=> ("show all populate")}
            >
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item , index})=> (

                        <VerticalFoodCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == popular.length -1 ? SIZES.padding : 0
                            }}
                            item={item}
                            onPress={()=> console.log('vfood card')}
                        
                        />
                    )}

                />

            </Section>
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

                        {/* Populate */}

                        {renderPopulateSection()}

                        {/* Recomended section */}

                        {renderRecommendedSection()}

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