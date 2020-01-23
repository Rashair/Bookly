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
        padding: 10
    },
    contentColumn:{
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent:'space-between'
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
    }
})