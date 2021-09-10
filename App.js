import React from 'react';
import AppLoading from 'expo-app-loading';
import
{ 
  useFonts, 
  Ubuntu_400Regular, 
  Ubuntu_700Bold 
} from '@expo-google-fonts/ubuntu';
import Routes from './src/routes/index';
import { DataContextProvider } from './src/hooks/useDataContext';



export default function App() {
  

  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_400Regular,
  })

  if (!fontsLoaded)
  return <AppLoading />

  return (
   
    <DataContextProvider>
      <Routes />
    </DataContextProvider>
    


  
    
  );

   
}




