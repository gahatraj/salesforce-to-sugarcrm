const express = require('express');
const app = express();
app.use(express.json());
const axios = require('axios');
const { json } = require('express');

async function salesForceToSugarCRM() {
  try {
    const response = await axios.get(
      'API URL for SalesForce Module'
      , { headers: { 
            'Authorization': 'Authorization Key'
        } }
    );

    let responseData = response.data;
   
    //map Salesforce datapoints to SugarCRM datapoints
    let postDataPrep = responseData.map( d => ({
            units_being_installed_by__c     : d.of_Units_Being_Installed_by_InSight__c ,
            additional_notes_c              : d.Additional_Notes__c,
            confirmed_install_date_time_c   : d.Confirmed_Install_Date_Time__c,
            date_followed_up_with_custom_c  : d.Date_Followed_Up_With_Customer__c,
            follow_up_with_customer_c       : d.Follow_Up_with_Customer__c,
            install_complete_c              : d.Install_Complete__c,
            install_notes_c                 : d.Install_Notes__c,
            install_satisfaction_rating_c   : d.Install_Satisfaction_Rating__c,
            installation_date_c             : d.Installation_Date__c,
            name                            : d.Name, 
            installation_scheduled_c        : d.Installation_Scheduled__c,
            installer_phone_c               : d.Installer_Phone__c,
            lag_closed_to_ship_c            : d.Lag_Closed_to_Ship__c,
            satisfaction_rating_notes_c     : d.Satisfaction_Rating_Notes__c,
            sent_to_installer_c             : d.Sent_to_Installer__c,
            service_start_date_c            : d.Service_Start_Date__c,
            shipped_date_c                  : d.Shipped_Date__c
        })
    )

    const postData = async() =>{
        for await (pd of postDataPrep){
            let data = JSON.stringify(pd)
            axios.post(
                'API URL for SugarCRM Module'
                , data
                ,{ headers: { 
                    'Authorization': 'Authorization Key',
                    'Content-Type': 'application/json'
                } }
            )
        .then((response) =>{
            console.log('sending data...')
        })
        .catch((error) =>{
            console.log(`error while sending data: ${error} `)
        })
      }
    }

    //send data to sugar
    postData()
    } catch (error) {
        console.error(error);
    }
}

//Call ETL Process
salesForceToSugarCRM()
