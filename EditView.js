/**
 * Created by ljunb on 2016/11/26.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Platform,
    TextInput,
    Image,
    Dimensions
} from 'react-native';
const screenW = Dimensions.get('window').width;

export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this._close = this._close.bind(this);
        this.state = {
            isShow: false,
            inputText: '',
            opacityAnimationValue: new Animated.Value(0),
            scaleAnimationValue: new Animated.Value(0)
        }
    }

    show() {
        this.setState({
            isShow: true,
            inputText: this.props.inputText
        }, () => {
            Animated.parallel([
                Animated.timing(this.state.opacityAnimationValue, {
                    toValue: 1,
                    duration: 200 + 100
                }),
                Animated.spring(this.state.scaleAnimationValue, {
                    toValue: 1,
                    duration: 200,
                    friction: 5
                })
            ]).start();
        });
    }

    _close() {
        this.setState({isShow: false});
        this.state.opacityAnimationValue.setValue(0);
        this.state.scaleAnimationValue.setValue(0);
    }

    render() {
        if (!this.state.isShow) return null;

        const {ensureCallback} = this.props;

        return (
            <Animated.View style={[styles.container, {opacity: this.state.opacityAnimationValue}]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex: 1, alignItems: 'center', paddingTop: 100}}
                    onPress={this._close}
                >
                    <Animated.View
                        style={[styles.contentContainer, {transform: [{scale: this.state.scaleAnimationValue}]}]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.promptContainer}
                            onPress={()=>{}}
                        >
                            <Text style={{fontSize: 15, color: 'black'}}>修改姓名</Text>
                            <View style={{flexDirection: 'row', margin: 15}}>
                                <View style={[styles.center, {width: 230}]}>
                                    <TextInput
                                        style={[{fontSize: 16, color: '#999'}, Platform.OS === 'ios' && {height: 20}, Platform.OS === 'android' && {padding: 0}]}
                                        value={this.state.inputText}
                                        autoFocus={true}
                                        underlineColorAndroid="transparent"
                                        onChangeText={text => this.setState({inputText:text})}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.setState({inputText: ''})}
                                    style={[styles.center, {width: 20}]}>
                                    <Image
                                        source={require('./x.png')}
                                        style={{width: 18, height: 18}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={[styles.center, {flex: 4.5}]}
                                onPress={this._close}
                            >
                                <Text style={{fontSize: 16, color: 'black'}}>取消</Text>
                            </TouchableOpacity>
                            <View style={[styles.line]}/>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={[styles.center, {flex: 4.5}]}
                                onPress={() => {
                                    this._close();
                                    ensureCallback(this.state.inputText);
                                }}
                            >
                                <Text style={{fontSize: 16, color: 'black'}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(1, 1, 1, 0.5)'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        height: 150,
        width: screenW * 0.75,
        backgroundColor: 'rgb(234, 234, 235)',
        borderRadius: 5,
    },
    promptContainer: {
        height: 100,
        width: screenW * 0.75,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 50,
        width: screenW * 0.75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#d9d9d9'
    },
    line: {
        height: 46,
        width: 1,
        backgroundColor: '#d9d9d9'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})