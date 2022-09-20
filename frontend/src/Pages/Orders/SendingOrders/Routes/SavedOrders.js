import React, {useEffect, useState} from "react";
import Table from '../../../../Components/Table/Table'
import {useDispatch, useSelector} from 'react-redux'
import {getSavedOrders} from './../Slices/savedOrdersSlice.js'
import Spinner from './../../../../Components/Spinner/SmallLoader'
import NotFind from "../../../../Components/NotFind/NotFind";
function SavedOrders() {

    const dispatch = useDispatch()

    const {
        savedOrders,
        getLoading
    } = useSelector((state) => state.savedOrders)

    const [data, setData] = useState([])

    const headers = [
        {title: '№', styles: 'w-[10%]'},
        {
            filter: 'createdAt',
            title: 'Sana',
            styles: 'w-[15%]',
        },
        {
            filter: 'createdAt',
            title: 'Vaqt',
            styles: 'w-[10%]',
        },
        {
            title: "Do'kon nomi",
            filter: 'temporary.partner.label',
        },
        {title: 'Maxsulot soni', filter: 'temporary.tableProducts[0].total', styles: 'w-[10%]'},
        {title: 'Umumiy narxi USD', filter: 'temporary.tableProducts[0].totalprice', styles: 'w-[15%]'},
        {title: 'Umumiy narxi UZS', filter: 'temporary.tableProducts[0].totalpriceuzs', styles: 'w-[15%]'},
        {
            title : '', filter : '', styles : 'w-[10%]'
        }   
    ]

    useEffect(() => {
      const body = {}
      dispatch(getSavedOrders(body))
    }, [dispatch])

    useEffect(() => {
       setData(savedOrders)
    }, [dispatch, savedOrders])

    return(
        <section>
              <div className='tableContainerPadding'>
             {getLoading ? (
                    <Spinner />
                ) : data.length === 0 ? (
                    <NotFind text={'Agentlar mavjud emas'} />
                ) : (
                <Table
                    page='savedOrders'
                    currentPage={''}
                    countPage={''}
                    data={data}
                    headers={headers}
                />
                )}
             </div> 
        </section>
    )
}

export default SavedOrders;