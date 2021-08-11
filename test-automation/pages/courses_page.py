import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common import scroll_to_element

import logger


def search_course(driver, course_code):
    try:
        search_bar = driver.find_element_by_id("input-search-courses")
        search_bar.send_keys(course_code)
        logger.write_log(f"Entered {course_code} to courses search bar")
    except Exception:
        logger.report_issue(f"Unable to enter {course_code} to course search bar")


def add_course_by_index(driver, index):
    try:
        add_btn = WebDriverWait(driver, 30).until(
            EC.presence_of_element_located((By.XPATH, f"//*[contains(@id,'btn-add-course-{index}')]"))
        )
        add_btn.click()
        logger.write_log(f"Clicked on course with index ${index}")
    except Exception:
        logger.report_issue(f"Unable to click on course with index {index}")


def verify_course_added(driver, course_code):
    try:
        for i in range(12):
            course_input = driver.find_element_by_id(f"input-sel-{i}")
            if course_input.get_attribute("value") == course_code:
                logger.write_log(f"Verified {course_code} added")
                return
        logger.report_issue(f"{course_code} not added")
    except Exception:
        logger.report_issue(f"Unable to verify {course_code} added")


def click_generate_plan_btn(driver):
    try:
        generate_btn = driver.find_element_by_id("btn-generate-plans")
        scroll_to_element(driver, generate_btn)
        generate_btn.click()
        logger.write_log("Clicked on generate plan button")
    except Exception:
        logger.report_issue("Unable to click generate plan button")

