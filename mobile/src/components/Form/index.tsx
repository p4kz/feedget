import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot'

import { FeedbackType } from '../../components/Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { ScreenshotButton } from '../../components/ScreenshotButton'
import { Button } from '../../components/Button'

import { styles } from './styles';
import { theme } from '../../theme';


interface Props {
  feedbackType: FeedbackType
}

export function Form({ feedbackType }: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenhot] = useState<string | null>(null)

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(uri => setScreenhot(uri))
    .catch(err => console.log(err))
  }

  function handleScreenshotRemove() {
    setScreenhot(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft 
            size={24}
            weight='bold'
            color={theme.colors.text_primary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>

      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder='Teve uma ideia de melhoria ou de nova funcionalidade? conte pra gente!'
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button 
          isLoading={false}
        />
      </View>
    </View>
  );
}