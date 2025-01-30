import { Fragment, useContext } from 'react'
import { Row, Col, Card, CardHeader, CardTitle, CardBody, CustomInput } from 'reactstrap'
import ExtensionsHeader from '@components/extensions-header'
import { IntlContext } from '../../../utility/context/Internationalization'
import { FormattedMessage } from 'react-intl'

const I18nExtension = () => {
  const context = useContext(IntlContext)
  return (
    <Fragment>
      <ExtensionsHeader
        title='React Intl'
        subTitle='This library provides React components and an API to format dates, numbers, and strings, including pluralization and handling translations.'
        link='https://www.npmjs.com/package/react-intl'
      />

      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>
                <FormattedMessage id="title.changeLocale" defaultMessage="Change Locale" />
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className='language-options'>
                <CustomInput
                  type='radio'
                  id='radio-en'
                  name='i18n-lang-radio'
                  onClick={() => {
                    context.switchLanguage('en')
                  }}
                  label={<FormattedMessage id="label.english" defaultMessage="English" />}
                  className='mb-1'
                  defaultChecked={context.locale === 'en'}
                />
                <CustomInput
                  type='radio'
                  id='radio-fr'
                  name='i18n-lang-radio'
                  onClick={() => {
                    context.switchLanguage('fr')
                  }}
                  label={<FormattedMessage id="label.french" defaultMessage="French" />}
                  className='mb-1'
                  defaultChecked={context.locale === 'fr'}
                />
                <CustomInput
                  type='radio'
                  id='radio-de'
                  name='i18n-lang-radio'
                  onClick={() => {
                    context.switchLanguage('de')
                  }}
                  label={<FormattedMessage id="label.german" defaultMessage="German" />}
                  className='mb-1'
                  defaultChecked={context.locale === 'de'}
                />
                <CustomInput
                  type='radio'
                  id='radio-pt'
                  name='i18n-lang-radio'
                  onClick={() => {
                    context.switchLanguage('pt')
                  }}
                  label={<FormattedMessage id="label.portuguese" defaultMessage="Portuguese" />}
                  className='mb-1'
                  defaultChecked={context.locale === 'pt'}
                />
              </div>
              <div className='border p-2 mt-3'>
                <h5 className='mb-1'>
                  <FormattedMessage id="title.someTitle" defaultMessage="Title" />
                </h5>
                <FormattedMessage id='text' defaultMessage="Some dynamic content" />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default I18nExtension
