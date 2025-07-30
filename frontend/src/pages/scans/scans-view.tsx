import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/scans/scansSlice'
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

const ScansView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { scans } = useAppSelector((state) => state.scans)

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
              <title>{getPageTitle('View scans')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View scans')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/scans/scans-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Project</p>

                        <p>{scans?.project?.name ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Status</p>
                    <p>{scans?.status ?? 'No data'}</p>
                </div>

                <FormField label='StartTime'>
                    {scans.start_time ? <DatePicker
                      dateFormat="yyyy-MM-dd hh:mm"
                      showTimeSelect
                      selected={scans.start_time ?
                        new Date(
                          dayjs(scans.start_time).format('YYYY-MM-DD hh:mm'),
                        ) : null
                      }
                      disabled
                    /> : <p>No StartTime</p>}
                </FormField>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>GitURL</p>
                    <p>{scans?.git_url}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>GitUsername</p>
                    <p>{scans?.git_username}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>GitPassword</p>
                    <p>{scans?.git_password}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>ServerIP</p>
                    <p>{scans?.server_ip}</p>
                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>AppURLs</p>
                    <p>{scans?.app_urls}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Reports Scan</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                                <th>ToolName</th>

                                <th>ReportPath</th>

                            </tr>
                            </thead>
                            <tbody>
                            {scans.reports_scan && Array.isArray(scans.reports_scan) &&
                              scans.reports_scan.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/reports/reports-view/?id=${item.id}`)}>

                                    <td data-label="tool_name">
                                        { item.tool_name }
                                    </td>

                                    <td data-label="report_path">
                                        { item.report_path }
                                    </td>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!scans?.reports_scan?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/scans/scans-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

ScansView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default ScansView;
