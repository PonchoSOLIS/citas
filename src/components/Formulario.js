import React, { useState, useEffect } from 'react'
import {Modal, Text, SafeAreaView,StyleSheet, TextInput, View,ScrollView, Pressable, Alert} from 'react-native'
import DatePicker from 'react-native-date-picker' 
//ScrollView es como un view pero puedes dar scroll de arriba hacia abajo como facebook

//pueden ser pasados por props variable, funciones,state
const Formulario = ({
  modalVisible, 
  //setModalVisible,
  guardarCitasStorage,
  cerrarModal,
  setPacientes,
  pacientes, 
  paciente : pacienteObj,
  setPaciente:setPacienteApp}) => {

  //implementacion de un state para escribir en los cuadros
  const [paciente,setpaciente] = useState('')
  const [id,setid] = useState('') 
  const [propietario,setpropietario] = useState('') 
  const [email,setemail] = useState('') 
  const [telefono,settelefono] = useState('') 
  const [fecha,setfecha] = useState(new Date()) 
  const [sintomas,setsintomas] = useState('') 

  //cuando le das click a nueva cita, ahi se ejecuta el useEffect
  useEffect(() => {
    if(Object.keys(pacienteObj).length > 0){
      setid(pacienteObj.id)
      setpaciente(pacienteObj.paciente)
      setpropietario(pacienteObj.propietario)
      setemail(pacienteObj.email)
      settelefono(pacienteObj.telefono)
      setfecha(pacienteObj.fecha)
      setsintomas(pacienteObj.sintomas)
      
    }
    
  }, [pacienteObj])
  // },[paciente]) si termina asi quiere decir que solo se va aejecutar una sola vez. ejemplo: cada que paciente cambie
  
  const handleCita = () => {
    //validar ante de agregar el registro nuevo a la base de datos, en caso de tener una o a la memoria del telefono
    if([paciente,propietario,email,telefono,fecha,sintomas].includes('')){
      //React tiene ventanas de alerta, se usan asi
      Alert.alert(
        'Error',   //nombre o titulo
        'Todos los campos son obligatorios.'//descripcion del problema
        //[{text:'Recordar después'},{text:'Cancelar'},{text:'OK',style:'destructive'}]    //editar el nombre del boton para aceptar la alerta
      )
      return    //ya aquí termina
    }

    //se crea un objeto con los datos del paciente
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas
    }


    
    if(id){
      //editando
      nuevoPaciente.id = id
      const pacientesActualizados = pacientes.map(pacienteState => 
      pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPacienteApp({})
    }else{
      nuevoPaciente.id = Date.now()
      setPacientes([...pacientes, nuevoPaciente])
    }
    //guardar paciente en el storage
    guardarCitasStorage(paciente)
    //setModalVisible(!modalVisible)
    cerrarModal()
    setid('')
    setpaciente('')
    setpropietario('')
    setemail('')
    settelefono('')
    setfecha(new Date())
    setsintomas('')
  }

  return (
    <Modal
        animationType='slide'   //tambien esta 'fade' que es como un parpadeo
        visible={modalVisible}
    >
      <SafeAreaView style = {styles.contenido}> 
            
        <ScrollView>     
          <Text style= {styles.tutulo}> {pacienteObj.id ? 'Editar':'Nueva' } {''}   
              <Text style = {styles.tituloBond}>Cita</Text>
          </Text>

          <Pressable 
            style = {styles.btnCancelar}
            onPress = { () => {
              //setModalVisible(!modalVisible)
              cerrarModal()
              setid('')
              setPacienteApp({})
              setpaciente('')
              setpropietario('')
              setemail('')
              settelefono('')
              setfecha(new Date())
              setsintomas('')
             }}
          >
             <Text style = {styles.btnCancelarText}>Cancelar</Text>

          </Pressable>

          <View style = {styles.campo}>
            <Text style = {styles.label}>Nombre Paciente</Text>
            <TextInput
              style = {styles.input}
              placeholder='Nombre paciente'
              placeholderTextColor={'#666'}
              value={paciente} //se va a aguardar aqui 
              onChangeText = {setpaciente} //se ejecuta cada que el usuario esta escribiendo
            />
          </View>

          <View style = {styles.campo}>
            <Text style = {styles.label}>Nombre Propietario</Text>
            <TextInput
              style = {styles.input}
              placeholder='Nombre Propietario'
              placeholderTextColor={'#666'}
              value = {propietario}
              onChangeText ={setpropietario}
            
            />
          </View>

          <View style = {styles.campo}>
            <Text style = {styles.label}>Email Propietario</Text>
            <TextInput
              style = {styles.input}
              placeholder='Email Propietario'
              placeholderTextColor={'#666'}
              keyboardType = 'email-address'  //aparece el arroba en el teclado
              value = {email}
              onChangeText = {setemail}
            />
          </View>

          <View style = {styles.campo}>
            <Text style = {styles.label}>Teléfono Propietario</Text>
            <TextInput
              style = {styles.input}
              placeholder='Teléfono Propietario'
              placeholderTextColor={'#666'}
              keyboardType = 'phone-pad' //agrega el asterisco y el signo de gato #
              value = {telefono}
              onChangeText = {settelefono}
              maxLength= {10}     //maximo de numero a escribir
            />
          </View>

          <View style = {styles.campo}>
            <Text style = {styles.label}>Fecha Alta</Text>
            
            <View  style = {styles.fechaContenedor}>
              <DatePicker
                 date = {fecha}
                 locale= 'es'
                 onDateChange={(date) => setfecha(date)} //actualiza el state para cuando elijas se ponga la seleccionada
                  //sino se que la de el inicio
              />
            </View>
          </View>

          <View style = {styles.campo}>
            <Text style = {styles.label}>Sintomas</Text>
            <TextInput
              style = {[styles.input, styles.sintomas]} //se puede trabajar con dos selectores
              placeholder='Sintomas Propietario'
              placeholderTextColor={'#666'}
              value = {sintomas}
              onChangeText = {setsintomas}
              multiline = {true}    //permite que haya muchas lineas en este campo
              numberOfLines = {4}  //numero de lineas para los sintomas
            />
          </View>
          
          <Pressable 
            style = {styles.btnAgregar}
            onPress = {handleCita}
          >
             <Text style = {styles.btnAgregarText}>{pacienteObj.id ? 'Guardar Cambios':'Agregar Paciente' }</Text> 

          </Pressable>
        </ScrollView>
        
      </SafeAreaView>
        
    </Modal>
  )
}

