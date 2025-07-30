import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

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
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/scans/scansSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditScans = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    project: null,

    status: '',

    start_time: new Date(),

    'git_url': '',

    'git_username': '',

    'git_password': '',

    'server_ip': '',

    'app_urls': '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { scans } = useAppSelector((state) => state.scans)

  const { scansId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: scansId }))
  }, [scansId])

  useEffect(() => {
    if (typeof scans === 'object') {
      setInitialValues(scans)
    }
  }, [scans])

  useEffect(() => {
      if (typeof scans === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (scans)[el])

          setInitialValues(newInitialVal);
      }
  }, [scans])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: scansId, data }))
    await router.push('/scans/scans-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit scans')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit scans'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label='Project' labelFor='project'>
        <Field
            name='project'
            id='project'
            component={SelectField}
            options={initialValues.project}
            itemRef={'projects'}

            showField={'name'}

        ></Field>
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
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.start_time ?
                  new Date(
                      dayjs(initialValues.start_time).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'start_time': date})}
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

EditScans.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditScans
