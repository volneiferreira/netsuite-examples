/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/runtime'],
  function () {
	    /**
	     * Definition of the Scheduled script trigger point.
	     *
	     * @param {Object} scriptContext
	     * @param {string} scriptContext.type - The context in which the script is executed. It is one of the values from the scriptContext.InvocationType enum.
	     * @Since 2015.2
	     */
	    function execute (scriptContext) {
	    	const script = runtime.getCurrentScript()

				search.create({
	    		type: search.Type.SALES_ORDER,
	    		filters: [{
	    			name: 'mainline',
	    			operator: search.Operator.IS,
	    			values: true
	    		}],
	    		columns: [{
	    			name: 'tranid'
	    		}]
	    	})
	    		.run()
	    		.getRange({
	    			start: 0,
	    			end: 1000
	    		})
	    		.forEach(function (result, resultIndex, resultArray) {
	    			script.percentComplete = (resultIndex * 100) / resultArray.length

	    			log.debug({
							title: 'New Sales Orders',
								details: 'Record creation progress: ' + script.percentComplete + '%'
						})

	    			// Do something - some logic!

	    			const remainingUsage = script.getRemainingUsage()

	    			if (remainingUsage < 50) {
	    				// Do something to don't throw the Limite Usage Error!
	    			}
	    		})
	    }

	    return {
	        execute: execute
	    }
  })
