export function mainView(){
    return{
        margin: 20,
        padding: 10,
        width: '90%',
        backgroundColor: "#E0DDE3",
        alignSelf: "center",
        borderRadius: 20,
        flexDirection: "column",
        justifyContent: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 10
    }
}

export function horizontalView(){
    return{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
}

export function leftView(){
    return{
        flex: 1,
        flexDirection: 'column',
    }
}

export function rightView(){
    return{
        margin: 20,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export function ticketTitleStyle(fontFamily){
    return{
        fontSize: 23,
        color: 'black',
        fontFamily: fontFamily,
    }
}

export function ticketNumberStyle(fontFamily){
    return{
        fontSize: 18,
        color: '#8c97a6',
        fontFamily: fontFamily,
        alignSelf: 'flex-end',
    }
}

export function eventTitleStyle(fontFamily){
    return{
        paddingVertical: 10,
        flexWrap: 'wrap',
        fontSize: 20,
        color: 'black',
        fontFamily: fontFamily,

    }
}

export function detailsStyle(fontFamily){
    return{
        flexWrap: 'wrap',
        paddingLeft: 5,
        fontSize: 16,
        color: '#8c97a6',
        fontFamily: fontFamily,

    }
}