import React from 'react'
import { useQuery, useMutation } from 'react-query';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import './style.css';
import getCustomerItems from '../../services/ServiceAdmin';
import { postCustItem, postRejectCustItem } from '../../services/ServiceAdmin';
import { ProgressSpinner } from 'primereact/progressspinner';

import { InputText } from 'primereact/inputtext';

function Admin() {

    const labelPending="Reject";
    const labelAproved="Approve";

    const [first, setFirst] = useState(0);
    const [custItemSelected, setCustItemSelected] = useState({});
    const [custItemsData, setCustItemsData]=useState([]);
    const custListsWrapper =useQuery(['customerLists'],getCustomerItems, { refetchOnWindowFocus: false });
    const postCustItemMutation = useMutation(postCustItem, {onSuccess: postCustItemSuccessHandler,onError: postCustItemErrorHandler});

    const postRejectCustItemMutation = useMutation(postRejectCustItem , {onSuccess: postRejectCustItemSuccessHandler,onError: postRejectCustItemErrorHandler});

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
       // return <div disabled={(status.toString().toLowerCase())==="approved"} className={`aprove-action`} 
       //data-itemid={rowData.id} onClick={postCustItemAproveHandler}>{labelAproved}</div>
       return <Button label={labelAproved} className="p-button-primary aprove-action" 
       disabled={(status.toString().toLowerCase())==="approved" || (status.toString().toLowerCase())==="rejected"} 
       onClick={postCustItemAproveHandler} data-itemid={rowData.id} 
       />
    }

    const rejectBtnTemplate=(rowData)=> {
        const status=rowData.admin_status;
        return <Button label={labelPending} className="p-button-warning reject-action" 
        disabled={(status.toString().toLowerCase())==="rejected" || (status.toString().toLowerCase())==="approved"} data-itemid={rowData.id} 
         onClick={postRejectCustItemAproveHandler}
        />
    }

    //refetch records from customer_items table on successful response
    function postCustItemSuccessHandler(data){
    
        console.log("response from the server")
        console.log(data);
        custListsWrapper.refetch();
    }

    function postRejectCustItemSuccessHandler(data){
    
        console.log("response from the server")
        console.log(data);
        custListsWrapper.refetch();
    }

    //called on failure
    function postCustItemErrorHandler(){
        console.log("Error while posting customer item for aproval!");
    }

    function postRejectCustItemErrorHandler(){
        console.log("Error while posting customer item for rejection!");
    }

    const postCustItemAproveHandler=(e)=>{
        if(e.currentTarget.dataset && e.currentTarget.dataset.itemid){
            if(custListsWrapper.data){
                const custItemData = custListsWrapper.data.find(element => element.id == e.currentTarget.dataset.itemid);
               postCustItemMutation.mutate(custItemData);
                //console.log('item data .... ',custItemData);
                // console.log("post data");
                // console.log(custItemData);
            }
        }
        
    }

    const postRejectCustItemAproveHandler=(e)=>{
        if(e.currentTarget.dataset && e.currentTarget.dataset.itemid){
            if(custListsWrapper.data){
                const custItemData = custListsWrapper.data.find(element => element.id == e.currentTarget.dataset.itemid);
               postRejectCustItemMutation.mutate(custItemData);
                //console.log('item data .... ',custItemData);
                // console.log("post data");
                // console.log(custItemData);
            }
        }
        
    }

    const emptyDataMsg="No records in customer items table!";

const emptyMsgElement=<div>{emptyDataMsg}</div>
const dataLoadingElement=<ProgressSpinner/>


const [location, setLocation]=useState();
function getBodyTemplate(options) {
return <InputText value={location} onChange={(e) => setLocation(e.target.value)} />
}

const inputTextEditor = (props) => {
return <div>
<InputText placeholder="zip code" type="text" value={props.rowData[props.field]} onChange={(e) => onEditorValueChange(props, e.target.value)} />;
</div>
     
}


const onEditorValueChange = (props, value) => {
   
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    setCustItemsData(updatedProducts);
}

const getNameTemplate=(rowData)=> {
    return <span>{`${rowData.first_name} ${rowData.last_name}`}</span>
}

const dataTable=<DataTable value={custItemsData} stripedRows  selectionMode="single" responsiveLayout="scroll"
paginator rows={10} first={first} onPage={(e) => setFirst(e.first)}
selection={custItemSelected} onSelectionChange={e => setCustItemSelected(e.value)} dataKey="id" editMode='cell'>
        <Column field="id" header="CustomerId" ></Column>
            <Column header="Name" body={getNameTemplate} ></Column>
            <Column field="item_name" header="Item" ></Column>
            <Column field="category_name" header="Category" ></Column>
            {/* <Column field="item_category" header="Item_category" ></Column> */}
            <Column field="description" header="Description"></Column>
            <Column field="condition" header="Condition"></Column>
            <Column field="brand" header="Brand" ></Column>
            <Column field="price" header="Price"></Column>
            <Column field="admin_status" header="Status"></Column>
            <Column field="seller_preference" header="Preference" ></Column>
            <Column field="baby_age" header="Age (in Months) "></Column>
            <Column field="rental_price" header="Rental Price" ></Column>
            <Column field="customer_email" header="Email"></Column>
            {/* <Column field="availability_status" header="Availability"></Column>  */}
            <Column field="store_location" header="Location" editor={inputTextEditor} ></Column>
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
