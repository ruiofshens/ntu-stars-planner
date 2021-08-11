import logger


def click_timetable_nav(driver):
    try:
        timetable_btn = driver.find_element_by_id("nav-timetable")
        timetable_btn.click()
        logger.write_log("Clicked timetable nav")
    except Exception:
        logger.report_issue("Unable to click timetable nav")


def click_courses_nav(driver):
    try:
        courses_btn = driver.find_element_by_id("nav-courses")
        courses_btn.click()
        logger.write_log("Clicked courses nav")
    except Exception:
        logger.report_issue("Unable to click courses nav")


def click_settings_nav(driver):
    try:
        settings_btn = driver.find_element_by_id("nav-settings")
        settings_btn.click()
        logger.write_log("Clicked settings nav")
    except Exception:
        logger.report_issue("Unable to click settings nav")
