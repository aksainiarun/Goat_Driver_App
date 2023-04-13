import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Font_Heebo_SemiBold, Font_Poppins_Bold } from '../../utils/typograpy'
import Icon from '../../utils/icons'
import { PRIMARY_COLOR } from '../../utils/colors'
import LocationAutoDetect from '../../components/modals/locations/AutoDetect'
export default function MainHeader() {
  const [locationModal, setLocationModal] = useState(false)
  const handleLocationModal = () => {
    setLocationModal(!locationModal)
  }
  return (
    <View style={styles.header}>
      <View style={styles.logo}>
        <Text style={{ fontSize: 30, color: "#000", fontFamily: Font_Poppins_Bold, lineHeight: 37.45 }}>   GOAT   </Text>
      </View>
      <TouchableOpacity style={styles.location} onPress={handleLocationModal}>
        <Icon name='location-sharp' size={20} color='#fff' style={{ width: 45, height: 35, textAlign: "center", textAlignVertical: 'center' }} />
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ fontSize: 12, color: "#fff", fontFamily: Font_Heebo_SemiBold, }}>Your Location</Text>
          <Text style={{ fontSize: 13, color: "#fff", fontFamily: Font_Heebo_SemiBold, }} numberOfLines={1}>32 Llanberis Close, Tonteg, CF38 1HR</Text>
        </View>
        <Icon name='chevron-down' size={20} color='#fff' />
      </TouchableOpacity>
      <LocationAutoDetect isVisible={locationModal} onClose={handleLocationModal} />
    </View>
  )
}



const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    height: 60,
    zIndex: 1,
    elevation: 10,
  },
  logo: {
    marginHorizontal: 14,
    backgroundColor: "#fff",
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
    flex: 1
  },
})