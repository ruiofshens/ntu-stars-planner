from pages import courses_page, nav_bar


# TC-018
def test_clear_all_course(get_driver):
    # declare test data
    course_codes = ["CZ3001", "CZ3002", "CZ3003"]

    driver = get_driver
    nav_bar.click_courses_nav(driver)
    for course_code in course_codes:
        courses_page.search_course(driver, course_code)
        courses_page.add_course_by_index(driver, 0)
    courses_page.verify_courses_selected(driver, course_codes)
    courses_page.clear_all_courses(driver)
    courses_page.verify_no_courses_selected(driver)
