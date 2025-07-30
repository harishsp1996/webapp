import { mdiChartTimelineVariant } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SwitchField } from '../../components/SwitchField'

import { SelectField } from '../../components/SelectField'
import {RichTextField} from "../../components/RichTextField";

import { create } from '../../stores/scans/scansSlice'
import { useAppDispatch } from '../../stores/hooks'
import { useRouter } from 'next/router'

const initialValues = {

    project: '',

    status: 'Pending',

    start_time: '',

    git_url: '',

    git_username: '',

    git_password: '',

    server_ip: '',

    app_urls: '',

}

const ScansNew = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSubmit = async (data) => {
    await dispatch(create(data))
    await router.push('/scans/scans-list')
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="New Item" main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={
                initialValues
            }
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label="Project" labelFor="project">
      <Field name="project" id="project" component={SelectField} options={[]} itemRef={'projects'}></Field>
  </FormField>

  <FormField label="Status" labelFor="status">
      <Field name="status" id="status" component="select">

        <option value="Pending">Pending</option>

        <option value="Running">Running</option>

        <option value="Completed">Completed</option>

      </Field>
  </FormField>

  <FormField
      label="StartTime"
  >
      <Field
          type="datetime-local"
          name="start_time"
          placeholder="StartTime"
      />
  </FormField>

  <FormField
      label="GitURL"
  >
      <Field
          name="git_url"
          placeholder="GitURL"
      />
  </FormField>

  <FormField
      label="GitUsername"
  >
      <Field
          name="git_username"
          placeholder="GitUsername"
      />
  </FormField>

  <FormField
      label="GitPassword"
  >
      <Field
          name="git_password"
          placeholder="GitPassword"
      />
  </FormField>

  <FormField
      label="ServerIP"
  >
      <Field
          name="server_ip"
          placeholder="ServerIP"
      />
  </FormField>

  <FormField
      label="AppURLs"
  >
      <Field
          name="app_urls"
          placeholder="AppURLs"
      />
  </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/scans/scans-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

ScansNew.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default ScansNew
