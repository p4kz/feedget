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
import * as FileSystem from 'expo-file-system'; 

import { FeedbackType } from '../../components/Widget'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { ScreenshotButton } from '../../components/ScreenshotButton'
import { api } from '../../libs/api';
import { Button } from '../../components/Button'

import { styles } from './styles';
import { theme } from '../../theme';
import { Copyright } from '../Copyright';


interface Props {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenhot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

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

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return
    }

    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment
      })

      onFeedbackSent()
    } catch (err) {
      console.log(err)
      setIsSendingFeedback(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
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
        placeholder={feedbackTypeInfo.placeholder}
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>

      <Copyright />
    </View>
  );
}