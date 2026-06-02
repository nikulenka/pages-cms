from playwright.sync_api import sync_playwright
import sys

def capture_full(url, output_path, viewport_width=1920, viewport_height=1080):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': viewport_width, 'height': viewport_height})
        page.goto(url, wait_until='networkidle', timeout=60000)
        page.wait_for_timeout(3000)
        page.screenshot(path=output_path, full_page=True)
        browser.close()
        print(f"Saved full-page: {output_path}")

if __name__ == "__main__":
    url = sys.argv[1]
    output = sys.argv[2]
    w = int(sys.argv[3]) if len(sys.argv) > 3 else 1920
    h = int(sys.argv[4]) if len(sys.argv) > 4 else 1080
    capture_full(url, output, w, h)
