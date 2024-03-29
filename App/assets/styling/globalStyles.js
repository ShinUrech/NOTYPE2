import { StyleSheet, Platform, StatusBar } from "react-native";
import { useCallback, useContext} from "react";


const TitleTextColorLight = '#292929' 
const TitleTextColorDark = 'white' 

const paragraphTextLight = '#707070'
const paragraphTextDarK = 'white'

const backgroundColorLight = 'white'
const backgroundColorDark = 'black'


export function styles(isDarkTheme) {
    return StyleSheet.create({
    backgroundColor: {
        backgroundColor: (isDarkTheme ? backgroundColorDark : backgroundColorLight)
    },
    
    backgroundColor2: {
        backgroundColor: (isDarkTheme ? backgroundColorLight : backgroundColorDark)
    },

    

    borderColor:{
        borderColor: (isDarkTheme ? backgroundColorLight : backgroundColorDark)
    },

    iconColor:{
        iconColor: (isDarkTheme ? backgroundColorLight : backgroundColorDark)
    },

    //Texts
    bigTitleText:{
        fontFamily: 'RedHat-Regular',
        fontSize: 30,
        color: (isDarkTheme ? TitleTextColorDark : TitleTextColorLight),
        flexWrap: 'wrap',
        paddingVertical: 5
    },
    titleText:{
        fontFamily: 'RedHat-Regular',
        fontSize: 26,
        color: (isDarkTheme ? TitleTextColorDark : TitleTextColorLight),
        flexWrap: 'wrap',
        paddingVertical: 5,
    },
    paragraphText:{
        fontFamily: 'RedHat-Regular',
        fontSize: 18,
        color: (isDarkTheme ? paragraphTextDarK: paragraphTextLight),
        flexWrap: 'wrap',
    },
    headerText:{
        fontFamily: 'RedHat-SemiBold',
        fontSize: 32,
        color: (isDarkTheme ? TitleTextColorDark: TitleTextColorLight),
        flexWrap: 'wrap',
        paddingHorizontal: '3%',
    },
    buttonText:{
        fontFamily: 'RedHat-Regular',
        color: (isDarkTheme ? TitleTextColorDark:TitleTextColorLight),
        flexWrap: 'wrap',
        fontSize: 22,
    },

    //Paddings and margins
    AndroidSafeArea: {
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    //Views
    mainBackgroundView:{
        backgroundColor: (isDarkTheme ? backgroundColorLight : backgroundColorDark),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer:{
        backgroundColor: (isDarkTheme ? backgroundColorDark : backgroundColorLight),
        width: '95%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    iconTextView:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 3,
    },
    leftRightView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftRightView2:{
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoView:{
        height: 70,
        width: 200,
        backgroundColor: (isDarkTheme? backgroundColorDark:backgroundColorLight),
        margin: 15,
        justifyContent:'space-around',
    },
    adjustableWidthInfoView:{
        backgroundColor: (isDarkTheme? backgroundColorDark: backgroundColorLight),
        margin: 15,
        height: 50,
        top: -30,
    },

    //Shadow
    elevate:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 7.49,
        elevation: 12,
    },
    elevateHeader:{
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },

    //Images
    eventImage:{
        width: '100%',
        height: 250,
        alignSelf: 'center',
    },

    //Buttons
    eventButton:{
        height: 53,
        backgroundColor: (isDarkTheme ? backgroundColorDark : backgroundColorLight),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: (isDarkTheme ? backgroundColorLight : backgroundColorDark)
    },
    inputFieldBackgroundColor:{
        backgroundColor:(isDarkTheme ? '#222222':'#777777')
    }
    
});}