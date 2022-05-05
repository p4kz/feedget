import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { styles } from './styles'
import { theme } from '../../theme'
import bottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet'

function Widget() {

  const bottomSheetRef = useRef<BottomSheet>(null)

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }
  return (
    <>
      <TouchableOpacity 
        onPress={handleOpen}
        style={styles.button}
      >
       <ChatTeardropDots
        size={24}
        weight='bold'
        color={theme.colors.text_on_brand_color}
       />
        
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >

      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget)