import * as Scrivito from 'scrivito';

Scrivito.provideEditingConfig('PlatformOSWidget', {
  title: 'PlatformOSWidget',
  description: 'A widget with a platformOS data',

  properties: [
    'endpoint',
  ],

  attributes: {
    endpoint:{
      title: 'endpoint',
      description: 'Input the endpoint you wish to call',
    },
  },
});
