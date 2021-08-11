from pages import timetables_page, nav_bar
from test_timetable_save import generate_plan


# TC-010
def test_view_vacancies_before_10pm(get_driver):
    # declare test data
    course_code = "CZ3001"

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    generate_plan(driver, course_code)

    timetables_page.verify_vacancies_and_waitlist(driver, 1, available=True)