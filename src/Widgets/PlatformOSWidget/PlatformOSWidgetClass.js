import * as Scrivito from 'scrivito';
import { registerTextExtract } from '../../utils/textExtractRegistry';

const PlatformOSWidget = Scrivito.provideWidgetClass('PlatformOSWidget', {
  attributes: {
    endpoint: 'string',
    content: 'widgetlist',
  },
});

registerTextExtract('PlatformOSWidget', [
  { attribute: 'content', type: 'widgetlist' },
]);

export default PlatformOSWidget;
