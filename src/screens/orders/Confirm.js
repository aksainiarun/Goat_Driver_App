import { Text, StyleSheet, View, Image } from 'react-native';
import { CHARCOAL_COLOR, PRIMARY_COLOR } from '../../utils/colors'
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular } from '../../utils/typograpy';

export const ProductCard = ({data,key}) => {
    return (<View style={styles.smallProduct}>
        <Image style={{ width: 42, height: 42, borderRadius: 4 }} source={{ uri: data.images }} />
        <View style={{ flex: 1, paddingHorizontal: 14 }}>
            <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium }}>{data.name}</Text>
            <Text style={{ fontSize: 12, color: CHARCOAL_COLOR, fontFamily: Font_Heebo_Regular }}>1Kg</Text>
        </View>
        <View>
            <Text style={{ fontSize: 16, color: "#000", fontFamily: Font_Heebo_Regular }}>${data.price}</Text>
        </View>
    </View>)
}



const styles = StyleSheet.create({
    smallProduct: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "rgba(245, 245, 245, 1)",
        paddingBottom: 10,
        marginBottom: 10
    },
})