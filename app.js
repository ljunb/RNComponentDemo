/**
 * Created by ljunb on 2016/11/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import EditView from './EditView';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '小明'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nameContainer}>
                    <Text style={{marginRight: 10}}>{this.state.name}</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.editView.show()}
                    >
                        <Text>编辑名称</Text>
                    </TouchableOpacity>
                </View>
                <EditView
                    ref={editView => this.editView = editView}
                    inputText={this.state.name}
                    ensureCallback={name => this.setState({name})}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameContainer: {
        flexDirection: 'row',
        height: 44,
        justifyContent: 'space-between'
    }
})