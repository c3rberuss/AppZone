/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Image, Linking, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WheelPicker} from 'react-native-wheel-picker-android'

import {Header, Text} from 'react-native-elements';


import PopupDialog, {DialogTitle, SlideAnimation} from 'react-native-popup-dialog';

const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
});

export default class App extends Component {

    constructor(props) {
        super(props);

        const {height, width} = Dimensions.get('window');

        this.state = {
            country: '',
            modalVisible: false,
            textDialog: '',
            height,
            width,
            date: {}
        }

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (

            <View>

                <Header
                    centerComponent={{text: 'RELOJ MUNDIAL', style: {color: '#fff', fontWeight: 'bold'}}}
                />

                {/*<View style={styles.bar}>*/}
                {/*<Icon name={'globe-americas'} size={30} color={'#000'}/>*/}
                {/*<Text style={styles.titulo}>Reloj Mundial</Text>*/}
                {/*</View>*/}

                <View style={styles.container}>

                    <Image style={{width: 100, height: 100, marginTop: 25}} source={require('./images/world.png')}/>

                    <Text h4 style={{

                        paddingTop: 30,
                        paddingBottom: 10
                    }}>Selecciona un País</Text>


                    <WheelPicker
                        onItemSelected={(data) => this.calcularFecha_Hora(data)}
                        isCurved
                        data={countries}
                        style={{width: 300, height: 200}}
                        indicatorColor={'#e1e1e1'}
                        renderIndicator={true}
                        isCurtain={true}
                        itemTextColor={'#476DC5'}
                    />

                    <TouchableOpacity style={styles.button} onPress={() => {
                        this.setModalVisible(true);
                    }}>

                        <Icon name={'code'} size={20} color={'#fff'}/>

                        <Text style={styles.textButton}>
                            {'Desarrollador'.toUpperCase()}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                                      onPress={() => Linking.openURL('https://github.com/c3rberuss/AppZone')}>

                        <Icon name={'github'} size={20} color={'#fff'}/>

                        <Text style={styles.textButton}>
                            {'GitHub'.toUpperCase()}
                        </Text>
                    </TouchableOpacity>

                </View>


                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View>
                        <Header
                            leftComponent={
                                <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                    <Icon name={'close'} size={20} color={'white'}/>
                                </TouchableOpacity>
                            }
                            centerComponent={{
                                text: 'Acerca del Desarrollador'.toUpperCase(),
                                style: {color: '#fff', fontWeight: 'bold'}
                            }}
                        />
                        <View style={{
                            height: this.state.height - 100,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            backgroundColor: '#F5FCFF',
                            flexDirection: 'column',
                            flexWrap: 'wrap'
                        }}>

                            <Image style={{width: 100, height: 100}}
                                   source={require('./images/users.png')}/>

                            <Text style={{fontSize: 20}}> Nombre del Desarrollador </Text>
                            <Text style={{fontSize: 20}}> Carnet: ####### </Text>

                        </View>
                    </View>
                </Modal>


                <PopupDialog
                    dialogTitle={<DialogTitle title={this.state.country.toUpperCase()} titleStyle={styles.titleStyle}
                                              titleTextStyle={styles.titleTextStyle}
                    />}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog;
                    }}
                    dialogAnimation={slideAnimation}
                    width={this.state.width-30}
                    overlayOpacity={0.9}
                    dialogStyle={{borderRadius: 2, borderStyle: 'solid'}}
                >
                    <View style={{
                        padding: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Su fecha y hora actual es:{'\n\n'}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Fecha</Text>
                        <Text
                            style={{fontSize: 18,}}>{this.state.date.dia} {this.state.date.n_day} de {this.state.date.mes} del {this.state.date.anio + '\n\n'}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Hora</Text>
                        <Text style={{fontSize: 18,}}>{this.state.date.hora}</Text>
                    </View>
                </PopupDialog>


            </View>

        );
    }


    // CREAMOS UNA FUNCIÓN ENCARGADA DE CALCULAR LA FECHA Y HORA DEL PAIS SELECCIONADO.
    calcularFecha_Hora(pais) {

        const paisName = pais.data;//data.split('#')[0];
        this.setState({country: paisName});
        const diferenciaHoraria = countries_utc[pais.position];

        // CREAMOS UNA VARIABLE QUE ALMACENARÁ EL NUEVO OBJETO CREADO.
        const d = new Date(); // Date(), FUNCIÓN PARA OBTENER FECHA.

        // AÑADIMOS LA DIFERENCIA HORARIA Y TRANSFORMAMOS AL FORMATO UTC.
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // VOLVEMOS A CREAR UN NUEVO OBJETO Date(), DONDE AL "UTC" LE SUMAMOS LA NUEVA DIFERENCIA HORARIA.
        const nd = new Date(utc + (3600000 * diferenciaHoraria));

        // RETORNAMOS EN UNA CADENA DE TEXTO EL NOMBRE DEL PAÍS Y LE CONCATENAMOS SU FECHA Y HORA ACTUAL.

        // Alert.alert("Pais: " + paisName + ", su fecha y hora actual es: " + nd.toLocaleString());

        this.setState({date: this.parse_Date(nd.toLocaleString())});

        this.popupDialog.show()
    }

    parse_Date(date) {
        const fecha = date.split(' ');

        let day = null;

        switch (fecha[0]) {
            case 'Mon':
                day = 'Lunes';
                break;

            case 'Tue':
                day = 'Martes';
                break;

            case 'Wed':
                day = 'Miércoles';
                break;

            case 'Thu':
                day = 'Jueves';
                break;

            case 'Fri':
                day = 'Viernes';
                break;

            case 'Sat':
                day = 'Sábado';
                break;

            case 'Sun':
                day = 'Domingo';
                break;
        }

        let mes = null;

        switch (fecha[1]) {
            case 'Jan':
                mes = 'Enero';
                break;

            case 'Feb':
                mes = 'Febrero';
                break;

            case 'Mar':
                mes = 'Marzo';
                break;

            case 'Apr':
                mes = 'Abril';
                break;

            case 'May':
                mes = 'Mayo';
                break;

            case 'Jun':
                mes = 'Junio';
                break;

            case 'Jul':
                mes = 'Julio';
                break;
            case 'Aug':
                mes = 'Agosto';
                break;
            case 'Sep':
                mes = 'Septiembre';
                break;
            case 'Oct':
                mes = 'Octubre';
                break;
            case 'Nov':
                mes = 'Noviembre';
                break;
            case 'Dec':
                mes = 'Diciembre';
                break;
        }

        return {dia: day, mes: mes, anio: fecha[4], hora: fecha[3], n_day: fecha[2]}
    }

}

const countries = ['Bombay', 'Singapur', 'Londres', 'Afganistán'];
const countries_utc = ['+5.5', '+8', '+1', '+1'];

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'column'
    },

    bar: {
        display: 'flex',
        height: 40,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    titulo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },

    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#476DC5',
        width: 300,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderRadius: 2,
        marginTop: 15,
        height: 45
    },

    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 8,
        color: 'white'
    },

    titleStyle: {
        backgroundColor: '#476DC5',
        borderStyle: 'solid',
        borderRadius: 2,
        borderTopStartRadius: 2,
        borderTopEndRadius: 2
    },
    titleTextStyle: {
        color: 'white',
        fontWeight: 'bold'
    }

});
