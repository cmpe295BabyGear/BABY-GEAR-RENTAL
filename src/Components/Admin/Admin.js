import React from 'react'
import { useQuery, useMutation } from 'react-query';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './style.css';
import getCustomerItems from '../../services/ServiceAdmin';
import { postCustItem } from '../../services/ServiceAdmin';
import { ProgressSpinner } from 'primereact/progressspinner';



function Admin() {

    const labelPending="Reject";
    const labelAproved="Approve";

    const [first, setFirst] = useState(0);
    const [custItemSelected, setCustItemSelected] = useState({});
    const [custItemsData, setCustItemsData]=useState([]);
    const custListsWrapper =useQuery(['customerLists'],getCustomerItems, { refetchOnWindowFocus: false });
    const postCustItemMutation = useMutation(postCustItem, {onSuccess: postCustItemSuccessHandler,onError: postCustItemErrorHandler});

    useEffect(() => {
        if(custListsWrapper && custListsWrapper.data){
            setCustItemsData(custListsWrapper.data);
        }
    }, [custListsWrapper.data])

    function isCustListDataLoading(){
        return custListsWrapper & custListsWrapper.isLoading;
    }

    //
    const approveBtnTemplate=(rowData)=> {
        const status=rowData.admin_status
        return <div disabled={(status.toString().toLowerCase())==="approved"} className={`aprove-action`} data-itemid={rowData.id} onClick={postCustItemAproveHandler}>{labelAproved}</div>
    }

    const rejectBtnTemplate=(rowData)=> {
        return <div className={`reject-action`} data-itemid={rowData.id} onClick={postCustItemAproveHandler}>{labelPending}</div>
    }

    //refetch records from customer_items table on successful response
    function postCustItemSuccessHandler(data){
    
        console.log("response from the server")
        console.log(data);
        custListsWrapper.refetch();
    }

    //called on failure
    function postCustItemErrorHandler(){
        console.log("Error while posting customer item for aproval!");
    }

    const postCustItemAproveHandler=(e)=>{
        if(e.target.dataset && e.target.dataset.itemid){
            if(custListsWrapper.data){
                const custItemData = custListsWrapper.data.find(element => element.id == e.target.dataset.itemid);
                postCustItemMutation.mutate(custItemData);
                console.log('item data .... ',custItemData);
            }
        }
        
    }

    const emptyDataMsg="No records in customer items table!";

const emptyMsgElement=<div>{emptyDataMsg}</div>
const dataLoadingElement=<ProgressSpinner/>

const dataTable=<DataTable value={custItemsData} stripedRows  selectionMode="single" responsiveLayout="scroll"
paginator rows={5} first={first} onPage={(e) => setFirst(e.first)}
selection={custItemSelected} onSelectionChange={e => setCustItemSelected(e.value)} dataKey="id">
            <Column field="id" header="CustomerId" ></Column>
            <Column field="item_name" header="Item" ></Column>
            <Column field="category_name" header="Category" ></Column>
            <Column field="item_category" header="Item_category" ></Column>
            <Column field="description" header="Description"></Column>
            <Column field="condition" header="Condition"></Column>
            <Column field="brand" header="Brand" ></Column>
            <Column field="price" header="Price"></Column>
            <Column field="admin_status" header="Status"></Column>
            <Column field="seller_preference" header="Preference" ></Column>
            <Column field="baby_age" header="Age (in Months) "></Column>
            <Column field="rental_price" header="Rental Price" ></Column>
            <Column field="customer_email" header="Email"></Column>
            {/* <Column field="availability_status" header="Availability"></Column> */}
            <Column body={approveBtnTemplate}></Column>
            <Column body={rejectBtnTemplate}></Column>
        </DataTable>



// returns empty data msg if the data is not available!
function getDataTableComponent(){ 
       let contentComponent=emptyMsgElement;
       if(custListsWrapper.data && custListsWrapper.data.length>0){
        contentComponent=dataTable;
       }
       return contentComponent;
}

    return (
        <div className={`admin-root`}>
            <div className={`admin-datatable-view card`}>
            {custListsWrapper.isLoading?dataLoadingElement : getDataTableComponent()}
            </div>
        </div>
    )
}

export default Admin;
