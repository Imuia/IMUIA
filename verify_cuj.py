import os
import time
import subprocess
from playwright.sync_api import sync_playwright

def run_verification():
    print("Creating verification directories...")
    os.makedirs("/home/jules/verification", exist_ok=True)

    print("Killing any existing processes on port 5173...")
    subprocess.run("kill $(lsof -t -i :5173) 2>/dev/null || true", shell=True)

    print("Starting local Vite development server...")
    dev_process = subprocess.Popen(
        "npm run dev > dev_server.log 2>&1 &",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(3) # Wait for server to load

    try:
        with sync_playwright() as p:
            print("Launching headless Chromium...")
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1280, "height": 800})
            page = context.new_page()

            print("Navigating to IMUIA Landing Page...")
            page.goto("http://localhost:5173", timeout=15000)
            page.wait_for_timeout(1500)
            page.screenshot(path="/home/jules/verification/01_landing_page.png")
            print("Screenshot 01 written.")

            # Scroll down to verify the Contact Earth Section on Home
            print("Scrolling to Contact Earth Section on Landing...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/01_landing_contact_earth.png")
            print("Screenshot 01_landing_contact_earth written.")

            # Click Explorer notre univers (navigates to Map/Galaxy)
            print("Navigating to Galaxy Map...")
            page.get_by_text("L'univers IMUIA").first.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/02_galaxy_map.png")
            print("Screenshot 02 written.")

            # Navigate to Platforms
            print("Navigating to Platforms Registry...")
            page.get_by_text("Nos plateformes").first.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/03_platforms.png")
            print("Screenshot 03 written.")

            # Navigate to IMUIA Labs
            print("Navigating to IMUIA Labs...")
            page.get_by_text("IMUIA Labs").first.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/04_labs_locked.png")
            print("Screenshot 04 written.")

            # Unlock incubator with credentials
            print("Unlocking Incubation chamber with key 'IMUIALAB'...")
            page.get_by_placeholder("Ex: IMUIALAB").fill("IMUIALAB")
            page.get_by_text("Déverrouiller les Concepts").click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/05_labs_unlocked.png")
            print("Screenshot 05 written.")

            # Navigate to Vision / Method
            print("Navigating to Vision & Method Space Path...")
            page.get_by_text("Notre vision").first.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/06_vision_method.png")
            print("Screenshot 06 written.")

            # Navigate to Contact Page directly
            print("Navigating to standalone Contact Page...")
            page.get_by_text("Contact").first.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/07_contact_page.png")
            print("Screenshot 07_contact_page written.")

            # Click on 'Investir dans un univers' to test prefilling
            print("Clicking 'Investir dans un univers'...")
            page.get_by_text("Investir dans un univers").click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/08_partners_prefilled.png")
            print("Screenshot 08_partners_prefilled written.")

            # Navigate to Espace Client Space & Login
            print("Navigating to secure Client Space...")
            page.get_by_text("Espace Client").first.click()
            page.wait_for_timeout(1000)
            # Login
            page.get_by_placeholder("partner@imuia.com").fill("partner@imuia.com")
            page.get_by_placeholder("••••••••").fill("password")
            page.get_by_role("button", name="S'amarrer à la station").click()
            page.wait_for_timeout(1500)
            page.screenshot(path="/home/jules/verification/09_client_space_dashboard.png")
            print("Screenshot 09 written.")

            # Click on Messages tab in Client Space
            print("Testing crew messages tab...")
            page.get_by_text("Échanges Équipage").click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/10_client_crew_chat.png")
            print("Screenshot 10 written.")

            # Navigate to CRM Cockpit
            print("Navigating to Central CRM Cockpit Dashboard...")
            page.get_by_text("Cockpit CRM").first.click()
            page.wait_for_timeout(1000)
            page.screenshot(path="/home/jules/verification/11_crm_cockpit.png")
            print("Screenshot 11 written.")

            # Close browser
            browser.close()
            print("All verification steps completed successfully.")

    finally:
        print("Cleaning up background process...")
        subprocess.run("kill $(lsof -t -i :5173) 2>/dev/null || true", shell=True)
        dev_process.terminate()

if __name__ == "__main__":
    run_verification()
