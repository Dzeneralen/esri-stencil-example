import { AppMap } from "./app-map";
import { TestWindow } from "@stencil/core/dist/testing";

describe('app-map', () => {
    it('should build', () => {
        expect(new AppMap()).toBeTruthy();
    });

    let window: TestWindow;

    describe('rendering', () => {
        let element : Element;

        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [AppMap],
                html: '<app-map></app-map>'
            })
        });

        it('should render a div with app-map class', async () => {
            await window.flush();
            const actual = element.querySelector('div') as HTMLDivElement;
            expect(actual.className).toBe("app-map");
        })
    });
});