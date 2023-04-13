import { StyleSheet, ScrollView } from 'react-native';
import { Component } from 'react';
import Container from '../../components/layout/Container'
import Header from '../../components/header/Header'
import OrderCard from './OrderCard';
import OrderEmpty from '../../components/EmptyStates/OrdersEmpty';
import { TouchableRipple } from 'react-native-paper';
import Icon from '../../utils/icons';
import { PRIMARY_LIGHT_COLOR } from '../../utils/colors';
import Filter from '../../components/filter/Filter';
export default class OlderOrders extends Component {
    constructor() {
        super();
        this.state = {
            isOrderEmpty: false,
            isFilterOpen: false
        }
    }
    handleFilterModal = () => this.setState({ isFilterOpen: !this.state.isFilterOpen })
    render() {
        const { isOrderEmpty, isFilterOpen } = this.state
        return (
            <Container>
                <Header headerTitle='My Orders' rightSide={<Icon name='filter' type='fontAwesome' size={25} style={styles.filterIcon} onPress={this.handleFilterModal} />} />

                {isOrderEmpty ? <OrderEmpty /> :
                    <ScrollView>
                        <OrderCard orderStatus={"delivered"} />
                        <OrderCard orderStatus={"pending"} />
                        <OrderCard orderStatus={"canceled"} />
                    </ScrollView>}
                <Filter isVisible={isFilterOpen} onClose={this.handleFilterModal} />

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    filterIcon: {
        width: 35,
        height: 35,
        textAlign: "center",
        textAlignVertical: 'center',
        backgroundColor: PRIMARY_LIGHT_COLOR,
        borderRadius: 40
    }
})