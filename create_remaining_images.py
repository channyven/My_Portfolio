from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

# Create imags directory if it doesn't exist
output_dir = Path("imags")
output_dir.mkdir(exist_ok=True)

# Projects that couldn't be captured (not accessible)
projects = [
    {
        "name": "komrong-booking.jpg",
        "title": "Komrong Trip Booking",
        "color": "#2E7D32"
    },
    {
        "name": "inventory-system.jpg",
        "title": "Inventory System",
        "color": "#6A1B9A"
    },
    {
        "name": "figma-designs.jpg",
        "title": "Mobile App UI Designs",
        "color": "#1565C0"
    }
]

for project in projects:
    try:
        # Create image with project color
        img = Image.new('RGB', (1200, 800), project['color'])
        draw = ImageDraw.Draw(img)
        
        # Add text
        text = project['title']
        bbox = draw.textbbox((0, 0), text)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (1200 - text_width) // 2
        y = (800 - text_height) // 2
        
        draw.text((x, y), text, fill='white', font=None)
        
        # Save image
        output_path = output_dir / project['name']
        img.save(output_path, 'JPEG', quality=90)
        print(f"✓ Created: {project['name']}")
        
    except Exception as e:
        print(f"✗ Failed to create {project['name']}: {e}")

print("\nAll remaining images created successfully!")
