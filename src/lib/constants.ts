export const defaultStore: string = `{
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

export const authExample: string = `{
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

export const formExample: string = `{
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

export const cacheExample: string = `{
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