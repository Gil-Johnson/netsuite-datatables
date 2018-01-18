/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/email', 'N/file', 'N/record', 'N/render'],
/**
 * @param {email} email
 * @param {file} file
 * @param {record} record
 * @param {render} render
 */
function(email, file, record, render) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
    function beforeLoad(scriptContext) {
    	
    	var memberRec = scriptContext.newRecord;
    	
    	var memberId = memberRec.getValue({
 		    fieldId: 'custentitymember_ck'
 		});
    	
    	var ds = {memberid: memberId}; 
    	
    	var claimTempFile = file.load({
    		id: 168257
    	});
    	    	
    	var pageRenderer = render.create();
    	pageRenderer.templateContent = claimTempFile.getContents();
    	
    	pageRenderer.addCustomDataSource({
	    format: render.DataSource.OBJECT,
	    alias: "ds",
	    data: ds
	    });
    	
    	var renderedPage = pageRenderer.renderAsString();
    	
    	
    	memberRec.setValue({
    	    fieldId: 'custentity_inline_claim_data',
    	    value: renderedPage,
    	    ignoreFieldChange: true
    	});
    	
    	

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(scriptContext) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(scriptContext) {

    }

    return {
        beforeLoad: beforeLoad,
   //     beforeSubmit: beforeSubmit,
   //     afterSubmit: afterSubmit
    };
    
});
