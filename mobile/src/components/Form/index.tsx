import { ArrowLeft } from 'phosphor-react-native';
import React from 'react';

import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
 } from 'react-native';

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
          onTakeShot={() => {}}
          onRemoveShot={() => {}}
          screenshot='https://github.com/p4kz.png'
        />

        <Button 
          isLoading={false}
        />
      </View>
    </View>
  );
}