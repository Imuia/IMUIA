import os
import time
import subprocess
from playwright.sync_api import sync_playwright

def run_contact_verification():
    print("Starting targeted verification for Contact page...")
    os.makedirs("/home/jules/verification", exist_ok=True)

    print("Killing existing port 5173 processes...")
    subprocess.run("kill $(lsof -t -i :5173) 2>/dev/null || true", shell=True)

    print("Starting Vite server...")
    dev_process = subprocess.Popen(
        "npm run dev > contact_dev_server.log 2>&1 &",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    time.sleep(3) # Let Vite boot

    try:
        with sync_playwright() as p:
            print("Launching browser...")
            browser = p.chromium.launch(headless=True)
            page = browser.new_page(viewport={"width": 1280, "height": 800})

            # 1. Navigating to Home and scrolling to bottom
            print("Navigating to IMUIA Landing page...")
            page.goto("http://localhost:5173", timeout=15000)
            page.wait_for_timeout(1000)

            print("Scrolling to contact section at the bottom of landing page...")
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1500)

            # Screenshot of the Earth view and contact options
            screenshot_path = "/home/jules/verification/10_contact_section.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot written to {screenshot_path}")

            # Verify presence of Contact Page buttons
            print("Checking contact action buttons...")
            btn_invest = page.get_by_text("Investir dans un univers")
            assert btn_invest.count() > 0, "Button 'Investir dans un univers' not found!"

            # 2. Click "Investir dans un univers" and verify pre-fill
            print("Clicking 'Investir dans un univers' button...")
            btn_invest.click()
            page.wait_for_timeout(1500) # Wait for page switch and prefill

            # Verify we are on Partners page
            page_content = page.content()
            assert "Espace Partenaires" in page_content or "Partnership Center" in page_content, "Failed to redirect to Partners page!"

            # Verify form values prefilled
            partner_type_value = page.locator("select").first.evaluate("el => el.value")
            print(f"Prefilled Partner Type value: {partner_type_value}")
            assert partner_type_value == "Investor", f"Partner Type should be prefilled to 'Investor', got '{partner_type_value}'"

            budget_value = page.get_by_placeholder("Ex: 50000").evaluate("el => el.value")
            print(f"Prefilled Budget value: {budget_value}")
            assert budget_value == "100000", f"Budget should be prefilled to '100000', got '{budget_value}'"

            proposal_text = page.locator("textarea").evaluate("el => el.value")
            print(f"Prefilled Proposal excerpt: {proposal_text[:60]}...")
            assert "invest" in proposal_text.lower() or "opportunités" in proposal_text.lower(), "Proposal textarea not prefilled correctly!"

            # Take screenshot of prefilled form
            prefill_screenshot = "/home/jules/verification/11_prefilled_partners_form.png"
            page.screenshot(path=prefill_screenshot)
            print(f"Prefilled form screenshot written to {prefill_screenshot}")

            print("Targeted contact & prefill verification completed successfully.")
            browser.close()

    finally:
        print("Cleaning up Vite server...")
        subprocess.run("kill $(lsof -t -i :5173) 2>/dev/null || true", shell=True)
        dev_process.terminate()

if __name__ == "__main__":
    run_contact_verification()
