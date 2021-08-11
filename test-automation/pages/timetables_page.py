from selenium.common.exceptions import NoAlertPresentException

import logger, time
from common import scroll_page, scroll_to_element
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def next_timetable(driver):
    try:
        next_btn = driver.find_element_by_id("btn-increase-plan")
        scroll_page(driver, 0, -300)
        next_btn.click()
        logger.write_log("Clicked next timetable plan button")
    except Exception:
        logger.report_issue("Unable to click next timetable plan button")


def prev_timetable(driver):
    try:
        prev_btn = driver.find_element_by_id("btn-decrease-plan")
        scroll_page(driver, 0, -300)
        prev_btn.click()
        logger.write_log("Clicked prev timetable plan button")
    except Exception:
        logger.report_issue("Unable to click prev timetable plan button")


def save_timetable_course_overview(driver, plan):
    try:
        save_dropdown = driver.find_element_by_id("course-overview-save-plan")
        scroll_to_element(driver, save_dropdown)
        Select(save_dropdown).select_by_value(str(plan-1))
        logger.write_log(f"Clicked on save to plan {plan}")
    except Exception:
        logger.report_issue(f"Unable to save timetable to plan {plan}")


def verify_timetable_saved(driver, plan):
    try:
        if WebDriverWait(driver, 10).until(EC.alert_is_present()):
            alert = driver.switch_to.alert
            if alert.text == f"Saved to Plan {plan}!":
                alert.accept()
                logger.write_log(f"Verified timetable saved to Plan {plan}")
            else:
                logger.report_issue(f"Wrong saved message.\n"
                                    f"Expected: Saved to Plan {plan}!\n"
                                    f"Actual: {alert.text}")
        else:
            logger.report_issue("Unable to find alert for saving timetable")
    except Exception:
        logger.report_issue(f"Unable to verify timetable saved to plan {plan}")


def verify_timetable_not_saved(driver):
    try:
        driver.switch_to.alert
        logger.report_issue("Expected no plan saved alert but there is")
    except NoAlertPresentException:
        logger.write_log("Verified timetable is not saved")
    except Exception:
        logger.report_issue("Unable to verify timetable is not saved")