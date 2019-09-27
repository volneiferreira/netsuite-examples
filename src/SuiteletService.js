/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/search'],
  function (search) {
	    /**
	     * Definition of the Suitelet script trigger point.
	     *
	     * @param {Object} context
	     * @param {ServerRequest} context.request - Encapsulation of the incoming request
	     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	     * @Since 2015.2
	     */
	    function onRequest (context) {
	    	const salesOrders = search.create({
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
      //	    		.each(function (result) { // 4000 results!
      //	    			// Do something...
      //	    			return true;
      //	    		})
	    		.getRange({
	    			start: 0,
	    			end: 1000
	    		})
	    		.map(function (result) {
	    			return {
	    				id: result.id,
	    				tranid: result.getValue(result.columns[0])
	    			}
	    		})

	    	context.response.write({
	    		output: JSON.stringify(salesOrders)
	    	})
	    }

	    return {
	        onRequest: onRequest
	    }
  })
