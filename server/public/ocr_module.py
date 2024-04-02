import cv2
import pytesseract
import os

pytesseract.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'
os.environ['TESSDATA_PREFIX'] = r'C:\\Program Files\\Tesseract-OCR\\tessdata'

def perform_ocr(image_path):
    image = cv2.imread(image_path)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, threshold_image = cv2.threshold(gray_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    custom_config = r'--oem 3 --psm 6 -l vie'
    text = pytesseract.image_to_string(threshold_image, config=custom_config)
    return text

# image_path = r'C:\Users\TovM24\Desktop\solidPros\public\photo\Screenshot 2024-02-29 022147.png'
# result_text = perform_ocr(image_path)
# print(result_text)