const styles = StyleSheet.create({
  contenido:{
    backgroundColor: '#6D28D9',
    flex:1
  },
  tutulo: {
    fontSize:30,
    fontWeight: '600',
    textAlign: 'center',
    margin:30,
    color: '#FFF'
  },
  btnCancelar:{
    marginHorizontal:30,
    backgroundColor:'#5827A4',
    padding:15,
    borderRadius:10,
    marginVertical:30,
    borderWidth: 1,        //para ponerle un borde al boton
    borderColor:'#FFF'
  },
  btnCancelarText:{
    textAlign: 'center',
    fontWeight:'900',
    fontSize:16,
    color:'#FFF',
    textTransform:'uppercase'
  },
  tituloBond:{
    fontWeight: '900'
  },
  campo:{
    marginTop:-5,
    marginHorizontal:30,
  },
  label:{
    color:'#FFF',
    marginBottom:10,
    marginTop:15,
    fontSize:20,
    fontWeight:'600'
  },
  input:{
    backgroundColor:'#FFF',
    padding:15,
    borderRadius:10
  },
  sintomas:{
    height:100
  },
  fechaContenedor:{
    backgroundColor:'#FFF',
    borderRadius:10
  },
  btnAgregar:{
    marginVertical:50,
    backgroundColor:'#F59E0B',
    paddingVertical:15,
    borderRadius:10,
    marginHorizontal:30,
    borderWidth: 1,        //para ponerle un borde al boton
    borderColor:'#FFF'
  },
  btnAgregarText:{
    textAlign:'center',
    color:'#5827A4',
    textTransform:'uppercase',
    fontWeight:'700',
    fontSize:16
  }
})
export default Formulario