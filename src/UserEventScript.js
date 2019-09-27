/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/runtime', 'N/error'],
  function (runtime, error) {
	    /**
	     * Function definition to be triggered before record is loaded.
	     *
	     * @param {Object} scriptContext
	     * @param {Record} scriptContext.newRecord - New record
	     * @param {string} scriptContext.type - Trigger type
	     * @param {Form} scriptContext.form - Current form
	     * @Since 2015.2
	     */
	    function beforeLoad (scriptContext) {
      //    	if (scriptContext.type === scriptContext.UserEventType.XEDIT) {
      //
      //    	} else if (scriptContext.type === scriptContext.UserEventType.CREATE) {
      //
      //    	}

	    	if (runtime.executionContext === runtime.ContextType.USER_INTERFACE) {
	    		scriptContext.form.addButton({
	    			label: 'Botao',
	    			id: 'custpage_botao',
	    			functionName: 'teste' // This function must be in the Client script!
	    		})
	    	}
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
	    function beforeSubmit (scriptContext) {
	    	// Throw errors before submit into database.
	    	throw error.create({
	    		name: 'MY_CODE',
	    	    message: 'my error details',
	    	    notifyOff: false
	    	})
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
	    function afterSubmit (scriptContext) {
	    	// Create some children records.
	    	var childRecord = record.create({
	    	    type: 'customrecord_feature'
	    	})

	    	childRecord.setValue({ fieldId: 'custrecord_parent', value: scriptContext.newRecord.id })

	    	childRecord.save()
	    }

	    return {
	        beforeLoad: beforeLoad,
	        beforeSubmit: beforeSubmit,
	        afterSubmit: afterSubmit
	    }
  })
