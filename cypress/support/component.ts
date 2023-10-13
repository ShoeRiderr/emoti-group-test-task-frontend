import './commands'
import '@/assets/main.css'
import { Router } from 'vue-router'
import { mount } from 'cypress/vue'

import { Store } from 'pinia'

type MountParams = Parameters<typeof mount>
type OptionsParam = MountParams[1] & { store?: Store } & { router?: Router }

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: any,
        options?: OptionsParam 
      ): Chainable<any>
    }
  }
}

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(MyComponent)