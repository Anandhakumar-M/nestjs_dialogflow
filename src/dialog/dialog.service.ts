import { Injectable } from '@nestjs/common';
import * as dialogflow from '@google-cloud/dialogflow';
import { google } from '@google-cloud/dialogflow/build/protos/protos';

@Injectable()
export class DialogService {
  private readonly projectId: string;
  private readonly sessionClient: dialogflow.SessionsClient;

  constructor() {
    this.projectId = process.env.DIALOGFLOW_PROJECT_ID;
    this.sessionClient = new dialogflow.SessionsClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });
  }

  async detectIntent(
    query: string,
    sessionId: string,
  ): Promise<google.cloud.dialogflow.v2.IDetectIntentResponse> {
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      this.projectId,
      sessionId,
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US',
        },
      },
    };

    const [response] = await this.sessionClient.detectIntent(request);
    console.log(JSON.stringify(response.queryResult));

    return response;
  }
}
