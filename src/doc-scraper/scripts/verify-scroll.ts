import { PlaywrightCrawler, utils } from 'crawlee';

async function run() {
    const url = 'https://visaoimoveisindaiatuba.com.br/venda/residencial_comercial/indaiatuba/';
    const scrollIterations = 5;

    console.log(`Starting scraper verification for: ${url}`);
    console.log(`Scroll Iterations: ${scrollIterations}`);

    const crawler = new PlaywrightCrawler({
        headless: true, // Set to false to see the browser
        requestHandler: async ({ page, log }) => {
            log.info('Page loaded.');
            
            log.info(`Initial body height: ${await page.evaluate(() => document.body.scrollHeight)}`);
            
            // Find scrollable element
            const scrollableInfo = await page.evaluate(() => {
                const elements = Array.from(document.querySelectorAll('div, main, section, ul'));
                for (const el of elements) {
                    const style = window.getComputedStyle(el);
                    if (el.scrollHeight > el.clientHeight && (style.overflowY === 'auto' || style.overflowY === 'scroll')) {
                        return { 
                            tag: el.tagName, 
                            class: el.className, 
                            id: el.id,
                            scrollHeight: el.scrollHeight,
                            clientHeight: el.clientHeight
                        };
                    }
                }
                return null;
            });

            if (scrollableInfo) {
                log.info(`Found scrollable container: ${JSON.stringify(scrollableInfo)}`);
            } else {
                log.info('No explicit scrollable container found with overflow-y: auto/scroll.');
            }
            
            if (scrollableInfo && scrollableInfo.class) {
                const selector = `.${scrollableInfo.class.split(' ').join('.')}`;
                log.info(`Scrolling specific element: ${selector}`);
                
                for (let i = 0; i < scrollIterations; i++) {
                    // Scroll the element
                    await page.evaluate((sel) => {
                        const el = document.querySelector(sel);
                        if (el) el.scrollTo(0, el.scrollHeight);
                    }, selector);
                    
                    log.info(`Scrolled container. Waiting...`);
                    await page.waitForTimeout(5000); // Wait for load
                    
                    const items = await page.getByText('Cód.:').all();
                    log.info(`After scroll ${i+1}/${scrollIterations}: Found ${items.length} items.`);
                }
            } else {
                log.info('Fallback to window scroll (failed previously)');
            }

            const finalItems = await page.getByText('Cód.:').all();
            log.info(`Final count: ${finalItems.length} items found.`);
        },
    });

    await crawler.run([url]);
}

run().catch(console.error);
