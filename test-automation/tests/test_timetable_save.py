from pages import timetables_page, courses_page, nav_bar


# TC-004
def test_save_timetables(get_driver):
    # declare test data
    course_code = "CZ3001"
    plan_number = 1

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    courses_page.search_course(driver, course_code)
    courses_page.add_course_by_index(driver, 0)
    courses_page.verify_course_added(driver, course_code)
    courses_page.click_generate_plan_btn(driver)

    timetables_page.save_timetable_course_overview(driver, plan_number)
    timetables_page.verify_timetable_saved(driver, plan_number)


# TC-005
def test_cannot_save_timetable(get_driver):
    # declare test data
    plan_number = 1

    driver = get_driver

    timetables_page.save_timetable_course_overview(driver, plan_number)
    timetables_page.verify_timetable_not_saved(driver)


# TC-006
def test_cannot_save_to_choose_plan(get_driver):
    # declare test data
    course_code = "CZ3001"
    plan_number = 0

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    courses_page.search_course(driver, course_code)
    courses_page.add_course_by_index(driver, 0)
    courses_page.verify_course_added(driver, course_code)
    courses_page.click_generate_plan_btn(driver)

    timetables_page.save_timetable_course_overview(driver, plan_number)
    timetables_page.verify_timetable_not_saved(driver)


# TC-007
def test_save_edited_plan(get_driver):
    # declare test data
    course_code = "CZ3001"
    new_index = "10350"
    plan_number = 1

    driver = get_driver

    nav_bar.click_courses_nav(driver)
    courses_page.search_course(driver, course_code)
    courses_page.add_course_by_index(driver, 0)
    courses_page.verify_course_added(driver, course_code)
    courses_page.click_generate_plan_btn(driver)

    timetables_page.toggle_overviews_tab(driver, "edit-plan")
    timetables_page.edit_index(driver, 0, new_index)

    timetables_page.save_timetable_index_edit_overview(driver, plan_number)
    timetables_page.verify_timetable_saved(driver, plan_number)