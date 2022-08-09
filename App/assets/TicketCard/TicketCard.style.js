
export default{
    imageStyle: {
        top: -20,
        width: '90%',
        height: 200,
        alignSelf: "center",
        borderRadius: 20,
    },

    buttonStyle: {
        bottom: -10,
        width: '95%',
        height: '53%',
        alignSelf: 'center',
        backgroundColor: "#1F1C21",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3
    },

    shadow: {
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3,
    },

    iconText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 5,
    },
};

export function buttonTitleStyle(fontFamily){
    return{
      fontSize: 20,
      fontFamily: fontFamily,
      alignSelf: "center",
    }
};

export function titleStyle(fontFamily){
    return{
        fontSize: 25,
        fontFamily: fontFamily,
        alignSelf: "center",
    }
};

export function priceTag(fontFamily){
    return{
        fontSize: 20,
        fontFamily: fontFamily,
        alignSelf: "center",
    }
}

export function cardContainer(width){
    return{
        width: width,
        height: 300,
        marginHorizontal: 10,
        backgroundColor: "#E0DDE3",
        alignSelf: "center",
        borderRadius: 20,
        flexDirection: "column",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    }
}