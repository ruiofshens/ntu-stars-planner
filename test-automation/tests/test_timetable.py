from pages import timetables_page, courses_page, nav_bar


def test_save_timetables(get_driver):
    driver = get_driver

    nav_bar.click_courses_nav(driver)
    courses_page.search_course(driver, "CZ3001")
    courses_page.add_course_by_index(driver, 0)
    courses_page.verify_course_added(driver, "CZ3001")
    courses_page.click_generate_plan_btn(driver)

    timetables_page.save_timetable_course_overview(driver, 1)
    timetables_page.verify_timetable_saved(driver, 1)


def test_cannot_save_timetable(get_driver):
    driver = get_driver

    timetables_page.save_timetable_course_overview(driver, 1)
    timetables_page.verify_timetable_not_saved(driver)