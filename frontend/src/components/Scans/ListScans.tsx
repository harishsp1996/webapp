import React from 'react';
import CardBox from '../CardBox';
import dataFormatter from '../../helpers/dataFormatter';
import ListActionsPopover from "../ListActionsPopover";
import {useAppSelector} from "../../stores/hooks";
import {Pagination} from "../Pagination";
import LoadingSpinner from "../LoadingSpinner";
import Link from 'next/link';

type Props = {
    scans: any[];
    loading: boolean;
    onDelete: (id: string) => void;
    currentPage: number;
    numPages: number;
    onPageChange: (page: number) => void;
};

const ListScans = ({ scans, loading, onDelete, currentPage, numPages, onPageChange }: Props) => {
    const corners = useAppSelector((state) => state.style.corners);
    const bgColor = useAppSelector((state) => state.style.cardsColor);

    return (
        <>
            <div className='relative overflow-x-auto p-4 space-y-4'>
                {loading && <LoadingSpinner />}
                {!loading && scans.map((item) => (
                  <div key={item.id}>
                    <CardBox hasTable isList className={'rounded shadow-none'}>
                        <div className={`flex rounded dark:bg-dark-900 border items-center overflow-hidden`}>
                          <Link
                              href={`/scans/scans-view/?id=${item.id}`}
                              className={
                                  'flex-1 px-4 py-6 h-24 flex divide-x-2 divide-stone-300 items-center overflow-hidden dark:divide-dark-700 overflow-x-auto'
                              }
                          >

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Project</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.projectsOneListFormatter(item.project) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>Status</p>
                                <p className={'line-clamp-2'}>{ item.status }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>StartTime</p>
                                <p className={'line-clamp-2'}>{ dataFormatter.dateTimeFormatter(item.start_time) }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>GitURL</p>
                                <p className={'line-clamp-2'}>{ item.git_url }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>GitUsername</p>
                                <p className={'line-clamp-2'}>{ item.git_username }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>GitPassword</p>
                                <p className={'line-clamp-2'}>{ item.git_password }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>ServerIP</p>
                                <p className={'line-clamp-2'}>{ item.server_ip }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>AppURLs</p>
                                <p className={'line-clamp-2'}>{ item.app_urls }</p>
                            </div>

                            <div className={'flex-1 px-3'}>
                                <p className={'text-xs text-gray-500'}>APIDefinitionFile</p>
                                <p className={'line-clamp-2'}>{ item.api_definition_file }</p>
                            </div>

                          </Link>
                            <ListActionsPopover
                              onDelete={onDelete}
                              itemId={item.id}
                              pathEdit={`/scans/scans-edit/?id=${item.id}`}
                              pathView={`/scans/scans-view/?id=${item.id}`}
                              hasUpdatePermission={true}
                            />
                        </div>
                    </CardBox>
                  </div>
                ))}
                {!loading && scans.length === 0 && (
                  <div className='col-span-full flex items-center justify-center h-40'>
                      <p className=''>No data to display</p>
                  </div>
                )}
            </div>
            <div className={'flex items-center justify-center my-6'}>
                <Pagination
                  currentPage={currentPage}
                  numPages={numPages}
                  setCurrentPage={onPageChange}
                />
            </div>
        </>
    )
};

export default ListScans
