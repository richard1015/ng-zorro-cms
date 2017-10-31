import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(success => {
    console.log(`bootstrap success!`)

    let body = document.querySelector('body');
    let preloader = document.querySelector('.preloader');
    body.style.overflow = 'hidden';
    function remove() {
      preloader.addEventListener('transitionend', function () {
        preloader.className = 'preloader-hidden';
      });
      preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
    }
    setTimeout(() => {
      remove();
      body.style.overflow = '';
    }, 100);
  })
  .catch(error => console.log(error));


