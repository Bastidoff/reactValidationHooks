import { StyleSheet, Text, View, TouchableOpacity, Picker, Switch } from 'react-native';
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

  //definimos un método, por estandard se llama onSubmit, funciona ientras se cumplan las reglas (expresiones regulares)
  const onSubmit = data => console.log(data)

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required:true, //no puede quedar vacío el campo

        }}

        render={({field:{onChange, onBlur, value}})=>(
          <TextInput
            style={styles.inputs} //se definieron los estilos para todos los InputTexts en Styles
            placeholder="Nombre Completo"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
          name='fullname'
      />
      {errors.fullname?.type=='required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
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
