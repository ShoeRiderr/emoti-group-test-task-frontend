import RegisterView from './RegisterView.vue'
import '@/assets/main.css'

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RegisterView)
  })