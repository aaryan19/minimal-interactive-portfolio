from flask import Flask, request, jsonify
# hell
app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    weight = float(data['weight'])
    height = float(data['height'])
    bmi = weight / (height * height)
    return jsonify({'bmi': round(bmi, 2)})

if __name__ == '__main__':
    app.run(debug=True)