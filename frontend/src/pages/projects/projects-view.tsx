import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/projects/projectsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const ProjectsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { projects } = useAppSelector((state) => state.projects)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View projects')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View projects')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/projects/projects-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Name</p>
                    <p>{projects?.name}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Language</p>
                    <p>{projects?.language ?? 'No data'}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ScanType</p>
                    <p>{projects?.scan_type ?? 'No data'}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Scans Project</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>Status</th>

                                <th>StartTime</th>

                                <th>GitURL</th>

                                <th>GitUsername</th>

                                <th>GitPassword</th>

                                <th>ServerIP</th>

                                <th>AppURLs</th>

                            </tr>
                            </thead>
                            <tbody>
                            {projects.scans_project && Array.isArray(projects.scans_project) &&
                              projects.scans_project.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/scans/scans-view/?id=${item.id}`)}>

                                    <td data-label="status">
                                        { item.status }
                                    </td>

                                    <td data-label="start_time">
                                        { dataFormatter.dateTimeFormatter(item.start_time) }
                                    </td>

                                    <td data-label="git_url">
                                        { item.git_url }
                                    </td>

                                    <td data-label="git_username">
                                        { item.git_username }
                                    </td>

                                    <td data-label="git_password">
                                        { item.git_password }
                                    </td>

                                    <td data-label="server_ip">
                                        { item.server_ip }
                                    </td>

                                    <td data-label="app_urls">
                                        { item.app_urls }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!projects?.scans_project?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/projects/projects-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ProjectsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ProjectsView;
