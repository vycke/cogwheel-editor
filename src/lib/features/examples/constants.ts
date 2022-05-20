const dialog = `{
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

const auth = `{
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
      EXPIRED: 'expired',
			_entry: [
				() => send({ type: "EXPIRED", delay: 30000 })
			]
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

const form = `{
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

const cache = `{
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
      MODIFIED: 'invalid',
			_entry: [
				() => send({ type: "MODIFIED", delay: 30000 })
			]
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

const signout = `{
	init: "signing_in",
	states: {
		signed_in: {
			INACTIVE: "signing_out",
			ACTIVITY: "signed_in",
      _entry: [
				() => send({ type: 'INACTIVE', delay: 30000 })
			]
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

const cogwheelEditor = `{
	init: 'init',
	states: {
		init: {
			LOADED: 'valid',
			_entry: [initialize, auto('LOADED')]
		},
		valid: { 
			ADD_ELEMENT: 'addElement',
			TEXT_CHANGED: 'updateText',
			RESET: 'init'
		},
		addElement: {
			FINISHED: 'valid',
			_entry: [addElement, replaceText, url, auto('FINISHED')]
		},
		updateText: {
			VALIDATED: 'replaceConfig',
			INVALIDATED: 'invalid',
			_entry: [updateText, validate]
		},
		replaceConfig: {
			FINISHED: 'valid',
			_entry: [replaceConfig, url, auto('FINISHED')]
		},
		invalid: {
			TEXT_CHANGED: 'updateText',
			RESET: 'init'
		}
	}
}`;

const toast = `{
	init: 'invisible',
	states: {
		visible: {
			CLOSED: 'invisible',
			OPENED: 'visible',
			_entry: [
				(s, values) => assign({ ...s.context, ...values }),
				() => send({ type: 'CLOSED', delay: 6000 })
			]
		},
		invisible: { OPENED: 'visible' }
	}
}`;

const todo = `{
	init: "active",
	states: {
		active: {
			CHANGE: "editing",
			DELETE: "deleted",
		},
		editing: {
			CHANGE: "editing",
			SUBMIT: { target: "submitting", guard: (c) => c.touched },
			CANCEL: "active",
		},
		deleted: {
		},
		failed: {
			RETRY: "submitting",
		},
		submitting: {
			SUCCESS: "active",
			FAILED: "failed",
		},
	}
}`;

export const examples = [
	{
		title: 'dialog',
		default: true,
		description: 'manage the visibility of a dialog',
		config: dialog
	},
	{
		title: 'form',
		description: 'manage the validation state of a form + submission state',
		config: form
	},
	{
		title: 'auto signout',
		description: 'auto sign-out + reset trigger',
		config: signout
	},
	{
		title: 'authentication',
		description: 'manage the authentication state of a user',
		config: auth
	},
	{
		title: 'cache',
		description: 'automatic cache invalidation',
		config: cache
	},
	{
		title: 'toast',
		description: 'automatic closing of a toast + reset of a toast',
		config: toast
	},
	{
		title: 'cogwheel editor',
		description: 'the internal state machine used in the editor you see here',
		config: cogwheelEditor
	},
	{
		title: 'todo',
		description: 'states of a todo in a todo application',
		config: todo
	}
];
