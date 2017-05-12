// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

const NEWUSERFORM_ACTION = 'newuser_form';
const ACCOUNT_ARGUMENT = 'accounts';
const SEARCH_ACTION = 'search';
const SEARCH_ARGUMENT1 = 'searchterm_1';
const SSML_ACTION = 'sayssml';
const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

// [START SillyNameMaker]
exports.sillyNameMaker = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));
  
  // Testing SSML markups
  function saySSML(assistant) {
    let text_to_speech = '<speak>'
      + 'Here are <say-as interpret-as="characters">SSML</say-as> samples. '
      + 'I can pause <break time="3"/>. '
      + 'I can play a sound <audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. '
      + 'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. '
      + 'Or I can speak in ordinals. You are <say-as interpret-as="ordinal">10</say-as> in line. '
      + 'Or I can even speak in digits. Your position in line is <say-as interpret-as="digits">10</say-as>. '
      + 'I can also substitute phrases, like the <sub alias="World Wide Web Consortium">W3C</sub>. '
      + 'Finally, I can speak a paragraph with two sentences. '
      + '<p><s>This is sentence one.</s><s>This is sentence two.</s></p>'
      + '</speak>'
    assistant.tell(text_to_speech);
  };
  
  // Make a silly name
  function makeName (assistant) {
    let number = assistant.getArgument(NUMBER_ARGUMENT);
    let color = assistant.getArgument(COLOR_ARGUMENT);
    assistant.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.');
  }
  
  // Search the Outlet for new user account form
  function newUserForm(assistant) {
    let account = assistant.getArgument(ACCOUNT_ARGUMENT);
    let searchterm_1 = assistant.getArgument(SEARCH_ARGUMENT1);
    let query = '(account,searchterm_1)';
    let url = 'https://outlet.ouraes.com/api/core/v3/contents?filter=';
    let command = url + query;
    console.log(command);
    //let docs = GET command;
    let docs = GET https://outlet.ouraes.com/api/core/v3/contents?filter=search(webex,form)&count=1&fields=publishDate%2Ccontent%2Csubject;
    console.log(docs);
    assistant.tell(docs);
  }
  
  // Search the Outlet for related documentation
  function searchOutlet(assistant) {
    let query = '(webex,form)';
    let url = 'https://outlet.ouraes.com/api/core/v3/contents?filter=';
    let command = url + query;
    console.log(command);
    let docs = GET command;
    //let docs = GET https://outlet.ouraes.com/api/core/v3/contents?filter=search(email);
    console.log(docs);
    assistant.tell(docs);
  }

  let actionMap = new Map();
  actionMap.set(NEWUSERFORM_ACTION, newUserForm);
  actionMap.set(SSML_ACTION, saySSML);
  actionMap.set(NAME_ACTION, makeName);

  assistant.handleRequest(actionMap);
};
// [END SillyNameMaker]
