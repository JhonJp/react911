import React from 'react';
import { Overlay } from 'react-native-elements';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const Dialog = ({ visible, title, message, hideModal}) => {
  return (
    <>
      <Overlay
        isVisible={visible}
        // eslint-disable-next-line react-native/no-inline-styles
        overlayStyle={{
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: 'rgba(0,0,0,0.01)',
          width: '80%',
          padding: '5%',
        }}
      >
        <Card>
          <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{message}</Paragraph>
          </Card.Content>
          <Card.Actions style={{ justifyContent: 'flex-end' }}>
            <Button onTouchEnd={hideModal}>Ok</Button>
          </Card.Actions>
        </Card>
      </Overlay>
    </>
  );
};

export default Dialog;
