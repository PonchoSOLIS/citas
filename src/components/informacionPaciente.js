import React from 'react'
import {Text,SafeAreaView,View,Pressable,StyleSheet} from 'react-native'
import {formatearFecha} from '../helpers'

const informacionPaciente = ({paciente, setModalPaciente,setPaciente}) => {

  return (
    <SafeAreaView
      style = {styles.contenedor}
    >
      

      <Text style = {styles.titulo}>Información {''}
        <Text style = {styles.tituloBold}>Paciente</Text>
      </Text>
      <View>
        <Pressable
          onPress={() => {
            setModalPaciente(false)
            setPaciente({})  //setPaciente vuele a ser un obj vacio ya que al ver la inf, se carga en los campos de nueva cita
          }}                   //aunque sigue apareciendo los datos cargados
          style = {styles.btnCerrar}
        >
           <Text style = {styles.btnCerrarText}>Cerrar</Text>
        </Pressable>
      </View>
 
      <View
        style = {styles.contenido}
      >
        <View style = {styles.campo}>
          <Text style = {styles.label}>Nombre:</Text>
            <Text style = {styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style = {styles.campo} >
          <Text style = {styles.label}>Propietario:</Text>
            <Text style = {styles.valor}>{paciente.propietario}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Email:</Text>
            <Text style = {styles.valor}>{paciente.email}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Telefono:</Text>
            <Text style = {styles.valor}>{paciente.telefono}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Fecha de cita:</Text>
            <Text style = {styles.valor}>{formatearFecha(paciente.fecha)}</Text>
        </View>
        <View style = {styles.campo}>
          <Text style = {styles.label}>Sintomas:</Text>
            <Text style = {styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
      
    </SafeAreaView>
    

  )
}

const styles = StyleSheet.create({
  
  contenedor:{
    backgroundColor: '#F59E0B',
    flex:1
  },
  titulo:{
    textAlign: 'center', 
    fontSize: 30,         
    color : '#FFF',
    fontWeight:'700'   
  },
  tituloBold:{      
    fontWeight:'900',
    color:'#FFF'
  },
  btnCerrar:{
    marginHorizontal:30,
    backgroundColor:'#E06900',
    padding:15,
    borderRadius:10,
    marginVertical:30,
    borderWidth: 1,        //para ponerle un borde al boton
    borderColor:'#FFF'
  },
  btnCerrarText:{
    textAlign: 'center',
    fontWeight:'900',
    fontSize:16,
    color:'#FFF',
    textTransform:'uppercase'
  },
  contenido:{
    backgroundColor : '#FFF',
    marginHorizontal:30,
    borderRadius:10,
    padding:20,
    //SOMBRAS EN REACT NATIVE  https://ethercreative.github.io/react-native-shadow-generator/
    //esa pagina puedes copiar el codigo para revisar el grosor de la sombra
    shadowColor: "#000",
    shadowOffset: {   //ubicacion de la sombra
	    width: 0,  //izquierda-derecha
	    height: 2,   //arriba-abajo
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5, //exclusivo de android para las sombras
  }, 
  campo:{
    marginBottom:10
  },
  label:{
    textTransform:'uppercase',
    color : '#374151',
    fontWeight:'600',
    fontSize:12
  },
  valor:{
    fontWeight:'700',
    fontSize:20,
    color: '#334155'
  }
})

export default informacionPaciente