export function container() {
    return {
      width: '85%',
      borderRadius: 20,
      marginVertical: 20,
      backgroundColor: "#E0DDE3",
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 4,
        height: 3
      },
      shadowOpacity: 1,
      shadowRadius: 10
    };
}
  
  export function titleStyle(fontFamily) {
    return {
      marginTop: 10,
      alignSelf: "center",
      fontSize: 35,
      fontFamily: 'RedHat-SemiBold',
    };
  }
  
  export function textStyle(fontFamily) {
    return {
      fontSize: 18,
      fontFamily: fontFamily,
    };
  }
  
  export function infoTextStyle(fontFamily) {
    return {
      fontSize: 19,
      fontFamily: fontFamily,
    };
  }
  
  export function infoStyle(){
    return {
      paddingVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 25,
    }
  }
  
  export function descriptionStyle(fontFamily) {
    return {
      fontSize: 16,
      fontFamily: fontFamily,
      paddingHorizontal: 25,
    };
  }
  
  export function buttonStyle(){
    return{
      margin: 10,
      width: '90%',
      alignSelf:"center",
      backgroundColor: "#1F1C21",
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowOpacity: 1,
      shadowRadius: 3
    }
  }
  
  export function buttonTitleStyle(fontFamily){
    return{
      fontSize: 20,
      fontFamily: 'RedHat-SemiBold',
    }
  }

  export function imageStyle(){
      return{
        top: -20,
        width: '90%',
        height: 200,
        position: "absolute",
        alignSelf: "center",
        borderRadius: 20,
      }
  }

 export function shadow(){
     return{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
     }
 }
  
  
  export function contentContainer() {
      return{
        marginTop: 180,
        flexDirection: "column",
        backgroundColor: 'green',
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }
  };
  