import React, { useState } from 'react';
import axios from 'axios';
import {
  Page,
  PageSection,
  TextContent,
  Text,
  Form,
  FormGroup,
  TextInput,
  Checkbox,
  Button,
  Spinner,
  Alert,
  Grid,
  GridItem
} from '@patternfly/react-core';
import "@patternfly/react-core/dist/styles/base.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState('');
  const [ratioToMedian, setRatioToMedian] = useState('');
  const [usePin, setUsePin] = useState(false);
  const [useChip, setUseChip] = useState(false);
  const [onlineTransaction, setOnlineTransaction] = useState(false);
  const [message, setMessage] = useState('');

  const endpoint = "https://ai-fraud-detection-demo-api-ymaheshw-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const payload = [
      parseFloat(distance),
      parseFloat(ratioToMedian),
      usePin ? 1 : 0,
      useChip ? 1 : 0,
      onlineTransaction ? 1 : 0
    ];

    try {
      const response = await axios.post(endpoint, payload);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error: Could not determine the transaction status.');
    }
    setIsLoading(false);
  };

  return (
    <Page>
      <Grid hasGutter>
        <GridItem span={6}>
          <PageSection>
            <TextContent>
              <Text component="h1">Tell me about your transaction</Text>
            </TextContent>
            <Form onSubmit={handleSubmit}>
              <FormGroup
                label="Distance from last transaction (km):"
                isRequired
                fieldId="distance"
              >
                <TextInput
                  id="distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  type="number"
                  isRequired
                />
              </FormGroup>
              <FormGroup
                label="ratio of the transaction value to the median:"
                isRequired
                fieldId="ratioToMedian"
              >
                <TextInput
                  id="ratioToMedian"
                  value={ratioToMedian}
                  onChange={(e) => setRatioToMedian(e.target.value)}
                  type="number"
                  step="0.01"
                  isRequired
                />
              </FormGroup>
              <FormGroup
                label="Using a pin"
                fieldId="usePin"
              >
                <Checkbox
                  id="usePin"
                  isChecked={usePin}
                  onChange={(checked) => setUsePin(!usePin)}
                />
              </FormGroup>
              <FormGroup
                label="Is the credit card with a chip"
                fieldId="useChip"
              >
                <Checkbox
                  id="useChip"
                  isChecked={useChip}
                  onChange={(checked) => setUseChip(!useChip)}
                />
              </FormGroup>
              <FormGroup
                label="Online transaction"
                fieldId="onlineTransaction"
              >
                <Checkbox
                  id="onlineTransaction"
                  isChecked={onlineTransaction}
                  onChange={(checked) => setOnlineTransaction(!onlineTransaction)}
                />
              </FormGroup>
              <Button variant="primary" type="submit" isDisabled={isLoading}>
                {isLoading ? <Spinner size="md" /> : 'Submit'}
              </Button>
            </Form>
            {message && <Alert variant="info" title={`Response: ${message.toUpperCase()}`} />}
          </PageSection>

        </GridItem>
        <GridItem span={6}>
        <PageSection>
            <TextContent>
              <Text component="h1">OpenShift Platform Demo for creating intelligent applications</Text>
              UI Client - https://github.com/yashwanthm/ai-fraud-detection-client
              REST API for interfacing with the model - https://github.com/yashwanthm/ai-fraud-detection-demo-api
              Model Development, Training and Deployment - https://docs.redhat.com/en/documentation/red_hat_openshift_ai_cloud_service/1/html-single/openshift_ai_tutorial_-_fraud_detection_example/index

            </TextContent>
        </PageSection>

        </GridItem>

      </Grid>

    </Page>
  );
};

export default App;