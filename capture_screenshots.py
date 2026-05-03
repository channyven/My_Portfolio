import subprocess
import json
from pathlib import Path

# Define the projects to capture
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
        "name": "komrong-booking.jpg",
        "url": "https://vc-1-trip-booking.vercel.app",
        "description": "Komrong Trip Booking"
    },
    {
        "name": "inventory-system.jpg",
        "url": "https://inventory-eight-psi.vercel.app",
        "description": "Inventory System"
    },
    {
        "name": "figma-designs.jpg",
        "url": "https://figma.com",
        "description": "Figma Designs"
    },
    {
        "name": "portfolio-website.jpg",
        "url": "http://127.0.0.1:5500/index.html",
        "description": "Portfolio Website"
    }
]

output_dir = Path("imags")
output_dir.mkdir(exist_ok=True)

try:
    from playwright.sync_api import sync_playwright
    
    with sync_playwright() as p:
        browser = p.chromium.launch()
        
        for project in projects:
            try:
                page = browser.new_page(viewport={"width": 1024, "height": 768})
                print(f"Capturing: {project['description']}...")
                
                page.goto(project['url'], wait_until='networkidle', timeout=15000)
                page.wait_for_timeout(2000)
                
                output_path = output_dir / project['name']
                page.screenshot(path=str(output_path), full_page=False)
                
                print(f"✓ Saved: {project['name']}")
                page.close()
                
            except Exception as e:
                print(f"✗ Failed to capture {project['description']}: {str(e)}")
        
        browser.close()
        
except ImportError:
    print("Installing Playwright...")
    subprocess.run(["pip", "install", "playwright", "-q"])
    subprocess.run(["playwright", "install"])
    print("Please run this script again.")
except Exception as e:
    print(f"Error: {e}")
