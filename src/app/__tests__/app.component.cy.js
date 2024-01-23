import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {AppModule} from "../app.module";
import {FirstComponent} from "../first/first.component";
import {FirstModule} from "../first/first.module";

describe('routing from component test', () => {
  it('should pass (manual change detection after waiting the subject update works)', () => {
    cy.mount(AppComponent, {imports: [AppModule]}).as('mount')
      .then(mr => mr.fixture.componentRef.injector.get(Router).navigate(['first']))
      .then(() => cy.wait(1500))
      .then(() => cy.get('@mount').then(mr => mr.fixture.detectChanges()))
      .then(() => cy.get(':contains(other title)'))
  });

  it('should fail (reactive updates after routing do not work without manual change detection)', () => {
    cy.mount(AppComponent, {imports: [AppModule]}).as('mount')
      .then(mr => mr.fixture.componentRef.injector.get(Router).navigate(['first']))
      .then(() => cy.get(':contains(other title)', {timeout: 5000}))
  });

  it('should pass (reactive updates work when the component is mounted and not used with routing)', () => {
    cy.mount(FirstComponent, {imports: [FirstModule]})
      .then(() => cy.get(':contains(Hello cy)'))
      .then(() => cy.get(':contains(other title)', {timeout: 5000}))
  })
})
