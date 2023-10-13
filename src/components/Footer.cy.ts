import Footer from './Footer.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import routes  from '@/router/routes'
it('test Footer', () => {
    const router = createRouter({
        routes: routes,
        history: createMemoryHistory(),
      })

    //   cy.wrap(router.push('/login'))
    cy.clearCookies() 
    cy.clearLocalStorage()
    cy.clearAllSessionStorage()
    cy.mount(Footer)
    
    cy.get('a').contains(
        'Emoti group task'
    );
})