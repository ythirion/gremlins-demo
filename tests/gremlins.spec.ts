import {Page, test} from '@playwright/test';

const url = 'https://petstore.swagger.io/';

test('run gremlins.js', async ({page}: { page: Page }) => {
    console.profile('gremlins');

    page.on('console', msg => {
        console.log(`[${msg.type()}]: ${msg.text()}`);
        if (msg.type() === 'error') {
            throw new Error(`Console error: ${msg.text()}`);
        }
    });

    await page.addInitScript({
        path: './node_modules/gremlins.js/dist/gremlins.min.js',
    });
    await page.goto(url);
    await page.evaluate(() => (window as any).gremlins
        .createHorde()
        .unleash()
    );
});