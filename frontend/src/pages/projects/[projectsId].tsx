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

import { update, fetch } from '../../stores/projects/projectsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditProjects = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    'name': '',

    language: '',

    scan_type: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { projects } = useAppSelector((state) => state.projects)

  const { projectsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: projectsId }))
  }, [projectsId])

  useEffect(() => {
    if (typeof projects === 'object') {
      setInitialValues(projects)
    }
  }, [projects])

  useEffect(() => {
      if (typeof projects === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (projects)[el])

          setInitialValues(newInitialVal);
      }
  }, [projects])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: projectsId, data }))
    await router.push('/projects/projects-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit projects')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit projects'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField
        label="Name"
    >
        <Field
            name="name"
            placeholder="Name"
        />
    </FormField>

    <FormField label="Language" labelFor="language">
        <Field name="language" id="language" component="select">

            <option value="Python">Python</option>

            <option value="Java">Java</option>

            <option value="JavaScript">JavaScript</option>

            <option value="Node.js">Node.js</option>

            <option value="PHP">PHP</option>

        </Field>
    </FormField>

    <FormField label="ScanType" labelFor="scan_type">
        <Field name="scan_type" id="scan_type" component="select">

            <option value="SAST">SAST</option>

            <option value="DAST">DAST</option>

            <option value="Both">Both</option>

        </Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/projects/projects-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditProjects.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditProjects
