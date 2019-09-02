/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([],
  function () {
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     */
    function onRequest (context) {
      const assistant = serverWidget.createAssistant({ title: 'Assistant example' })

      const steps = {
        1: {
          step: assistant.addStep({
            id: 'step_one',
            label: 'Step 01'
          }),
          action: _buildStep01Page
        },
        2: {
          step: assistant.addStep({
            id: 'step_two',
            label: 'Step 02'
          }),
          action: _buildStep02Page
        },
        3: {
          step: assistant.addStep({
            id: 'step_three',
            label: 'Step 03'
          }),
          action: _buildStep03Page
        },
        finish: {
          action: _executeFinishAction
        },
        cancel: {
          action: _executeCancelAction
        }
      }

      const stepInfo = _setStep(context.request, assistant, steps)

      if (!stepInfo.toContinue) return

      context.response.writePage({
        pageObject: assistant
      })
    }

    /**
     * Build Step 01 page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildStep01Page (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Build Step 02 page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildStep02Page (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Build Step 03 page.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _buildStep03Page (serverRequest, assistant) {
      // Add elements into assistant object.
    }

    /**
     * Execute Finish action.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _executeFinishAction (serverRequest, assistant) {
      // Finish action.
    }

    /**
     * Execute Cancel action.
     *
     * @param serverRequest
     * @param assistant
     * @private
     */
    function _executeCancelAction (serverRequest, assistant) {
      // Cancel action.
    }

    /**
     * Set step.
     *
     * @param serverRequest
     * @param assistant
     * @param steps
     * @returns {object}
     * @private
     */
    function _setStep (serverRequest, assistant, steps) {
      const stepInfo = {
        toContinue: true
      }
      if (serverRequest.method === 'GET') {
        const firstStep = steps[1]
        firstStep.action(serverRequest, assistant)
        assistant.currentStep = firstStep.step
      } else { // POST
        const lastAction = assistant.getLastAction()
        if (lastAction === serverWidget.AssistantSubmitAction.FINISH) {
          steps.finish.action(serverRequest, assistant)
          stepInfo.toContinue = false
        } else if (lastAction === serverWidget.AssistantSubmitAction.CANCEL) {
          steps.cancel.action(serverRequest, assistant)
          stepInfo.toContinue = false
        } else {
          assistant.currentStep = assistant.getNextStep()
          steps[assistant.currentStep.stepNumber].action(serverRequest, assistant, data)
        }
      }
      return stepInfo
    }

    return {
      onRequest: onRequest
    }
  })
