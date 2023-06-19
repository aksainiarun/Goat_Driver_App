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
import { connect } from 'react-redux';
import { getAllOrders } from '../../actions/thunkActions';
class OlderOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilterOpen: false,
            delivered: true, accepted: true, rejected: true
        }
    }
    handleFilterModal = () => this.setState({ isFilterOpen: !this.state.isFilterOpen })
    render() {
        const { isFilterOpen, delivered, accepted, rejected } = this.state
        console.log(this.props.orders);
        return (
            <Container>
                <Header headerTitle='My Orders' rightSide={<Icon name='filter' type='fontAwesome' size={25} style={styles.filterIcon} onPress={this.handleFilterModal} />} />

                {this.props.orders.length < 1 ? <OrderEmpty /> :
                    <ScrollView>
                        {this.props.orders.map((item, index) => (item.status == 'delivered' && delivered || item.status == 'accepted' && accepted || item.status == 'rejected' && rejected ? <OrderCard orderStatus={item.status} data={item} key={index} /> : null))}
                    </ScrollView>}
                <Filter isVisible={isFilterOpen} onClose={this.handleFilterModal} apply={(delivered, accepted, rejected) => this.setState({ delivered, accepted, rejected, isFilterOpen: false })}
                    clearFilter={() => this.setState({ delivered: true, accepted: true, rejected: true, isFilterOpen: false })} />

            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.AuthReducer.data,
        orders: state.AuthReducer.orders,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getAllOrders: (id) => dispatch(getAllOrders(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OlderOrders)
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