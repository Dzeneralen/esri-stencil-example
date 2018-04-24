import { Component } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  render() {
    return (
      <div class='app-home'>

      <section class="card">
        <h2>Welcome</h2>
        <p>
          This is an example application built with <a href='https://stenciljs.com'>Stencil</a> App Starter
          using the <a href='https://developers.arcgis.com/javascript/'>ArcGIS API for JavaScript</a>. 
          Stencil is a web component compiler which lets you program in TypeScript and outputs vanilla web components.
        </p>
      </section>

        <stencil-route-link url='/map'>
          <button>
            Go to Map
          </button>
        </stencil-route-link>
      </div>
    );
  }
}
