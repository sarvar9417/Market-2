import React from 'react'
import {map} from 'lodash'
import TableBtn from '../../Buttons/TableBtn'
export const SavedOrdersTableRow = ({data, handleDelete}) => {
    return (
        <>
            {map(data, (item, index) => (
                <tr key={index} className='tr'>
                    <td className='td py-2'>{1 + index}</td>
                    <td className='td text-end'>
                        {' '}
                        {new Date(item?.createdAt).toLocaleDateString()}
                    </td>
                    <td className='td text-end'>
                        {new Date(item?.createdAt).toLocaleTimeString()}
                    </td>
                    <td className='td text-left'>
                        {item?.temporary?.partner?.label}
                    </td>
                    <td className='td text-end'>
                        {item?.temporary?.tableProducts[0]?.total.toLocaleString('ru-RU')}{' '}
                        {item?.temporary?.tableProducts[0]?.unit?.name}
                    </td>
                     <td className='td text-end'>{item?.temporary?.tableProducts[0]?.totalprice.toLocaleString('ru-RU')} USD</td>
                    <td className='td text-end'>{item?.temporary?.tableProducts[0]?.totalpriceuzs.toLocaleString('ru-RU')} UZS</td> 
                    <td className='td border-r-0'>
                        <div className='flex items-center justify-center gap-[0.625rem]'>
                            <TableBtn
                                type={'print'}
                                bgcolor={'bg-primary-800'}
                            />
                            <TableBtn
                                type={'edit'}
                                bgcolor={'bg-warning-500'}
                            />
                            <TableBtn
                                type={'delete'}
                                bgcolor={'bg-error-500'}
                            />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    )
}
