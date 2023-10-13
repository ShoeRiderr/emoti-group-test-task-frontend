import RegisterView from './RegisterView.vue'
import { createPinia } from 'pinia'

describe('Register View', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RegisterView);
  })
})