import { ConnectorDefault } from './default.connector';
export class MagentoConnector extends ConnectorDefault {
  public name = 'Magento';
  public type = 'magento';
  public icon = '/admin/assets/magento.png';
  public link = '';
  public description =
    'Sell online with a professional online store. Launch, run and scale your online store with our industry-leading eCommerce website builder and advanced business features. ';
  public schema = {
    type: 'object',
    properties: {
      url: { type: 'string' },
      token: { type: 'string' },
    },
    required: ['url', 'token'],
  };
  public layout = [
    {
      key: 'url',
      title: 'Url',
      placeholder: 'Url',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
    {
      key: 'token',
      title: 'Token',
      placeholder: 'Token',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
  ];
  public data = {
    url: '',
    token: '',
  };
}
