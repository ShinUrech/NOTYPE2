export default{

    cardContainer:{
        width: '90%',
        backgroundColor: "#E0DDE3",
        borderRadius: 20,
        marginVertical: 25,
        flexDirection: "column",
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },

    imageStyle: {
        top: -20,
        width: '90%',
        height: 200,
        alignSelf: "center",
        borderRadius: 20,
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

    bottom: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
};

export function titleStyle(fontFamily){
    return{
        fontSize: 25,
        fontFamily: fontFamily,
        alignSelf: "flex-start",
        color: "black",
        marginHorizontal: 10,
    }
};

export function ticketTypeStyle(fontFamily){
    return{
        fontSize: 22,
        fontFamily: fontFamily,
        alignSelf: "flex-start",
        color: "#49424D",
        marginHorizontal: 10,
    }
};

export function priceTag(fontFamily, color){
    return{
        marginTop: 5,
        fontSize: 25,
        fontFamily: fontFamily,
        color: color,
    }
}