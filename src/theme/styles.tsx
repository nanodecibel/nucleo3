import { StyleSheet } from "react-native";


export const style = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        gap: 10
    },
    input: {
        width: '90%'
    },
    buttons: {
        width: "75%",
    },
    textNavigation:{
        marginTop:10,
        fontSize:15,
        color:"#dc582a",
        fontWeight:"bold",
    }, 
    contentHome:{

        flex:1,
        marginVertical:50,
        marginHorizontal:20,
        gap:15
    },
    headerHome:{
        flexDirection:"row",
        gap:15,
        alignItems:"center"
    },
    iconProfile:{
        flex:1,
        alignItems:"flex-end"
    },
    modal:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:"#fff",
        marginHorizontal:20,
        borderRadius:10
    },
    headerModal:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    }, 
    prospectCard:{
        flexDirection:"row"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:"#dc582a"
      }, 
      contentDetailProspect:{
        flex:1,
        paddingHorizontal:20,
        backgroundColor:'#fff',
        gap:20

      },

      subjectProspects:{
        flexDirection:"row",
        alignItems:'center',
        gap:10
      }


})