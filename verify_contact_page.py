import time
import subprocess
from playwright.sync_api import sync_playwright

def main():
    print("Running verify_contact_page.py...")
    subprocess.run(["pkill", "-f", "vite"], stderr=subprocess.DEVNULL)

    server = subprocess.Popen(["npm", "run", "dev"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(3)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto("http://localhost:5173", wait_until="networkidle")

            # Scroll down to Earth Contact section
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(1)

            page.screenshot(path="/tmp/contact_section.png")
            print("Contact page screenshot captured successfully.")
            browser.close()
    finally:
        server.terminate()

if __name__ == "__main__":
    main()
