import time


def scroll_to_element(driver, element):
    driver.execute_script("arguments[0].scrollIntoView();", element)
    time.sleep(1)


def scroll_page(driver, x, y):
    driver.execute_script(f"window.scroll({x}, {y})")
    time.sleep(2)
