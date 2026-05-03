import asyncio
from pathlib import Path

async def capture_screenshots():
    try:
        from playwright.async_api import async_playwright
    except ImportError:
        print("Playwright not found. Installing...")
        import subprocess
        subprocess.run(["pip", "install", "playwright", "-q"])
        from playwright.async_api import async_playwright
    
    projects = [
        {
            "name": "restaurant.jpg",
            "url": "https://restaurant-website-channy.vercel.app",
            "description": "Restaurant Website"
        },
        {
            "name": "pnc-school.jpg",
            "url": "https://pnc-website-two.vercel.app",
            "description": "PNC School Website"
        },
        {
            "name": "portfolio-website.jpg",
            "url": "http://127.0.0.1:5500/index.html",
            "description": "Portfolio Website"
        }
    ]
    
    output_dir = Path("imags")
    output_dir.mkdir(exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        for project in projects:
            try:
                print(f"Capturing: {project['description']}...")
                context = await browser.new_context(viewport={"width": 1200, "height": 800})
                page = await context.new_page()
                
                await page.goto(project['url'], wait_until='networkidle', timeout=30000)
                await page.wait_for_timeout(2000)
                
                output_path = output_dir / project['name']
                await page.screenshot(path=str(output_path), full_page=False)
                
                print(f"✓ Saved: {project['name']}")
                await context.close()
                
            except Exception as e:
                print(f"✗ Failed to capture {project['description']}: {str(e)}")
        
        await browser.close()
        print("\nScreenshots captured successfully!")

if __name__ == "__main__":
    asyncio.run(capture_screenshots())
