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


def toggle_overviews_tab(driver, overview):
    """
    :param overview: one of 'choose-plan', 'edit-plan', or 'save-plan'
    """
    try:
        id = "toggle-course-overview-tab-" + overview
        tab = driver.find_element_by_id(id)
        scroll_to_element(driver, tab)
        tab.click()
        logger.write_log(f"Click on overview tab {overview}")
    except Exception:
        logger.report_issue(f"Unable to click on overview tab {overview}")


def edit_index(driver, row_number, new_index):
    """
    :param row_number: starts from 1
    """
    try:
        index_dropdown = driver.find_element_by_id(f"index-edit-select-index-{row_number}")
        scroll_to_element(driver, index_dropdown)
        Select(index_dropdown).select_by_value(new_index)
        logger.write_log(f"Changed index to {new_index} (row {row_number})")
    except Exception:
        logger.report_issue(f"Unable to change index to {new_index} (row {row_number})")


def save_timetable_index_edit_overview(driver, plan):
    try:
        save_dropdown = driver.find_element_by_id("index-edit-overview-save-plan")
        scroll_to_element(driver, save_dropdown)
        Select(save_dropdown).select_by_value(str(plan-1))
        logger.write_log(f"Clicked on save to plan {plan}")
    except Exception:
        logger.report_issue(f"Unable to save timetable to plan {plan}")


def verify_vacancies_and_waitlist(driver, row_number, available):
    """
    :param row_number: starts from 1
    """
    try:
        index = driver.find_element_by_id(f"plan-details-index-{row_number}")
        scroll_to_element(driver, index)
        if available:
            if "NA/NA" not in index.text:
                logger.write_log(f"Verified vacancies and waitlist are available (row {row_number})")
            else:
                logger.report_issue(f"Expected vacancies and waitlist to be available but they are not (row {row_number})")
        else:
            if "NA/NA" in index.text:
                logger.write_log(f"Verified vacancies and waitlist are unavailable (row {row_number})")
            else:
                logger.report_issue(f"Expected vacancies and waitlist to be unavailable but they are (row {row_number})")
    except Exception:
        logger.report_issue(f"Unable to verify vacancies and waitlist (row {row_number})")