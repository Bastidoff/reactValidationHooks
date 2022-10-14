import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Picker, Switch, Button } from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import { TextInput } from 'react-native-web';

export default function App() {
  //definir la información del formulario a validar
  const {control, handleSubmit, formState:{errors}}=useForm({
    defaultValues:{
      //se definen e inicializan los datos que se van a pedir en el formulario, osea los estados del useForm (states)
      fullname:'',
      email:'',
      age:'',
      password:''
    }
  })

  const [Gender, setGender] = useState("f"); //definimos el estado del Picker

  //definimos un método, por estandard se llama onSubmit, funciona ientras se cumplan las reglas (expresiones regulares)
  const onSubmit = data => console.log(data)


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState); //métodos para activar el switche

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required:true, //no puede quedar vacío el campo
          pattern: /^([a-zA-ZùÙüÜäàáëèéïìíöòóüùúÄÀÁËÈÉÏÌÍÖÒÓÜÚñÑ\s]+)$/, //con pattern se define la expresión regular a validar, en este caso solo letras, espacios
          maxLength: 30, //máximo y mínimo de carácteres
          minLength: 3
        }}

        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={[styles.inputs, {borderColor: errors.fullname?.type == 'required' || errors.fullname?.type == 'pattern' || errors.fullname?.type == 'maxLength' || errors.fullname?.type == 'minLength' ? 'red' : 'green'}]} //se definieron los estilos para todos los InputTexts en Styles. Y, por medio de un operador ternario, si no se cumplen las reglas, el borde se popne rojo
            placeholder="Nombre Completo"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
          name='fullname'
      />
      {errors.fullname?.type=='required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
      {errors.fullname?.type=='pattern' && <Text style={{color:'red'}}>Solo letras y espacios</Text>}
      {errors.fullname?.type=='maxLength' && <Text style={{color:'red'}}>Máximo 30 carácteres</Text>}
      {errors.fullname?.type=='minLength' && <Text style={{color:'red'}}>Mínimo 3 carácteres</Text>}
      <Controller
        control={control}
        rules={{
          required:true, //no puede quedar vacío el campo
          pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
        }}

        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={[styles.inputs, {borderColor: errors.fullname?.type == 'required' || errors.fullname?.type == 'pattern'  ? 'red' : 'green'}]} 
            placeholder="Correo Electrónico"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
          name='email'
      />
      
      {errors.email?.type=='required' && <Text style={{color:'red'}}>El email es obligatorio</Text>}
      {errors.email?.type=='pattern' && <Text style={{color:'red'}}>Formato de correo inválido</Text>}
      <Text>Género</Text>    
      <Picker
        selectedValue={Gender}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="Masculino" value="m" />
        <Picker.Item label="Femenino" value="f" />
      </Picker>

      <Text>Incluye propina en la factura</Text>

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Button
      title="Chequear genero"
      onPress={()=>{
        alert(Gender)
        alert(isEnabled)
      }}
      />

      <TouchableOpacity
        style={{backgroundColor:'green', padding:5, borderRadius:10, marginTop:10, width:100, textAlign:'center'}}
        onPress={handleSubmit(onSubmit)}>
        <Text style={{color:'white'}}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs:{
    borderRadius:10,
    padding:10,
    color:'blue',
    borderColor:'green',
    borderWidth:1,
    textAlign:'center'
  }
});
