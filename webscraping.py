import pandas as pd
from selenium import webdriver
options = webdriver.ChromeOptions()
options.add_argument('headless')

driver = webdriver.Chrome('C:\chromedriver',options=options)
driver.get("http://ncov.mohw.go.kr/index_main.jsp")

path = '/html/body/div/div[5]/div/div[1]/div[1]'
table = driver.find_element_by_xpath(path)

print(table)