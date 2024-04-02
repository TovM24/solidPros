from socket import SocketIO
from flask import Flask, request, jsonify, render_template
import os
from ocr_module import perform_ocr

app = Flask(__name__)

photo_folder = "photo"

if not os.path.exists(photo_folder):
    os.makedirs(photo_folder)

initial_text = "The text will be displayed here"
initialOCRResult = "The text will be displayed here"

def save_latest_photo(file):
    try:
        existing_files = os.listdir(photo_folder)
        for existing_file in existing_files:
            os.remove(os.path.join(photo_folder, existing_file))

        filename = "solid-pros-img.jpg"
        file.save(os.path.join(photo_folder, filename))

        image_path = os.path.join(photo_folder, filename)
        text = perform_ocr(image_path)

        print("Text in the image:")
        print(text)

        if not text.strip():
            text = initial_text

        global initialOCRResult
        initialOCRResult = text.strip()

        return jsonify({'success': True, 'ocr_result': text})
    except Exception as e:
        print(f"Error on server: {e}")
        return jsonify({'error': 'Error during OCR or no result', 'details': str(e)})

def update_display_text(result):
    SocketIO.emit('update_display', {'result': result})

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    result = save_latest_photo(file)

    return result  

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))
    initial_text = "The text will be displayed here"
