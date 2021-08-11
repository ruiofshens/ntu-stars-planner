# https://blog.testproject.io/2019/07/16/read-config-files-in-python-selenium/

import pytest, os
from datetime import datetime
from selenium.webdriver import Chrome, ChromeOptions

DEFAULT_WAIT_TIME = 30
global driver, results_folder_path


@pytest.fixture
def get_driver():
    global driver
    options = ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])  # remove chromedriver warnings
    driver = Chrome(executable_path=r"D:\Documents\My Documents\Programming Related\App Projects\ntu-stars-planner\test-automation\webdriver\chromedriver.exe",
                    options=options)
    driver.get("http://localhost:3000")
    driver.implicitly_wait(DEFAULT_WAIT_TIME)

    yield driver
    driver.quit()


# Configure logging to write to file
# https://stackoverflow.com/questions/41400722/pytest-implementing-a-logfile-per-test-method
@pytest.hookimpl(hookwrapper=True,tryfirst=True)
def pytest_runtest_setup(item):
    global results_folder_path

    config = item.config
    logging_plugin = config.pluginmanager.get_plugin("logging-plugin")
    folder_name = f"{item._request.node.name}_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}"
    results_folder_path = os.path.abspath("../results") + "\\" + folder_name
    logging_plugin.set_log_path(results_folder_path + f"\\{item._request.node.name}.log")
    yield


# Take screenshot on failure
# https://stackoverflow.com/questions/60205391/how-to-capture-screenshot-on-test-case-failure-with-pytest
@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    global results_folder_path

    outcome = yield
    rep = outcome.get_result()
    if rep.when == 'call' and rep.failed:
        # filename = f"{item._request.node.name}_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.png"
        # path_to_file = Path(os.path.abspath("../results"), filename)
        # driver.save_screenshot(fr"{rep.nodeid.replace('/','_').replace('::','__')}.png")
        driver.save_screenshot(results_folder_path + "\\failed_screenshot.png")