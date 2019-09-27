/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/search'],
  function (search) {
	    /**
	     * Function called upon sending a GET request to the RESTlet.
	     *
	     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
	     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	     * @since 2015.1
	     */
	    function doGet (requestParams) {
	    	return search.create({
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
	    		.map(function (result) {
	    			return {
	    				id: result.id,
	    				tranid: result.getValue(result.columns[0])
	    			}
	    		})
	    }

	    /**
	     * Function called upon sending a PUT request to the RESTlet.
	     *
	     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
	     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
	     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	     * @since 2015.2
	     */
	    function doPut (requestBody) {

	    }

	    /**
	     * Function called upon sending a POST request to the RESTlet.
	     *
	     * @param {string | Object} requestBody - The HTTP request body; request body will be passed into function as a string when request Content-Type is 'text/plain'
	     * or parsed into an Object when request Content-Type is 'application/json' (in which case the body must be a valid JSON)
	     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	     * @since 2015.2
	     */
	    function doPost (requestBody) {

	    }

	    /**
	     * Function called upon sending a DELETE request to the RESTlet.
	     *
	     * @param {Object} requestParams - Parameters from HTTP request URL; parameters will be passed into function as an Object (for all supported content types)
	     * @returns {string | Object} HTTP response body; return string when request Content-Type is 'text/plain'; return Object when request Content-Type is 'application/json'
	     * @since 2015.2
	     */
	    function doDelete (requestParams) {

	    }

	    return {
	        get: doGet,
	        put: doPut,
	        post: doPost,
	        delete: doDelete
	    }
  })
