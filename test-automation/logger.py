import logging, pytest


def write_log(msg):
    logging.info("Pass: " + msg)


def report_issue(msg):
    logging.error("Error: " + msg)
    pytest.fail("Error: " + msg)
