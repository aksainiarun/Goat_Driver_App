import { FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Icon from '../../../utils/icons'
import { CHARCOAL_COLOR, GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_LIGHT_COLOR } from '../../../utils/colors'
import Container from '../../layout/Container'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold, Font_Poppins_Bold } from '../../../utils/typograpy'
import { TouchableRipple } from 'react-native-paper'
import RadioButton from '../../button/RadioButton'
/**
 * 
 * @param {{ 
 * isVisible:boolean,
 * onClose:Function, 
 * }} props Props for the component
 * 
 */

const address = [{
  "id": 1,
  "address": "55784 Goodland Parkway",
  "postel": "52212",
  "type": "Home"
}, {
  "id": 2,
  "address": "9 Doe Crossing Parkway",
  "postel": "15462",
  "type": "Office"
}, {
  "id": 3,
  "address": "3078 Huxley Way",
  "postel": "58263",
  "type": "Other"
}, {
  "id": 4,
  "address": "36 Petterle Drive",
  "postel": "442780",
  "type": "Office"
}]

const RenderAddress = ({ data, onPress, addressSelect }) => {
  return (
    <TouchableRipple style={styles.cardBody} onPress={onPress && onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 16, fontFamily: Font_Poppins_Bold, color: CHARCOAL_COLOR }}>{data?.type}</Text>
          <View style={styles.cardRow}>
            <Icon name='shipping-fast' type='fontAwesome5' color='#A7ACBC' style={{ marginTop: 2 }} />
            <Text style={styles.cardContextText}>{data?.address}</Text>
          </View>
          <Text style={[styles.cardContextText, { marginLeft: 0 }]}>Postal Code:{data?.postel}</Text>
        </View>
        {/* <RadioButton status={data?.id === addressSelect} /> */}
      </View>
    </TouchableRipple>
  )
}

export default function ManuallyType({ isVisible = false, onClose, }) {
  return (
    <Modal visible={isVisible} onRequestClose={onClose && onClose} >
      <Container>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name='arrow-back' color='#000' size={25} onPress={onClose && onClose} style={{ width: 35, height: 35, textAlign: "center", textAlignVertical: 'center', backgroundColor: PRIMARY_LIGHT_COLOR, borderRadius: 40 }} />
            <Text style={{ fontSize: 20, fontFamily: Font_Poppins_Bold, color: "#000", lineHeight: 28.45, marginLeft: 14 }}>Search Address</Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput placeholder='Type Address' style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR} />
          </View>
          <View style={{ flex: 1, paddingTop: 40 }}>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 15 }}
              ListHeaderComponent={() => <View><Text style={{ fontSize: 16, fontFamily: Font_Lato_Bold, color: "#000" }}>Saved Address</Text></View>}
              data={address}
              renderItem={({ item, index }) => <RenderAddress data={item} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Container>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 14,
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 14,
    marginBottom: 20
  },
  textInputContainer: {
    backgroundColor: GRAY_COLOR,
    marginHorizontal: 14,
    borderRadius: 14,
    paddingHorizontal: 14
  },
  textInput: {
    height: 45,
    fontFamily: Font_Heebo_Medium,
    color: "#000",
    fontSize: 14
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: "rgba(222,222,222,1)",
    paddingBottom: 18

  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  cardContextText: {
    fontSize: 14,
    fontFamily: Font_Heebo_Regular,
    color: "#A7ACBC",
    marginLeft: 10,
    flex: 1
  },
})