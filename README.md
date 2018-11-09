# Dialogflow Fulfillment: Node.js Movie Infos

## Dialogflow and Fulfillment Setup

### Firebase CLI
1. Create a [Dialogflow Agent](https://console.dialogflow.com/)
2. `git clone https://github.com/clemixid/MovieInfoBot.git`
3. In Dialogflow console under **Settings** ⚙ > [Restore from Zip](https://dialogflow.com/docs/agents#export_and_import) using the `weather-agent.zip` in this directory.
4. Get a OMDb API key from http://www.omdbapi.com/apikey.aspx
5. Replace <ENTER_OMDb_API_KEY_HERE> with your OMDb API key on line 7 of `functions/index.js`
6. `cd` to the `functions` directory
7. Run `npm install`
8. Install the Firebase CLI with `npm install -g firebase-tools`
9. Login to your Google account with `firebase login`
10. Add your project to the sample with `firebase use [project ID]`
      + In Dialogflow console under **Settings** ⚙ > **General** tab > copy **Project ID**.
11. Run `firebase deploy --only functions:dialogflowFirebaseFulfillment`
12. When successfully deployed, visit the **Project Console** link > **Functions** > **Dashboard**
      + Copy the link under the events column.
      + For example: `https://us-central1-<PROJECTID>.cloudfunctions.net/<FUNCTIONNAME>`
13. Back in Dialogflow Console > **Fulfullment** > **Enable** Webhook.
14. Paste the URL from the Firebase Console’s events column into the **URL** field > **Save**.
15. In Dialogflow Console > **Settings** ⚙ > select **Google Cloud** link in Project ID section. From Google Cloud Platform > **menu** ☰ > **Enable Billing**.
