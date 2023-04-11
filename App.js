

import React, {useState,useEffect} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,           //agrega una funciionalidad al botton
  FlatList,  //permite mostrar el mismo componente con diferente informacion
  Alert
} from 'react-native';

import InformacionPaciente from './src/components/informacionPaciente'
import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente'
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  
  //los hooks se colocan en la parte superior (no pueden ser de forma condicional)
  //no se pueden usar hooks luego de un return
  //la segunda variable es una funcion

  const [ modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [ modalPaciente, setModalPaciente] = useState(false)


  useEffect(async() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas')
        console.log(citasStorage)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCitasStorage()
  },[])
  
  //busca el id del paciente para editar su infrmacion
  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id)
    
    setPaciente(pacienteEditar[0])   //se agrega la info del paciente a la funcion del State para editar posterior...
    //...retorna un arreglo pero con [0], retorna un objeto al ser la posicion [0] de arreglo
  }
  
  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text : 'Cancelar'},
        {text: 'Si, Eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter(
          pacientesState =>pacientesState.id !== id)

          setPacientes(pacientesActualizados)
        }}
      ]
    )

  }

  const cerrarModal = () => {
    setModalVisible (false)
  }

  //almacenar las citas en storage, en AsyncStorage no se puede guarda un arreglo completo, solo un string
  const guardarCitasStorage = async(citasJSON) => {
    try {
      await AsyncStorage.setItem('citas', citasJSON)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    //estoy conectando los estilos con el texto
    //el Pressablese usa para ponerle animaciona los botones o asi
    <SafeAreaView style = {styles.conteiner}>
      <Text style = {styles.titulo}>Administrador de citas{' '}
        <Text style = {styles.tituloBold}>Veterinaria</Text>
      </Text>
     <Pressable 
         onPress={() => setModalVisible(!modalVisible)}  //modalvisibel se convierte en true
         style={styles.btnNuevaCita}
     >
        <Text 
          style = {styles.btnTextNuevaCita}
        >Nueva Cita</Text>
     </Pressable>
        
     {pacientes.length===0 ?
        <Text style = {styles.noPacientes}>No hay pacientes aún</Text> :  //mostrar la extension del arreglo de pacientes
        <FlatList
          style = {styles.listado}
           data = {pacientes}
           keyExtractor ={(item) => item.id}
           renderItem = {({item}) => {

             return(
              <Paciente
               item = {item}
               setModalVisible = {setModalVisible}
               setPaciente = {setPaciente}
               pacienteEditar = {pacienteEditar}
               pacienteEliminar = {pacienteEliminar}
               setModalPaciente = {setModalPaciente}
              />
             )
           }}
           
            
        />
     }
     {modalVisible && (   //solucion para que pare de ejecutarse el modal
        <Formulario
          //modalVisible = {modalVisible}//este es el props o propiedad que se le pasa al hijo
          //setModalVisible = {setModalVisible}
          cerrarModal ={cerrarModal}
          pacientes ={pacientes}
          setPacientes = {setPacientes}
          paciente = {paciente} //se pasa con la informacion del paciente a editar
          setPaciente ={setPaciente}
          guardarCitasStorage ={guardarCitasStorage}
        /> 
      )}
       
    
      <Modal
        visible = {modalPaciente} //cuando montas primero el modal se va a desactivar cuando no sea necesario
        animationType = 'fade'     //en caso contrario siempre se estara ejecutando
     >
        <InformacionPaciente
          paciente = {paciente}
          setPaciente = {setPaciente}
          setModalPaciente = {setModalPaciente}
          
        />
      </Modal>
     
    </SafeAreaView>  
  );
};

const styles= StyleSheet.create({
  conteiner : {
     backgroundColor: '#F3F4F6',   //crea el color del cuadro
     flex: 1   //el cuadro del color se va hasta abajo
  },

  titulo:{
    textAlign: 'center', //alinear
    fontSize: 30,         //tamaño de letra
    color : '#374151',
    fontWeight:'500'   //engrosar la letra
  },
  tituloBold:{       //esta es la parte que dice VETERINARIA
    fontWeight:'900',
    color:'#8A2BE2'
  },
  btnNuevaCita:{      //ajusta el cuadro del botton
    backgroundColor:'#6D2BD9',
    padding: 20,       //hace el boton un poco mas grande
    marginTop:30,       //los margenes se ajustan de cada lado
    marginLeft:40,
    marginRight:40,
    //marginHorizontal:20   funciona cuando los 2 margees horizontales tienen lo mismo
    borderRadius :10
  },
  btnTextNuevaCita:{
    textAlign: 'center',
    color:'#FFF',
    fontWeight:'900',
    textTransform: 'uppercase',
    fontSize: 19 
  },
  noPacientes: {
    textAlign:'center',
    marginTop:40,
    fontSize:24,
    fontWeight:'600'
  },
  listado :{
    marginTop: 50,
    marginHorizontal:30
  }
})
export default App;
