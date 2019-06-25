import "@stencil/router";
import { Component, h } from "@stencil/core";

@Component({
  tag: "my-app",
  styleUrl: "my-app.scss"
})
export class MyApp {
  render() {
    return (
      <div class="my-app">
        <header>
          <stencil-route-link url="/">
            <h1>Stencil with ArcGIS example</h1>
          </stencil-route-link>
        </header>

        <main style={{ height: "100%" }}>
          <stencil-router style={{ height: "100%" }}>
            <stencil-route url="/" component="app-home" exact={true} />
            <stencil-route url="/map/:objectid?" component="app-map" />
          </stencil-router>
        </main>

        <footer>Footer</footer>
      </div>
    );
  }
}
