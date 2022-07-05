import './fsm.mjs'
import { createComponentWithXStateService, html, getXStateService } from '../util/component.mjs'

createComponentWithXStateService('mock-state-chart', getXStateService('mock.state.chart'), {
  onChange () {
    this.fsm.send('TOGGLE')
  },
  render () {
    let input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}">`
    if (this.fsm.state.matches('active')) {
      input = html`<input type="checkbox" id="horns" name="horns" onchange="${this.onChange}" checked>`
    }
    return html`
      ${input}
      <label for="horns">Horns</label>
    `
  }
})

createComponentWithXStateService('mock-state-chart-view', getXStateService('mock.state.chart'), {
  render () {
    return html`<p>Current state: ${this.fsm.state.value}</p>`
  }
})
