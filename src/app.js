import { inject } from 'aurelia-framework';
import { WebAPI } from 'api/web-api';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactCreated } from './messages';

@inject(WebAPI, EventAggregator)
export class App {
  constructor(api, ea) {
    this.api = api;
    this.ea = ea;

    ea.subscribe(ContactCreated, msg => {
      this.router.navigate(this.router.generate('contacts', { id: msg.contact.id }));
    });
  }

  configureRouter(config, router) {
    config.title = 'Contacts';
    // config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: '', moduleId: 'no-selection', title: 'Select' },
      { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' },
      { route: 'new', moduleId: 'contact-detail', name: 'new' }
    ]);

    this.router = router;
  }
}
