export const defaultStore = `{
	init: "visible",
	states: {
		visible: {
			TOGGLE: "invisible"
		},
		invisible: {
			TOGGLE:  "visible"
		}
	}
}`;

export const authExample = `{
  init: 'not_authenticated',
  states: {
    not_authenticated: {
			SIGNIN_STARTED: 'signing_in'
		},
    signing_in: {
			FINISHED: 'authenticated',
			FAILED: 'not_authenticated'
		},
    authenticated: {
      SIGNOUT_STARTED: 'signing_out',
      EXPIRED: 'expired'
    },
    expired: {
			REFRESH_STARTED: 'refreshing'
		},
    signing_out: {
			FINISHED: 'not_authenticated'
		},
    refreshing: {
			FINISHED: 'authenticated',
			FAILED: 'signing_out'
		}
  }
}`;

export const formExample = `{
  init: 'init',
  states: {
    init: {
			LOADED: 'ready'
		},
    ready: {
      CHANGED: 'touched'
    },
    touched: {
      CHANGED: 'touched',
      SUBMITTED: 'validating'
    },
    validating: {
      SUBMITTED: 'submitting',
      REJECTED: 'invalid'
    },
    invalid: {
      CHANGED: 'touched'
    },
    submitting: {
			FINISHED: 'ready'
		}
  }
}`;

export const cacheExample = `{
  init: 'idle',
  states: {
    idle: {
			STARTED: 'pending'
		},
    pending: {
			FINISHED: 'success',
			FAILED: 'error'
		},
    success: {
      STARTED: 'pending',
      MODIFIED: 'invalid'
    },
    invalid: {
			MODIFIED: 'invalid',
			STARTED: 'pending',
		},
    error: {
			STARTED: 'pending'
		}
  }
}`;

export const autoSignoutExample = `{
	init: "signing_in",
	states: {
		signed_in: {
			INACTIVE: "signing_out",
			ACTIVITY: "signed_in",
      _entry: [() => send({ type: 'INACTIVE', delay: 30000 })]
		},
		signing_in: {
      FINISHED: "signed_in",
      FAILED: "signing_out"
		},
		signing_out: {
			FINISHED: "signed_out"
		},
		signed_out: {},
	}
}`;

export const cogwheelEditorExample = `{
	init: 'init',
	states: {
		init: { LOADED: 'valid', _entry: [initialize, autoTransition('LOADED')] },
		valid: { ADD_ELEMENT: 'addElement', TEXT_CHANGED: 'updateText' },
		addElement: {
			FINISHED: 'valid',
			_entry: [addElement, replaceText, updateUrl, autoTransition('FINISHED')]
		},
		updateText: {
			VALIDATED: 'replaceConfig',
			INVALIDATED: 'invalid',
			_entry: [updateText, validate]
		},
		replaceConfig: {
			FINISHED: 'valid',
			_entry: [replaceConfig, updateUrl, autoTransition('FINISHED')]
		},
		invalid: { TEXT_CHANGED: 'updateText' }
	}
}`;

export const toastExample = `{
	init: 'invisible',
	states: {
		visible: {
			CLOSED: 'invisible',
			OPENED: 'visible',
			_entry: [
				(s, values) => assign({ ...s.context, ...values }),
				(s) => send({ type: 'CLOSED', payload: s.context, delay: 6000 })
			]
		},
		invisible: { OPENED: 'visible' }
	}
}`;
