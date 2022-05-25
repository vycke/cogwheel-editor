import { expect, it } from 'vitest';
import { highlighter } from '../highlighter';

it('highlighter', () => {
	expect(
		highlighter(`{
      init: "visible",
      states: {
        visible: {
          TOGGLE: "invisible"
        },
        invisible: {
          TOGGLE:  "visible"
        }
      }
    }`)
	).toBe(
		`<span class="token bracket">{</span>
      init: <span class="token string">"visible"</span>,
      states: <span class="token bracket">{</span>
        visible: <span class="token bracket">{</span>
          TOGGLE: <span class="token string">"invisible"</span>
        <span class="token bracket">}</span>,
        invisible: <span class="token bracket">{</span>
          TOGGLE:  <span class="token string">"visible"</span>
        <span class="token bracket">}</span>
      <span class="token bracket">}</span>
    <span class="token bracket">}</span>`
	);
});
