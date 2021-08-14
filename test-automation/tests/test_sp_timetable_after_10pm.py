from pages import timetables_page, nav_bar
from test_timetable_save import generate_plan


# TC-011
def test_view_vacancies_after_10pm(get_driver):
    # declare test data
    course_code = "CZ3001"

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    generate_plan(driver, course_code)

    timetables_page.verify_vacancies_and_waitlist(driver, 1, available=False)


# TC-015
def test_edit_plans_view_vacancies_after_10pm(get_driver):
    # declare test data
    course_code = "CZ3001"

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    generate_plan(driver, course_code)
    timetables_page.toggle_overviews_tab(driver, 'edit-plan')

    timetables_page.verify_edit_plans_vacancies_and_waitlist(driver, 1, available=False)


# TC-017
def test_saved_plans_view_vacancies_after_10pm(get_driver):
    # declare test data
    course_code = "CZ3001"
    plan_number = 1

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    generate_plan(driver, course_code)
    timetables_page.save_timetable_course_overview(driver, plan_number)
    timetables_page.verify_timetable_saved(driver, plan_number)

    timetables_page.toggle_overviews_tab(driver, 'save-plan')
    timetables_page.load_saved_plan(driver, plan_number)
    timetables_page.verify_vacancies_and_waitlist(driver, 1, available=False)