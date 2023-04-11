import React from 'react'    //rafce da esta estructura
import {Text,View,StyleSheet, Pressable} from 'react-native'
import {formatearFecha} from '../helpers'  //importa la funcion de index.js

const Paciente =  ({
  item, 
  setModalVisible, 
  pacienteEditar, 
  pacienteEliminar, 
  setModalPaciente,
  setPaciente
}) => {

  const {paciente, fecha, id} = item
   
  
  //Text no puede usar objetos
  return (
    <Pressable
      onPress={() => {
        setModalPaciente(true)
        setPaciente (item)
      }}
    >
     <View style = {styles.contenedor}>
        <Text style = {styles.label}>Paciente:</Text>  
        <Text style = {styles.texto}>{paciente}</Text>         
        <Text style = {styles.fecha}>{formatearFecha(fecha)}</Text>
    
        <View style = {styles.contenedorBotones}>
          <Pressable 
            style = {[styles.btn, styles.btnEditar]}
            onPress = {() => {
              setModalVisible(true) 
              pacienteEditar(id)
            }}
          >
            <Text style = {styles.btnTexto}>Edi tar</Text>
          </Pressable>

          <Pressable 
            style = {[styles.btn, styles.btnEliminar]}
            onPress = {() => pacienteEliminar(id)}

          >
            <Text style = {styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
    
    
      </View>
    </Pressable>
    
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    padding:20,
    borderBottomColor:'#94a3BB',
    borderBottomWidth:1
  },
  label:{
    color:'#374151',
    textTransform:'uppercase',
    fontWeight:'700',
    marginBottom:10
  },
  texto:{
    color: '#6D2869',
    fontSize:20,
    fontWeight:'700',
    marginBottom:10
  },
  fecha:{
    color:'#374151',
    fontWeight:'500'
  }, 
  contenedorBotones:{        //distribuye el contenido de los botones editar-eliminar
    flexDirection:'row',     //los pone en fila
    justifyContent:'space-between',    //les pone espacion entre ellos
    marginTop:20                       //los separa de arriba, como un enter
  },
  btn :{
     paddingVertical:5,
     paddingHorizontal:20,
     borderRadius:5
  },
  btnEditar:{
    backgroundColor:'#F59E0B'
  },
  btnEliminar:{
    backgroundColor:'#EF4444'
  },
  btnTexto:{
    textTransform:'uppercase',
    fontWeight:'700',
    fontSize:12,
    color:'#FFF'
  }
})

export default Paciente