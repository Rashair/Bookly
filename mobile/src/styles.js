import {StyleSheet} from 'react-native'

export const themeColors = 
{
    primary: '#3579e6',
    danger: 'red',
    background: 'white'
}

export const styles = StyleSheet.create({
    button:{
        height: 54,
        justifyContent: 'center',
    },
    container:{
        padding: 10,
    },
    contentColumn:{
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        textAlignVertical:"center",
        
    },
    contentToEnd:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    helper:{
        color: themeColors.danger
    },
    image:{
        width: '100%',
        height: 200,
        marginBottom: 10
    },
    input: {
        color: themeColors.primary,
        backgroundColor: themeColors.background,
        marginBottom: 10
    },
    marginBottomBig:{
      marginBottom: 20  
    },
    marginBottomSmall:{
        marginBottom: 10
    },
    marginTopBig:{
        marginTop: 20
    },
    marginTopSmall:{
        marginTop: 10
    },
    textToRight:{
        textAlign: 'right'
    },
    textToLeft:{
        textAlign: 'left'
    },
    icon:{
        height : 50,
        width : 50,
        padding : 3
    },
    container_modal:{
        padding:10,
        alignItems : "center",
        textAlignVertical:"center",
        justifyContent: "center",
        flex :1
    },
    container_reservationdetailsmain:{
        padding: 10,
        flex:1,
    },
    container_reservationdetails:{
        marginTop : 20,
        marginBottom : 20
    },
    button_bottompage:{
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        marginBottom : 20,
        flexDirection: "row",
        alignSelf : 'center'
    },
})